import { executeApiRequest } from '../apiRequest';
import { API_PAGE_SIZE, ROLE_ASSIGNMENT_PERMISSIONS, ROLE_ASSIGNMENT_ROLES } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import rolesMessages from '../../pages/roles/messages';

/**
 * @param {{ formatMessage: Function, page?: number }} params
 */
export const fetchRolesList = ({ formatMessage, page = 1 }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_ROLES}`;
    return httpClient.get(url, {
      params: {
        page,
        page_size: API_PAGE_SIZE,
      },
    });
  },
  formatMessage,
  fallbackMessage: rolesMessages.listLoadError,
});

/**
 * @param {{ formatMessage: Function, roleId: string|number }} params
 */
export const fetchRoleDetail = ({ formatMessage, roleId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_ROLES}${roleId}/`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: rolesMessages.detailLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchRolePermissions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_PERMISSIONS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: rolesMessages.permissionsLoadError,
});

/**
 * @param {{ formatMessage: Function, payload: object }} params
 */
export const createRole = ({ formatMessage, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_ROLES}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: rolesMessages.createError,
});

/**
 * @param {{ formatMessage: Function, roleId: string|number, payload: object }} params
 */
export const updateRole = ({ formatMessage, roleId, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_ROLES}${roleId}/`;
    return httpClient.patch(url, payload);
  },
  formatMessage,
  fallbackMessage: rolesMessages.updateError,
});

/**
 * @param {{ formatMessage: Function, roleId: string|number }} params
 */
export const deleteRole = ({ formatMessage, roleId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_ROLES}${roleId}/`;
    return httpClient.delete(url);
  },
  formatMessage,
  fallbackMessage: rolesMessages.deleteError,
});
