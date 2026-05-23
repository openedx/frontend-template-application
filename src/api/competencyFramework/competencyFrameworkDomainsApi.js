import { executeApiRequest } from '../apiRequest';
import { OPTIONS_DOMAINS, competencyFrameworkDomains } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchDomainOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${OPTIONS_DOMAINS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.domainOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function, payload: object }} params
 */
export const createDomainOption = ({ formatMessage, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${OPTIONS_DOMAINS}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.domainCreateError,
});

/**
 * @param {{ formatMessage: Function, frameworkUuid: string }} params
 */
export const fetchFrameworkDomains = ({ formatMessage, frameworkUuid }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkDomains(frameworkUuid)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.domainsLoadError,
});

/**
 * @param {{ formatMessage: Function, frameworkUuid: string, payload: object }} params
 */
export const syncFrameworkDomains = ({ formatMessage, frameworkUuid, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkDomains(frameworkUuid)}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.domainsSaveError,
});
