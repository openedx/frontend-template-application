/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faBuilding,
  faCheck,
  faGlobe,
  faPen,
  faPlus,
  faTimes,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import { EmptyState } from '../../components/emptyState';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import useOrganizationProfile from '../../hooks/organizationProfile/useOrganizationProfile';
import useOrganizationProfileMutation from '../../hooks/organizationProfile/useOrganizationProfileMutation';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import './OrganizationProfile.scss';

const LOGO_MAX_BYTES = 2 * 1024 * 1024;

const OrganizationProfile = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { componentAccess, navbarAccess } = useUserRole();
  const access = componentAccess?.organizationProfile ?? {};

  const canAccessOrganizationProfile = Boolean(navbarAccess?.accessOrganizationProfile ?? false);
  const canChangeOrganizationProfile = Boolean(access.canChangeOrganizationProfile);
  const showAdministratorsSection = Boolean(access.showAdministratorsSection);
  const canAddAdministrator = Boolean(access.canAddAdministrator);
  const canEditAdministrator = Boolean(access.canEditAdministrator);
  const canDeleteAdministrator = Boolean(access.canDeleteAdministrator);
  const canManageAdministrators = canAddAdministrator
    || canEditAdministrator
    || canDeleteAdministrator;

  const fileRef = useRef(null);

  const {
    profile,
    isLoading,
    isError,
    errorMessage,
    refetch,
  } = useOrganizationProfile({ enabled: canAccessOrganizationProfile });

  const { updateMutation } = useOrganizationProfileMutation();

  const [organizationName, setOrganizationName] = useState('');
  const [website, setWebsite] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [country, setCountry] = useState('');
  const [overview, setOverview] = useState('');
  const [savedLogoUrl, setSavedLogoUrl] = useState('');
  const [logoPreview, setLogoPreview] = useState('');
  const [pendingLogoFile, setPendingLogoFile] = useState(null);
  const [administrators, setAdministrators] = useState([]);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [editingAdminName, setEditingAdminName] = useState('');
  const [editingAdminEmail, setEditingAdminEmail] = useState('');
  const [pendingDeleteAdmin, setPendingDeleteAdmin] = useState(null);

  const canSaveOrganizationProfile = canChangeOrganizationProfile || canManageAdministrators;
  const isSaveDisabled = !canSaveOrganizationProfile
    || updateMutation.isPending
    || isLoading
    || isError;

  const applyProfileToForm = (data) => {
    if (!data) {
      return;
    }

    setOrganizationName(hasDisplayValue(data.organizationName) ? data.organizationName : '');
    setWebsite(hasDisplayValue(data.website) ? data.website : '');
    setContactEmail(hasDisplayValue(data.contactEmail) ? data.contactEmail : '');
    setCountry(hasDisplayValue(data.country) ? data.country : '');
    setOverview(hasDisplayValue(data.overview) ? data.overview : '');
    setSavedLogoUrl(hasDisplayValue(data.logoUrl) ? data.logoUrl : '');
    setAdministrators(Array.isArray(data.administrators) ? data.administrators : []);
    setLogoPreview('');
    setPendingLogoFile(null);
    setNewAdminName('');
    setNewAdminEmail('');
    setEditingAdminId(null);
    setEditingAdminName('');
    setEditingAdminEmail('');
  };

  useEffect(() => {
    applyProfileToForm(profile);
  }, [profile]);

  useEffect(() => {
    if (!isError) {
      return;
    }

    showToast({
      title: formatMessage(messages.loadErrorTitle),
      description: errorMessage || formatMessage(messages.loadError),
    });
  }, [errorMessage, formatMessage, isError, showToast]);

  const displayLogoSrc = logoPreview || savedLogoUrl;

  const onLogoChange = (event) => {
    if (!canChangeOrganizationProfile) {
      return;
    }

    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > LOGO_MAX_BYTES) {
      showToast({
        title: formatMessage(messages.validationTitle),
        description: formatMessage(messages.validationLogoSize),
      });
      const input = event.target;
      if (input) {
        input.value = '';
      }
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    setPendingLogoFile(file);
  };

  const clearEditingAdmin = () => {
    setEditingAdminId(null);
    setEditingAdminName('');
    setEditingAdminEmail('');
  };

  const startEditAdmin = (admin) => {
    if (!canEditAdministrator) {
      return;
    }

    const adminKey = admin?.id || admin?.email;
    if (!hasDisplayValue(adminKey)) {
      return;
    }

    setEditingAdminId(adminKey);
    setEditingAdminName(admin.name || '');
    setEditingAdminEmail(admin.email || '');
  };

  const confirmEditAdmin = () => {
    if (!canEditAdministrator || !editingAdminId) {
      return;
    }

    const name = editingAdminName.trim();
    const email = editingAdminEmail.trim();

    if (!hasDisplayValue(name) || !hasDisplayValue(email)) {
      showToast({
        title: formatMessage(messages.validationTitle),
        description: formatMessage(messages.validationAdminFields),
      });
      return;
    }

    setAdministrators((current) => current.map((admin) => {
      const adminKey = admin.id || admin.email;
      return adminKey === editingAdminId
        ? { ...admin, name, email }
        : admin;
    }));
    clearEditingAdmin();
  };

  const handleAddAdmin = () => {
    if (!canAddAdministrator) {
      return;
    }

    const name = newAdminName.trim();
    const email = newAdminEmail.trim();

    if (!hasDisplayValue(name) || !hasDisplayValue(email)) {
      showToast({
        title: formatMessage(messages.validationTitle),
        description: formatMessage(messages.validationAdminFields),
      });
      return;
    }

    setAdministrators((current) => [
      ...current,
      {
        id: `admin-${Date.now()}`,
        name,
        email,
      },
    ]);
    setNewAdminName('');
    setNewAdminEmail('');
  };

  const handleDeleteAdmin = () => {
    if (!canDeleteAdministrator || !pendingDeleteAdmin) {
      return;
    }

    const nextAdministrators = administrators.filter((admin) => {
      if (hasDisplayValue(pendingDeleteAdmin.id) && hasDisplayValue(admin.id)) {
        return admin.id !== pendingDeleteAdmin.id;
      }

      return admin.email !== pendingDeleteAdmin.email;
    });

    // Persist deletion immediately (same PATCH used by Save Changes).
    (async () => {
      try {
        const result = await updateMutation.mutateAsync({
          organizationName,
          website,
          contactEmail,
          country,
          overview,
          logoFile: pendingLogoFile,
          logoUrl: savedLogoUrl,
          administrators: nextAdministrators,
          includeAdministrators: showAdministratorsSection,
        });

        showToast({
          title: formatMessage(messages.toastSavedTitle),
          description: hasDisplayValue(result.message)
            ? result.message
            : formatMessage(messages.toastSavedDescription),
        });

        if (pendingDeleteAdmin.id === editingAdminId || pendingDeleteAdmin.email === editingAdminId) {
          clearEditingAdmin();
        }

        setAdministrators(nextAdministrators);
        setPendingDeleteAdmin(null);
        await refetch();
      } catch (error) {
        showToast({
          title: formatMessage(messages.saveErrorTitle),
          description: error?.message || formatMessage(messages.saveError),
        });
      }
    })();
  };

  const onSave = async () => {
    if (isSaveDisabled) {
      return;
    }

    if (!hasDisplayValue(organizationName.trim())) {
      showToast({
        title: formatMessage(messages.validationTitle),
        description: formatMessage(messages.validationOrganizationName),
      });
      return;
    }

    try {
      const result = await updateMutation.mutateAsync({
        organizationName,
        website,
        contactEmail,
        country,
        overview,
        logoFile: pendingLogoFile,
        logoUrl: savedLogoUrl,
        administrators: canManageAdministrators
          ? administrators
          : (profile?.administrators ?? []),
        includeAdministrators: showAdministratorsSection,
      });

      showToast({
        title: formatMessage(messages.toastSavedTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.toastSavedDescription),
      });

      await refetch();
    } catch (error) {
      showToast({
        title: formatMessage(messages.saveErrorTitle),
        description: error?.message || formatMessage(messages.saveError),
      });
    }
  };

  if (isLoading) {
    return (
      <section className="organization-profile-page">
        <SkeletonScreen variant={SKELETON_VARIANTS.DETAIL} />
      </section>
    );
  }

  if (isError || !profile) {
    return (
      <section className="organization-profile-page">
        <EmptyState
          fullSize
          className="organization-profile-page__empty"
          message={errorMessage || formatMessage(messages.loadError)}
        />
      </section>
    );
  }

  return (
    <section className="organization-profile-page">
      <div className="organization-profile-page__wrap">
        <div className="organization-profile-page__card">
          <div className="organization-profile-page__card-head">
            <h2 className="organization-profile-page__card-title">
              <FontAwesomeIcon icon={faBuilding} className="organization-profile-page__card-icon" aria-hidden />
              {formatMessage(messages.organizationInformationTitle)}
            </h2>
          </div>
          <div className="organization-profile-page__card-body">
            <div className="organization-profile-page__field">
              <span className="organization-profile-page__label">{formatMessage(messages.fieldLogo)}</span>
              <div className="organization-profile-page__logo-row">
                <div className="organization-profile-page__logo-box">
                  {hasDisplayValue(displayLogoSrc) ? (
                    <img
                      src={displayLogoSrc}
                      alt=""
                      className="organization-profile-page__logo-img"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faBuilding} className="organization-profile-page__logo-placeholder" aria-hidden />
                  )}
                </div>
                <div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    hidden
                    disabled={!canChangeOrganizationProfile}
                    onChange={onLogoChange}
                  />
                  <button
                    type="button"
                    className="organization-profile-page__outline-button"
                    disabled={!canChangeOrganizationProfile}
                    onClick={() => fileRef.current?.click()}
                  >
                    <FontAwesomeIcon icon={faUpload} aria-hidden />
                    {formatMessage(messages.uploadLogo)}
                  </button>
                  <p className="organization-profile-page__logo-hint">{formatMessage(messages.logoHint)}</p>
                </div>
              </div>
            </div>

            <div className="organization-profile-page__grid">
              <div className="organization-profile-page__field">
                <label className="organization-profile-page__label" htmlFor="org-profile-name">
                  {formatMessage(messages.fieldOrganizationName)}
                  <span className="organization-profile-page__required"> *</span>
                </label>
                <input
                  id="org-profile-name"
                  className="organization-profile-page__input"
                  value={organizationName}
                  placeholder={formatMessage(messages.fieldOrganizationNamePlaceholder)}
                  disabled={!canChangeOrganizationProfile}
                  onChange={(e) => setOrganizationName(e.target.value)}
                />
              </div>

              <div className="organization-profile-page__field">
                <label className="organization-profile-page__label" htmlFor="org-profile-website">
                  {formatMessage(messages.fieldWebsite)}
                </label>
                <div className="organization-profile-page__input-wrap">
                  <FontAwesomeIcon icon={faGlobe} className="organization-profile-page__input-icon" aria-hidden />
                  <input
                    id="org-profile-website"
                    className="organization-profile-page__input organization-profile-page__input--with-icon"
                    value={website}
                    placeholder={formatMessage(messages.fieldWebsitePlaceholder)}
                    disabled={!canChangeOrganizationProfile}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>

              <div className="organization-profile-page__field">
                <label className="organization-profile-page__label" htmlFor="org-profile-email">
                  {formatMessage(messages.fieldContactEmail)}
                </label>
                <input
                  id="org-profile-email"
                  type="email"
                  className="organization-profile-page__input"
                  value={contactEmail}
                  placeholder={formatMessage(messages.fieldContactEmailPlaceholder)}
                  disabled={!canChangeOrganizationProfile}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>

              <div className="organization-profile-page__field">
                <label className="organization-profile-page__label" htmlFor="org-profile-country">
                  {formatMessage(messages.fieldCountry)}
                </label>
                <input
                  id="org-profile-country"
                  className="organization-profile-page__input"
                  value={country}
                  placeholder={formatMessage(messages.fieldCountryPlaceholder)}
                  disabled={!canChangeOrganizationProfile}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            <div className="organization-profile-page__field">
              <label className="organization-profile-page__label" htmlFor="org-profile-overview">
                {formatMessage(messages.fieldOverview)}
              </label>
              <textarea
                id="org-profile-overview"
                className="organization-profile-page__textarea"
                rows={5}
                value={overview}
                placeholder={formatMessage(messages.fieldOverviewPlaceholder)}
                disabled={!canChangeOrganizationProfile}
                onChange={(e) => setOverview(e.target.value)}
              />
            </div>
          </div>
        </div>

        {showAdministratorsSection && (
          <div className="organization-profile-page__card">
            <div className="organization-profile-page__card-head">
              <h2 className="organization-profile-page__card-title">
                {formatMessage(messages.administratorsTitle)}
              </h2>
            </div>
            <div className="organization-profile-page__card-body">
              <div className="organization-profile-page__field">
                <span className="organization-profile-page__label">
                  {formatMessage(messages.administratorsListLabel)}
                </span>
                <div className="organization-profile-page__admin-list">
                  {administrators.map((admin) => {
                    const editKey = admin.id || admin.email;
                    const adminKey = hasDisplayValue(admin.id)
                      ? admin.id
                      : (hasDisplayValue(admin.email) ? admin.email : `${admin.name}-${admin.email}`);

                    if (!hasDisplayValue(adminKey)) {
                      return null;
                    }

                    const isEditing = editingAdminId === editKey;

                    if (isEditing) {
                      return (
                        <div
                          key={adminKey}
                          className="organization-profile-page__admin-row organization-profile-page__admin-row--editing"
                        >
                          <div className="organization-profile-page__admin-edit-fields">
                            <input
                              className="organization-profile-page__input"
                              value={editingAdminName}
                              placeholder={formatMessage(messages.adminEditNamePlaceholder)}
                              disabled={!canEditAdministrator}
                              onChange={(e) => setEditingAdminName(e.target.value)}
                            />
                            <input
                              type="email"
                              className="organization-profile-page__input"
                              value={editingAdminEmail}
                              placeholder={formatMessage(messages.adminEditEmailPlaceholder)}
                              disabled={!canEditAdministrator}
                              onChange={(e) => setEditingAdminEmail(e.target.value)}
                            />
                          </div>
                          <div className="organization-profile-page__admin-actions">
                            <button
                              type="button"
                              className="organization-profile-page__icon-button"
                              aria-label={formatMessage(messages.saveEditAdmin)}
                              title={formatMessage(messages.saveEditAdmin)}
                              disabled={!canEditAdministrator}
                              onClick={confirmEditAdmin}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                              type="button"
                              className="organization-profile-page__icon-button"
                              aria-label={formatMessage(messages.cancelEditAdmin)}
                              title={formatMessage(messages.cancelEditAdmin)}
                              onClick={clearEditingAdmin}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={adminKey} className="organization-profile-page__admin-row">
                        <div className="organization-profile-page__admin-info">
                          {hasDisplayValue(admin.name) && (
                            <p className="organization-profile-page__admin-name">{admin.name}</p>
                          )}
                          {hasDisplayValue(admin.email) && (
                            <p className="organization-profile-page__admin-email">{admin.email}</p>
                          )}
                        </div>
                        <div className="organization-profile-page__admin-actions">
                          {canEditAdministrator && (
                            <button
                              type="button"
                              className="organization-profile-page__icon-button"
                              aria-label={formatMessage(messages.editAdmin)}
                              title={formatMessage(messages.editAdmin)}
                              disabled={Boolean(editingAdminId)}
                              onClick={() => startEditAdmin(admin)}
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </button>
                          )}
                          {canDeleteAdministrator && (
                            <button
                              type="button"
                              className="organization-profile-page__icon-button organization-profile-page__icon-button--danger"
                              aria-label={formatMessage(messages.deleteAdmin)}
                              title={formatMessage(messages.deleteAdmin)}
                              disabled={
                                Boolean(editingAdminId)
                                || updateMutation.isPending
                              }
                              onClick={() => setPendingDeleteAdmin(admin)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {canAddAdministrator && (
                  <div className="organization-profile-page__admin-form">
                    <input
                      className="organization-profile-page__input"
                      value={newAdminName}
                      placeholder={formatMessage(messages.adminNamePlaceholder)}
                      disabled={Boolean(editingAdminId)}
                      onChange={(e) => setNewAdminName(e.target.value)}
                    />
                    <input
                      type="email"
                      className="organization-profile-page__input"
                      value={newAdminEmail}
                      placeholder={formatMessage(messages.adminEmailPlaceholder)}
                      disabled={Boolean(editingAdminId)}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                    />
                    <button
                      type="button"
                      className="organization-profile-page__outline-button"
                      disabled={Boolean(editingAdminId)}
                      onClick={handleAddAdmin}
                    >
                      <FontAwesomeIcon icon={faPlus} aria-hidden />
                      {formatMessage(messages.addAdmin)}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="organization-profile-page__footer">
          <button
            type="button"
            className="organization-profile-page__primary-button"
            disabled={isSaveDisabled}
            onClick={onSave}
          >
            {formatMessage(messages.saveChanges)}
          </button>
        </div>
      </div>

      <ConfirmActionDialog
        isOpen={Boolean(pendingDeleteAdmin)}
        title={formatMessage(messages.deleteAdminDialogTitle)}
        description={formatMessage(messages.deleteAdminDialogDescription, {
          name: pendingDeleteAdmin?.name || '',
        })}
        cancelLabel={formatMessage(messages.cancel)}
        confirmLabel={formatMessage(messages.delete)}
        onCancel={() => setPendingDeleteAdmin(null)}
        onConfirm={handleDeleteAdmin}
        isConfirmDisabled={updateMutation.isPending}
        isCancelDisabled={updateMutation.isPending}
      />
    </section>
  );
};

export default OrganizationProfile;
