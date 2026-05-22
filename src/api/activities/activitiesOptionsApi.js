import { executeApiRequest } from '../apiRequest';
import { OPTIONS_COMPETENCY_FRAMEWORKS } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import activitiesMessages from '../../pages/activities/messages';
import { resolveActivityFilterOptionsPath } from './activitiesOptionsUtils';

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchActivityCompetencyFrameworkOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${OPTIONS_COMPETENCY_FRAMEWORKS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: activitiesMessages.frameworkOptionsLoadError,
});

/**
 * @param {{
 *   formatMessage: Function,
 *   segment: import('./activitiesOptionsUtils').ActivityFilterOptionSegment,
 *   frameworkFilter: string,
 * }} params
 */
export const fetchActivityFilterOptions = ({
  formatMessage,
  segment,
  frameworkFilter,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const path = resolveActivityFilterOptionsPath(segment, frameworkFilter);
    const url = `${getApiBaseUrl()}${path}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: activitiesMessages.filterOptionsLoadError,
});
