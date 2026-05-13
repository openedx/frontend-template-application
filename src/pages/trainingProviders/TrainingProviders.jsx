/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo, useState } from 'react';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import EmptyState from '../../components/emptyState/EmptyState';
import PopupDialog from '../../components/popupDialog/PopupDialog';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import masterCountryOptions from '../../mock/countries/masterCountryOptions.json';
import initialProviders from '../../mock/trainingProviders/providers.json';
import messages from './messages';
import './TrainingProviders.scss';

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

const BuildingIcon = ({ className }) => (
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
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);

const MailIcon = ({ className }) => (
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
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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

const TrashIcon = ({ className }) => (
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
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);

const CheckIcon = ({ className }) => (
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
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const XIcon = ({ className }) => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const TrainingProviders = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { componentAccess } = useUserRole();

  const canShowTable = true;
  const canSearch = true;
  const canAdd = Boolean(componentAccess?.trainingProviders?.canAddTrainingProvider ?? false);
  const canEdit = Boolean(componentAccess?.trainingProviders?.canEditTrainingProvider ?? false);
  const canDelete = Boolean(componentAccess?.trainingProviders?.canDeleteTrainingProvider ?? false);

  const [providers, setProviders] = useState(initialProviders);
  const [searchText, setSearchText] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProviderId, setEditingProviderId] = useState(null);
  const [orgName, setOrgName] = useState('');
  const [country, setCountry] = useState('');
  const [admins, setAdmins] = useState([]);

  const [adminDraftName, setAdminDraftName] = useState('');
  const [adminDraftEmail, setAdminDraftEmail] = useState('');

  const [editingAdminId, setEditingAdminId] = useState(null);
  const [editingAdminName, setEditingAdminName] = useState('');
  const [editingAdminEmail, setEditingAdminEmail] = useState('');

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [adminDeleteTarget, setAdminDeleteTarget] = useState(null);

  const countryOptions = useMemo(() => (
    [...masterCountryOptions]
      .sort((a, b) => a.label.localeCompare(b.label))
      .map(({ label }) => ({ value: label, label }))
  ), []);

  const filtered = useMemo(() => {
    const trimmed = searchText.trim().toLowerCase();
    if (!trimmed) {
      return providers;
    }
    return providers.filter(p => (
      p.name.toLowerCase().includes(trimmed)
      || (p.email || '').toLowerCase().includes(trimmed)
      || (p.country || '').toLowerCase().includes(trimmed)
    ));
  }, [providers, searchText]);

  const closeModal = () => {
    setModalOpen(false);
    setEditingProviderId(null);
    setOrgName('');
    setCountry('');
    setAdmins([]);
    setAdminDraftName('');
    setAdminDraftEmail('');
    setEditingAdminId(null);
    setEditingAdminName('');
    setEditingAdminEmail('');
    setAdminDeleteTarget(null);
  };

  const openAdd = () => {
    setEditingProviderId(null);
    setModalOpen(true);
  };

  const openEdit = (provider) => {
    setEditingProviderId(provider.id);
    setOrgName(provider.name);
    setCountry(provider.country || '');
    setAdmins(provider.admins || []);
    setModalOpen(true);
  };

  const addAdmin = () => {
    const name = adminDraftName.trim();
    const email = adminDraftEmail.trim();
    if (!name || !email) {
      return;
    }
    setAdmins(prev => [...prev, { id: `tpa-${Date.now()}`, name, email }]);
    setAdminDraftName('');
    setAdminDraftEmail('');
  };

  const startEditAdmin = (admin) => {
    setEditingAdminId(admin.id);
    setEditingAdminName(admin.name);
    setEditingAdminEmail(admin.email);
  };

  const cancelEditAdmin = () => {
    setEditingAdminId(null);
    setEditingAdminName('');
    setEditingAdminEmail('');
  };

  const saveEditAdmin = () => {
    const name = editingAdminName.trim();
    const email = editingAdminEmail.trim();
    if (!editingAdminId || !name || !email) {
      return;
    }
    setAdmins(prev => prev.map(a => (a.id === editingAdminId ? {
      ...a, name, email,
    } : a)));
    cancelEditAdmin();
  };

  const requestDeleteAdmin = (admin) => {
    setAdminDeleteTarget(admin);
  };

  const confirmDeleteAdmin = () => {
    if (!adminDeleteTarget) {
      return;
    }
    const { id, name } = adminDeleteTarget;
    setAdmins(prev => prev.filter(a => a.id !== id));
    setAdminDeleteTarget(null);
    if (editingAdminId === id) {
      cancelEditAdmin();
    }
    showToast({
      title: formatMessage(messages.toastAdminDeletedTitle),
      description: formatMessage(messages.toastAdminDeletedDescription, { name }),
    });
  };

  const onSaveProvider = () => {
    const name = orgName.trim();
    if (!name) {
      return;
    }

    if (editingProviderId) {
      setProviders(prev => prev.map(p => (p.id === editingProviderId ? {
        ...p,
        name,
        country,
        admins,
      } : p)));
      showToast({
        title: formatMessage(messages.toastUpdatedTitle),
        description: formatMessage(messages.toastUpdatedDescription, { name }),
      });
      closeModal();
      return;
    }

    const newItem = {
      id: `tp-${Date.now()}`,
      name,
      country,
      email: '',
      courses: 0,
      admins,
    };
    setProviders(prev => [newItem, ...prev]);
    showToast({
      title: formatMessage(messages.toastAddedTitle),
      description: formatMessage(messages.toastAddedDescription, { name }),
    });
    closeModal();
  };

  const confirmDeleteProvider = () => {
    if (!deleteTarget) {
      return;
    }
    const { id, name } = deleteTarget;
    setProviders(prev => prev.filter(p => p.id !== id));
    setDeleteTarget(null);
    showToast({
      title: formatMessage(messages.toastDeletedTitle),
      description: formatMessage(messages.toastDeletedDescription, { name }),
    });
  };

  const isEditing = Boolean(editingProviderId);
  const canSubmit = Boolean(orgName.trim());
  const canAddAdmin = Boolean(adminDraftName.trim() && adminDraftEmail.trim());

  const modalCountryTrigger = country || (
    <span className="training-providers-modal__placeholder">
      {formatMessage(messages.countryPlaceholder)}
    </span>
  );

  const emptyState = (
    <div className="training-providers-page__empty">
      <EmptyState message={formatMessage(messages.empty)} fullSize />
    </div>
  );

  return (
    <section className="training-providers-page">
      <div className="training-providers-page__toolbar">
        {canSearch && (
          <div className="training-providers-page__search">
            <SearchIcon className="training-providers-page__search-icon" />
            <input
              className="training-providers-page__search-input"
              placeholder={formatMessage(messages.searchPlaceholder)}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              type="text"
            />
          </div>
        )}

        {canAdd && (
          <button type="button" className="training-providers-page__primary-button" onClick={openAdd}>
            <PlusIcon className="h-4 w-4" />
            {formatMessage(messages.addProvider)}
          </button>
        )}
      </div>

      {(!canShowTable || filtered.length === 0) ? (
        emptyState
      ) : (
        <div className="training-providers-page__table-card">
          <div className="training-providers-page__table-wrap">
            <table className="training-providers-page__table">
              <thead>
                <tr className="training-providers-page__thead-row">
                  <th className="training-providers-page__th">{formatMessage(messages.tableProvider)}</th>
                  <th className="training-providers-page__th training-providers-page__th--center">
                    {formatMessage(messages.tableAdmins)}
                  </th>
                  <th className="training-providers-page__th training-providers-page__th--center">
                    {formatMessage(messages.tableCourses)}
                  </th>
                  <th className="training-providers-page__th training-providers-page__th--right">
                    {formatMessage(messages.tableActions)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(provider => (
                  <tr className="training-providers-page__tbody-row" key={provider.id}>
                    <td className="training-providers-page__td">
                      <div className="training-providers-page__provider-cell">
                        <div className="training-providers-page__provider-icon">
                          <BuildingIcon className="h-5 w-5" />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p className="training-providers-page__provider-name">{provider.name}</p>
                          {provider.email && (
                            <p className="training-providers-page__provider-email">
                              <MailIcon className="h-3 w-3" />
                              {provider.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="training-providers-page__td training-providers-page__td--center">
                      {(provider.admins || []).length}
                    </td>
                    <td className="training-providers-page__td training-providers-page__td--center">
                      {provider.courses ?? 0}
                    </td>
                    <td className="training-providers-page__td training-providers-page__td--right">
                      <div className="training-providers-page__row-actions">
                        {canEdit && (
                          <button
                            type="button"
                            className="training-providers-page__icon-button"
                            aria-label={formatMessage(messages.edit)}
                            onClick={(e) => {
                              e.stopPropagation();
                              openEdit(provider);
                            }}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        )}
                        {canDelete && (
                          <button
                            type="button"
                            className="training-providers-page__icon-button training-providers-page__icon-button--danger"
                            aria-label={formatMessage(messages.delete)}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteTarget(provider);
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <PopupDialog
        isOpen={modalOpen}
        title={formatMessage(isEditing ? messages.modalTitleEdit : messages.modalTitleAdd)}
        onClose={closeModal}
        contentClassName="training-providers-modal"
      >
        <p className="training-providers-modal__description">{formatMessage(messages.modalDescription)}</p>

        <div className="training-providers-modal__fields">
          <div className="training-providers-modal__field">
            <span className="training-providers-modal__label">
              {formatMessage(messages.orgNameLabel)}
              <span className="training-providers-modal__required">*</span>
            </span>
            <input
              className="training-providers-modal__input"
              placeholder={formatMessage(messages.orgNamePlaceholder)}
              value={orgName}
              onChange={e => setOrgName(e.target.value)}
              type="text"
            />
          </div>

          <div className="training-providers-modal__field">
            <span className="training-providers-modal__label">{formatMessage(messages.countryLabel)}</span>
            <SearchableDropdown
              value={country}
              options={countryOptions}
              onChange={setCountry}
              triggerLabel={modalCountryTrigger}
              searchPlaceholder={formatMessage(messages.countryPlaceholder)}
              noOptionsText={formatMessage(messages.empty)}
            />
          </div>

          <div className="training-providers-modal__field">
            <span className="training-providers-modal__label">{formatMessage(messages.adminsLabel)}</span>

            <div className="training-providers-modal__admins">
              {admins.map(admin => {
                const isAdminEditing = editingAdminId === admin.id;
                return (
                  <div className="training-providers-modal__admin-card" key={admin.id}>
                    {isAdminEditing ? (
                      <>
                        <div style={{
                          flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '.5rem',
                        }}
                        >
                          <input
                            className="training-providers-modal__input"
                            placeholder="Name"
                            value={editingAdminName}
                            onChange={e => setEditingAdminName(e.target.value)}
                            type="text"
                          />
                          <input
                            className="training-providers-modal__input"
                            placeholder="Email"
                            value={editingAdminEmail}
                            onChange={e => setEditingAdminEmail(e.target.value)}
                            type="email"
                          />
                        </div>
                        <div className="training-providers-modal__admin-actions">
                          <button
                            type="button"
                            className="training-providers-page__icon-button"
                            aria-label="Save admin"
                            onClick={saveEditAdmin}
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="training-providers-page__icon-button"
                            aria-label="Cancel edit"
                            onClick={cancelEditAdmin}
                          >
                            <XIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="training-providers-modal__admin-display">
                          <p className="training-providers-modal__admin-name" title={admin.name}>{admin.name}</p>
                          <p className="training-providers-modal__admin-email" title={admin.email}>{admin.email}</p>
                        </div>
                        <div className="training-providers-modal__admin-actions">
                          <button
                            type="button"
                            className="training-providers-page__icon-button"
                            aria-label="Edit admin"
                            onClick={() => startEditAdmin(admin)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="training-providers-page__icon-button training-providers-page__icon-button--danger"
                            aria-label="Delete admin"
                            onClick={() => requestDeleteAdmin(admin)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              <div className="training-providers-modal__add-row">
                <input
                  className="training-providers-modal__input"
                  placeholder={formatMessage(messages.adminNamePlaceholder)}
                  value={adminDraftName}
                  onChange={e => setAdminDraftName(e.target.value)}
                  type="text"
                />
                <input
                  className="training-providers-modal__input"
                  placeholder={formatMessage(messages.adminEmailPlaceholder)}
                  value={adminDraftEmail}
                  onChange={e => setAdminDraftEmail(e.target.value)}
                  type="email"
                />
                <button
                  type="button"
                  className="training-providers-modal__add-admin-button"
                  onClick={addAdmin}
                  disabled={!canAddAdmin}
                >
                  <PlusIcon className="h-4 w-4" />
                  {formatMessage(messages.addAdmin)}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="training-providers-modal__footer">
          <button type="button" className="training-providers-modal__outline-button" onClick={closeModal}>
            {formatMessage(messages.cancel)}
          </button>
          <button
            type="button"
            className="training-providers-modal__confirm-button"
            onClick={onSaveProvider}
            disabled={!canSubmit}
          >
            {formatMessage(isEditing ? messages.confirmSave : messages.confirmAdd)}
          </button>
        </div>
      </PopupDialog>

      <ConfirmActionDialog
        isOpen={Boolean(deleteTarget)}
        title={formatMessage(messages.confirmDeleteTitle)}
        description={formatMessage(messages.confirmDeleteDescription, { name: deleteTarget?.name || '' })}
        cancelLabel={formatMessage(messages.confirmDeleteCancel)}
        confirmLabel={formatMessage(messages.confirmDeleteConfirm)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDeleteProvider}
      />

      <ConfirmActionDialog
        isOpen={Boolean(adminDeleteTarget)}
        title={formatMessage(messages.confirmDeleteAdminTitle)}
        description={formatMessage(messages.confirmDeleteAdminDescription, { name: adminDeleteTarget?.name || '' })}
        cancelLabel={formatMessage(messages.confirmDeleteCancel)}
        confirmLabel={formatMessage(messages.confirmDeleteConfirm)}
        onCancel={() => setAdminDeleteTarget(null)}
        onConfirm={confirmDeleteAdmin}
      />
    </section>
  );
};

export default TrainingProviders;
