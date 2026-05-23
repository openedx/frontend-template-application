import { executeApiRequest } from '../apiRequest';
import { competencyFrameworkActivities } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';

/**
 * @param {{ formatMessage: Function, frameworkUuid: string }} params
 */
export const fetchFrameworkRoleActivities = ({ formatMessage, frameworkUuid }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkActivities(frameworkUuid)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.roleActivitiesLoadError,
});

/**
 * @param {{ formatMessage: Function, frameworkUuid: string, payload: object }} params
 */
export const syncFrameworkRoleActivities = ({ formatMessage, frameworkUuid, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkActivities(frameworkUuid)}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.roleActivitiesSaveError,
});
