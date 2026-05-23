import { executeApiRequest } from '../apiRequest';
import { ACTIVITIES_LIST } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import activitiesMessages from '../../pages/activities/messages';
import { buildActivityListQueryParams } from './activitiesUtils';

/**
 * @param {{
 *   formatMessage: Function,
 *   page?: number,
 *   search?: string,
 *   competencyFramework?: string,
 *   role?: string,
 *   domain?: string,
 *   subDomain?: string,
 *   proficiencyLevel?: string,
 *   trainingStatus?: string,
 * }} params
 */
export const fetchActivitiesList = ({
  formatMessage,
  page = 1,
  search,
  competencyFramework,
  role,
  domain,
  subDomain,
  proficiencyLevel,
  trainingStatus,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ACTIVITIES_LIST}`;
    const params = buildActivityListQueryParams({
      page,
      search,
      competencyFramework,
      role,
      domain,
      subDomain,
      proficiencyLevel,
      trainingStatus,
    });
    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: activitiesMessages.listLoadError,
});
