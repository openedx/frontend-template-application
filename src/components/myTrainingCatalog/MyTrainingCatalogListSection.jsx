/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faBookOpen, faPen, faPlus, faStar, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FILTER_ALL } from '../../api/searnTrainingCatalog/trainingsCatalogOptionsUtils';
import ConfirmActionDialog from '../confirmActionDialog/ConfirmActionDialog';
import { EmptyState } from '../emptyState';
import { TablePaginationFooter } from '../dataTable';
import SearchInput from '../searchInput/SearchInput';
import SearchableDropdown from '../searchableDropdown/SearchableDropdown';
import { SkeletonScreen, SKELETON_VARIANTS } from '../skeleton';
import { useToast } from '../toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import useMyTrainingCatalogList from '../../hooks/myTrainingCatalog/useMyTrainingCatalogList';
import useTrainingCatalogFilterOptions from '../../hooks/searnTrainingCatalog/useTrainingCatalogFilterOptions';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';
import { getStarFill } from '../../pages/searnTrainingCatalog/starUtils';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import { buildPaginationShowingParams } from '../../utils/paginationUtils';
import messages from '../../pages/myTrainingCatalog/messages';
import '../../pages/searnTrainingCatalog/SearnTrainingCatalog.scss';
import '../../pages/myTrainingCatalog/MyTrainingCatalog.scss';

const MyTrainingCatalogListSection = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { componentAccess } = useUserRole();
  const access = componentAccess?.myTrainingCatalog ?? {};

  const canCreateTraining = Boolean(access.canCreateTraining);
  const canEditTraining = Boolean(access.canEditTraining);
  const canDeleteTraining = Boolean(access.canDeleteTraining);
  const showActionsColumn = canEditTraining || canDeleteTraining;

  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [frameworkFilter, setFrameworkFilter] = useState(FILTER_ALL);
  const [roleFilter, setRoleFilter] = useState(FILTER_ALL);
  const [domainFilter, setDomainFilter] = useState(FILTER_ALL);
  const [subDomainFilter, setSubDomainFilter] = useState(FILTER_ALL);
  const [activityFilter, setActivityFilter] = useState(FILTER_ALL);
  const [nraGoalFilter, setNraGoalFilter] = useState(FILTER_ALL);
  const [page, setPage] = useState(1);
  const [hiddenIds, setHiddenIds] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchText.trim());
      setPage(1);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  const {
    frameworkOptions,
    roleOptions,
    domainOptions,
    subDomainOptions,
    activityOptions,
    nraGoalOptions,
    isOptionsLoading,
    optionsErrorMessage,
  } = useTrainingCatalogFilterOptions({ frameworkFilter });

  const {
    items,
    count,
    totalPages,
    isLoading,
    isError,
    errorMessage,
  } = useMyTrainingCatalogList({
    page,
    search: searchQuery,
    frameworkFilter,
    roleFilter,
    domainFilter,
    subDomainFilter,
    activityFilter,
    nraGoalFilter,
  });

  const visibleItems = useMemo(
    () => items.filter((row) => !hiddenIds.includes(row.id)),
    [hiddenIds, items],
  );

  useEffect(() => {
    if (!optionsErrorMessage) {
      return;
    }

    showToast({
      title: formatMessage(catalogMessages.filterOptionsErrorTitle),
      description: optionsErrorMessage,
    });
  }, [formatMessage, optionsErrorMessage, showToast]);

  useEffect(() => {
    if (!isError) {
      return;
    }

    showToast({
      title: formatMessage(messages.listLoadErrorTitle),
      description: errorMessage || formatMessage(messages.listLoadError),
    });
  }, [errorMessage, formatMessage, isError, showToast]);

  const handleFrameworkChange = (value) => {
    setFrameworkFilter(value);
    setRoleFilter(FILTER_ALL);
    setDomainFilter(FILTER_ALL);
    setSubDomainFilter(FILTER_ALL);
    setPage(1);
  };

  const handleConfirmDelete = () => {
    if (!pendingDelete) {
      return;
    }

    setHiddenIds((current) => [...current, pendingDelete.id]);
    showToast({
      title: formatMessage(messages.deleteSuccessTitle),
      description: formatMessage(messages.deleteSuccessDescription, { name: pendingDelete.title || '' }),
    });
    setPendingDelete(null);
  };

  const dropdownSearchPlaceholder = formatMessage(catalogMessages.dropdownSearchPlaceholder);
  const dropdownNoOptions = formatMessage(catalogMessages.dropdownNoOptions);
  const showTableSkeleton = isLoading && visibleItems.length === 0;
  const showEmpty = !isLoading && !isError && visibleItems.length === 0;
  const showTable = !isError && visibleItems.length > 0;
  const safePage = Math.min(page, Math.max(1, totalPages));

  return (
    <>
      <div className="searn-training-catalog-page__toolbar my-training-catalog-page__toolbar">
        <div className="searn-training-catalog-page__filters-grid">
          <div className="searn-training-catalog-page__search my-training-catalog-page__search-wide">
            <SearchInput
              value={searchText}
              placeholder={formatMessage(catalogMessages.searchPlaceholder)}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <SearchableDropdown
            value={frameworkFilter}
            options={frameworkOptions}
            onChange={handleFrameworkChange}
            triggerLabel={
              frameworkOptions.find((o) => o.value === frameworkFilter)?.label
              || formatMessage(catalogMessages.allFrameworks)
            }
            searchPlaceholder={dropdownSearchPlaceholder}
            noOptionsText={dropdownNoOptions}
            disabled={isOptionsLoading}
          />
          <SearchableDropdown
            value={roleFilter}
            options={roleOptions}
            onChange={(v) => { setRoleFilter(v); setPage(1); }}
            triggerLabel={roleOptions.find((o) => o.value === roleFilter)?.label || formatMessage(catalogMessages.allRoles)}
            searchPlaceholder={dropdownSearchPlaceholder}
            noOptionsText={dropdownNoOptions}
            disabled={isOptionsLoading}
          />
          <SearchableDropdown
            value={domainFilter}
            options={domainOptions}
            onChange={(v) => { setDomainFilter(v); setPage(1); }}
            triggerLabel={
              domainOptions.find((o) => o.value === domainFilter)?.label
              || formatMessage(catalogMessages.allDomains)
            }
            searchPlaceholder={dropdownSearchPlaceholder}
            noOptionsText={dropdownNoOptions}
            disabled={isOptionsLoading}
          />
          <SearchableDropdown
            value={subDomainFilter}
            options={subDomainOptions}
            onChange={(v) => { setSubDomainFilter(v); setPage(1); }}
            triggerLabel={
              subDomainOptions.find((o) => o.value === subDomainFilter)?.label
              || formatMessage(catalogMessages.allSubDomains)
            }
            searchPlaceholder={dropdownSearchPlaceholder}
            noOptionsText={dropdownNoOptions}
            disabled={isOptionsLoading}
          />
          <SearchableDropdown
            value={activityFilter}
            options={activityOptions}
            onChange={(v) => { setActivityFilter(v); setPage(1); }}
            triggerLabel={
              activityOptions.find((o) => o.value === activityFilter)?.label
              || formatMessage(catalogMessages.allActivities)
            }
            searchPlaceholder={dropdownSearchPlaceholder}
            noOptionsText={dropdownNoOptions}
            disabled={isOptionsLoading}
          />
          <SearchableDropdown
            value={nraGoalFilter}
            options={nraGoalOptions}
            onChange={(v) => { setNraGoalFilter(v); setPage(1); }}
            triggerLabel={
              nraGoalOptions.find((o) => o.value === nraGoalFilter)?.label
              || formatMessage(catalogMessages.allNraGoals)
            }
            searchPlaceholder={dropdownSearchPlaceholder}
            noOptionsText={dropdownNoOptions}
            disabled={isOptionsLoading}
          />
        </div>

        {canCreateTraining && (
          <div className="my-training-catalog-page__actions-row">
            <button
              type="button"
              className="my-training-catalog-page__primary-button"
              onClick={() => navigate(ADMIN_PATHS.myTrainingCatalogNew)}
            >
              <FontAwesomeIcon icon={faPlus} aria-hidden />
              {formatMessage(messages.createTraining)}
            </button>
          </div>
        )}
      </div>

      {showTableSkeleton && (
        <SkeletonScreen variant={SKELETON_VARIANTS.TOOLBAR_TABLE} tablePreset="requestedTrainings" />
      )}

      {isError && !showTableSkeleton && (
        <EmptyState
          fullSize
          className="searn-training-catalog-page__empty"
          message={errorMessage || formatMessage(messages.listLoadError)}
        />
      )}

      {showEmpty && (
        <EmptyState fullSize className="searn-training-catalog-page__empty" message={formatMessage(messages.empty)} />
      )}

      {showTable && (
        <div className="searn-training-catalog-page__card">
          <div className="searn-training-catalog-page__table-wrap">
            <table className="searn-training-catalog-page__table">
              <thead>
                <tr className="searn-training-catalog-page__thead-row">
                  <th className="searn-training-catalog-page__th">{formatMessage(messages.columnTraining)}</th>
                  <th className="searn-training-catalog-page__th">{formatMessage(messages.columnMode)}</th>
                  <th className="searn-training-catalog-page__th">{formatMessage(messages.columnSatisfaction)}</th>
                  <th className="searn-training-catalog-page__th">{formatMessage(messages.columnCost)}</th>
                  {showActionsColumn && (
                    <th className="searn-training-catalog-page__th my-training-catalog-page__th--actions">
                      {formatMessage(messages.columnActions)}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((row) => (
                  <tr
                    key={row.id}
                    className="searn-training-catalog-page__row"
                    onClick={() => navigate(ADMIN_PATHS.myTrainingCatalogDetail(row.id))}
                  >
                    <td className="searn-training-catalog-page__td">
                      <div className="searn-training-catalog-page__training-cell">
                        <span className="searn-training-catalog-page__training-icon" aria-hidden>
                          <FontAwesomeIcon icon={faBookOpen} />
                        </span>
                        <div style={{ minWidth: 0 }}>
                          {hasDisplayValue(row.title) && (
                            <p className="searn-training-catalog-page__training-title">{row.title}</p>
                          )}
                          {hasDisplayValue(row.description) && (
                            <p className="searn-training-catalog-page__training-desc">{row.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="searn-training-catalog-page__td">
                      {hasDisplayValue(row.mode) && <span>{row.mode}</span>}
                    </td>
                    <td className="searn-training-catalog-page__td">
                      {typeof row.rating === 'number' && (
                        <button
                          type="button"
                          className="searn-training-catalog-page__rating-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(ADMIN_PATHS.myTrainingCatalogFeedback(row.id));
                          }}
                          title={formatMessage(catalogMessages.userFeedback)}
                        >
                          <span className="searn-training-catalog-page__stars" aria-hidden>
                            {[1, 2, 3, 4, 5].map((position) => {
                              const idx = position - 1;
                              const fill = getStarFill(row.rating, idx);
                              if (fill >= 1) {
                                return (
                                  <FontAwesomeIcon
                                    key={position}
                                    icon={faStar}
                                    className="searn-training-catalog-page__star searn-training-catalog-page__star--fill"
                                  />
                                );
                              }
                              if (fill > 0) {
                                return (
                                  <span key={position} className="searn-training-catalog-page__star">
                                    <FontAwesomeIcon icon={faStar} style={{ opacity: 0.35 }} />
                                    <span
                                      className="searn-training-catalog-page__star-half"
                                      style={{ width: `${Math.round(fill * 100)}%` }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faStar}
                                        className="searn-training-catalog-page__star searn-training-catalog-page__star--fill"
                                      />
                                    </span>
                                  </span>
                                );
                              }
                              return (
                                <FontAwesomeIcon key={position} icon={faStar} className="searn-training-catalog-page__star" />
                              );
                            })}
                          </span>
                          <span className="searn-training-catalog-page__rating-value">{row.rating.toFixed(1)}</span>
                          <span className="searn-training-catalog-page__rating-count">({row.reviewCount})</span>
                        </button>
                      )}
                    </td>
                    <td className="searn-training-catalog-page__td my-training-catalog-page__cost-cell">
                      {hasDisplayValue(row.cost) && row.cost}
                    </td>
                    {showActionsColumn && (
                      <td className="searn-training-catalog-page__td my-training-catalog-page__actions-cell">
                        {canEditTraining && (
                          <button
                            type="button"
                            className="my-training-catalog-page__icon-button"
                            aria-label={formatMessage(messages.editTraining)}
                            title={formatMessage(messages.editTraining)}
                            onClick={(e) => {
                              e.stopPropagation();
                              showToast({
                                title: formatMessage(messages.editUnavailableTitle),
                                description: formatMessage(messages.editUnavailableDescription),
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                        )}
                        {canDeleteTraining && (
                          <button
                            type="button"
                            className="my-training-catalog-page__icon-button my-training-catalog-page__icon-button--danger"
                            aria-label={formatMessage(messages.deleteTraining)}
                            title={formatMessage(messages.deleteTraining)}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPendingDelete(row);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <TablePaginationFooter
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
              paginationLabel={formatMessage(catalogMessages.paginationLabel)}
              footerContent={formatMessage(
                catalogMessages.showingCount,
                buildPaginationShowingParams(visibleItems, count),
              )}
            />
          )}
        </div>
      )}

      <ConfirmActionDialog
        isOpen={Boolean(pendingDelete)}
        title={formatMessage(messages.deleteDialogTitle)}
        description={formatMessage(messages.deleteDialogDescription, {
          name: pendingDelete?.title || '',
        })}
        cancelLabel={formatMessage(messages.deleteDialogCancel)}
        confirmLabel={formatMessage(messages.deleteDialogConfirm)}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default MyTrainingCatalogListSection;
