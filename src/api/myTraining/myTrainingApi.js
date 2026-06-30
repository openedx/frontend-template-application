import { executeApiRequest } from '../apiRequest';
import {
  MY_TRAINING_PAGE_SIZE,
  NRAS_MANAGEMENT_MY_TRAININGS,
  NRAS_MANAGEMENT_MY_TRAININGS_FORM_OPTIONS,
  nrasManagementMyTrainingDetail,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import { isUploadableFile, patchMultipart } from '../multipartRequest';
import myTrainingMessages from '../../pages/myTraining/messages';
import {
  buildMyTrainingListParams,
  buildMyTrainingUpdateBody,
  MY_TRAINING_STATUS,
} from './myTrainingUtils';

/**
 * @param {Record<string, unknown>} body
 * @returns {FormData}
 */
const buildMyTrainingUpdateFormData = (body) => {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
    if (value == null || value === '') {
      return;
    }

    if (key === 'proof_file' && isUploadableFile(value)) {
      formData.append('proof_file', value);
      return;
    }

    formData.append(key, String(value));
  });

  return formData;
};

/**
 * @param {{ formatMessage: Function, page?: number, pageSize?: number, search?: string }} params
 */
export const fetchMyTrainingList = ({
  formatMessage,
  page = 1,
  pageSize = MY_TRAINING_PAGE_SIZE,
  search,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${NRAS_MANAGEMENT_MY_TRAININGS}`;
    const params = buildMyTrainingListParams({ page, pageSize, search });

    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: myTrainingMessages.listLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchMyTrainingStatusOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${NRAS_MANAGEMENT_MY_TRAININGS_FORM_OPTIONS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: myTrainingMessages.statusOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function, trainingId: string|number }} params
 */
export const fetchMyTrainingDetail = ({ formatMessage, trainingId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${nrasManagementMyTrainingDetail(trainingId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: myTrainingMessages.detailLoadError,
});

/**
 * @param {{
 *   formatMessage: Function,
 *   trainingId: string|number,
 *   status?: string,
 *   rating?: number|null,
 *   feedback?: string,
 *   proofFile?: File|null,
 *   proofFileName?: string,
 * }} params
 */
export const updateMyTraining = ({
  formatMessage,
  trainingId,
  status,
  rating,
  feedback,
  proofFile,
  proofFileName,
}) => {
  const body = buildMyTrainingUpdateBody({
    status,
    rating,
    feedback,
    proofFile,
    proofFileName,
  });

  return executeApiRequest({
    request: () => {
      const httpClient = getHttpClient();
      const url = `${getApiBaseUrl()}${nrasManagementMyTrainingDetail(trainingId)}`;

      if (isUploadableFile(body.proof_file)) {
        return patchMultipart(httpClient, url, buildMyTrainingUpdateFormData(body));
      }

      return httpClient.patch(url, body);
    },
    formatMessage,
    fallbackMessage: myTrainingMessages.updateError,
  });
};

/**
 * @param {{ formatMessage: Function, trainingId: string|number }} params
 */
export const startMyTraining = ({ formatMessage, trainingId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${nrasManagementMyTrainingDetail(trainingId)}`;
    return httpClient.patch(url, { status: MY_TRAINING_STATUS.IN_PROGRESS });
  },
  formatMessage,
  fallbackMessage: myTrainingMessages.startError,
});
