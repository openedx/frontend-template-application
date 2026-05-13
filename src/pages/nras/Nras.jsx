/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo, useState } from 'react';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import EmptyState from '../../components/emptyState/EmptyState';
import PopupDialog from '../../components/popupDialog/PopupDialog';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import searnCountries from '../../mock/countries/searnCountries.json';
import initialNras from '../../mock/nras/nras.json';
import messages from './messages';
import './Nras.scss';

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

const GlobeIcon = ({ className }) => (
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
    <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
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

const adminCountLabel = (count) => (count === 1 ? '1 admin' : `${count} admins`);

const Nras = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { componentAccess } = useUserRole();

  const canShowTable = true;
  const canSearch = true;
  const canOnboard = Boolean(componentAccess?.nrasManagement?.canOnboardNra ?? false);
  const canEdit = Boolean(componentAccess?.nrasManagement?.canEditNra ?? false);
  const canDelete = Boolean(componentAccess?.nrasManagement?.canDeleteNra ?? false);

  const [nras, setNras] = useState(initialNras);
  const [searchText, setSearchText] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingNraId, setEditingNraId] = useState(null);
  const [nraName, setNraName] = useState('');
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
    searnCountries.map(c => ({ value: c.label, label: c.label }))
  ), []);

  const filtered = useMemo(() => {
    const trimmed = searchText.trim().toLowerCase();
    if (!trimmed) {
      return nras;
    }
    return nras.filter(item => (
      item.name.toLowerCase().includes(trimmed)
      || item.country.toLowerCase().includes(trimmed)
    ));
  }, [nras, searchText]);

  const closeModal = () => {
    setModalOpen(false);
    setEditingNraId(null);
    setNraName('');
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
    setEditingNraId(null);
    setModalOpen(true);
  };

  const openEdit = (nra) => {
    setEditingNraId(nra.id);
    setNraName(nra.name);
    setCountry(nra.country);
    setAdmins(nra.admins || []);
    setModalOpen(true);
  };

  const addAdmin = () => {
    const name = adminDraftName.trim();
    const email = adminDraftEmail.trim();
    if (!name || !email) {
      return;
    }
    setAdmins(prev => [...prev, { id: `adm-${Date.now()}`, name, email }]);
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

  const onSaveNra = () => {
    const name = nraName.trim();
    const selectedCountry = country.trim();
    if (!name || !selectedCountry) {
      return;
    }

    if (editingNraId) {
      setNras(prev => prev.map(item => (item.id === editingNraId ? {
        ...item,
        name,
        country: selectedCountry,
        admins,
      } : item)));
      showToast({
        title: formatMessage(messages.toastUpdatedTitle),
        description: formatMessage(messages.toastUpdatedDescription, { name }),
      });
      closeModal();
      return;
    }

    const newItem = {
      id: `nra-${Date.now()}`,
      name,
      country: selectedCountry,
      admins,
    };
    setNras(prev => [newItem, ...prev]);
    showToast({
      title: formatMessage(messages.toastOnboardedTitle),
      description: formatMessage(messages.toastOnboardedDescription, { name }),
    });
    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteTarget) {
      return;
    }
    const { id, name } = deleteTarget;
    setNras(prev => prev.filter(item => item.id !== id));
    setDeleteTarget(null);
    showToast({
      title: formatMessage(messages.toastDeletedTitle),
      description: formatMessage(messages.toastDeletedDescription, { name }),
    });
  };

  const emptyState = (
    <div className="nras-page__empty">
      <EmptyState message={formatMessage(messages.empty)} fullSize />
    </div>
  );

  const modalCountryTrigger = country || (
    <span className="nras-modal__placeholder">
      {formatMessage(messages.fieldCountryPlaceholder)}
    </span>
  );

  const canSubmit = Boolean(nraName.trim() && country.trim());
  const canAddAdmin = Boolean(adminDraftName.trim() && adminDraftEmail.trim());
  const isEditing = Boolean(editingNraId);

  return (
    <section className="nras-page">
      <div className="nras-page__toolbar">
        {canSearch && (
          <div className="nras-page__search">
            <SearchIcon className="nras-page__search-icon" />
            <input
              className="nras-page__search-input"
              placeholder={formatMessage(messages.searchPlaceholder)}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              type="text"
            />
          </div>
        )}

        {canOnboard && (
          <button type="button" className="nras-page__primary-button" onClick={openAdd}>
            <PlusIcon className="h-4 w-4" />
            {formatMessage(messages.onboardButton)}
          </button>
        )}
      </div>

      {(!canShowTable || filtered.length === 0) ? (
        emptyState
      ) : (
        <div className="nras-page__table-card">
          <div className="nras-page__table-wrap">
            <table className="nras-page__table">
              <thead>
                <tr className="nras-page__thead-row">
                  <th className="nras-page__th">{formatMessage(messages.tableName)}</th>
                  <th className="nras-page__th">{formatMessage(messages.tableAdmins)}</th>
                  <th className="nras-page__th nras-page__th--right">{formatMessage(messages.tableActions)}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(nra => (
                  <tr className="nras-page__tr" key={nra.id}>
                    <td className="nras-page__td">
                      <div className="nras-page__name-cell">
                        <div className="nras-page__badge-icon">
                          <GlobeIcon className="h-4 w-4" />
                        </div>
                        <span className="nras-page__name" title={nra.name}>{nra.name}</span>
                      </div>
                    </td>
                    <td className="nras-page__td">{adminCountLabel((nra.admins || []).length)}</td>
                    <td className="nras-page__td nras-page__td--right">
                      <div className="nras-page__actions">
                        {canEdit && (
                          <button
                            type="button"
                            className="nras-page__icon-button"
                            aria-label={formatMessage(messages.edit)}
                            onClick={(e) => {
                              e.stopPropagation();
                              openEdit(nra);
                            }}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        )}
                        {canDelete && (
                          <button
                            type="button"
                            className="nras-page__icon-button nras-page__icon-button--danger"
                            aria-label={formatMessage(messages.delete)}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteTarget(nra);
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
        contentClassName="nras-modal"
      >
        <p className="nras-modal__description">{formatMessage(messages.modalDescription)}</p>

        <div className="nras-modal__fields">
          <div className="nras-modal__field">
            <span className="nras-modal__label">{formatMessage(messages.fieldNameLabel)}</span>
            <input
              className="nras-modal__input"
              placeholder={formatMessage(messages.fieldNamePlaceholder)}
              value={nraName}
              onChange={e => setNraName(e.target.value)}
              type="text"
            />
          </div>

          <div className="nras-modal__field">
            <span className="nras-modal__label">{formatMessage(messages.fieldCountryLabel)}</span>
            <SearchableDropdown
              value={country}
              options={countryOptions}
              onChange={setCountry}
              triggerLabel={modalCountryTrigger}
              searchPlaceholder={formatMessage(messages.fieldCountryPlaceholder)}
              noOptionsText={formatMessage(messages.empty)}
            />
          </div>

          <div className="nras-modal__field">
            <span className="nras-modal__label">{formatMessage(messages.sectionAdmins)}</span>

            <div className="nras-modal__admins">
              {admins.map(admin => {
                const isAdminEditing = editingAdminId === admin.id;
                return (
                  <div className="nras-modal__admin-card" key={admin.id}>
                    {isAdminEditing ? (
                      <>
                        <div className="nras-modal__admin-edit">
                          <input
                            className="nras-modal__input"
                            placeholder="Name"
                            value={editingAdminName}
                            onChange={e => setEditingAdminName(e.target.value)}
                            type="text"
                          />
                          <input
                            className="nras-modal__input"
                            placeholder="Email"
                            value={editingAdminEmail}
                            onChange={e => setEditingAdminEmail(e.target.value)}
                            type="email"
                          />
                        </div>
                        <div className="nras-modal__admin-actions">
                          <button
                            type="button"
                            className="nras-page__icon-button"
                            aria-label="Save admin"
                            onClick={saveEditAdmin}
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="nras-page__icon-button"
                            aria-label="Cancel edit"
                            onClick={cancelEditAdmin}
                          >
                            <XIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="nras-modal__admin-display">
                          <p className="nras-modal__admin-name" title={admin.name}>{admin.name}</p>
                          <p className="nras-modal__admin-email" title={admin.email}>{admin.email}</p>
                        </div>
                        <div className="nras-modal__admin-actions">
                          <button
                            type="button"
                            className="nras-page__icon-button"
                            aria-label="Edit admin"
                            onClick={() => startEditAdmin(admin)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="nras-page__icon-button nras-page__icon-button--danger"
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

              <div className="nras-modal__add-row">
                <input
                  className="nras-modal__input"
                  placeholder={formatMessage(messages.adminNamePlaceholder)}
                  value={adminDraftName}
                  onChange={e => setAdminDraftName(e.target.value)}
                  type="text"
                />
                <input
                  className="nras-modal__input"
                  placeholder={formatMessage(messages.adminEmailPlaceholder)}
                  value={adminDraftEmail}
                  onChange={e => setAdminDraftEmail(e.target.value)}
                  type="email"
                />
                <button
                  type="button"
                  className="nras-modal__add-admin-button"
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

        <div className="nras-modal__footer">
          <button type="button" className="nras-modal__outline-button" onClick={closeModal}>
            {formatMessage(messages.cancel)}
          </button>
          <button
            type="button"
            className="nras-modal__confirm-button"
            onClick={onSaveNra}
            disabled={!canSubmit}
          >
            {formatMessage(isEditing ? messages.save : messages.onboard)}
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
        onConfirm={confirmDelete}
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

export default Nras;
