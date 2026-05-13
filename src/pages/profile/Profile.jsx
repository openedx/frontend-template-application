/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo, useRef, useState } from 'react';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { useToast } from '../../components/toast/ToastProvider';
import masterCountryOptions from '../../mock/countries/masterCountryOptions.json';
import profileData from '../../mock/profile/profile.json';
import messages from './messages';
import './Profile.scss';

const CameraIcon = ({ className }) => (
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
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const UserIcon = ({ className }) => (
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PinIcon = ({ className }) => (
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
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const LanguagesIcon = ({ className }) => (
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
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
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

const Profile = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const canEdit = true;
  const canUploadPhoto = true;

  const fileRef = useRef(null);

  const initial = useMemo(() => ({
    fullName: profileData.fullName || '',
    email: profileData.email || '',
    country: profileData.country || '',
    language: profileData.language || '',
    about: profileData.about || '',
    profile_image_url: profileData.profile_image_url || '',
  }), []);

  /** Local preview after file pick; falls back to `initial.profile_image_url` when cleared. */
  const [photoUrl, setPhotoUrl] = useState('');
  const displayAvatarSrc = photoUrl || initial.profile_image_url;
  const [fullName, setFullName] = useState(initial.fullName);
  const [country, setCountry] = useState(initial.country);
  const [language, setLanguage] = useState(initial.language);
  const [about, setAbout] = useState(initial.about);

  const countryOptions = useMemo(() => (
    [...masterCountryOptions]
      .sort((a, b) => a.label.localeCompare(b.label))
      .map(({ label }) => ({ value: label, label }))
  ), []);

  const languageOptions = useMemo(() => (
    ['English', 'Bangla', 'Hindi', 'Thai', 'Dzongkha', 'Nepali', 'Sinhala', 'Burmese']
      .map(l => ({ value: l, label: l }))
  ), []);

  const onCancel = () => {
    setPhotoUrl('');
    setFullName(initial.fullName);
    setCountry(initial.country);
    setLanguage(initial.language);
    setAbout(initial.about);
  };

  const onSave = () => {
    showToast({
      title: formatMessage(messages.toastSavedTitle),
      description: formatMessage(messages.toastSavedDescription),
    });
  };

  const initials = (fullName || initial.fullName || 'U').trim().slice(0, 1).toUpperCase();

  const countryTrigger = country ? country : (
    <span className="profile-page__placeholder">{initial.country || 'Select country'}</span>
  );
  const languageTrigger = language ? language : (
    <span className="profile-page__placeholder">{initial.language || 'Select language'}</span>
  );

  return (
    <section className="profile-page">
      <div className="profile-page__card">
        <div className="profile-page__card-inner">
          <div className="profile-page__summary">
            <div className="profile-page__avatar">
              {displayAvatarSrc ? (
                <img className="profile-page__avatar-img" src={displayAvatarSrc} alt="" />
              ) : (
                <div className="profile-page__avatar-fallback">{initials}</div>
              )}

              {canUploadPhoto && (
                <>
                  <button
                    type="button"
                    className="profile-page__avatar-upload"
                    aria-label={formatMessage(messages.uploadPhoto)}
                    onClick={() => fileRef.current?.click()}
                  >
                    <CameraIcon className="h-3.5 w-3.5" />
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="profile-page__file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const url = URL.createObjectURL(file);
                      setPhotoUrl(url);
                    }}
                  />
                </>
              )}
            </div>

            <div className="profile-page__summary-body">
              <h2 className="profile-page__name">{fullName || initial.fullName}</h2>
              <div className="profile-page__meta">
                <span className="profile-page__meta-item">
                  <UserIcon className="h-3.5 w-3.5" />
                  {initial.email}
                </span>
                <span className="profile-page__meta-item">
                  <PinIcon className="h-3.5 w-3.5" />
                  {country || initial.country}
                </span>
                <span className="profile-page__meta-item">
                  <LanguagesIcon className="h-3.5 w-3.5" />
                  {language || initial.language}
                </span>
              </div>
              <p className="profile-page__hint">{formatMessage(messages.headerHint)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-page__card">
        <div className="profile-page__card-inner">
          <h3 className="profile-page__section-title">{formatMessage(messages.personalInfo)}</h3>

          <div className="profile-page__form">
            <div className="profile-page__field profile-page__field--full">
              <label className="profile-page__label" htmlFor="fullName">
                {formatMessage(messages.fullName)}
              </label>
              <input
                id="fullName"
                className="profile-page__input"
                placeholder={formatMessage(messages.fullNamePlaceholder)}
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                disabled={!canEdit}
                type="text"
              />
            </div>

            <div className="profile-page__field">
              <span className="profile-page__label">{formatMessage(messages.location)}</span>
              <SearchableDropdown
                value={country}
                options={countryOptions}
                onChange={setCountry}
                triggerLabel={countryTrigger}
                searchPlaceholder="Search countries..."
                noOptionsText="No countries found."
              />
            </div>

            <div className="profile-page__field">
              <span className="profile-page__label">{formatMessage(messages.language)}</span>
              <SearchableDropdown
                value={language}
                options={languageOptions}
                onChange={setLanguage}
                triggerLabel={languageTrigger}
                searchPlaceholder="Search languages..."
                noOptionsText="No languages found."
              />
            </div>

            <div className="profile-page__field profile-page__field--full">
              <label className="profile-page__label" htmlFor="about">
                {formatMessage(messages.about)}
              </label>
              <textarea
                id="about"
                className="profile-page__textarea"
                rows={5}
                placeholder={formatMessage(messages.aboutPlaceholder)}
                value={about}
                onChange={e => setAbout(e.target.value)}
                disabled={!canEdit}
              />
              <p className="profile-page__helper">{formatMessage(messages.aboutHelper)}</p>
            </div>
          </div>

          <div className="profile-page__footer">
            <button type="button" className="profile-page__outline-button" onClick={onCancel} disabled={!canEdit}>
              {formatMessage(messages.cancel)}
            </button>
            <button type="button" className="profile-page__primary-button" onClick={onSave} disabled={!canEdit}>
              <SaveIcon className="h-4 w-4" />
              {formatMessage(messages.save)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

