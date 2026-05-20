/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useMemo, useState } from 'react';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import { EmptyState } from '../../components/emptyState';
import PopupDialog from '../../components/popupDialog/PopupDialog';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import useCountriesList from '../../hooks/countries/useCountriesList';
import useCountrySearnStatusMutation from '../../hooks/countries/useCountrySearnStatusMutation';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
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
  const canDeleteCountry = Boolean(componentAccess?.countries?.canDeleteCountry ?? false);

  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const {
    items: searnCountries,
    isLoading: isSearnCountriesLoading,
    isError: isSearnCountriesError,
    errorMessage: searnCountriesErrorMessage,
  } = useCountriesList({
    isSearnCountry: true,
    search: searchQuery,
  });

  const {
    items: allCountries,
    isLoading: isAllCountriesLoading,
    isError: isAllCountriesError,
    errorMessage: allCountriesErrorMessage,
  } = useCountriesList({
    isSearnCountry: false,
    enabled: modalOpen,
  });

  const patchCountryMutation = useCountrySearnStatusMutation();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchText.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (!isSearnCountriesError) {
      return;
    }

    showToast({
      title: formatMessage(messages.listErrorTitle),
      description: searnCountriesErrorMessage || formatMessage(messages.listLoadError),
    });
  }, [formatMessage, isSearnCountriesError, searnCountriesErrorMessage, showToast]);

  useEffect(() => {
    if (!modalOpen || !isAllCountriesError) {
      return;
    }

    showToast({
      title: formatMessage(messages.catalogErrorTitle),
      description: allCountriesErrorMessage || formatMessage(messages.catalogLoadError),
    });
  }, [allCountriesErrorMessage, formatMessage, isAllCountriesError, modalOpen, showToast]);

  const availableOptions = useMemo(
    () => allCountries.map(({ id, label }) => ({ value: String(id), label })),
    [allCountries],
  );

  const openAdd = () => {
    setSelectedCountryId('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCountryId('');
  };

  const onSave = async () => {
    if (!selectedCountryId || patchCountryMutation.isPending) {
      return;
    }

    const selectedOption = availableOptions.find((item) => item.value === selectedCountryId);

    try {
      const result = await patchCountryMutation.mutateAsync({
        countryId: selectedCountryId,
        isSearnCountry: true,
      });

      showToast({
        title: formatMessage(messages.toastAddedTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.toastAddedDescription, { name: selectedOption?.label || '' }),
      });
      closeModal();
    } catch (error) {
      showToast({
        title: formatMessage(messages.addErrorTitle),
        description: error?.message || formatMessage(messages.updateError),
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget || patchCountryMutation.isPending) {
      return;
    }

    try {
      const result = await patchCountryMutation.mutateAsync({
        countryId: deleteTarget.id,
        isSearnCountry: false,
      });

      showToast({
        title: formatMessage(messages.toastDeletedTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.toastDeletedDescription, { name: deleteTarget.label }),
      });
      setDeleteTarget(null);
    } catch (error) {
      showToast({
        title: formatMessage(messages.deleteErrorTitle),
        description: error?.message || formatMessage(messages.updateError),
      });
    }
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

      {isSearnCountriesLoading ? (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.GRID_CARDS}
          count={6}
          ariaLabel={formatMessage(messages.listLoading)}
        />
      ) : isSearnCountriesError ? (
        <div className="countries-page__empty">
          <EmptyState message={searnCountriesErrorMessage || formatMessage(messages.listLoadError)} fullSize />
        </div>
      ) : searnCountries.length === 0 ? (
        emptyState
      ) : (
        <div className="countries-page__grid">
          {searnCountries.map(country => (
            <div className="countries-page__card" key={country.id}>
              <div className="countries-page__icon">
                <EarthIcon className="h-5 w-5" />
              </div>

              <div style={{ minWidth: 0, flex: 1 }}>
                {hasDisplayValue(country.label) && (
                  <p className="countries-page__name" title={country.label}>{country.label}</p>
                )}
              </div>

              <div className="countries-page__actions">
                {canDeleteCountry && (
                  <button
                    type="button"
                    className="countries-page__icon-button countries-page__icon-button--danger"
                    aria-label={formatMessage(messages.deleteCountry)}
                    disabled={patchCountryMutation.isPending}
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
        title={formatMessage(messages.modalTitleAdd)}
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
            value={selectedCountryId}
            options={availableOptions}
            onChange={setSelectedCountryId}
            triggerLabel={(
              availableOptions.find(o => o.value === selectedCountryId)?.label
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
            disabled={!selectedCountryId.trim() || patchCountryMutation.isPending || isAllCountriesLoading}
          >
            {formatMessage(messages.modalConfirmAdd)}
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
