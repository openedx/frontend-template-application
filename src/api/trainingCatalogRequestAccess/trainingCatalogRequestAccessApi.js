import { executeApiRequest } from '../apiRequest';
import { NRAS_MANAGEMENT_TRAINING_ACCESS_REQUESTS } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';

/**
 * POST /api/v1/nras-management/training-access-requests/
 * @param {{
 *   formatMessage: Function,
 *   trainingId: string|number,
 * }} params
 */
export const requestTrainingCatalogAccess = ({
  formatMessage,
  trainingId,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${NRAS_MANAGEMENT_TRAINING_ACCESS_REQUESTS}`;

    return httpClient.post(url, {
      id: trainingId,
      is_requested: 'pending',
    });
  },
  formatMessage,
  fallbackMessage: catalogMessages.requestAccessCreateError,
});
