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
import initialSearnCountries from '../../mock/countries/searnCountries.json';
import messages from './messages';
import './Countries.scss';

const EarthIcon = ({ className }) => (
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
    <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
    <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
    <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

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

const Countries = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { componentAccess } = useUserRole();

  const canSearch = true;
  const canAddCountry = Boolean(componentAccess?.countries?.canAddCountry ?? false);
  const canEditCountry = Boolean(componentAccess?.countries?.canEditCountry ?? false);
  const canDeleteCountry = Boolean(componentAccess?.countries?.canDeleteCountry ?? false);

  const [countries, setCountries] = useState(initialSearnCountries);
  const [searchText, setSearchText] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCountryId, setEditingCountryId] = useState(null);
  /** Master catalog `value` (slug); maps to display `label` via `masterCountryOptions`. */
  const [selectedMasterValue, setSelectedMasterValue] = useState('');

  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredCountries = useMemo(() => {
    const trimmed = searchText.trim().toLowerCase();
    if (!trimmed) {
      return countries;
    }
    return countries.filter(item => item.label.toLowerCase().includes(trimmed));
  }, [countries, searchText]);

  const masterDropdownOptions = useMemo(() => (
    [...masterCountryOptions]
      .sort((a, b) => a.label.localeCompare(b.label))
      .map(({ value, label }) => ({ value, label }))
  ), []);

  const availableOptions = useMemo(() => {
    const existing = new Set(
      countries
        .filter(item => item.id !== editingCountryId)
        .map(item => item.label.toLowerCase()),
    );
    return masterDropdownOptions.filter(opt => !existing.has(opt.label.toLowerCase()));
  }, [countries, editingCountryId, masterDropdownOptions]);

  const openAdd = () => {
    setEditingCountryId(null);
    setSelectedMasterValue('');
    setModalOpen(true);
  };

  const openEdit = (country) => {
    setEditingCountryId(country.id);
    const master = masterCountryOptions.find(
      o => o.label.toLowerCase() === country.label.toLowerCase(),
    );
    setSelectedMasterValue(master?.value || '');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCountryId(null);
    setSelectedMasterValue('');
  };

  /** Local mock save. Real API: POST/PATCH body `{ country_name: "<master label>" }` (see .cursor/rules/countries-management-api.mdc). */
  const onSave = () => {
    const master = masterCountryOptions.find(o => o.value === selectedMasterValue);
    if (!master) {
      return;
    }
    const { label: nextLabel } = master;

    if (editingCountryId) {
      setCountries(prev => prev.map(item => (
        item.id === editingCountryId ? { ...item, label: nextLabel } : item
      )));
      showToast({
        title: formatMessage(messages.toastUpdatedTitle),
        description: formatMessage(messages.toastUpdatedDescription, { name: nextLabel }),
      });
      closeModal();
      return;
    }

    const newId = `cty-${Date.now()}`;
    const newItem = { id: newId, value: newId, label: nextLabel };
    setCountries(prev => [newItem, ...prev]);
    showToast({
      title: formatMessage(messages.toastAddedTitle),
      description: formatMessage(messages.toastAddedDescription, { name: nextLabel }),
    });
    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteTarget) {
      return;
    }

    const { id, label } = deleteTarget;
    setCountries(prev => prev.filter(item => item.id !== id));
    setDeleteTarget(null);
    showToast({
      title: formatMessage(messages.toastDeletedTitle),
      description: formatMessage(messages.toastDeletedDescription, { name: label }),
    });
  };

  const emptyState = (
    <div className="countries-page__empty">
      <EmptyState message={formatMessage(messages.empty)} fullSize />
    </div>
  );

  return (
    <section className="countries-page">
      <div className="countries-page__top">
        {canSearch && (
          <div className="countries-page__search">
            <SearchIcon className="countries-page__search-icon" />
            <input
              className="countries-page__search-input"
              placeholder={formatMessage(messages.searchPlaceholder)}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              type="text"
            />
          </div>
        )}

        {canAddCountry && (
          <button type="button" className="countries-page__primary-button" onClick={openAdd}>
            <PlusIcon className="h-4 w-4" />
            {formatMessage(messages.addCountry)}
          </button>
        )}
      </div>

      {filteredCountries.length === 0 ? (
        emptyState
      ) : (
        <div className="countries-page__grid">
          {filteredCountries.map(country => (
            <div className="countries-page__card" key={country.id}>
              <div className="countries-page__icon">
                <EarthIcon className="h-5 w-5" />
              </div>

              <div style={{ minWidth: 0, flex: 1 }}>
                <p className="countries-page__name" title={country.label}>{country.label}</p>
              </div>

              <div className="countries-page__actions">
                {canEditCountry && (
                  <button
                    type="button"
                    className="countries-page__icon-button"
                    aria-label={formatMessage(messages.editCountry)}
                    onClick={() => openEdit(country)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                )}
                {canDeleteCountry && (
                  <button
                    type="button"
                    className="countries-page__icon-button countries-page__icon-button--danger"
                    aria-label={formatMessage(messages.deleteCountry)}
                    onClick={() => setDeleteTarget(country)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <PopupDialog
        isOpen={modalOpen}
        title={formatMessage(editingCountryId ? messages.modalTitleEdit : messages.modalTitleAdd)}
        onClose={closeModal}
        contentClassName="countries-modal"
      >
        <p className="countries-modal__description">{formatMessage(messages.modalDescription)}</p>

        <div className="countries-modal__field">
          <span className="countries-modal__label">
            {formatMessage(messages.modalLabelCountry)}
            <span className="countries-modal__required">*</span>
          </span>

          <SearchableDropdown
            value={selectedMasterValue}
            options={availableOptions}
            onChange={setSelectedMasterValue}
            triggerLabel={(
              masterCountryOptions.find(o => o.value === selectedMasterValue)?.label
            ) || (
              <span className="countries-modal__placeholder">
                {formatMessage(messages.modalPlaceholderCountry)}
              </span>
            )}
            searchPlaceholder={formatMessage(messages.modalPlaceholderCountry)}
            noOptionsText={formatMessage(messages.empty)}
          />
        </div>

        <div className="countries-modal__actions">
          <button type="button" className="countries-modal__outline-button" onClick={closeModal}>
            {formatMessage(messages.modalCancel)}
          </button>
          <button
            type="button"
            className="countries-modal__primary-button"
            onClick={onSave}
            disabled={!selectedMasterValue.trim()}
          >
            {formatMessage(editingCountryId ? messages.modalConfirmEdit : messages.modalConfirmAdd)}
          </button>
        </div>
      </PopupDialog>

      <ConfirmActionDialog
        isOpen={Boolean(deleteTarget)}
        title={formatMessage(messages.confirmDeleteTitle)}
        description={formatMessage(messages.confirmDeleteDescription, { name: deleteTarget?.label || '' })}
        cancelLabel={formatMessage(messages.confirmDeleteCancel)}
        confirmLabel={formatMessage(messages.confirmDeleteConfirm)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </section>
  );
};

export default Countries;
