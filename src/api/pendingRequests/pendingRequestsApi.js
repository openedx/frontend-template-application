import { executeApiRequest } from '../apiRequest';
import {
  API_PAGE_SIZE,
  PENDING_REQUESTS_FILTERS,
  PENDING_REQUESTS_LIST,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import pendingRequestsMessages from '../../pages/pendingRequests/messages';

/**
 * Public filter options (no login required per API spec).
 * @param {{ formatMessage: Function }} params
 */
export const fetchPendingRequestFilters = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${PENDING_REQUESTS_FILTERS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: pendingRequestsMessages.filtersLoadError,
});

/**
 * @param {{ formatMessage: Function, page?: number, search?: string, type?: string }} params
 */
export const fetchPendingRequestsList = ({
  formatMessage,
  page = 1,
  search,
  type,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${PENDING_REQUESTS_LIST}`;
    const params = {
      page,
      page_size: API_PAGE_SIZE,
    };
    const trimmedSearch = search?.trim();
    if (trimmedSearch) {
      params.search = trimmedSearch;
    }
    if (type && type !== 'all') {
      params.type = type;
    }
    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: pendingRequestsMessages.listLoadError,
});

/**
 * @param {{ formatMessage: Function, id: string|number }} params
 */
export const fetchPendingRequestDetail = ({ formatMessage, id }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${PENDING_REQUESTS_LIST}${id}/`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: pendingRequestsMessages.detailLoadError,
});

/**
 * @param {{ formatMessage: Function, id: string|number, action: string }} params
 */
export const patchPendingRequestAction = ({ formatMessage, id, action }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${PENDING_REQUESTS_LIST}${id}/`;
    return httpClient.patch(url, { action });
  },
  formatMessage,
  fallbackMessage: pendingRequestsMessages.actionError,
});