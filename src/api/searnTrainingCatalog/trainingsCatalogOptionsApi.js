import { executeApiRequest } from '../apiRequest';
import {
  TRAININGS_CATALOG_OPTIONS_COMPETENCY_FRAMEWORKS,
  TRAININGS_CATALOG_OPTIONS_MAPPED_ACTIVITIES,
  TRAININGS_CATALOG_OPTIONS_NRA_OBJECTIVES,
  TRAININGS_CATALOG_OPTIONS_TRAINING_PROVIDERS,
  trainingsCatalogOptionsFrameworkDomains,
  trainingsCatalogOptionsFrameworkRoles,
  trainingsCatalogOptionsFrameworkSubDomains,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchTrainingsCatalogCompetencyFrameworkOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAININGS_CATALOG_OPTIONS_COMPETENCY_FRAMEWORKS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: catalogMessages.frameworkOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function, frameworkIdentifier: string }} params
 */
export const fetchTrainingsCatalogFrameworkRoleOptions = ({ formatMessage, frameworkIdentifier }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${trainingsCatalogOptionsFrameworkRoles(frameworkIdentifier)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: catalogMessages.roleOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function, frameworkIdentifier: string }} params
 */
export const fetchTrainingsCatalogFrameworkDomainOptions = ({ formatMessage, frameworkIdentifier }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${trainingsCatalogOptionsFrameworkDomains(frameworkIdentifier)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: catalogMessages.domainOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function, frameworkIdentifier: string }} params
 */
export const fetchTrainingsCatalogFrameworkSubDomainOptions = ({ formatMessage, frameworkIdentifier }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${trainingsCatalogOptionsFrameworkSubDomains(frameworkIdentifier)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: catalogMessages.subDomainOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchTrainingsCatalogMappedActivityOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAININGS_CATALOG_OPTIONS_MAPPED_ACTIVITIES}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: catalogMessages.activityOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchTrainingsCatalogNraObjectiveOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAININGS_CATALOG_OPTIONS_NRA_OBJECTIVES}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: catalogMessages.nraObjectiveOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchTrainingsCatalogTrainingProviderOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAININGS_CATALOG_OPTIONS_TRAINING_PROVIDERS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: catalogMessages.providerOptionsLoadError,
});
