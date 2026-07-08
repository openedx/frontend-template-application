import { executeApiRequest } from '../apiRequest';
import { NRAS_MANAGEMENT_MY_TRAININGS_SELF_ENROLL } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';

/**
 * POST /api/v1/nras-management/my-trainings/self-enroll/
 * @param {{
 *   formatMessage: Function,
 *   trainingId: string|number,
 * }} params
 */
export const selfEnrollTrainingCatalog = ({
  formatMessage,
  trainingId,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${NRAS_MANAGEMENT_MY_TRAININGS_SELF_ENROLL}`;

    return httpClient.post(url, {
      id: trainingId,
      have_assigned: true,
    });
  },
  formatMessage,
  fallbackMessage: catalogMessages.selfAssignError,
});
