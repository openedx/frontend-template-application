import { executeApiRequest } from '../apiRequest';
import { MFE_CONFIG, MFE_CONFIG_APP_NAME } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import mfeConfigMessages from './mfeConfigMessages';

/**
 * @param {{ formatMessage: Function, mfeName?: string }} params
 */
export const fetchMfeConfig = ({ formatMessage, mfeName = MFE_CONFIG_APP_NAME }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${MFE_CONFIG}`;
    return httpClient.get(url, { params: { mfe: mfeName } });
  },
  formatMessage,
  fallbackMessage: mfeConfigMessages.loadError,
});
