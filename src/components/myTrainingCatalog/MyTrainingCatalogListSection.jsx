/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faBookOpen, faPen, faPlus, faStar, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
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
import useMyTrainingCatalogList, {
  myTrainingCatalogListQueryKey,
} from '../../hooks/myTrainingCatalog/useMyTrainingCatalogList';
import useMyTrainingCatalogMutations from '../../hooks/myTrainingCatalog/useMyTrainingCatalogMutations';
import useTrainingCatalogRequestAccessMutation from '../../hooks/trainingCatalogRequestAccess/useTrainingCatalogRequestAccessMutation';
import useTrainingCatalogFilterOptions from '../../hooks/searnTrainingCatalog/useTrainingCatalogFilterOptions';
import TrainingCatalogRequestAccessCell from '../searnTrainingCatalog/TrainingCatalogRequestAccessCell';
import TrainingCatalogSelfAssignCell from '../searnTrainingCatalog/TrainingCatalogSelfAssignCell';
import { TRAINING_ACCESS_REQUEST_STATUS } from '../../api/trainingCatalogRequestAccess/trainingCatalogRequestAccessUtils';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';
import useTrainingCatalogSelfAssignMutation from '../../hooks/trainingCatalogSelfAssign/useTrainingCatalogSelfAssignMutation';
import { getStarFill } from '../../pages/searnTrainingCatalog/starUtils';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import useTrainingCatalogVariant from '../../hooks/myTrainingCatalog/useTrainingCatalogVariant';
import { TRAINING_CATALOG_VARIANT_IDS } from '../../utils/trainingCatalogVariantConfig';
import { buildPaginationShowingParams } from '../../utils/paginationUtils';
import messages from '../../pages/myTrainingCatalog/messages';
import '../../pages/searnTrainingCatalog/SearnTrainingCatalog.scss';
import '../../pages/myTrainingCatalog/MyTrainingCatalog.scss';

const MyTrainingCatalogListSection = ({
  initialProviderFilter = FILTER_ALL,
  lockProviderFilter = false,
  lockedProviderLabel = '',
} = {}) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { componentAccess } = useUserRole();
  const variant = useTrainingCatalogVariant();
  const access = componentAccess?.[variant.componentAccessKey] ?? {};
  const isNraVariant = variant.id === TRAINING_CATALOG_VARIANT_IDS.NRA_SPECIFIC_TRAINING_CATALOG;
  const queryClient = useQueryClient();
  const requestAccessMutation = useTrainingCatalogRequestAccessMutation();
  const selfAssignMutation = useTrainingCatalogSelfAssignMutation();
  const { deleteMutation } = useMyTrainingCatalogMutations();

  const canCreateTraining = Boolean(access.canCreateTraining);
  const canEditTraining = Boolean(access.canEditTraining);
  const canDeleteTraining = Boolean(access.canDeleteTraining);
  const canRequestAccess = Boolean(access.canRequestAccess) && isNraVariant;
  const canSelfAssign = Boolean(access.canSelfAssign);
  const canViewProviderColumn = Boolean(access.canViewProviderColumn) && isNraVariant;
  const showProviderColumn = canViewProviderColumn;
  const showActionsColumn = canEditTraining || canDeleteTraining || canRequestAccess || canSelfAssign;

  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [frameworkFilter, setFrameworkFilter] = useState(FILTER_ALL);
  const [roleFilter, setRoleFilter] = useState(FILTER_ALL);
  const [domainFilter, setDomainFilter] = useState(FILTER_ALL);
  const [subDomainFilter, setSubDomainFilter] = useState(FILTER_ALL);
  const [activityFilter, setActivityFilter] = useState(FILTER_ALL);
  const [nraGoalFilter, setNraGoalFilter] = useState(FILTER_ALL);
  const [providerFilter, setProviderFilter] = useState(
    lockProviderFilter && hasDisplayValue(initialProviderFilter) && initialProviderFilter !== FILTER_ALL
      ? initialProviderFilter
      : FILTER_ALL,
  );
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [pendingRequestAccess, setPendingRequestAccess] = useState(null);
  const [requestStatusOverrides, setRequestStatusOverrides] = useState({});
  const [haveAssignedOverrides, setHaveAssignedOverrides] = useState({});
  const [pendingSelfAssignId, setPendingSelfAssignId] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchText.trim());
      setPage(1);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (!hasDisplayValue(initialProviderFilter) || initialProviderFilter === FILTER_ALL) {
      return;
    }

    setProviderFilter(initialProviderFilter);
  }, [initialProviderFilter]);

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
    providerFilter,
    catalogVariantId: variant.id,
  });

  const visibleItems = items;

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

  const handleConfirmDelete = async () => {
    if (!pendingDelete?.id || deleteMutation.isPending) {
      return;
    }

    try {
      const result = await deleteMutation.mutateAsync(pendingDelete.id);

      await queryClient.invalidateQueries({
        queryKey: myTrainingCatalogListQueryKey({
          page,
          search: searchQuery,
          frameworkFilter,
          roleFilter,
          domainFilter,
          subDomainFilter,
          activityFilter,
          nraGoalFilter,
          catalogVariantId: variant.id,
          providerFilter,
        }),
      });

      showToast({
        title: formatMessage(messages.deleteSuccessTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.deleteSuccessDescription, { name: pendingDelete.title || '' }),
      });
      setPendingDelete(null);
    } catch (error) {
      showToast({
        title: formatMessage(messages.deleteErrorTitle),
        description: error?.message || formatMessage(messages.deleteError),
      });
    }
  };

  const dropdownSearchPlaceholder = formatMessage(catalogMessages.dropdownSearchPlaceholder);
  const dropdownNoOptions = formatMessage(catalogMessages.dropdownNoOptions);
  const showTableSkeleton = isLoading && visibleItems.length === 0;
  const showEmpty = !isLoading && !isError && visibleItems.length === 0;
  const showTable = !isError && visibleItems.length > 0;
  const safePage = Math.min(page, Math.max(1, totalPages));

  const handleConfirmRequestAccess = async () => {
    if (!pendingRequestAccess?.id) {
      return;
    }

    try {
      const result = await requestAccessMutation.mutateAsync({
        trainingId: pendingRequestAccess.id,
      });

      setRequestStatusOverrides((current) => ({
        ...current,
        [pendingRequestAccess.id]: TRAINING_ACCESS_REQUEST_STATUS.PENDING,
      }));

      await queryClient.invalidateQueries({
        queryKey: myTrainingCatalogListQueryKey({
          page,
          search: searchQuery,
          frameworkFilter,
          roleFilter,
          domainFilter,
          subDomainFilter,
          activityFilter,
          nraGoalFilter,
          catalogVariantId: variant.id,
          providerFilter,
        }),
      });

      showToast({
        title: formatMessage(catalogMessages.requestAccessSubmittedTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(catalogMessages.requestAccessSubmittedDescription),
      });
      setPendingRequestAccess(null);
    } catch (error) {
      showToast({
        title: formatMessage(catalogMessages.requestAccessCreateErrorTitle),
        description: error?.message || formatMessage(catalogMessages.requestAccessCreateError),
      });
    }
  };

  const handleSelfAssign = async (row) => {
    if (!row?.id) {
      return;
    }

    setPendingSelfAssignId(row.id);

    try {
      const result = await selfAssignMutation.mutateAsync({
        trainingId: row.id,
      });

      setHaveAssignedOverrides((current) => ({
        ...current,
        [row.id]: true,
      }));

      showToast({
        title: formatMessage(catalogMessages.selfAssignSubmittedTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(catalogMessages.selfAssignSubmittedDescription),
      });
    } catch (error) {
      showToast({
        title: formatMessage(catalogMessages.selfAssignErrorTitle),
        description: error?.message || formatMessage(catalogMessages.selfAssignError),
      });
    } finally {
      setPendingSelfAssignId(null);
    }
  };

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
              onClick={() => navigate(variant.paths.new)}
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
                  {showProviderColumn && (
                    <th className="searn-training-catalog-page__th">{formatMessage(catalogMessages.columnProvider)}</th>
                  )}
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
                    onClick={() => navigate(variant.paths.detail(row.id))}
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
                    {showProviderColumn && (
                      <td className="searn-training-catalog-page__td">
                        {hasDisplayValue(row.provider) && (
                          <button
                            type="button"
                            className="searn-training-catalog-page__provider-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (hasDisplayValue(row.providerSlug) && variant.paths?.provider) {
                                navigate(variant.paths.provider(row.providerSlug));
                              }
                            }}
                            title={row.provider}
                            disabled={!hasDisplayValue(row.providerSlug)}
                          >
                            {row.provider}
                          </button>
                        )}
                      </td>
                    )}
                    <td className="searn-training-catalog-page__td">
                      {typeof row.rating === 'number' && (
                        <button
                          type="button"
                          className="searn-training-catalog-page__rating-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(variant.paths.feedback(row.id));
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
                        <div className="my-training-catalog-page__actions-group">
                          {(canEditTraining || canDeleteTraining) && (
                            <div className="my-training-catalog-page__icon-actions">
                              {canEditTraining && (
                                <button
                                  type="button"
                                  className="my-training-catalog-page__icon-button"
                                  aria-label={formatMessage(messages.editTraining)}
                                  title={formatMessage(messages.editTraining)}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(variant.paths.edit(row.id));
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
                            </div>
                          )}
                          {canRequestAccess && (
                            <TrainingCatalogRequestAccessCell
                              row={row}
                              statusOverrides={requestStatusOverrides}
                              onRequestClick={setPendingRequestAccess}
                            />
                          )}
                          {canSelfAssign && (
                            <TrainingCatalogSelfAssignCell
                              row={row}
                              assignedOverrides={haveAssignedOverrides}
                              onSelfAssignClick={handleSelfAssign}
                              isSubmitting={pendingSelfAssignId === row.id && selfAssignMutation.isPending}
                            />
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

      <ConfirmActionDialog
        isOpen={Boolean(pendingRequestAccess)}
        title={formatMessage(catalogMessages.requestAccessConfirmTitle)}
        description={formatMessage(catalogMessages.requestAccessConfirmDescription, {
          name: pendingRequestAccess?.title || '',
        })}
        cancelLabel={formatMessage(catalogMessages.requestAccessConfirmCancel)}
        confirmLabel={formatMessage(catalogMessages.requestAccessConfirmSubmit)}
        onCancel={() => setPendingRequestAccess(null)}
        onConfirm={handleConfirmRequestAccess}
      />
    </>
  );
};

export default MyTrainingCatalogListSection;
