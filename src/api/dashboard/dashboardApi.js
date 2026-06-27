import { executeApiRequest } from '../apiRequest';
import {
  DASHBOARD_PENDING_REQUESTS_PAGE_SIZE,
  DASHBOARD_STATS,
  DASHBOARD_TOP_REQUESTED_ACTIVITIES,
  DASHBOARD_TOP_TRAININGS,
  DASHBOARD_RECENT_ACTIVITIES,
  DASHBOARD_POPULAR_TRAININGS,
  DASHBOARD_QUICK_ACTIONS,
  DASHBOARD_RECENT_TRAINING_COMPLETIONS,
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
export const fetchDashboardTopTrainings = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${DASHBOARD_TOP_TRAININGS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: dashboardMessages.topTrainingsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchDashboardRecentActivities = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${DASHBOARD_RECENT_ACTIVITIES}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: dashboardMessages.recentActivitiesLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchDashboardPopularTrainings = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${DASHBOARD_POPULAR_TRAININGS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: dashboardMessages.popularTrainingsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchDashboardQuickActions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${DASHBOARD_QUICK_ACTIONS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: dashboardMessages.quickActionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchDashboardRecentTrainingCompletions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${DASHBOARD_RECENT_TRAINING_COMPLETIONS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: dashboardMessages.recentTrainingCompletionsLoadError,
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
