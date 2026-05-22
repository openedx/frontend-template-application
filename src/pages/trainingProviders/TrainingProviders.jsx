/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useMemo, useState } from 'react';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import { EmptyState } from '../../components/emptyState';
import PopupDialog from '../../components/popupDialog/PopupDialog';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { TablePaginationFooter } from '../../components/dataTable';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import { buildTrainingProviderPayload } from '../../api/trainingProviders/trainingProvidersUtils';
import useCountriesList from '../../hooks/countries/useCountriesList';
import useTrainingProviderDetail from '../../hooks/trainingProviders/useTrainingProviderDetail';
import useTrainingProviderMutations from '../../hooks/trainingProviders/useTrainingProviderMutations';
import useTrainingProvidersList from '../../hooks/trainingProviders/useTrainingProvidersList';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { buildPaginationShowingParams } from '../../utils/paginationUtils';
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

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProviderId, setEditingProviderId] = useState(null);
  const [orgName, setOrgName] = useState('');
  const [providerEmail, setProviderEmail] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [admins, setAdmins] = useState([]);

  const [adminDraftName, setAdminDraftName] = useState('');
  const [adminDraftEmail, setAdminDraftEmail] = useState('');

  const [editingAdminId, setEditingAdminId] = useState(null);
  const [editingAdminName, setEditingAdminName] = useState('');
  const [editingAdminEmail, setEditingAdminEmail] = useState('');

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [adminDeleteTarget, setAdminDeleteTarget] = useState(null);

  const {
    items: providers,
    count: providersCount,
    totalPages,
    isLoading: isProvidersLoading,
    isError: isProvidersError,
    errorMessage: providersErrorMessage,
  } = useTrainingProvidersList({
    page,
    search: searchQuery,
    enabled: canShowTable,
  });

  const isEditing = editingProviderId != null && editingProviderId !== '';

  const {
    detail,
    isLoading: isDetailLoading,
    isError: isDetailError,
    errorMessage: detailErrorMessage,
  } = useTrainingProviderDetail({
    providerId: editingProviderId,
    enabled: modalOpen && isEditing,
  });

  const {
    items: allCountries,
    isLoading: isCountriesLoading,
    isError: isCountriesError,
    errorMessage: countriesErrorMessage,
  } = useCountriesList({
    isSearnCountry: undefined,
    enabled: modalOpen,
  });

  const { createMutation, updateMutation, deleteMutation } = useTrainingProviderMutations();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchText.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (!isProvidersError) {
      return;
    }

    showToast({
      title: formatMessage(messages.listErrorTitle),
      description: providersErrorMessage || formatMessage(messages.listLoadError),
    });
  }, [formatMessage, isProvidersError, providersErrorMessage, showToast]);

  useEffect(() => {
    if (!modalOpen || !isCountriesError) {
      return;
    }

    showToast({
      title: formatMessage(messages.countriesErrorTitle),
      description: countriesErrorMessage,
    });
  }, [countriesErrorMessage, formatMessage, isCountriesError, modalOpen, showToast]);

  useEffect(() => {
    if (!modalOpen || !isEditing || !isDetailError) {
      return;
    }

    showToast({
      title: formatMessage(messages.detailErrorTitle),
      description: detailErrorMessage || formatMessage(messages.detailLoadError),
    });
  }, [detailErrorMessage, formatMessage, isDetailError, isEditing, modalOpen, showToast]);

  useEffect(() => {
    if (!isEditing || !detail) {
      return;
    }

    setOrgName(hasDisplayValue(detail.name) ? detail.name : '');
    setProviderEmail(hasDisplayValue(detail.email) ? detail.email : '');
    setCountryValue(hasDisplayValue(detail.countryName) ? String(detail.countryName) : '');
    setAdmins(detail.admins.map((admin) => ({
      id: admin.id ?? `tpa-${admin.email}`,
      name: admin.name,
      email: admin.email,
    })));
  }, [detail, isEditing]);

  const countryOptions = useMemo(
    () => allCountries.map((country) => ({ value: country.value, label: country.label })),
    [allCountries],
  );

  const closeModal = () => {
    setModalOpen(false);
    setEditingProviderId(null);
    setOrgName('');
    setProviderEmail('');
    setCountryValue('');
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
    setOrgName('');
    setProviderEmail('');
    setCountryValue('');
    setAdmins([]);
    setModalOpen(true);
  };

  const openEdit = (provider) => {
    setEditingProviderId(provider.id);
    setOrgName('');
    setProviderEmail('');
    setCountryValue('');
    setAdmins([]);
    setModalOpen(true);
  };

  const addAdmin = () => {
    const name = adminDraftName.trim();
    const email = adminDraftEmail.trim();
    if (!name || !email) {
      return;
    }
    setAdmins((prev) => [...prev, { id: `tpa-${Date.now()}`, name, email }]);
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
    setAdmins((prev) => prev.map((a) => (a.id === editingAdminId ? {
      ...a,
      name,
      email,
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
    setAdmins((prev) => prev.filter((a) => a.id !== id));
    setAdminDeleteTarget(null);
    if (editingAdminId === id) {
      cancelEditAdmin();
    }
    showToast({
      title: formatMessage(messages.toastAdminDeletedTitle),
      description: formatMessage(messages.toastAdminDeletedDescription, { name }),
    });
  };

  const onSaveProvider = async () => {
    const name = orgName.trim();
    const email = providerEmail.trim();
    if (!name || !email || !countryValue || admins.length === 0) {
      return;
    }

    const selectedCountry = allCountries.find((country) => country.value === countryValue);
    const payload = buildTrainingProviderPayload({
      id: editingProviderId,
      name,
      email,
      countryName: selectedCountry?.label || countryValue,
      admins,
      includeIds: isEditing,
    });

    const isSaving = createMutation.isPending || updateMutation.isPending;
    if (isSaving) {
      return;
    }

    try {
      if (isEditing) {
        const result = await updateMutation.mutateAsync({
          providerId: editingProviderId,
          payload,
        });

        showToast({
          title: formatMessage(messages.toastUpdatedTitle),
          description: hasDisplayValue(result.message)
            ? result.message
            : formatMessage(messages.toastUpdatedDescription, { name }),
        });
      } else {
        const result = await createMutation.mutateAsync(payload);

        showToast({
          title: formatMessage(messages.toastAddedTitle),
          description: hasDisplayValue(result.message)
            ? result.message
            : formatMessage(messages.toastAddedDescription, { name }),
        });
      }

      closeModal();
    } catch (error) {
      showToast({
        title: formatMessage(isEditing ? messages.updateErrorTitle : messages.createErrorTitle),
        description: error?.message || formatMessage(isEditing ? messages.updateError : messages.createError),
      });
    }
  };

  const confirmDeleteProvider = async () => {
    if (!deleteTarget || deleteMutation.isPending) {
      return;
    }

    try {
      const result = await deleteMutation.mutateAsync(deleteTarget.id);
      showToast({
        title: formatMessage(messages.toastDeletedTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.toastDeletedDescription, { name: deleteTarget.name }),
      });
      setDeleteTarget(null);
    } catch (error) {
      showToast({
        title: formatMessage(messages.deleteErrorTitle),
        description: error?.message || formatMessage(messages.deleteError),
      });
    }
  };

  const canSubmit = Boolean(orgName.trim() && providerEmail.trim() && countryValue && admins.length > 0);
  const canAddAdmin = Boolean(adminDraftName.trim() && adminDraftEmail.trim());

  const selectedCountryLabel = countryOptions.find((option) => option.value === countryValue)?.label;
  const modalCountryTrigger = selectedCountryLabel || (
    <span className="training-providers-modal__placeholder">
      {formatMessage(messages.countryPlaceholder)}
    </span>
  );

  const isModalLoading = isEditing && isDetailLoading;
  const isModalBlocked = isModalLoading
    || (isEditing && isDetailError)
    || isCountriesLoading
    || isCountriesError;

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
              onChange={(e) => setSearchText(e.target.value)}
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

      {isProvidersLoading ? (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.TABLE}
          tablePreset="trainingProviders"
          rows={6}
          ariaLabel={formatMessage(messages.listLoading)}
        />
      ) : (!canShowTable || providers.length === 0 || isProvidersError) ? (
        emptyState
      ) : (
        <>
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
                  {providers.map((provider) => (
                    <tr className="training-providers-page__tbody-row" key={provider.id}>
                      <td className="training-providers-page__td">
                        <div className="training-providers-page__provider-cell">
                          <div className="training-providers-page__provider-icon">
                            <BuildingIcon className="h-5 w-5" />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            {hasDisplayValue(provider.name) && (
                              <p className="training-providers-page__provider-name">{provider.name}</p>
                            )}
                            {hasDisplayValue(provider.email) && (
                              <p className="training-providers-page__provider-email">
                                <MailIcon className="h-3 w-3" />
                                {provider.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="training-providers-page__td training-providers-page__td--center">
                        {typeof provider.adminCount === 'number' ? provider.adminCount : 0}
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
            <TablePaginationFooter
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              paginationLabel="Training providers pagination"
              footerContent={formatMessage(
                messages.showingCount,
                buildPaginationShowingParams(providers, providersCount),
              )}
            />
          </div>
        </>
      )}

      <PopupDialog
        isOpen={modalOpen}
        title={formatMessage(isEditing ? messages.modalTitleEdit : messages.modalTitleAdd)}
        onClose={closeModal}
        contentClassName="training-providers-modal"
      >
        {isModalLoading ? (
          <div
            className="training-providers-modal__loading"
            aria-busy="true"
            aria-label={formatMessage(messages.detailLoading)}
          >
            <SkeletonScreen variant={SKELETON_VARIANTS.CARD} hasHeader={false} bodyLines={4} />
          </div>
        ) : (
          <>
            <p className="training-providers-modal__description">{formatMessage(messages.modalDescription)}</p>

            {isEditing && isDetailError && (
              <EmptyState message={detailErrorMessage || formatMessage(messages.detailLoadError)} />
            )}

            {!isDetailError && (
              <>
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
                      onChange={(e) => setOrgName(e.target.value)}
                      type="text"
                    />
                  </div>

                  <div className="training-providers-modal__field">
                    <span className="training-providers-modal__label">
                      {formatMessage(messages.emailLabel)}
                      <span className="training-providers-modal__required">*</span>
                    </span>
                    <input
                      className="training-providers-modal__input"
                      placeholder={formatMessage(messages.emailPlaceholder)}
                      value={providerEmail}
                      onChange={(e) => setProviderEmail(e.target.value)}
                      type="email"
                    />
                  </div>

                  <div className="training-providers-modal__field">
                    <span className="training-providers-modal__label">
                      {formatMessage(messages.countryLabel)}
                      <span className="training-providers-modal__required">*</span>
                    </span>
                    <SearchableDropdown
                      value={countryValue}
                      options={countryOptions}
                      onChange={setCountryValue}
                      triggerLabel={modalCountryTrigger}
                      searchPlaceholder={formatMessage(messages.countryPlaceholder)}
                      noOptionsText={formatMessage(messages.empty)}
                    />
                  </div>

                  <div className="training-providers-modal__field">
                    <span className="training-providers-modal__label">
                      {formatMessage(messages.adminsLabel)}
                      <span className="training-providers-modal__required">*</span>
                    </span>

                    <div className="training-providers-modal__admins">
                      {admins.map((admin) => {
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
                                    onChange={(e) => setEditingAdminName(e.target.value)}
                                    type="text"
                                  />
                                  <input
                                    className="training-providers-modal__input"
                                    placeholder="Email"
                                    value={editingAdminEmail}
                                    onChange={(e) => setEditingAdminEmail(e.target.value)}
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
                                  {hasDisplayValue(admin.name) && (
                                    <p className="training-providers-modal__admin-name" title={admin.name}>{admin.name}</p>
                                  )}
                                  {hasDisplayValue(admin.email) && (
                                    <p className="training-providers-modal__admin-email" title={admin.email}>{admin.email}</p>
                                  )}
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
                          onChange={(e) => setAdminDraftName(e.target.value)}
                          type="text"
                        />
                        <input
                          className="training-providers-modal__input"
                          placeholder={formatMessage(messages.adminEmailPlaceholder)}
                          value={adminDraftEmail}
                          onChange={(e) => setAdminDraftEmail(e.target.value)}
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
                    disabled={!canSubmit || isModalBlocked}
                  >
                    {formatMessage(isEditing ? messages.confirmSave : messages.confirmAdd)}
                  </button>
                </div>
              </>
            )}
          </>
        )}
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
