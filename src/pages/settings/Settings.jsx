import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo, useRef, useState } from 'react';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import settingsData from '../../mock/settings/settings.json';
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
  const { componentAccess } = useUserRole();
  const { showToast } = useToast();

  const canEdit = Boolean(componentAccess?.settings?.canEdit ?? true);
  const canUploadLogo = Boolean(componentAccess?.settings?.canUploadLogo ?? true);

  const fileRef = useRef(null);

  const initial = useMemo(() => ({
    platformName: settingsData.platformName || '',
    supportEmail: settingsData.supportEmail || '',
    organisationName: settingsData.organisationName || '',
  }), []);

  const [supportEmail, setSupportEmail] = useState(initial.supportEmail);
  const [organisationName, setOrganisationName] = useState(initial.organisationName);
  const [logoUrl, setLogoUrl] = useState('');

  const onSave = () => {
    showToast({
      title: formatMessage(messages.toastSavedTitle),
      description: formatMessage(messages.toastSavedDescription),
    });
  };

  return (
    <section className="settings-page">
      <div className="settings-page__wrap">
        <div className="settings-page__card">
          <h2 className="settings-page__title">{formatMessage(messages.generalTitle)}</h2>
          <div className="settings-page__stack">
            <div className="settings-page__field">
              <span className="settings-page__label">{formatMessage(messages.platformName)}</span>
              <input className="settings-page__input" value={initial.platformName} disabled type="text" />
            </div>

            <div className="settings-page__field">
              <span className="settings-page__label">{formatMessage(messages.supportEmail)}</span>
              <input
                className="settings-page__input"
                value={supportEmail}
                onChange={e => setSupportEmail(e.target.value)}
                disabled={!canEdit}
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
                onChange={e => setOrganisationName(e.target.value)}
                disabled={!canEdit}
                type="text"
              />
            </div>

            <div className="settings-page__field">
              <span className="settings-page__label">{formatMessage(messages.organisationLogo)}</span>
              <div className="settings-page__logo-row">
                <div className="settings-page__logo-box" aria-hidden="true">
                  {logoUrl ? (
                    <img className="settings-page__logo-img" src={logoUrl} alt="" />
                  ) : (
                    <ImageIcon className="h-8 w-8" />
                  )}
                </div>

                <div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="settings-page__file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const url = URL.createObjectURL(file);
                      setLogoUrl(url);
                    }}
                  />
                  <button
                    type="button"
                    className="settings-page__outline-button"
                    onClick={() => fileRef.current?.click()}
                    disabled={!canUploadLogo || !canEdit}
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

        <button type="button" className="settings-page__primary-button" onClick={onSave} disabled={!canEdit}>
          <SaveIcon className="h-4 w-4" />
          {formatMessage(messages.save)}
        </button>
      </div>
    </section>
  );
};

export default Settings;

