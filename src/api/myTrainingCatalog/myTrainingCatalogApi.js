import { executeApiRequest } from '../apiRequest';
import { API_PAGE_SIZE, MY_TRAINING_CATALOG_LIST } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import myTrainingCatalogMessages from '../../pages/myTrainingCatalog/messages';

/**
 * @param {{ formatMessage: Function, page?: number, search?: string }} params
 */
export const fetchMyTrainingCatalogList = ({
  formatMessage,
  page = 1,
  search,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${MY_TRAINING_CATALOG_LIST}`;
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
  fallbackMessage: myTrainingCatalogMessages.listLoadError,
});
