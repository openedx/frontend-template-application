/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo, useState } from 'react';
import EmptyState from '../../components/emptyState/EmptyState';
import PopupDialog from '../../components/popupDialog/PopupDialog';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { useToast } from '../../components/toast/ToastProvider';
import statusOptions from '../../mock/requestedTrainings/statusOptions.json';
import requestedTrainings from '../../mock/requestedTrainings/requestedTrainings.json';
import activities from '../../mock/activities/activities.json';
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

const ChevronDownIcon = ({ className }) => (
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
    <path d="m6 9 6 6 6-6" />
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

const RequestedTrainings = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const canShowTable = true;
  const canSearch = true;
  const canFilter = true;
  const canRequestTraining = true;

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [description, setDescription] = useState('');

  const activityOptions = useMemo(() => {
    const unique = [...new Set(activities.map(a => a.activity).filter(Boolean))].sort();
    return unique.map(a => ({ value: a, label: a }));
  }, []);

  const filtered = useMemo(() => {
    const trimmed = searchText.trim().toLowerCase();
    return requestedTrainings.filter(item => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      if (!matchesStatus) return false;
      if (!trimmed) return true;
      return (
        item.activity.toLowerCase().includes(trimmed)
        || item.description.toLowerCase().includes(trimmed)
      );
    });
  }, [searchText, statusFilter]);

  const emptyState = (
    <div className="requested-trainings-page__empty">
      <EmptyState message={formatMessage(messages.empty)} fullSize />
    </div>
  );

  const activityTrigger = selectedActivity ? selectedActivity : (
    <span className="request-training-modal__placeholder">
      {formatMessage(messages.modalActivityPlaceholder)}
    </span>
  );

  const canSubmit = Boolean(selectedActivity && description.trim());

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
              onChange={e => setSearchText(e.target.value)}
              type="text"
            />
          </div>
        )}

        {canFilter && (
          <div className="requested-trainings-page__filter">
            <SearchableDropdown
              value={statusFilter}
              options={statusOptions}
              onChange={setStatusFilter}
              triggerLabel={statusOptions.find(o => o.value === statusFilter)?.label || formatMessage(messages.filterPlaceholder)}
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

      {!canShowTable ? (
        emptyState
      ) : filtered.length === 0 ? (
        emptyState
      ) : (
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
                {filtered.map(item => (
                  <tr className="requested-trainings-page__row" key={item.id}>
                    <td className="requested-trainings-page__td">
                      <p className="requested-trainings-page__activity-title">{item.activity}</p>
                      <p className="requested-trainings-page__activity-desc">{item.description}</p>
                    </td>
                    <td className="requested-trainings-page__td">
                      <span className={`requested-trainings-page__pill ${item.status === 'closed' ? 'requested-trainings-page__pill--closed' : ''}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="requested-trainings-page__td">
                      <span className="requested-trainings-page__flag">
                        <FlagIcon className="h-3.5 w-3.5" />
                        {item.flags}
                      </span>
                    </td>
                    <td className="requested-trainings-page__td requested-trainings-page__td--right">
                      {item.status === 'closed' ? (
                        <button type="button" className="requested-trainings-page__outline-button">
                          <CircleCheckIcon className="h-3.5 w-3.5" />
                          {formatMessage(messages.reopen)}
                        </button>
                      ) : (
                        <button type="button" className="requested-trainings-page__outline-button">
                          <CircleXIcon className="h-3.5 w-3.5" />
                          {formatMessage(messages.close)}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {canRequestTraining && (
        <PopupDialog
          isOpen={modalOpen}
          title={formatMessage(messages.modalTitle)}
          onClose={() => {
            setModalOpen(false);
            setSelectedActivity('');
            setDescription('');
          }}
          contentClassName="request-training-modal"
        >
          <p className="request-training-modal__description">{formatMessage(messages.modalDescription)}</p>

          <div className="request-training-modal__field">
            <span className="request-training-modal__label">
              {formatMessage(messages.modalActivityLabel)}
              <span className="request-training-modal__required">*</span>
            </span>
            <SearchableDropdown
              value={selectedActivity}
              options={activityOptions}
              onChange={setSelectedActivity}
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
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="request-training-modal__footer">
            <button
              type="button"
              className="request-training-modal__outline-button"
              onClick={() => {
                setModalOpen(false);
                setSelectedActivity('');
                setDescription('');
              }}
            >
              {formatMessage(messages.cancel)}
            </button>
            <button
              type="button"
              className="request-training-modal__primary-button"
              disabled={!canSubmit}
              onClick={() => {
                showToast({
                  title: formatMessage(messages.toastSubmittedTitle),
                  description: formatMessage(messages.toastSubmittedDescription),
                });
                setModalOpen(false);
                setSelectedActivity('');
                setDescription('');
              }}
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

