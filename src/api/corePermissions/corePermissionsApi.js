import { executeApiRequest } from '../apiRequest';
import { CORE_PERMISSIONS } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import appMessages from '../../messages/appMessages';

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchCorePermissions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${CORE_PERMISSIONS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: appMessages.rolePermissionsLoadError,
});
