import { executeApiRequest } from '../apiRequest';
import {
  API_PAGE_SIZE,
  COUNTRIES,
  ROLE_ASSIGNMENT_ROLE_OPTIONS,
  ROLE_ASSIGNMENT_USERS,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import usersMessages from '../../pages/users/messages';

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchRoleOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_ROLE_OPTIONS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: usersMessages.roleOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function, page?: number, search?: string, roleValue?: string, providerId?: string|number }} params
 */
export const fetchUsersList = ({
  formatMessage,
  page = 1,
  search,
  roleValue,
  providerId,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_USERS}`;
    const params = {
      page,
      page_size: API_PAGE_SIZE,
    };
    const trimmedSearch = search?.trim();
    if (trimmedSearch) {
      params.search = trimmedSearch;
    }
    const trimmedRole = roleValue?.trim();
    if (trimmedRole) {
      params.value = trimmedRole;
    }
    if (providerId != null && providerId !== '') {
      params.provider = providerId;
    }
    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: usersMessages.listLoadError,
});

/**
 * @param {{ formatMessage: Function, userId: string|number }} params
 */
export const fetchUserDetail = ({ formatMessage, userId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_USERS}${userId}/`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: usersMessages.detailLoadError,
});

/**
 * @param {{ formatMessage: Function, payload: object }} params
 */
export const createUser = ({ formatMessage, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_USERS}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: usersMessages.createError,
});

/**
 * @param {{ formatMessage: Function, userId: string|number, payload: object }} params
 */
export const updateUser = ({ formatMessage, userId, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_USERS}${userId}/`;
    return httpClient.patch(url, payload);
  },
  formatMessage,
  fallbackMessage: usersMessages.updateError,
});

/**
 * @param {{ formatMessage: Function, userId: string|number }} params
 */
export const deleteUser = ({ formatMessage, userId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_USERS}${userId}/`;
    return httpClient.delete(url);
  },
  formatMessage,
  fallbackMessage: usersMessages.deleteError,
});

/**
 * Countries catalog for user form (all countries).
 * @param {{ formatMessage: Function }} params
 */
export const fetchCountriesForUserForm = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${COUNTRIES}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: usersMessages.countriesLoadError,
});
