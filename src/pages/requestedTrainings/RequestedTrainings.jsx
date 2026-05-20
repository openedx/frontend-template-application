/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '../../components/emptyState';
import PopupDialog from '../../components/popupDialog/PopupDialog';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { TablePaginationFooter } from '../../components/dataTable';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import useRequestedTrainingActivities from '../../hooks/requestedTrainings/useRequestedTrainingActivities';
import useRequestedTrainingFilters from '../../hooks/requestedTrainings/useRequestedTrainingFilters';
import useRequestedTrainingMutations from '../../hooks/requestedTrainings/useRequestedTrainingMutations';
import useRequestedTrainingsList from '../../hooks/requestedTrainings/useRequestedTrainingsList';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import './RequestedTrainings.scss';

const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const FlagIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" x2="4" y1="22" y2="15" />
  </svg>
);

const CircleXIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

const CircleCheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const hasFlagsCount = (flags) => typeof flags === 'number' && !Number.isNaN(flags);

const RequestedTrainings = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const canShowTable = true;
  const canSearch = true;
  const canFilter = true;
  const canRequestTraining = true;

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [description, setDescription] = useState('');

  const {
    dropdownOptions: statusOptions,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
    errorMessage: filtersErrorMessage,
  } = useRequestedTrainingFilters({ enabled: canFilter });

  const {
    items,
    totalPages,
    isLoading: isListLoading,
    isError: isListError,
    errorMessage: listErrorMessage,
  } = useRequestedTrainingsList({
    page,
    search: searchQuery,
    status: statusFilter,
    enabled: canShowTable,
  });

  const {
    dropdownOptions: activityOptions,
    isLoading: isActivitiesLoading,
    isError: isActivitiesError,
    errorMessage: activitiesErrorMessage,
  } = useRequestedTrainingActivities({ enabled: modalOpen });

  const { createMutation, statusMutation } = useRequestedTrainingMutations();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchText.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    if (!isListError) {
      return;
    }

    showToast({
      title: formatMessage(messages.listErrorTitle),
      description: listErrorMessage || formatMessage(messages.listLoadError),
    });
  }, [formatMessage, isListError, listErrorMessage, showToast]);

  useEffect(() => {
    if (!isFiltersError) {
      return;
    }

    showToast({
      title: formatMessage(messages.filtersErrorTitle),
      description: filtersErrorMessage || formatMessage(messages.filtersLoadError),
    });
  }, [filtersErrorMessage, formatMessage, isFiltersError, showToast]);

  useEffect(() => {
    if (!modalOpen || !isActivitiesError) {
      return;
    }

    showToast({
      title: formatMessage(messages.activitiesErrorTitle),
      description: activitiesErrorMessage || formatMessage(messages.activitiesLoadError),
    });
  }, [activitiesErrorMessage, formatMessage, isActivitiesError, modalOpen, showToast]);

  const statusLabel = useMemo(() => ({
    open: formatMessage(messages.statusOpen),
    closed: formatMessage(messages.statusClosed),
  }), [formatMessage]);

  const filterTriggerLabel = useMemo(() => {
    const match = statusOptions.find((option) => option.value === statusFilter);
    return match?.label || formatMessage(messages.filterPlaceholder);
  }, [formatMessage, statusFilter, statusOptions]);

  const selectedActivityLabel = useMemo(() => {
    const match = activityOptions.find((option) => option.value === selectedActivityId);
    return match?.label || null;
  }, [activityOptions, selectedActivityId]);

  const renderStatusLabel = (status) => {
    if (!hasDisplayValue(status)) {
      return null;
    }

    const normalized = String(status).toLowerCase();
    return statusLabel[normalized] || status;
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedActivityId('');
    setDescription('');
  };

  const canSubmit = Boolean(selectedActivityId && description.trim())
    && !createMutation.isPending
    && !isActivitiesLoading
    && !isActivitiesError;

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    const activityId = Number(selectedActivityId);
    if (!Number.isFinite(activityId)) {
      return;
    }

    try {
      const result = await createMutation.mutateAsync({
        activityId,
        description,
      });

      showToast({
        title: formatMessage(messages.toastSubmittedTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.toastSubmittedDescription),
      });
      closeModal();
    } catch (error) {
      showToast({
        title: formatMessage(messages.createErrorTitle),
        description: error?.message || formatMessage(messages.createError),
      });
    }
  };

  const handleStatusAction = async (item, action) => {
    if (!item?.id || statusMutation.isPending) {
      return;
    }

    try {
      const result = await statusMutation.mutateAsync({ id: item.id, action });

      showToast({
        title: formatMessage(action === 'close' ? messages.toastClosedTitle : messages.toastReopenedTitle),
        description: hasDisplayValue(result.message) ? result.message : undefined,
      });
    } catch (error) {
      showToast({
        title: formatMessage(messages.statusErrorTitle),
        description: error?.message || formatMessage(messages.statusError),
      });
    }
  };

  const activityTrigger = selectedActivityLabel ? (
    selectedActivityLabel
  ) : (
    <span className="request-training-modal__placeholder">
      {formatMessage(messages.modalActivityPlaceholder)}
    </span>
  );

  const renderTableBody = () => {
    if (isListLoading || isFiltersLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.toolbarTable}
          tablePreset="requestedTrainings"
          rows={6}
          showFilter
        />
      );
    }

    if (isListError) {
      return (
        <div className="requested-trainings-page__empty">
          <EmptyState
            message={listErrorMessage || formatMessage(messages.listLoadError)}
            fullSize
          />
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="requested-trainings-page__empty">
          <EmptyState message={formatMessage(messages.empty)} fullSize />
        </div>
      );
    }

    return (
      <>
        <div className="requested-trainings-page__table-card">
          <div className="requested-trainings-page__table-wrap">
            <table className="requested-trainings-page__table">
              <thead>
                <tr className="requested-trainings-page__thead-row">
                  <th className="requested-trainings-page__th">{formatMessage(messages.tableActivity)}</th>
                  <th className="requested-trainings-page__th">{formatMessage(messages.tableStatus)}</th>
                  <th className="requested-trainings-page__th">{formatMessage(messages.tableFlags)}</th>
                  <th className="requested-trainings-page__th requested-trainings-page__th--right">
                    {formatMessage(messages.tableActions)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const rowKey = hasDisplayValue(item.id) ? String(item.id) : `requested-training-${item.activity}`;
                  const isClosed = item.status === 'closed';

                  return (
                    <tr className="requested-trainings-page__row" key={rowKey}>
                      <td className="requested-trainings-page__td">
                        {hasDisplayValue(item.activity) && (
                          <p className="requested-trainings-page__activity-title">{item.activity}</p>
                        )}
                        {hasDisplayValue(item.description) && (
                          <p className="requested-trainings-page__activity-desc">{item.description}</p>
                        )}
                      </td>
                      <td className="requested-trainings-page__td">
                        {hasDisplayValue(item.status) && (
                          <span className={`requested-trainings-page__pill ${isClosed ? 'requested-trainings-page__pill--closed' : ''}`}>
                            {renderStatusLabel(item.status)}
                          </span>
                        )}
                      </td>
                      <td className="requested-trainings-page__td">
                        {hasFlagsCount(item.flags) && (
                          <span className="requested-trainings-page__flag">
                            <FlagIcon className="h-3.5 w-3.5" />
                            {item.flags}
                          </span>
                        )}
                      </td>
                      <td className="requested-trainings-page__td requested-trainings-page__td--right">
                        {isClosed ? (
                          <button
                            type="button"
                            className="requested-trainings-page__outline-button"
                            disabled={statusMutation.isPending}
                            onClick={() => handleStatusAction(item, 'reopen')}
                          >
                            <CircleCheckIcon className="h-3.5 w-3.5" />
                            {formatMessage(messages.reopen)}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="requested-trainings-page__outline-button"
                            disabled={statusMutation.isPending}
                            onClick={() => handleStatusAction(item, 'close')}
                          >
                            <CircleXIcon className="h-3.5 w-3.5" />
                            {formatMessage(messages.close)}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <TablePaginationFooter
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            paginationLabel="Requested trainings pagination"
          />
        </div>
      </>
    );
  };

  return (
    <section className="requested-trainings-page">
      <div className="requested-trainings-page__toolbar">
        {canSearch && (
          <div className="requested-trainings-page__search">
            <SearchIcon className="requested-trainings-page__search-icon" />
            <input
              className="requested-trainings-page__search-input"
              placeholder={formatMessage(messages.searchPlaceholder)}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
            />
          </div>
        )}

        {canFilter && statusOptions.length > 0 && (
          <div className="requested-trainings-page__filter">
            <SearchableDropdown
              value={statusFilter}
              options={statusOptions}
              onChange={setStatusFilter}
              triggerLabel={filterTriggerLabel}
              searchPlaceholder={formatMessage(messages.filterPlaceholder)}
              noOptionsText={formatMessage(messages.empty)}
            />
          </div>
        )}

        {canRequestTraining && (
          <div className="requested-trainings-page__actions">
            <button
              type="button"
              className="requested-trainings-page__primary-button"
              onClick={() => setModalOpen(true)}
            >
              <PlusIcon className="h-4 w-4" />
              {formatMessage(messages.requestTraining)}
            </button>
          </div>
        )}
      </div>

      {renderTableBody()}

      {canRequestTraining && (
        <PopupDialog
          isOpen={modalOpen}
          title={formatMessage(messages.modalTitle)}
          onClose={closeModal}
          contentClassName="request-training-modal"
        >
          <p className="request-training-modal__description">{formatMessage(messages.modalDescription)}</p>

          {isActivitiesLoading ? (
            <SkeletonScreen variant={SKELETON_VARIANTS.card} />
          ) : (
            <>
              <div className="request-training-modal__field">
                <span className="request-training-modal__label">
                  {formatMessage(messages.modalActivityLabel)}
                  <span className="request-training-modal__required">*</span>
                </span>
                <SearchableDropdown
                  value={selectedActivityId}
                  options={activityOptions}
                  onChange={setSelectedActivityId}
                  triggerLabel={activityTrigger}
                  searchPlaceholder={formatMessage(messages.modalActivityPlaceholder)}
                  noOptionsText={formatMessage(messages.empty)}
                />
              </div>

              <div className="request-training-modal__field">
                <span className="request-training-modal__label">
                  {formatMessage(messages.modalDescriptionLabel)}
                  <span className="request-training-modal__required">*</span>
                </span>
                <textarea
                  className="request-training-modal__textarea"
                  rows={5}
                  value={description}
                  placeholder={formatMessage(messages.modalDescriptionPlaceholder)}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="request-training-modal__footer">
            <button
              type="button"
              className="request-training-modal__outline-button"
              onClick={closeModal}
            >
              {formatMessage(messages.cancel)}
            </button>
            <button
              type="button"
              className="request-training-modal__primary-button"
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              {formatMessage(messages.submit)}
            </button>
          </div>
        </PopupDialog>
      )}
    </section>
  );
};

export default RequestedTrainings;
