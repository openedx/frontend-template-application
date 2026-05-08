/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../components/emptyState/EmptyState';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { useUserRole } from '../../contexts/UserRoleContext';
import requestTypes from '../../mock/pendingRequests/requestTypes.json';
import pendingRequests from '../../mock/pendingRequests/pendingRequests.json';
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
  return 'pending-requests-page__status-pill--approved';
};

const PendingRequests = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { componentAccess } = useUserRole();

  const canEditPendingRequest = Boolean(componentAccess?.pendingRequests?.canEditPendingRequest);
  const canShowTable = true;
  const canSearch = true;
  const canFilter = true;

  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const typeOptions = useMemo(() => requestTypes, []);

  const filtered = useMemo(() => {
    const trimmed = searchText.trim().toLowerCase();
    return pendingRequests.filter(item => {
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      if (!matchesType) return false;
      if (!trimmed) return true;
      return (
        item.title.toLowerCase().includes(trimmed)
        || item.subtitle.toLowerCase().includes(trimmed)
        || item.type.toLowerCase().includes(trimmed)
      );
    });
  }, [searchText, typeFilter]);

  const emptyState = (
    <div className="pending-requests-page__empty">
      <EmptyState message={formatMessage(messages.empty)} fullSize />
    </div>
  );

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
              onChange={e => setSearchText(e.target.value)}
              type="text"
            />
          </div>
        )}

        {canFilter && (
          <div className="pending-requests-page__filter">
            <SearchableDropdown
              value={typeFilter}
              options={typeOptions}
              onChange={setTypeFilter}
              triggerLabel={typeOptions.find(o => o.value === typeFilter)?.label || formatMessage(messages.filterPlaceholder)}
              searchPlaceholder={formatMessage(messages.filterPlaceholder)}
              noOptionsText={formatMessage(messages.empty)}
            />
          </div>
        )}
      </div>

      {(!canShowTable || filtered.length === 0) ? (
        emptyState
      ) : (
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
                {filtered.map(item => (
                  <tr
                    className={[
                      'pending-requests-page__row',
                      canEditPendingRequest ? 'pending-requests-page__row--clickable' : '',
                    ].filter(Boolean).join(' ')}
                    key={item.id}
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
                          <p className="pending-requests-page__title">{item.title}</p>
                          <p className="pending-requests-page__subtitle">{item.subtitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="pending-requests-page__td">{item.type}</td>
                    <td className="pending-requests-page__td pending-requests-page__td--center">
                      <span className={`pending-requests-page__status-pill ${statusClass(item.status)}`}>
                        {item.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    </td>
                    <td className="pending-requests-page__td">{item.submittedRelative}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default PendingRequests;

