import { executeApiRequest } from '../apiRequest';
import {
  DASHBOARD_PENDING_REQUESTS_PAGE_SIZE,
  DASHBOARD_STATS,
  DASHBOARD_TOP_REQUESTED_ACTIVITIES,
  DASHBOARD_TOP_TRAININGS,
  DASHBOARD_NRA_ADMIN_POPULAR_TRAININGS,
  DASHBOARD_USERS_PER_COUNTRY,
  PENDING_REQUESTS_LIST,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import dashboardMessages from '../../pages/dashboard/messages';
import {
  resolveDashboardCompletedTrainingsEndpoint,
  resolveDashboardQuickActionsEndpoint,
  resolveDashboardRecentActivityEndpoint,
} from './dashboardScopeUtils';

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
 * GET /api/v1/dashboard/nra-admin/recent-activity/
 * GET /api/v1/dashboard/nra-manager/recent-activity/
 * GET /api/v1/dashboard/nra-staff/recent-activity/
 * @param {{ formatMessage: Function, userRole?: string|null }} params
 */
export const fetchDashboardRecentActivities = ({ formatMessage, userRole = null }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${resolveDashboardRecentActivityEndpoint(userRole)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: dashboardMessages.recentActivitiesLoadError,
});

/**
 * GET /api/v1/dashboard/nra-admin/popular-trainings/
 * @param {{ formatMessage: Function }} params
 */
export const fetchDashboardPopularTrainings = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${DASHBOARD_NRA_ADMIN_POPULAR_TRAININGS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: dashboardMessages.popularTrainingsLoadError,
});

/**
 * GET /api/v1/dashboard/quick-actions/
 * GET /api/v1/dashboard/nra-manager/quick-actions/
 * @param {{ formatMessage: Function, userRole?: string|null }} params
 */
export const fetchDashboardQuickActions = ({ formatMessage, userRole = null }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${resolveDashboardQuickActionsEndpoint(userRole)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: dashboardMessages.quickActionsLoadError,
});

/**
 * GET /api/v1/dashboard/recent-training-completions/
 * GET /api/v1/dashboard/nra-staff/completed-trainings/
 * @param {{ formatMessage: Function, userRole?: string|null }} params
 */
export const fetchDashboardRecentTrainingCompletions = ({ formatMessage, userRole = null }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${resolveDashboardCompletedTrainingsEndpoint(userRole)}`;
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
