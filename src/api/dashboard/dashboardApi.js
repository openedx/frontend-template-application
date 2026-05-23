import { executeApiRequest } from '../apiRequest';
import {
  DASHBOARD_PENDING_REQUESTS_PAGE_SIZE,
  DASHBOARD_STATS,
  DASHBOARD_TOP_REQUESTED_ACTIVITIES,
  DASHBOARD_USERS_PER_COUNTRY,
  PENDING_REQUESTS_LIST,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import dashboardMessages from '../../pages/dashboard/messages';

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchDashboardStats = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${DASHBOARD_STATS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: dashboardMessages.statsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchDashboardUsersPerCountry = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${DASHBOARD_USERS_PER_COUNTRY}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: dashboardMessages.usersPerCountryLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchDashboardTopRequestedActivities = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${DASHBOARD_TOP_REQUESTED_ACTIVITIES}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: dashboardMessages.topRequestedActivitiesLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchDashboardPendingRequests = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${PENDING_REQUESTS_LIST}`;
    return httpClient.get(url, {
      params: {
        page: 1,
        page_size: DASHBOARD_PENDING_REQUESTS_PAGE_SIZE,
      },
    });
  },
  formatMessage,
  fallbackMessage: dashboardMessages.pendingRequestsLoadError,
});
