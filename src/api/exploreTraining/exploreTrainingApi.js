import { executeApiRequest } from '../apiRequest';
import {
  ACTIVITIES_LIST,
  API_PAGE_SIZE,
  EXPLORE_TRAININGS_ROLES,
  OPTIONS_DOMAINS,
  OPTIONS_PRODUCT_TYPES,
  OPTIONS_SUB_DOMAINS,
  TRAININGS_CATALOG_OPTIONS_NRA_OBJECTIVES,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import exploreTrainingMessages from '../../pages/exploreTraining/messages';
import { buildExploreActivityParams } from './exploreTrainingUtils';

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchExploreTrainingRoles = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    return httpClient.get(`${getApiBaseUrl()}${EXPLORE_TRAININGS_ROLES}`);
  },
  formatMessage,
  fallbackMessage: exploreTrainingMessages.rolesLoadError,
});

/**
 * @param {{
 *   formatMessage: Function,
 *   role: string|number,
 *   page?: number,
 *   pageSize?: number,
 *   search?: string,
 *   productType?: string,
 *   domain?: string,
 *   subDomain?: string,
 *   objective?: string,
 *   profile?: string,
 * }} params
 */
export const fetchExploreTrainingActivities = ({
  formatMessage,
  role,
  page = 1,
  pageSize = API_PAGE_SIZE,
  search,
  productType,
  domain,
  subDomain,
  objective,
  profile,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ACTIVITIES_LIST}`;
    const params = buildExploreActivityParams({
      page,
      pageSize,
      role,
      search,
      productType,
      domain,
      subDomain,
      objective,
      profile,
    });
    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: exploreTrainingMessages.activitiesLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchExploreTrainingProductTypeOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    return httpClient.get(`${getApiBaseUrl()}${OPTIONS_PRODUCT_TYPES}`);
  },
  formatMessage,
  fallbackMessage: exploreTrainingMessages.productTypeOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchExploreTrainingDomainOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    return httpClient.get(`${getApiBaseUrl()}${OPTIONS_DOMAINS}`);
  },
  formatMessage,
  fallbackMessage: exploreTrainingMessages.domainOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchExploreTrainingSubDomainOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    return httpClient.get(`${getApiBaseUrl()}${OPTIONS_SUB_DOMAINS}`);
  },
  formatMessage,
  fallbackMessage: exploreTrainingMessages.subDomainOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchExploreTrainingObjectiveOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    return httpClient.get(`${getApiBaseUrl()}${TRAININGS_CATALOG_OPTIONS_NRA_OBJECTIVES}`);
  },
  formatMessage,
  fallbackMessage: exploreTrainingMessages.objectiveOptionsLoadError,
});
