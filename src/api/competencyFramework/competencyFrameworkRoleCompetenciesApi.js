import { executeApiRequest } from '../apiRequest';
import { competencyFrameworkRoleCompetencies } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';

/**
 * @param {{ formatMessage: Function, frameworkUuid: string }} params
 */
export const fetchFrameworkRoleCompetencies = ({ formatMessage, frameworkUuid }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkRoleCompetencies(frameworkUuid)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.roleCompetenciesLoadError,
});

/**
 * @param {{ formatMessage: Function, frameworkUuid: string, payload: object }} params
 */
export const syncFrameworkRoleCompetencies = ({ formatMessage, frameworkUuid, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkRoleCompetencies(frameworkUuid)}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.roleCompetenciesSaveError,
});
