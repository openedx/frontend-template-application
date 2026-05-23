/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useRef, useState } from 'react';
import { EmptyState } from '../../components/emptyState';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import useOrganizationDetails from '../../hooks/settings/useOrganizationDetails';
import useOrganizationDetailsMutation from '../../hooks/settings/useOrganizationDetailsMutation';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import './Settings.scss';

const ImageIcon = ({ className }) => (
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
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

const UploadIcon = ({ className }) => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

const SaveIcon = ({ className }) => (
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
    <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
    <path d="M7 3v4a1 1 0 0 0 1 1h7" />
  </svg>
);

const Settings = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const canEdit = true;
  const canUploadLogo = true;

  const fileRef = useRef(null);

  const {
    details,
    isLoading,
    isError,
    errorMessage,
    refetch,
  } = useOrganizationDetails();

  const { updateMutation } = useOrganizationDetailsMutation();

  const [platformName, setPlatformName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [logoPreview, setLogoPreview] = useState('');
  const [pendingLogoFile, setPendingLogoFile] = useState(null);
  const [savedLogoUrl, setSavedLogoUrl] = useState('');

  const isSaveDisabled = !canEdit || updateMutation.isPending || isLoading || isError;

  const applyDetailsToForm = (data) => {
    if (!data) {
      return;
    }

    setPlatformName(hasDisplayValue(data.platformName) ? data.platformName : '');
    setSupportEmail(hasDisplayValue(data.supportEmail) ? data.supportEmail : '');
    setOrganisationName(hasDisplayValue(data.organisationName) ? data.organisationName : '');
    setSavedLogoUrl(hasDisplayValue(data.logoUrl) ? data.logoUrl : '');
    setLogoPreview('');
    setPendingLogoFile(null);
  };

  useEffect(() => {
    applyDetailsToForm(details);
  }, [details]);

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

  const onSave = async () => {
    if (isSaveDisabled) {
      return;
    }

    try {
      const result = await updateMutation.mutateAsync({
        supportEmail,
        organisationName,
        logoFile: pendingLogoFile,
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
      <section className="settings-page">
        <SkeletonScreen variant={SKELETON_VARIANTS.PAGE} />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="settings-page">
        <EmptyState
          message={errorMessage || formatMessage(messages.loadError)}
          fullSize
        />
      </section>
    );
  }

  return (
    <section className="settings-page">
      <div className="settings-page__wrap">
        <div className="settings-page__card">
          <h2 className="settings-page__title">{formatMessage(messages.generalTitle)}</h2>
          <div className="settings-page__stack">
            <div className="settings-page__field">
              <span className="settings-page__label">{formatMessage(messages.platformName)}</span>
              <input
                className="settings-page__input"
                value={platformName}
                disabled
                type="text"
              />
            </div>

            <div className="settings-page__field">
              <span className="settings-page__label">{formatMessage(messages.supportEmail)}</span>
              <input
                className="settings-page__input"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                disabled={!canEdit || isSaveDisabled}
                type="email"
              />
            </div>
          </div>
        </div>

        <div className="settings-page__card">
          <h2 className="settings-page__title">{formatMessage(messages.orgTitle)}</h2>

          <div className="settings-page__stack" style={{ gap: '1.5rem' }}>
            <div className="settings-page__field">
              <span className="settings-page__label">{formatMessage(messages.organisationName)}</span>
              <input
                className="settings-page__input"
                placeholder={formatMessage(messages.organisationNamePlaceholder)}
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
                disabled={!canEdit || isSaveDisabled}
                type="text"
              />
            </div>

            <div className="settings-page__field">
              <span className="settings-page__label">{formatMessage(messages.organisationLogo)}</span>
              <div className="settings-page__logo-row">
                <div className="settings-page__logo-box" aria-hidden="true">
                  {hasDisplayValue(displayLogoSrc) ? (
                    <img className="settings-page__logo-img" src={displayLogoSrc} alt="" />
                  ) : (
                    <ImageIcon className="h-8 w-8" />
                  )}
                </div>

                <div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                    className="settings-page__file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) {
                        return;
                      }
                      setPendingLogoFile(file);
                      setLogoPreview(URL.createObjectURL(file));
                    }}
                  />
                  <button
                    type="button"
                    className="settings-page__outline-button"
                    onClick={() => fileRef.current?.click()}
                    disabled={!canUploadLogo || !canEdit || isSaveDisabled}
                  >
                    <UploadIcon className="h-4 w-4" />
                    {formatMessage(messages.uploadLogo)}
                  </button>
                  <p className="settings-page__hint">{formatMessage(messages.uploadHint)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="settings-page__primary-button"
          onClick={onSave}
          disabled={isSaveDisabled}
        >
          <SaveIcon className="h-4 w-4" />
          {formatMessage(messages.save)}
        </button>
      </div>
    </section>
  );
};

export default Settings;
