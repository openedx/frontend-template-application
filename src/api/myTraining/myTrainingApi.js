import { executeApiRequest } from '../apiRequest';
import {
  MY_TRAINING_LIST,
  MY_TRAINING_STATUS_OPTIONS,
  myTrainingDetail,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import myTrainingMessages from '../../pages/myTraining/messages';
import {
  buildMyTrainingListParams,
  buildMyTrainingUpdateBody,
} from './myTrainingUtils';
import {
  resolveMyTrainingDetailMock,
  resolveMyTrainingListMock,
  resolveMyTrainingStartMock,
  resolveMyTrainingUpdateMock,
} from './myTrainingPageMockData';
import statusOptionsMock from '../../mock/myTraining/statusOptions.json';

const USE_MY_TRAINING_MOCK = true;

/**
 * @param {{ formatMessage: Function, page?: number, pageSize?: number, search?: string }} params
 */
export const fetchMyTrainingList = ({
  formatMessage,
  page = 1,
  pageSize,
  search,
}) => {
  if (USE_MY_TRAINING_MOCK) {
    const mockData = resolveMyTrainingListMock({ page, pageSize, search });

    return Promise.resolve({
      ok: true,
      message: null,
      data: {
        count: mockData.count,
        page: mockData.page,
        page_size: mockData.pageSize,
        total_pages: mockData.totalPages,
        results: mockData.items.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          provider: item.provider,
          status: item.status,
          access_url: item.accessUrl,
        })),
      },
    });
  }

  return executeApiRequest({
    request: () => {
      const httpClient = getHttpClient();
      const url = `${getApiBaseUrl()}${MY_TRAINING_LIST}`;
      const params = buildMyTrainingListParams({ page, pageSize, search });

      return httpClient.get(url, { params });
    },
    formatMessage,
    fallbackMessage: myTrainingMessages.listLoadError,
  });
};

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchMyTrainingStatusOptions = ({ formatMessage }) => {
  if (USE_MY_TRAINING_MOCK) {
    return Promise.resolve({
      ok: true,
      message: null,
      data: { results: statusOptionsMock.results ?? [] },
    });
  }

  return executeApiRequest({
    request: () => {
      const httpClient = getHttpClient();
      const url = `${getApiBaseUrl()}${MY_TRAINING_STATUS_OPTIONS}`;
      return httpClient.get(url);
    },
    formatMessage,
    fallbackMessage: myTrainingMessages.statusOptionsLoadError,
  });
};

/**
 * @param {{ formatMessage: Function, trainingId: string|number }} params
 */
export const fetchMyTrainingDetail = ({ formatMessage, trainingId }) => {
  if (USE_MY_TRAINING_MOCK) {
    const detail = resolveMyTrainingDetailMock(trainingId);

    if (!detail) {
      return Promise.resolve({
        ok: false,
        message: formatMessage(myTrainingMessages.detailNotFound),
      });
    }

    return Promise.resolve({
      ok: true,
      message: null,
      data: {
        results: {
          id: detail.id,
          title: detail.title,
          status: detail.status,
          proof_file_name: detail.proofFileName || null,
          rating: detail.rating,
          feedback: detail.feedback || null,
        },
      },
    });
  }

  return executeApiRequest({
    request: () => {
      const httpClient = getHttpClient();
      const url = `${getApiBaseUrl()}${myTrainingDetail(trainingId)}`;
      return httpClient.get(url);
    },
    formatMessage,
    fallbackMessage: myTrainingMessages.detailLoadError,
  });
};

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
  if (USE_MY_TRAINING_MOCK) {
    const result = resolveMyTrainingUpdateMock(trainingId, {
      status,
      rating,
      feedback,
      proofFile,
      proofFileName,
    });

    return Promise.resolve({
      ok: result.ok,
      message: result.message,
      data: result.data,
    });
  }

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
      const url = `${getApiBaseUrl()}${myTrainingDetail(trainingId)}`;

      if (body.proof_file instanceof File) {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (value != null && value !== '') {
            formData.append(key, value);
          }
        });

        return httpClient.patch(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
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
export const startMyTraining = ({ formatMessage, trainingId }) => {
  if (USE_MY_TRAINING_MOCK) {
    const result = resolveMyTrainingStartMock(trainingId);

    return Promise.resolve({
      ok: result.ok,
      message: result.message,
      data: result.data,
    });
  }

  return executeApiRequest({
    request: () => {
      const httpClient = getHttpClient();
      const url = `${getApiBaseUrl()}${myTrainingDetail(trainingId)}`;
      return httpClient.patch(url, { status: 'in_progress' });
    },
    formatMessage,
    fallbackMessage: myTrainingMessages.startError,
  });
};
