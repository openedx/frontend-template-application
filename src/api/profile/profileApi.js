import { executeApiRequest } from '../apiRequest';
import {
  ROLE_ASSIGNMENT_LANGUAGES,
  ROLE_ASSIGNMENT_PROFILE,
  ROLE_ASSIGNMENT_PROFILE_MANAGER_OPTIONS,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import profileMessages from '../../pages/profile/messages';
import {
  buildProfilePatchBody,
  buildProfilePatchFormData,
  buildProfileRequestAdminRoleBody,
} from './profileUtils';
import {
  resolveCurrentUserProfileSaveMock,
} from './profilePageMockData';
import { resolveProfileManagerOptionsMock } from './profileManagerOptionsMockData';

const USE_PROFILE_MOCK = true;

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
 * @param {{ formatMessage: Function }} params
 */
export const fetchProfileManagerOptions = ({ formatMessage }) => {
  if (USE_PROFILE_MOCK) {
    return Promise.resolve({
      ok: true,
      message: null,
      data: resolveProfileManagerOptionsMock(),
    });
  }

  return executeApiRequest({
    request: () => {
      const httpClient = getHttpClient();
      const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_PROFILE_MANAGER_OPTIONS}`;
      return httpClient.get(url);
    },
    formatMessage,
    fallbackMessage: profileMessages.managerOptionsLoadError,
  });
};

/**
 * @param {{
 *   formatMessage: Function,
 *   fullName?: string,
 *   country?: string,
 *   language?: string,
 *   about?: string,
 *   manager?: string,
 *   competencyRole?: string[]|string,
 *   profileImageFile?: File|null,
 *   profileImagePreviewUrl?: string,
 *   requestAdminRole?: boolean,
 * }} params
 */
export const patchCurrentUserProfile = ({
  formatMessage,
  fullName,
  country,
  language,
  about,
  manager,
  competencyRole,
  profileImageFile = null,
  profileImagePreviewUrl = '',
  requestAdminRole = false,
}) => {
  if (USE_PROFILE_MOCK) {
    const result = resolveCurrentUserProfileSaveMock({
      fullName,
      country,
      language,
      about,
      manager,
      competencyRole,
      profileImagePreviewUrl,
      requestAdminRole,
    });

    return Promise.resolve({
      ok: result.ok,
      message: result.message,
      data: result.data,
    });
  }

  return executeApiRequest({
    request: () => {
      const httpClient = getHttpClient();
      const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_PROFILE}`;

      if (requestAdminRole) {
        return httpClient.patch(url, buildProfileRequestAdminRoleBody({ requestAdminRole: true }));
      }

      const hasImageFile = profileImageFile instanceof File;

      if (hasImageFile) {
        const formData = buildProfilePatchFormData({
          fullName,
          country,
          language,
          about,
          manager,
          competencyRole,
          profileImageFile,
        });

        return httpClient.patch(url, formData);
      }

      return httpClient.patch(url, buildProfilePatchBody({
        fullName,
        country,
        language,
        about,
        manager,
        competencyRole,
      }));
    },
    formatMessage,
    fallbackMessage: requestAdminRole
      ? profileMessages.requestAdminRoleError
      : profileMessages.profileSaveError,
  });
};
