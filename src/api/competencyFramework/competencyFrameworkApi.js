import { executeApiRequest } from '../apiRequest';
import { API_PAGE_SIZE, COMPETENCY_FRAMEWORKS } from '../endpoints';
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
