import { executeApiRequest } from '../apiRequest';
import {
  API_PAGE_SIZE,
  COMPETENCY_FRAMEWORK_GENERAL_INFORMATION,
  COMPETENCY_FRAMEWORKS,
  OPTIONS_PRODUCT_TYPES,
  OPTIONS_SOURCE_FRAMEWORK,
  competencyFrameworkDetail,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';

/**
 * @param {{ formatMessage: Function, sourceFramework: string, page?: number }} params
 */
export const fetchCompetencyFrameworkList = ({
  formatMessage,
  sourceFramework,
  page = 1,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${COMPETENCY_FRAMEWORKS}`;
    return httpClient.get(url, {
      params: {
        source_framework: sourceFramework,
        page,
        page_size: API_PAGE_SIZE,
      },
    });
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.frameworkListLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchProductTypeOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${OPTIONS_PRODUCT_TYPES}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.productTypesLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchSourceFrameworkOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${OPTIONS_SOURCE_FRAMEWORK}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.sourceFrameworkOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function, frameworkUuid: string }} params
 */
export const fetchCompetencyFrameworkDetail = ({ formatMessage, frameworkUuid }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkDetail(frameworkUuid)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.frameworkDetailLoadError,
});

/**
 * @param {{ formatMessage: Function, payload: object }} params
 */
export const createCompetencyFrameworkGeneralInformation = ({
  formatMessage,
  payload,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${COMPETENCY_FRAMEWORK_GENERAL_INFORMATION}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.generalInformationSaveError,
});

/**
 * @param {{
 *   formatMessage: Function,
 *   frameworkUuid: string,
 *   payload: object,
 *   fallbackMessage?: object,
 * }} params
 */
export const patchCompetencyFramework = ({
  formatMessage,
  frameworkUuid,
  payload,
  fallbackMessage = competencyFrameworkMessages.frameworkSectionSaveError,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkDetail(frameworkUuid)}`;
    return httpClient.patch(url, payload);
  },
  formatMessage,
  fallbackMessage,
});

/** @param {{ formatMessage: Function, frameworkUuid: string, payload: object }} params */
export const updateCompetencyFrameworkGeneralInformation = ({
  formatMessage,
  frameworkUuid,
  payload,
}) => patchCompetencyFramework({
  formatMessage,
  frameworkUuid,
  payload,
  fallbackMessage: competencyFrameworkMessages.generalInformationSaveError,
});
