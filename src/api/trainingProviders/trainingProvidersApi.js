import { executeApiRequest } from '../apiRequest';
import { API_PAGE_SIZE, TRAINING_PROVIDERS_ONBOARD } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import trainingProvidersMessages from '../../pages/trainingProviders/messages';

export const fetchTrainingProvidersOnboardList = ({
  formatMessage,
  page = 1,
  search,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAINING_PROVIDERS_ONBOARD}`;
    const params = {
      page,
      page_size: API_PAGE_SIZE,
    };
    const trimmedSearch = search?.trim();
    if (trimmedSearch) {
      params.search = trimmedSearch;
    }

    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: trainingProvidersMessages.listLoadError,
});

export const fetchTrainingProviderOnboardDetail = ({ formatMessage, providerId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAINING_PROVIDERS_ONBOARD}${providerId}/`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: trainingProvidersMessages.detailLoadError,
});

export const createTrainingProviderOnboard = ({ formatMessage, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAINING_PROVIDERS_ONBOARD}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: trainingProvidersMessages.createError,
});

export const updateTrainingProviderOnboard = ({ formatMessage, providerId, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAINING_PROVIDERS_ONBOARD}${providerId}/`;
    return httpClient.patch(url, payload);
  },
  formatMessage,
  fallbackMessage: trainingProvidersMessages.updateError,
});

export const deleteTrainingProviderOnboard = ({ formatMessage, providerId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAINING_PROVIDERS_ONBOARD}${providerId}/`;
    return httpClient.delete(url);
  },
  formatMessage,
  fallbackMessage: trainingProvidersMessages.deleteError,
});
