import { executeApiRequest } from '../apiRequest';
import { competencyFrameworkOrganizationCompetencies } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';

/**
 * @param {{ formatMessage: Function, frameworkUuid: string }} params
 */
export const fetchFrameworkOrganizationCompetencies = ({ formatMessage, frameworkUuid }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkOrganizationCompetencies(frameworkUuid)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.orgCompetenciesLoadError,
});

/**
 * @param {{ formatMessage: Function, frameworkUuid: string, payload: object }} params
 */
export const syncFrameworkOrganizationCompetencies = ({ formatMessage, frameworkUuid, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkOrganizationCompetencies(frameworkUuid)}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.orgCompetenciesSaveError,
});
