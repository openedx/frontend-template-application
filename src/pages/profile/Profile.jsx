/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useRef, useState } from 'react';
import CommaSeparatedInput from '../../components/commaSeparatedInput/CommaSeparatedInput';
import { EmptyState } from '../../components/emptyState';
import ProfilePageAvatar from '../../components/users/ProfilePageAvatar';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import {
  formatCompetencyRoleForInput,
  formatManagerForProfileApi,
  getCountryLabelByValue,
  getLanguageLabelByValue,
  getManagerLabelByValue,
  parseCompetencyRoleForApi,
  resolveCountryDropdownValue,
  resolveLanguageDropdownValue,
  resolveManagerDropdownValue,
} from '../../api/profile/profileUtils';
import useCurrentUserProfile from '../../hooks/profile/useCurrentUserProfile';
import useProfileCountries from '../../hooks/profile/useProfileCountries';
import useProfileLanguages from '../../hooks/profile/useProfileLanguages';
import useProfileManagerOptions from '../../hooks/profile/useProfileManagerOptions';
import useProfileMutation from '../../hooks/profile/useProfileMutation';
import useRequestAdminRoleMutation from '../../hooks/profile/useRequestAdminRoleMutation';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
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
  const { componentAccess } = useUserRole();
  const profileAccess = componentAccess?.profile ?? {};
  const showManagerField = Boolean(profileAccess.showManagerField);
  const showCompetencyRoleField = Boolean(profileAccess.showCompetencyRoleField);
  const canRequestAdminRole = Boolean(profileAccess.canRequestAdminRole);
  const canEdit = true;
  const canUploadPhoto = true;

  const fileRef = useRef(null);

  const {
    profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    errorMessage: profileErrorMessage,
    refetch: refetchProfile,
  } = useCurrentUserProfile();

  const {
    dropdownOptions: countryOptions,
    isLoading: isCountriesLoading,
    isError: isCountriesError,
    errorMessage: countriesErrorMessage,
  } = useProfileCountries();

  const {
    dropdownOptions: languageOptions,
    isLoading: isLanguagesLoading,
    isError: isLanguagesError,
    errorMessage: languagesErrorMessage,
  } = useProfileLanguages();

  const {
    dropdownOptions: managerOptions,
    isLoading: isManagerOptionsLoading,
    isError: isManagerOptionsError,
    errorMessage: managerOptionsErrorMessage,
  } = useProfileManagerOptions({ enabled: showManagerField });

  const { updateMutation } = useProfileMutation();
  const { requestMutation } = useRequestAdminRoleMutation();

  const [photoPreview, setPhotoPreview] = useState('');
  const [pendingImageFile, setPendingImageFile] = useState(null);
  const [savedProfileImageUrl, setSavedProfileImageUrl] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [manager, setManager] = useState('');
  const [competencyRole, setCompetencyRole] = useState('');
  const [about, setAbout] = useState('');

  const isPageLoading = isProfileLoading
    || isCountriesLoading
    || isLanguagesLoading
    || (showManagerField && isManagerOptionsLoading);
  const isPickerError = isCountriesError
    || isLanguagesError
    || (showManagerField && isManagerOptionsError);
  const isSaveDisabled = !canEdit
    || updateMutation.isPending
    || isPageLoading
    || isProfileError
    || isPickerError;

  const applyProfileToForm = (profileData) => {
    if (!profileData) {
      return;
    }

    setFullName(hasDisplayValue(profileData.fullName) ? profileData.fullName : '');
    setAbout(hasDisplayValue(profileData.about) ? profileData.about : '');
    setLanguage(resolveLanguageDropdownValue(profileData.language, languageOptions));
    setManager(resolveManagerDropdownValue(profileData.manager, managerOptions));
    setCompetencyRole(formatCompetencyRoleForInput(profileData.competencyRole));
    setSavedProfileImageUrl(hasDisplayValue(profileData.profileImageUrl) ? profileData.profileImageUrl : '');
    setPhotoPreview('');
    setPendingImageFile(null);
    setCountry(resolveCountryDropdownValue(profileData.country, countryOptions));
  };

  useEffect(() => {
    if (!profile) {
      return;
    }

    applyProfileToForm(profile);
  }, [profile, countryOptions, languageOptions, managerOptions]);

  useEffect(() => {
    if (!isProfileError) {
      return;
    }

    showToast({
      title: formatMessage(messages.profileErrorTitle),
      description: profileErrorMessage || formatMessage(messages.profileLoadError),
    });
  }, [formatMessage, isProfileError, profileErrorMessage, showToast]);

  useEffect(() => {
    if (!isCountriesError && !isLanguagesError && !(showManagerField && isManagerOptionsError)) {
      return;
    }

    showToast({
      title: formatMessage(messages.profileErrorTitle),
      description: countriesErrorMessage
        || languagesErrorMessage
        || managerOptionsErrorMessage,
    });
  }, [
    countriesErrorMessage,
    formatMessage,
    isCountriesError,
    isLanguagesError,
    isManagerOptionsError,
    languagesErrorMessage,
    managerOptionsErrorMessage,
    showManagerField,
    showToast,
  ]);

  const displayAvatarSrc = photoPreview || savedProfileImageUrl;

  const countryLabel = useMemo(
    () => getCountryLabelByValue(country, countryOptions)
      || (hasDisplayValue(profile?.countryLabel) ? profile.countryLabel : ''),
    [country, countryOptions, profile?.countryLabel],
  );

  const languageLabel = useMemo(
    () => getLanguageLabelByValue(language, languageOptions),
    [language, languageOptions],
  );

  const managerLabel = useMemo(
    () => getManagerLabelByValue(manager, managerOptions),
    [manager, managerOptions],
  );

  const onCancel = () => {
    applyProfileToForm(profile);
  };

  const onSave = async () => {
    if (isSaveDisabled) {
      return;
    }

    try {
      const result = await updateMutation.mutateAsync({
        fullName,
        country,
        language,
        about,
        profileImageFile: pendingImageFile,
        ...(showManagerField ? { manager: formatManagerForProfileApi(manager, managerOptions) } : {}),
        ...(showCompetencyRoleField ? { competencyRole: parseCompetencyRoleForApi(competencyRole) } : {}),
      });

      showToast({
        title: formatMessage(messages.toastSavedTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.toastSavedDescription),
      });

      await refetchProfile();
    } catch (error) {
      showToast({
        title: formatMessage(messages.saveErrorTitle),
        description: error?.message || formatMessage(messages.profileSaveError),
      });
    }
  };

  const onRequestAdminRole = async () => {
    if (
      !canRequestAdminRole
      || !profile?.canRequestAdminRoleFromApi
      || requestMutation.isPending
    ) {
      return;
    }

    try {
      const result = await requestMutation.mutateAsync();
      showToast({
        title: formatMessage(messages.requestAdminRoleSuccessTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.requestAdminRoleSuccess),
      });
      await refetchProfile();
    } catch (error) {
      showToast({
        title: formatMessage(messages.requestAdminRoleErrorTitle),
        description: error?.message || formatMessage(messages.requestAdminRoleError),
      });
    }
  };

  const profileDisplayName = fullName || profile?.fullName;

  const countryTrigger = countryLabel ? (
    countryLabel
  ) : (
    <span className="profile-page__placeholder">{formatMessage(messages.countryPlaceholder)}</span>
  );

  const languageTrigger = languageLabel ? (
    languageLabel
  ) : (
    <span className="profile-page__placeholder">{formatMessage(messages.languagePlaceholder)}</span>
  );

  const managerTrigger = managerLabel ? (
    managerLabel
  ) : (
    <span className="profile-page__placeholder">{formatMessage(messages.managerPlaceholder)}</span>
  );

  const showRequestAdminRoleButton = canRequestAdminRole && profile?.canRequestAdminRoleFromApi;

  if (isPageLoading) {
    return (
      <section className="profile-page">
        <SkeletonScreen variant={SKELETON_VARIANTS.PAGE} />
      </section>
    );
  }

  if (isProfileError || !profile) {
    return (
      <section className="profile-page">
        <EmptyState
          message={profileErrorMessage || formatMessage(messages.profileLoadError)}
          fullSize
        />
      </section>
    );
  }

  return (
    <section className="profile-page">
      <div className="profile-page__card">
        <div className="profile-page__card-inner">
          <div className="profile-page__summary">
            <ProfilePageAvatar name={profileDisplayName} imageUrl={displayAvatarSrc}>
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
                      if (!file) {
                        return;
                      }
                      setPendingImageFile(file);
                      setPhotoPreview(URL.createObjectURL(file));
                    }}
                  />
                </>
              )}
            </ProfilePageAvatar>

            <div className="profile-page__summary-body">
              {hasDisplayValue(fullName) && (
                <h2 className="profile-page__name">{fullName}</h2>
              )}
              <div className="profile-page__meta">
                {hasDisplayValue(profile.email) && (
                  <span className="profile-page__meta-item">
                    <UserIcon className="h-3.5 w-3.5" />
                    {profile.email}
                  </span>
                )}
                {hasDisplayValue(countryLabel) && (
                  <span className="profile-page__meta-item">
                    <PinIcon className="h-3.5 w-3.5" />
                    {countryLabel}
                  </span>
                )}
                {hasDisplayValue(languageLabel) && (
                  <span className="profile-page__meta-item">
                    <LanguagesIcon className="h-3.5 w-3.5" />
                    {languageLabel}
                  </span>
                )}
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
                onChange={(e) => setFullName(e.target.value)}
                disabled={!canEdit || isSaveDisabled}
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
                searchPlaceholder={formatMessage(messages.countrySearchPlaceholder)}
                noOptionsText={formatMessage(messages.countryNoOptions)}
              />
            </div>

            <div className="profile-page__field">
              <span className="profile-page__label">{formatMessage(messages.language)}</span>
              <SearchableDropdown
                value={language}
                options={languageOptions}
                onChange={setLanguage}
                triggerLabel={languageTrigger}
                searchPlaceholder={formatMessage(messages.languageSearchPlaceholder)}
                noOptionsText={formatMessage(messages.languageNoOptions)}
              />
            </div>

            {showManagerField && (
              <div className="profile-page__field profile-page__field--full">
                <label className="profile-page__label" htmlFor="manager">
                  {formatMessage(messages.manager)}
                  {' '}
                  <span className="profile-page__label-optional">
                    {formatMessage(messages.managerOptional)}
                  </span>
                </label>
                <SearchableDropdown
                  value={manager}
                  options={managerOptions}
                  onChange={setManager}
                  disabled={!canEdit || isSaveDisabled}
                  triggerLabel={managerTrigger}
                  searchPlaceholder={formatMessage(messages.managerSearchPlaceholder)}
                  noOptionsText={formatMessage(messages.managerNoOptions)}
                />
              </div>
            )}

            {showCompetencyRoleField && (
              <div className="profile-page__field profile-page__field--full">
                <label className="profile-page__label" htmlFor="competencyRole">
                  {formatMessage(messages.competencyRole)}
                </label>
                <CommaSeparatedInput
                  value={competencyRole}
                  onChange={setCompetencyRole}
                  placeholder={formatMessage(messages.competencyRolePlaceholder)}
                  helperText={formatMessage(messages.competencyRoleHelper)}
                  disabled={!canEdit || isSaveDisabled}
                />
              </div>
            )}

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
                onChange={(e) => setAbout(e.target.value)}
                disabled={!canEdit || isSaveDisabled}
              />
              <p className="profile-page__helper">{formatMessage(messages.aboutHelper)}</p>
            </div>
          </div>

          <div className="profile-page__footer">
            <div className="profile-page__footer-start">
              {showRequestAdminRoleButton && (
                <button
                  type="button"
                  className="profile-page__request-admin-button"
                  onClick={onRequestAdminRole}
                  disabled={requestMutation.isPending || isSaveDisabled}
                >
                  <FontAwesomeIcon icon={faUserShield} aria-hidden />
                  {formatMessage(messages.requestAdminRole)}
                </button>
              )}
            </div>
            <div className="profile-page__footer-actions">
              <button
                type="button"
                className="profile-page__outline-button"
                onClick={onCancel}
                disabled={isSaveDisabled}
              >
                {formatMessage(messages.cancel)}
              </button>
              <button
                type="button"
                className="profile-page__primary-button"
                onClick={onSave}
                disabled={isSaveDisabled}
              >
                <SaveIcon className="h-4 w-4" />
                {formatMessage(messages.save)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
