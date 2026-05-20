/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../../components/emptyState';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { TablePaginationFooter } from '../../components/dataTable';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import usePendingRequestFilters from '../../hooks/pendingRequests/usePendingRequestFilters';
import usePendingRequestsList from '../../hooks/pendingRequests/usePendingRequestsList';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import './PendingRequests.scss';

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

const InboxIcon = ({ className }) => (
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
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const PencilIcon = ({ className }) => (
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
    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    <path d="m15 5 4 4" />
  </svg>
);

const statusClass = (status) => {
  if (status === 'approved') return 'pending-requests-page__status-pill--approved';
  if (status === 'rejected') return 'pending-requests-page__status-pill--rejected';
  if (status === 'closed') return 'pending-requests-page__status-pill--closed';
  return 'pending-requests-page__status-pill--pending';
};

const PendingRequests = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { componentAccess } = useUserRole();

  const canEditPendingRequest = Boolean(componentAccess?.pendingRequests?.canEditPendingRequest);
  const canShowTable = true;
  const canSearch = true;
  const canFilter = true;

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const {
    dropdownOptions: typeOptions,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
    errorMessage: filtersErrorMessage,
  } = usePendingRequestFilters({ enabled: canFilter });

  const {
    items,
    totalPages,
    isLoading: isListLoading,
    isError: isListError,
    errorMessage: listErrorMessage,
  } = usePendingRequestsList({
    page,
    search: searchQuery,
    type: typeFilter,
    enabled: canShowTable,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchText.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, typeFilter]);

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

  const statusLabel = useMemo(() => ({
    pending: formatMessage(messages.statusPending),
    approved: formatMessage(messages.statusApproved),
    rejected: formatMessage(messages.statusRejected),
    closed: formatMessage(messages.statusClosed),
  }), [formatMessage]);

  const filterTriggerLabel = useMemo(() => {
    const match = typeOptions.find((option) => option.value === typeFilter);
    return match?.label || formatMessage(messages.filterPlaceholder);
  }, [formatMessage, typeFilter, typeOptions]);

  const renderStatusLabel = (status) => {
    if (!hasDisplayValue(status)) {
      return null;
    }

    const normalized = String(status).toLowerCase();
    return statusLabel[normalized] || status;
  };

  const renderTableBody = () => {
    if (isListLoading || isFiltersLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.toolbarTable}
          tablePreset="pendingRequests"
          rows={6}
          showFilter
        />
      );
    }

    if (isListError) {
      return (
        <div className="pending-requests-page__empty">
          <EmptyState
            message={listErrorMessage || formatMessage(messages.listLoadError)}
            fullSize
          />
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="pending-requests-page__empty">
          <EmptyState message={formatMessage(messages.empty)} fullSize />
        </div>
      );
    }

    return (
      <>
        <div className="pending-requests-page__table-card">
          <div className="pending-requests-page__table-wrap">
            <table className="pending-requests-page__table">
              <thead>
                <tr className="pending-requests-page__thead-row">
                  <th className="pending-requests-page__th">{formatMessage(messages.tableRequest)}</th>
                  <th className="pending-requests-page__th">{formatMessage(messages.tableType)}</th>
                  <th className="pending-requests-page__th pending-requests-page__th--center">{formatMessage(messages.tableStatus)}</th>
                  <th className="pending-requests-page__th">{formatMessage(messages.tableSubmitted)}</th>
                  {canEditPendingRequest && (
                    <th className="pending-requests-page__th pending-requests-page__th--right">{formatMessage(messages.tableActions)}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const rowKey = hasDisplayValue(item.id) ? String(item.id) : `pending-request-${item.title}`;

                  return (
                    <tr
                      className={[
                        'pending-requests-page__row',
                        canEditPendingRequest ? 'pending-requests-page__row--clickable' : '',
                      ].filter(Boolean).join(' ')}
                      key={rowKey}
                      onClick={canEditPendingRequest ? () => navigate(`/admin/pending-requests/${item.id}`) : undefined}
                      role={canEditPendingRequest ? 'button' : undefined}
                      tabIndex={canEditPendingRequest ? 0 : undefined}
                      onKeyDown={canEditPendingRequest ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate(`/admin/pending-requests/${item.id}`);
                        }
                      } : undefined}
                    >
                      <td className="pending-requests-page__td">
                        <div className="pending-requests-page__request-cell">
                          <div className="pending-requests-page__icon-box">
                            <InboxIcon className="h-5 w-5" />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            {hasDisplayValue(item.title) && (
                              <p className="pending-requests-page__title">{item.title}</p>
                            )}
                            {hasDisplayValue(item.subtitle) && (
                              <p className="pending-requests-page__subtitle">{item.subtitle}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="pending-requests-page__td">
                        {hasDisplayValue(item.type) ? item.type : null}
                      </td>
                      <td className="pending-requests-page__td pending-requests-page__td--center">
                        {hasDisplayValue(item.status) && (
                          <span className={`pending-requests-page__status-pill ${statusClass(item.status)}`}>
                            {renderStatusLabel(item.status)}
                          </span>
                        )}
                      </td>
                      <td className="pending-requests-page__td">
                        {hasDisplayValue(item.submittedRelative) ? item.submittedRelative : null}
                      </td>
                      {canEditPendingRequest && (
                        <td className="pending-requests-page__td pending-requests-page__td--right">
                          <button
                            type="button"
                            className="pending-requests-page__icon-button"
                            aria-label={formatMessage(messages.viewRequest)}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/pending-requests/${item.id}`);
                            }}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        </td>
                      )}
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
            paginationLabel="Pending requests pagination"
          />
        </div>
      </>
    );
  };

  return (
    <section className="pending-requests-page">
      <div className="pending-requests-page__toolbar">
        {canSearch && (
          <div className="pending-requests-page__search">
            <SearchIcon className="pending-requests-page__search-icon" />
            <input
              className="pending-requests-page__search-input"
              placeholder={formatMessage(messages.searchPlaceholder)}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
            />
          </div>
        )}

        {canFilter && typeOptions.length > 0 && (
          <div className="pending-requests-page__filter">
            <SearchableDropdown
              value={typeFilter}
              options={typeOptions}
              onChange={setTypeFilter}
              triggerLabel={filterTriggerLabel}
              searchPlaceholder={formatMessage(messages.filterPlaceholder)}
              noOptionsText={formatMessage(messages.empty)}
            />
          </div>
        )}
      </div>

      {renderTableBody()}
    </section>
  );
};

export default PendingRequests;
