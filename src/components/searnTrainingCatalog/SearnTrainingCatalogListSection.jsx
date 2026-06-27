/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faBookOpen, faPaperPlane, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRequestedTrainingMutations from '../../hooks/requestedTrainings/useRequestedTrainingMutations';
import { FILTER_ALL } from '../../api/searnTrainingCatalog/trainingsCatalogOptionsUtils';
import ConfirmActionDialog from '../confirmActionDialog/ConfirmActionDialog';
import { EmptyState } from '../emptyState';
import { TablePaginationFooter } from '../dataTable';
import SearchInput from '../searchInput/SearchInput';
import SearchableDropdown from '../searchableDropdown/SearchableDropdown';
import { SkeletonScreen, SKELETON_VARIANTS } from '../skeleton';
import { useToast } from '../toast/ToastProvider';
import RequestTrainingModal from './RequestTrainingModal';
import { useUserRole } from '../../contexts/UserRoleContext';
import useSearnTrainingCatalogList from '../../hooks/searnTrainingCatalog/useSearnTrainingCatalogList';
import useTrainingCatalogFilterOptions from '../../hooks/searnTrainingCatalog/useTrainingCatalogFilterOptions';
import useTrainingCatalogRequestAccessMutation from '../../hooks/trainingCatalogRequestAccess/useTrainingCatalogRequestAccessMutation';
import messages from '../../pages/searnTrainingCatalog/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import { TRAINING_CATALOG_VARIANT_IDS } from '../../utils/trainingCatalogVariantConfig';
import { buildPaginationShowingParams } from '../../utils/paginationUtils';
import { getStarFill } from '../../pages/searnTrainingCatalog/starUtils';
import '../../pages/searnTrainingCatalog/SearnTrainingCatalog.scss';

/**
 * @param {{
 *   initialProviderFilter?: string,
 *   lockProviderFilter?: boolean,
 *   lockedProviderLabel?: string,
 * }} props
 */
const SearnTrainingCatalogListSection = ({
  initialProviderFilter = FILTER_ALL,
  lockProviderFilter = false,
  lockedProviderLabel = '',
}) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { componentAccess } = useUserRole();
  const access = componentAccess?.searnTrainingCatalog ?? {};

  const canRequestTraining = Boolean(access.canRequestTraining);
  const canRequestAccess = Boolean(access.canRequestAccess);

  const [requestTrainingModalOpen, setRequestTrainingModalOpen] = useState(false);
  const [requestedTrainingIds, setRequestedTrainingIds] = useState([]);
  const [pendingRequestAccess, setPendingRequestAccess] = useState(null);

  const { createMutation } = useRequestedTrainingMutations();
  const requestAccessMutation = useTrainingCatalogRequestAccessMutation();

  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [frameworkFilter, setFrameworkFilter] = useState(FILTER_ALL);
  const [roleFilter, setRoleFilter] = useState(FILTER_ALL);
  const [domainFilter, setDomainFilter] = useState(FILTER_ALL);
  const [subDomainFilter, setSubDomainFilter] = useState(FILTER_ALL);
  const [activityFilter, setActivityFilter] = useState(FILTER_ALL);
  const [nraGoalFilter, setNraGoalFilter] = useState(FILTER_ALL);
  const [providerFilter, setProviderFilter] = useState(
    lockProviderFilter && hasDisplayValue(initialProviderFilter)
      ? initialProviderFilter
      : FILTER_ALL,
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!hasDisplayValue(initialProviderFilter) || initialProviderFilter === FILTER_ALL) {
      return;
    }

    setProviderFilter(initialProviderFilter);
    setPage(1);
  }, [initialProviderFilter]);

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
    providerOptions,
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
  } = useSearnTrainingCatalogList({
    page,
    search: searchQuery,
    frameworkFilter,
    roleFilter,
    domainFilter,
    subDomainFilter,
    activityFilter,
    nraGoalFilter,
    providerFilter,
  });

  useEffect(() => {
    if (!optionsErrorMessage) {
      return;
    }

    showToast({
      title: formatMessage(messages.filterOptionsErrorTitle),
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

  const dropdownSearchPlaceholder = formatMessage(messages.dropdownSearchPlaceholder);
  const dropdownNoOptions = formatMessage(messages.dropdownNoOptions);
  const showTableSkeleton = isLoading && items.length === 0;
  const showEmpty = !isLoading && !isError && items.length === 0;
  const showTable = !isError && items.length > 0;
  const safePage = Math.min(page, Math.max(1, totalPages));

  const isTrainingRequested = (row) => (
    Boolean(row.isRequested) || requestedTrainingIds.includes(row.id)
  );

  const handleRequestTrainingSubmit = async ({ activityId, description }) => {
    const parsedActivityId = Number(activityId);
    if (!Number.isFinite(parsedActivityId)) {
      return;
    }

    try {
      const result = await createMutation.mutateAsync({
        activityId: parsedActivityId,
        description,
      });

      setRequestTrainingModalOpen(false);
      showToast({
        title: formatMessage(messages.requestTrainingSubmittedTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.requestTrainingSubmittedDescription),
      });
    } catch (error) {
      showToast({
        title: formatMessage(messages.requestTrainingCreateErrorTitle),
        description: error?.message || formatMessage(messages.requestTrainingCreateError),
      });
    }
  };

  const handleConfirmRequestAccess = async () => {
    if (!pendingRequestAccess?.id) {
      return;
    }

    try {
      const result = await requestAccessMutation.mutateAsync({
        catalogVariantId: TRAINING_CATALOG_VARIANT_IDS.SEARN_TRAINING_CATALOG,
        trainingId: pendingRequestAccess.id,
      });

      setRequestedTrainingIds((current) => (
        current.includes(pendingRequestAccess.id)
          ? current
          : [...current, pendingRequestAccess.id]
      ));

      showToast({
        title: formatMessage(messages.requestAccessSubmittedTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.requestAccessSubmittedDescription),
      });
      setPendingRequestAccess(null);
    } catch (error) {
      showToast({
        title: formatMessage(messages.requestAccessCreateErrorTitle),
        description: error?.message || formatMessage(messages.requestAccessCreateError),
      });
    }
  };

  const lockedProviderOptions = hasDisplayValue(lockedProviderLabel)
    ? [{ value: providerFilter, label: lockedProviderLabel }]
    : providerOptions.filter((option) => option.value === providerFilter);

  return (
    <>
      <div className="searn-training-catalog-page__toolbar">
        <div className="searn-training-catalog-page__filters-grid">
          <div className="searn-training-catalog-page__search">
            <SearchInput
              value={searchText}
              placeholder={formatMessage(messages.searchPlaceholder)}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <SearchableDropdown
            value={frameworkFilter}
            options={frameworkOptions}
            onChange={handleFrameworkChange}
            triggerLabel={
              frameworkOptions.find(o => o.value === frameworkFilter)?.label
              || formatMessage(messages.allFrameworks)
            }
            searchPlaceholder={dropdownSearchPlaceholder}
            noOptionsText={dropdownNoOptions}
            disabled={isOptionsLoading}
          />
          <SearchableDropdown
            value={roleFilter}
            options={roleOptions}
            onChange={(v) => { setRoleFilter(v); setPage(1); }}
            triggerLabel={roleOptions.find(o => o.value === roleFilter)?.label || formatMessage(messages.allRoles)}
            searchPlaceholder={dropdownSearchPlaceholder}
            noOptionsText={dropdownNoOptions}
            disabled={isOptionsLoading}
          />
          <SearchableDropdown
            value={domainFilter}
            options={domainOptions}
            onChange={(v) => { setDomainFilter(v); setPage(1); }}
            triggerLabel={
              domainOptions.find(o => o.value === domainFilter)?.label
              || formatMessage(messages.allDomains)
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
              subDomainOptions.find(o => o.value === subDomainFilter)?.label
              || formatMessage(messages.allSubDomains)
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
              activityOptions.find(o => o.value === activityFilter)?.label
              || formatMessage(messages.allActivities)
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
              nraGoalOptions.find(o => o.value === nraGoalFilter)?.label
              || formatMessage(messages.allNraGoals)
            }
            searchPlaceholder={dropdownSearchPlaceholder}
            noOptionsText={dropdownNoOptions}
            disabled={isOptionsLoading}
          />
          {lockProviderFilter ? (
            <SearchableDropdown
              value={providerFilter}
              options={lockedProviderOptions.length > 0 ? lockedProviderOptions : [{ value: providerFilter, label: lockedProviderLabel || providerFilter }]}
              onChange={() => {}}
              triggerLabel={lockedProviderLabel || lockedProviderOptions[0]?.label || formatMessage(messages.allProviders)}
              searchPlaceholder={dropdownSearchPlaceholder}
              noOptionsText={dropdownNoOptions}
              disabled
            />
          ) : (
            <SearchableDropdown
              value={providerFilter}
              options={providerOptions}
              onChange={(v) => { setProviderFilter(v); setPage(1); }}
              triggerLabel={
                providerOptions.find(o => o.value === providerFilter)?.label
                || formatMessage(messages.allProviders)
              }
              searchPlaceholder={dropdownSearchPlaceholder}
              noOptionsText={dropdownNoOptions}
              disabled={isOptionsLoading}
            />
          )}
        </div>

        {canRequestTraining && (
          <div className="searn-training-catalog-page__actions-row">
            <button
              type="button"
              className="searn-training-catalog-page__primary-button"
              onClick={() => setRequestTrainingModalOpen(true)}
            >
              <FontAwesomeIcon icon={faPaperPlane} aria-hidden />
              {formatMessage(messages.requestTraining)}
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
        <EmptyState fullSize className="searn-training-catalog-page__empty" message={formatMessage(messages.noTrainingsFound)} />
      )}

      {showTable && (
        <div className="searn-training-catalog-page__card">
          <div className="searn-training-catalog-page__table-wrap">
            <table className="searn-training-catalog-page__table">
              <thead>
                <tr className="searn-training-catalog-page__thead-row">
                  <th className="searn-training-catalog-page__th">{formatMessage(messages.columnTraining)}</th>
                  <th className="searn-training-catalog-page__th">{formatMessage(messages.columnMode)}</th>
                  <th className="searn-training-catalog-page__th">{formatMessage(messages.columnProvider)}</th>
                  <th className="searn-training-catalog-page__th">{formatMessage(messages.columnSatisfaction)}</th>
                  <th className="searn-training-catalog-page__th">{formatMessage(messages.columnCost)}</th>
                  {canRequestAccess && (
                    <th className="searn-training-catalog-page__th searn-training-catalog-page__th--right">
                      {formatMessage(messages.columnAction)}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map(row => (
                  <tr
                    key={row.id}
                    className="searn-training-catalog-page__row"
                    onClick={() => navigate(ADMIN_PATHS.trainingCatalogDetail(row.id))}
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
                      {hasDisplayValue(row.provider) && (
                        <button
                          type="button"
                          className="searn-training-catalog-page__provider-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (hasDisplayValue(row.providerSlug)) {
                              navigate(ADMIN_PATHS.trainingCatalogProvider(row.providerSlug));
                            }
                          }}
                          title={row.provider}
                          disabled={!hasDisplayValue(row.providerSlug)}
                        >
                          {row.provider}
                        </button>
                      )}
                    </td>
                    <td className="searn-training-catalog-page__td">
                      <button
                        type="button"
                        className="searn-training-catalog-page__rating-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(ADMIN_PATHS.trainingCatalogFeedback(row.id));
                        }}
                        title={formatMessage(messages.userFeedback)}
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
                                  <span className="searn-training-catalog-page__star-half" style={{ width: `${Math.round(fill * 100)}%` }}>
                                    <FontAwesomeIcon icon={faStar} className="searn-training-catalog-page__star searn-training-catalog-page__star--fill" />
                                  </span>
                                </span>
                              );
                            }
                            return <FontAwesomeIcon key={position} icon={faStar} className="searn-training-catalog-page__star" />;
                          })}
                        </span>
                        <span className="searn-training-catalog-page__rating-value">{row.rating.toFixed(1)}</span>
                        <span className="searn-training-catalog-page__rating-count">({row.reviewCount})</span>
                      </button>
                    </td>
                    <td className="searn-training-catalog-page__td" style={{ fontWeight: 600 }}>
                      {hasDisplayValue(row.cost) && row.cost}
                    </td>
                    {canRequestAccess && (
                      <td className="searn-training-catalog-page__td searn-training-catalog-page__td--actions">
                        {isTrainingRequested(row) ? (
                          <span className="searn-training-catalog-page__requested-badge">
                            {formatMessage(messages.requested)}
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="searn-training-catalog-page__outline-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPendingRequestAccess(row);
                            }}
                          >
                            {formatMessage(messages.requestAccess)}
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
              paginationLabel={formatMessage(messages.paginationLabel)}
              footerContent={formatMessage(
                messages.showingCount,
                buildPaginationShowingParams(items, count),
              )}
            />
          )}
        </div>
      )}

      {canRequestTraining && (
        <RequestTrainingModal
          isOpen={requestTrainingModalOpen}
          onClose={() => setRequestTrainingModalOpen(false)}
          onSubmit={handleRequestTrainingSubmit}
          isSubmitting={createMutation.isPending}
        />
      )}

      <ConfirmActionDialog
        isOpen={Boolean(pendingRequestAccess)}
        title={formatMessage(messages.requestAccessConfirmTitle)}
        description={formatMessage(messages.requestAccessConfirmDescription, {
          name: pendingRequestAccess?.title || '',
        })}
        cancelLabel={formatMessage(messages.requestAccessConfirmCancel)}
        confirmLabel={formatMessage(messages.requestAccessConfirmSubmit)}
        onCancel={() => setPendingRequestAccess(null)}
        onConfirm={handleConfirmRequestAccess}
      />
    </>
  );
};

export default SearnTrainingCatalogListSection;
