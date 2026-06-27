import { executeApiRequest } from '../apiRequest';
import {
  nraSpecificTrainingCatalogRequestAccess,
  searnTrainingCatalogRequestAccess,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';
import {
  resolveNraSpecificTrainingCatalogRequestAccessMock,
  resolveSearnTrainingCatalogRequestAccessMock,
} from './trainingCatalogRequestAccessMockData';
import { TRAINING_CATALOG_VARIANT_IDS } from '../../utils/trainingCatalogVariantConfig';

const USE_REQUEST_ACCESS_MOCK = true;

/**
 * @param {{
 *   formatMessage: Function,
 *   catalogVariantId: string,
 *   trainingId: string|number,
 * }} params
 */
export const requestTrainingCatalogAccess = ({
  formatMessage,
  catalogVariantId,
  trainingId,
}) => {
  if (USE_REQUEST_ACCESS_MOCK) {
    const result = catalogVariantId === TRAINING_CATALOG_VARIANT_IDS.NRA_SPECIFIC_TRAINING_CATALOG
      ? resolveNraSpecificTrainingCatalogRequestAccessMock(trainingId)
      : resolveSearnTrainingCatalogRequestAccessMock(trainingId);

    return Promise.resolve({
      ok: result.ok,
      message: result.message,
      data: result.data,
    });
  }

  const endpoint = catalogVariantId === TRAINING_CATALOG_VARIANT_IDS.NRA_SPECIFIC_TRAINING_CATALOG
    ? nraSpecificTrainingCatalogRequestAccess(trainingId)
    : searnTrainingCatalogRequestAccess(trainingId);

  return executeApiRequest({
    request: () => {
      const httpClient = getHttpClient();
      const url = `${getApiBaseUrl()}${endpoint}`;
      return httpClient.post(url, {});
    },
    formatMessage,
    fallbackMessage: catalogMessages.requestAccessCreateError,
  });
};
