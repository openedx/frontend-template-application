import { executeApiRequest } from '../apiRequest';
import { API_PAGE_SIZE, SEARN_TRAINING_CATALOG, searnTrainingCatalogDetail, searnTrainingCatalogFeedback, searnTrainingCatalogProviderDetail } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';
import { buildSearnTrainingCatalogListParams } from './searnTrainingCatalogUtils';

/**
 * @param {{ formatMessage: Function, page?: number, pageSize?: number, search?: string, frameworkFilter?: string, roleFilter?: string, domainFilter?: string, subDomainFilter?: string, activityFilter?: string, nraGoalFilter?: string, providerFilter?: string }} params
 */
export const fetchSearnTrainingCatalogList = ({
  formatMessage,
  page = 1,
  pageSize = API_PAGE_SIZE,
  search,
  frameworkFilter,
  roleFilter,
  domainFilter,
  subDomainFilter,
  activityFilter,
  nraGoalFilter,
  providerFilter,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${SEARN_TRAINING_CATALOG}`;
    const params = buildSearnTrainingCatalogListParams({
      page,
      pageSize,
      search,
      frameworkFilter,
      roleFilter,
      domainFilter,
      subDomainFilter,
      activityFilter,
      nraGoalFilter,
      providerFilter,
    });

    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: catalogMessages.listLoadError,
});

/**
 * @param {{ formatMessage: Function, trainingId: string|number }} params
 */
export const fetchSearnTrainingCatalogDetail = ({ formatMessage, trainingId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${searnTrainingCatalogDetail(trainingId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: catalogMessages.detailLoadError,
});

/**
 * @param {{ formatMessage: Function, trainingId: string|number }} params
 */
export const fetchSearnTrainingCatalogFeedback = ({ formatMessage, trainingId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${searnTrainingCatalogFeedback(trainingId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: catalogMessages.feedbackLoadError,
});

/**
 * @param {{ formatMessage: Function, providerSlug: string }} params
 */
export const fetchSearnTrainingCatalogProvider = ({ formatMessage, providerSlug }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${searnTrainingCatalogProviderDetail(providerSlug)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: catalogMessages.providerLoadError,
});
