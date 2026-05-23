import { executeApiRequest } from '../apiRequest';
import {
  competencyFrameworkSuggestionDetail,
  competencyFrameworkSuggestions,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';

/**
 * @param {{ formatMessage: Function, frameworkUuid: string }} params
 */
export const fetchFrameworkSuggestions = ({ formatMessage, frameworkUuid }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkSuggestions(frameworkUuid)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.suggestionsLoadError,
});

/**
 * @param {{ formatMessage: Function, frameworkUuid: string, payload: object }} params
 */
export const createFrameworkSuggestion = ({ formatMessage, frameworkUuid, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkSuggestions(frameworkUuid)}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.suggestionCreateError,
});

/**
 * @param {{ formatMessage: Function, suggestionId: string|number }} params
 */
export const fetchFrameworkSuggestionDetail = ({ formatMessage, suggestionId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkSuggestionDetail(suggestionId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.suggestionDetailLoadError,
});

/**
 * @param {{ formatMessage: Function, suggestionId: string|number, payload: object }} params
 */
export const patchFrameworkSuggestion = ({ formatMessage, suggestionId, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkSuggestionDetail(suggestionId)}`;
    return httpClient.patch(url, payload);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.suggestionUpdateError,
});

/**
 * @param {{ formatMessage: Function, suggestionId: string|number }} params
 */
export const deleteFrameworkSuggestion = ({ formatMessage, suggestionId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${competencyFrameworkSuggestionDetail(suggestionId)}`;
    return httpClient.delete(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.suggestionDeleteError,
});
