import { executeApiRequest } from '../apiRequest';
import {
  ROLE_ASSIGNMENT_LANGUAGES,
  ROLE_ASSIGNMENT_PROFILE,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import { buildProfilePatchFormData } from './profileUtils';
import profileMessages from '../../pages/profile/messages';

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchCurrentUserProfile = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_PROFILE}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: profileMessages.profileLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchProfileLanguages = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_LANGUAGES}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: profileMessages.languagesLoadError,
});

/**
 * @param {{
 *   formatMessage: Function,
 *   fullName: string,
 *   country: string,
 *   language: string,
 *   about: string,
 *   profileImageFile?: File|null,
 * }} params
 */
export const patchCurrentUserProfile = ({
  formatMessage,
  fullName,
  country,
  language,
  about,
  profileImageFile = null,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_PROFILE}`;
    const hasImageFile = profileImageFile instanceof File;

    if (hasImageFile) {
      const formData = buildProfilePatchFormData({
        fullName,
        country,
        language,
        about,
        profileImageFile,
      });

      return httpClient.patch(url, formData);
    }

    return httpClient.patch(url, {
      full_name: fullName.trim(),
      country: String(country),
      language: String(language),
      about: about.trim(),
    });
  },
  formatMessage,
  fallbackMessage: profileMessages.profileSaveError,
});
