import { executeApiRequest } from '../apiRequest';
import {
  NRAS_MANAGEMENT_ADMIN_ROLE_REQUESTS,
  ROLE_ASSIGNMENT_LANGUAGES,
  ROLE_ASSIGNMENT_PROFILE,
  ROLE_ASSIGNMENT_PROFILE_MANAGERS,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import { isUploadableFile, patchMultipart } from '../multipartRequest';
import profileMessages from '../../pages/profile/messages';
import {
  buildAdminRoleRequestBody,
  buildProfilePatchBody,
  buildProfilePatchFormData,
} from './profileUtils';

/**
 * GET /api/v1/role-assignment/profile/
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
 * GET /api/v1/role-assignment/languages/
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
 * GET /api/v1/role-assignment/profile/managers/
 * @param {{ formatMessage: Function }} params
 */
export const fetchProfileManagerOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_PROFILE_MANAGERS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: profileMessages.managerOptionsLoadError,
});

/**
 * PATCH /api/v1/role-assignment/profile/
 * Payload keys: full_name, country, language, about, profile_image, manager, competency_role
 * @param {{
 *   formatMessage: Function,
 *   fullName?: string,
 *   country?: string,
 *   language?: string,
 *   about?: string,
 *   manager?: string,
 *   competencyRole?: string[]|string,
 *   profileImageFile?: File|null,
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
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_PROFILE}`;

    if (isUploadableFile(profileImageFile)) {
      const formData = buildProfilePatchFormData({
        fullName,
        country,
        language,
        about,
        manager,
        competencyRole,
        profileImageFile,
      });

      return patchMultipart(httpClient, url, formData);
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
  fallbackMessage: profileMessages.profileSaveError,
});

/**
 * POST /api/v1/nras-management/admin-role-requests/
 * @param {{ formatMessage: Function }} params
 */
export const postAdminRoleRequest = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${NRAS_MANAGEMENT_ADMIN_ROLE_REQUESTS}`;
    return httpClient.post(url, buildAdminRoleRequestBody());
  },
  formatMessage,
  fallbackMessage: profileMessages.requestAdminRoleError,
});
