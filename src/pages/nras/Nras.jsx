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
import { buildNraOnboardPayload } from '../../api/nras/nrasUtils';
import useSearnCountries from '../../hooks/countries/useSearnCountries';
import useNraDetail from '../../hooks/nras/useNraDetail';
import useNraMutations from '../../hooks/nras/useNraMutations';
import useNrasList from '../../hooks/nras/useNrasList';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { buildPaginationShowingParams } from '../../utils/paginationUtils';
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

const Nras = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { componentAccess } = useUserRole();

  const canShowTable = true;
  const canSearch = true;
  const canOnboard = Boolean(componentAccess?.nrasManagement?.canOnboardNra ?? false);
  const canEdit = Boolean(componentAccess?.nrasManagement?.canEditNra ?? false);
  const canDelete = Boolean(componentAccess?.nrasManagement?.canDeleteNra ?? false);

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNraId, setEditingNraId] = useState(null);
  const [nraName, setNraName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [admins, setAdmins] = useState([]);
  const [adminDraftName, setAdminDraftName] = useState('');
  const [adminDraftEmail, setAdminDraftEmail] = useState('');
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [editingAdminName, setEditingAdminName] = useState('');
  const [editingAdminEmail, setEditingAdminEmail] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [adminDeleteTarget, setAdminDeleteTarget] = useState(null);

  const {
    items,
    count: nrasCount,
    totalPages,
    isLoading: isListLoading,
    isError: isListError,
    errorMessage: listErrorMessage,
  } = useNrasList({ page, search: searchQuery, enabled: canShowTable });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchText.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const {
    dropdownOptions: countryOptions,
    isLoading: isCountriesLoading,
    isError: isCountriesError,
    errorMessage: countriesErrorMessage,
  } = useSearnCountries({ enabled: modalOpen });

  const isEditing = editingNraId != null && editingNraId !== '';

  const {
    detail,
    isLoading: isDetailLoading,
    isError: isDetailError,
    errorMessage: detailErrorMessage,
  } = useNraDetail({
    nraId: editingNraId,
    enabled: modalOpen && isEditing,
  });

  const { createMutation, updateMutation, deleteMutation } = useNraMutations();

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
  }, [
    detailErrorMessage,
    formatMessage,
    isDetailError,
    isEditing,
    modalOpen,
    showToast,
  ]);

  useEffect(() => {
    if (!isEditing || !detail) {
      return;
    }

    setNraName(hasDisplayValue(detail.name) ? detail.name : '');
    setCountryId(detail.countryId != null ? String(detail.countryId) : '');
    setAdmins(detail.admins.map((admin) => ({
      id: admin.id ?? `adm-${admin.email}`,
      name: admin.name,
      email: admin.email,
    })));
  }, [detail, isEditing]);

  const closeModal = () => {
    setModalOpen(false);
    setEditingNraId(null);
    setNraName('');
    setCountryId('');
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
    setNraName('');
    setCountryId('');
    setAdmins([]);
    setModalOpen(true);
  };

  const openEdit = (nra) => {
    setEditingNraId(nra.id);
    setNraName('');
    setCountryId('');
    setAdmins([]);
    setModalOpen(true);
  };

  const addAdmin = () => {
    const name = adminDraftName.trim();
    const email = adminDraftEmail.trim();
    if (!name || !email) {
      return;
    }
    setAdmins((prev) => [...prev, { id: `adm-${Date.now()}`, name, email }]);
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
    setAdmins((prev) => prev.map((admin) => (admin.id === editingAdminId ? {
      ...admin,
      name,
      email,
    } : admin)));
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
    setAdmins((prev) => prev.filter((admin) => admin.id !== id));
    setAdminDeleteTarget(null);
    if (editingAdminId === id) {
      cancelEditAdmin();
    }

    showToast({
      title: formatMessage(messages.toastAdminDeletedTitle),
      description: formatMessage(messages.toastAdminDeletedDescription, { name }),
    });
  };

  const onSaveNra = async () => {
    const name = nraName.trim();
    if (!name || !countryId || admins.length === 0) {
      return;
    }

    const payload = buildNraOnboardPayload({
      id: editingNraId,
      name,
      countryId,
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
          nraId: editingNraId,
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
          title: formatMessage(messages.toastOnboardedTitle),
          description: hasDisplayValue(result.message)
            ? result.message
            : formatMessage(messages.toastOnboardedDescription, { name }),
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

  const confirmDelete = async () => {
    if (!deleteTarget || deleteMutation.isPending) {
      return;
    }

    const { id, name } = deleteTarget;

    try {
      const result = await deleteMutation.mutateAsync(id);

      showToast({
        title: formatMessage(messages.toastDeletedTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.toastDeletedDescription, { name }),
      });
      setDeleteTarget(null);
    } catch (error) {
      showToast({
        title: formatMessage(messages.deleteErrorTitle),
        description: error?.message || formatMessage(messages.deleteError),
      });
    }
  };

  const selectedCountryLabel = useMemo(() => {
    const match = countryOptions.find((option) => option.value === countryId);
    return match?.label;
  }, [countryId, countryOptions]);

  const modalCountryTrigger = hasDisplayValue(selectedCountryLabel) ? selectedCountryLabel : (
    <span className="nras-modal__placeholder">
      {formatMessage(messages.fieldCountryPlaceholder)}
    </span>
  );

  const isModalLoading = isEditing && isDetailLoading;
  const isModalBlocked = isModalLoading
    || (isEditing && isDetailError)
    || isCountriesLoading
    || isCountriesError;

  const canSubmit = Boolean(nraName.trim() && countryId && admins.length > 0 && !isModalBlocked);
  const canAddAdmin = Boolean(adminDraftName.trim() && adminDraftEmail.trim() && !isModalBlocked);

  const renderTableContent = () => {
    if (isListLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.TABLE}
          tablePreset="nras"
          rows={6}
          ariaLabel={formatMessage(messages.listLoading)}
        />
      );
    }

    if (isListError) {
      return (
        <div className="nras-page__empty">
          <EmptyState
            message={listErrorMessage || formatMessage(messages.listLoadError)}
            fullSize
          />
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="nras-page__empty">
          <EmptyState message={formatMessage(messages.empty)} fullSize />
        </div>
      );
    }

    return (
      <>
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
                {items.map((nra) => {
                  const adminCount = typeof nra.adminCount === 'number' && !Number.isNaN(nra.adminCount)
                    ? nra.adminCount
                    : 0;

                  return (
                    <tr className="nras-page__tr" key={nra.id}>
                      <td className="nras-page__td">
                        <div className="nras-page__name-cell">
                          <div className="nras-page__badge-icon">
                            <GlobeIcon className="h-4 w-4" />
                          </div>
                          {hasDisplayValue(nra.name) && (
                            <span className="nras-page__name" title={nra.name}>{nra.name}</span>
                          )}
                        </div>
                      </td>
                      <td className="nras-page__td">
                        {formatMessage(messages.adminCount, { count: adminCount })}
                      </td>
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
                  );
                })}
              </tbody>
            </table>
          </div>
          <TablePaginationFooter
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            paginationLabel="NRA pagination"
            footerContent={formatMessage(
              messages.showingCount,
              buildPaginationShowingParams(items, nrasCount),
            )}
          />
        </div>
      </>
    );
  };

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
              onChange={(e) => setSearchText(e.target.value)}
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

      {canShowTable ? renderTableContent() : (
        <div className="nras-page__empty">
          <EmptyState message={formatMessage(messages.empty)} fullSize />
        </div>
      )}

      <PopupDialog
        isOpen={modalOpen}
        title={formatMessage(isEditing ? messages.modalTitleEdit : messages.modalTitleAdd)}
        onClose={closeModal}
        contentClassName="nras-modal"
      >
        {isModalLoading ? (
          <div
            className="nras-modal__loading"
            aria-busy="true"
            aria-label={formatMessage(messages.detailLoading)}
          >
            <SkeletonScreen variant={SKELETON_VARIANTS.CARD} hasHeader={false} bodyLines={4} />
          </div>
        ) : (
          <>
            <p className="nras-modal__description">{formatMessage(messages.modalDescription)}</p>

            {isEditing && isDetailError && (
              <EmptyState
                message={detailErrorMessage || formatMessage(messages.detailLoadError)}
              />
            )}

            {!isDetailError && (
              <>
                <div className="nras-modal__fields">
                  <div className="nras-modal__field">
                    <span className="nras-modal__label">
                      {formatMessage(messages.fieldNameLabel)}
                      <span className="nras-modal__required">*</span>
                    </span>
                    <input
                      className="nras-modal__input"
                      placeholder={formatMessage(messages.fieldNamePlaceholder)}
                      value={nraName}
                      onChange={(e) => setNraName(e.target.value)}
                      type="text"
                    />
                  </div>

                  <div className="nras-modal__field">
                    <span className="nras-modal__label">
                      {formatMessage(messages.fieldCountryLabel)}
                      <span className="nras-modal__required">*</span>
                    </span>
                    <SearchableDropdown
                      value={countryId}
                      options={countryOptions}
                      onChange={setCountryId}
                      triggerLabel={modalCountryTrigger}
                      searchPlaceholder={formatMessage(messages.fieldCountryPlaceholder)}
                      noOptionsText={formatMessage(messages.empty)}
                    />
                  </div>

                  <div className="nras-modal__field">
                    <span className="nras-modal__label">
                      {formatMessage(messages.sectionAdmins)}
                      <span className="nras-modal__required">*</span>
                    </span>

                    <div className="nras-modal__admins">
                      {admins.map((admin) => {
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
                                    onChange={(e) => setEditingAdminName(e.target.value)}
                                    type="text"
                                  />
                                  <input
                                    className="nras-modal__input"
                                    placeholder="Email"
                                    value={editingAdminEmail}
                                    onChange={(e) => setEditingAdminEmail(e.target.value)}
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
                                  {hasDisplayValue(admin.name) && (
                                    <p className="nras-modal__admin-name" title={admin.name}>{admin.name}</p>
                                  )}
                                  {hasDisplayValue(admin.email) && (
                                    <p className="nras-modal__admin-email" title={admin.email}>{admin.email}</p>
                                  )}
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
                          onChange={(e) => setAdminDraftName(e.target.value)}
                          type="text"
                        />
                        <input
                          className="nras-modal__input"
                          placeholder={formatMessage(messages.adminEmailPlaceholder)}
                          value={adminDraftEmail}
                          onChange={(e) => setAdminDraftEmail(e.target.value)}
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
