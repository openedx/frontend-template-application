import { executeApiRequest } from '../apiRequest';
import {
  API_PAGE_SIZE,
  TRAININGS_CATALOG,
  TRAININGS_CATALOG_OPTIONS_APPROACHES,
  TRAININGS_CATALOG_OPTIONS_EVALUATIONS,
  TRAININGS_CATALOG_OPTIONS_LANGUAGE,
  TRAININGS_CATALOG_OPTIONS_MAPPED_COMPETENCIES,
  TRAININGS_CATALOG_OPTIONS_OUTCOMES,
  TRAININGS_CATALOG_OPTIONS_PRODUCT_TYPES,
  TRAININGS_CATALOG_OPTIONS_TRAINING_MODES,
  trainingsCatalogDetail,
  trainingsCatalogDetails,
  trainingsCatalogFeedback,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import myTrainingCatalogMessages from '../../pages/myTrainingCatalog/messages';
import { buildMyTrainingCatalogListParams } from './myTrainingCatalogUtils';

/**
 * @param {{
 *   formatMessage: Function,
 *   page?: number,
 *   pageSize?: number,
 *   search?: string,
 *   frameworkFilter?: string,
 *   roleFilter?: string,
 *   domainFilter?: string,
 *   subDomainFilter?: string,
 *   activityFilter?: string,
 *   nraGoalFilter?: string,
 *   catalogScope?: string,
 * }} params
 */
export const fetchMyTrainingCatalogList = ({
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
  catalogScope,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAININGS_CATALOG}`;
    const params = buildMyTrainingCatalogListParams({
      page,
      pageSize,
      search,
      frameworkFilter,
      roleFilter,
      domainFilter,
      subDomainFilter,
      activityFilter,
      nraGoalFilter,
      catalogScope,
    });

    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: myTrainingCatalogMessages.listLoadError,
});

/**
 * @param {{ formatMessage: Function, trainingId: string|number }} params
 */
export const fetchMyTrainingCatalogFormDetail = ({ formatMessage, trainingId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${trainingsCatalogDetail(trainingId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: myTrainingCatalogMessages.formDetailLoadError,
});

/**
 * @param {{ formatMessage: Function, trainingId: string|number }} params
 */
export const fetchMyTrainingCatalogDetail = ({ formatMessage, trainingId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${trainingsCatalogDetails(trainingId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: myTrainingCatalogMessages.detailLoadError,
});

/**
 * @param {{ formatMessage: Function, trainingId: string|number }} params
 */
export const fetchMyTrainingCatalogFeedback = ({ formatMessage, trainingId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${trainingsCatalogFeedback(trainingId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: myTrainingCatalogMessages.feedbackLoadError,
});

const fetchCatalogFormOptionList = ({
  formatMessage,
  url,
  fallbackMessage,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    return httpClient.get(`${getApiBaseUrl()}${url}`);
  },
  formatMessage,
  fallbackMessage,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchMyTrainingCatalogLanguageOptions = ({ formatMessage }) => fetchCatalogFormOptionList({
  formatMessage,
  url: TRAININGS_CATALOG_OPTIONS_LANGUAGE,
  fallbackMessage: myTrainingCatalogMessages.formOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchMyTrainingCatalogTrainingModeOptions = ({ formatMessage }) => fetchCatalogFormOptionList({
  formatMessage,
  url: TRAININGS_CATALOG_OPTIONS_TRAINING_MODES,
  fallbackMessage: myTrainingCatalogMessages.formOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchMyTrainingCatalogApproachOptions = ({ formatMessage }) => fetchCatalogFormOptionList({
  formatMessage,
  url: TRAININGS_CATALOG_OPTIONS_APPROACHES,
  fallbackMessage: myTrainingCatalogMessages.formOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchMyTrainingCatalogEvaluationOptions = ({ formatMessage }) => fetchCatalogFormOptionList({
  formatMessage,
  url: TRAININGS_CATALOG_OPTIONS_EVALUATIONS,
  fallbackMessage: myTrainingCatalogMessages.formOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchMyTrainingCatalogOutcomeOptions = ({ formatMessage }) => fetchCatalogFormOptionList({
  formatMessage,
  url: TRAININGS_CATALOG_OPTIONS_OUTCOMES,
  fallbackMessage: myTrainingCatalogMessages.formOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchMyTrainingCatalogProductTypeOptions = ({ formatMessage }) => fetchCatalogFormOptionList({
  formatMessage,
  url: TRAININGS_CATALOG_OPTIONS_PRODUCT_TYPES,
  fallbackMessage: myTrainingCatalogMessages.formOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchMyTrainingCatalogMappedCompetencyOptions = ({ formatMessage }) => fetchCatalogFormOptionList({
  formatMessage,
  url: TRAININGS_CATALOG_OPTIONS_MAPPED_COMPETENCIES,
  fallbackMessage: myTrainingCatalogMessages.formOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function, payload: object }} params
 */
export const createMyTrainingCatalog = ({ formatMessage, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAININGS_CATALOG}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: myTrainingCatalogMessages.createError,
});

/**
 * @param {{ formatMessage: Function, trainingId: string|number, payload: object }} params
 */
export const updateMyTrainingCatalog = ({ formatMessage, trainingId, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${trainingsCatalogDetail(trainingId)}`;
    return httpClient.patch(url, payload);
  },
  formatMessage,
  fallbackMessage: myTrainingCatalogMessages.updateError,
});

/**
 * @param {{ formatMessage: Function, trainingId: string|number }} params
 */
export const deleteMyTrainingCatalog = ({ formatMessage, trainingId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${trainingsCatalogDetail(trainingId)}`;
    return httpClient.delete(url);
  },
  formatMessage,
  fallbackMessage: myTrainingCatalogMessages.deleteError,
});
