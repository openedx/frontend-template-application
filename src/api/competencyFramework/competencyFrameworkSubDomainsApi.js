import { executeApiRequest } from '../apiRequest';
import { OPTIONS_SUB_DOMAINS, competencyFrameworkSubDomains } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';

/**
 * @param {{ formatMessage: Function, domainId?: string|number }} params
 */
export const fetchSubDomainOptions = ({ formatMessage, domainId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const baseUrl = `${getApiBaseUrl()}${OPTIONS_SUB_DOMAINS}`;
    const url = domainId != null && String(domainId).trim() !== ''
      ? `${baseUrl}?domain=${encodeURIComponent(String(domainId))}`
      : baseUrl;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.subDomainOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function, payload: object }} params
 */
export const createSubDomainOption = ({ formatMessage, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${OPTIONS_SUB_DOMAINS}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.subDomainCreateError,
});

/**
 * @param {{ formatMessage: Function, frameworkUuid: string }} params
 */
export const fetchFrameworkSubDomains = ({ formatMessage, frameworkUuid }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkSubDomains(frameworkUuid)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.subDomainsLoadError,
});

/**
 * @param {{ formatMessage: Function, frameworkUuid: string, payload: object }} params
 */
export const syncFrameworkSubDomains = ({ formatMessage, frameworkUuid, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkSubDomains(frameworkUuid)}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.subDomainsSaveError,
});
