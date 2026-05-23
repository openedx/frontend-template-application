import { executeApiRequest } from '../apiRequest';
import { API_PAGE_SIZE, NRAS_ONBOARD } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import nrasMessages from '../../pages/nras/messages';

/**
 * @param {{ formatMessage: Function, page?: number, search?: string }} params
 */
export const fetchNrasOnboardList = ({ formatMessage, page = 1, search }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${NRAS_ONBOARD}`;
    const params = {
      page,
      page_size: API_PAGE_SIZE,
    };
    const trimmedSearch = search?.trim();

    if (trimmedSearch) {
      params.search = trimmedSearch;
    }

    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: nrasMessages.listLoadError,
});

/**
 * @param {{ formatMessage: Function, nraId: string|number }} params
 */
export const fetchNraOnboardDetail = ({ formatMessage, nraId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${NRAS_ONBOARD}${nraId}/`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: nrasMessages.detailLoadError,
});

/**
 * @param {{ formatMessage: Function, payload: object }} params
 */
export const createNraOnboard = ({ formatMessage, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${NRAS_ONBOARD}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: nrasMessages.createError,
});

/**
 * @param {{ formatMessage: Function, nraId: string|number, payload: object }} params
 */
export const updateNraOnboard = ({ formatMessage, nraId, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${NRAS_ONBOARD}${nraId}/`;
    return httpClient.patch(url, payload);
  },
  formatMessage,
  fallbackMessage: nrasMessages.updateError,
});

/**
 * @param {{ formatMessage: Function, nraId: string|number }} params
 */
export const deleteNraOnboard = ({ formatMessage, nraId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${NRAS_ONBOARD}${nraId}/`;
    return httpClient.delete(url);
  },
  formatMessage,
  fallbackMessage: nrasMessages.deleteError,
});
