import { executeApiRequest } from '../apiRequest';
import {
  API_PAGE_SIZE,
  REQUESTED_TRAININGS_ACTIVITIES,
  REQUESTED_TRAININGS_FILTERS,
  REQUESTED_TRAININGS_LIST,
  requestedTrainingFlag,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import requestedTrainingsMessages from '../../pages/requestedTrainings/messages';

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchRequestedTrainingFilters = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REQUESTED_TRAININGS_FILTERS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: requestedTrainingsMessages.filtersLoadError,
});

/**
 * @param {{ formatMessage: Function, page?: number, search?: string, status?: string }} params
 */
export const fetchRequestedTrainingsList = ({
  formatMessage,
  page = 1,
  search,
  status,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REQUESTED_TRAININGS_LIST}`;
    const params = {
      page,
      page_size: API_PAGE_SIZE,
    };
    const trimmedSearch = search?.trim();
    if (trimmedSearch) {
      params.search = trimmedSearch;
    }
    if (status && status !== 'all') {
      params.status = status;
    }
    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: requestedTrainingsMessages.listLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchRequestedTrainingActivities = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REQUESTED_TRAININGS_ACTIVITIES}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: requestedTrainingsMessages.activitiesLoadError,
});

/**
 * @param {{ formatMessage: Function, activityId: number, description: string }} params
 */
export const createRequestedTraining = ({
  formatMessage,
  activityId,
  description,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REQUESTED_TRAININGS_LIST}`;
    return httpClient.post(url, {
      activity_id: activityId,
      description: description.trim(),
    });
  },
  formatMessage,
  fallbackMessage: requestedTrainingsMessages.createError,
});

/**
 * @param {{ formatMessage: Function, id: string|number, action: 'close'|'reopen'|'flag'|'unflag' }} params
 */
export const patchRequestedTrainingStatus = ({ formatMessage, id, action }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REQUESTED_TRAININGS_LIST}${id}/`;
    return httpClient.patch(url, { action });
  },
  formatMessage,
  fallbackMessage: requestedTrainingsMessages.statusError,
});

/**
 * Flag or unflag interest on a requested training.
 * @param {{ formatMessage: Function, id: string|number, isFlagged: boolean }} params
 */
export const patchRequestedTrainingFlag = ({ formatMessage, id, isFlagged }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${requestedTrainingFlag(id)}`;
    return httpClient.patch(url, { is_flagged: !isFlagged });
  },
  formatMessage,
  fallbackMessage: requestedTrainingsMessages.flagError,
});
