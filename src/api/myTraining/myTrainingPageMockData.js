import trainingsListMock from '../../mock/myTraining/trainings.json';
import trainingDetailsMock from '../../mock/myTraining/trainingDetails.json';
import { API_PAGE_SIZE } from '../endpoints';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import {
  mapMyTrainingDetail,
  mapMyTrainingListResults,
  MY_TRAINING_STATUS,
} from './myTrainingUtils';

let mockTrainings = Array.isArray(trainingsListMock?.results)
  ? trainingsListMock.results.map((row) => ({ ...row }))
  : [];

let mockTrainingDetails = { ...trainingDetailsMock };

/**
 * @param {{ page?: number, pageSize?: number, search?: string }} params
 */
export const resolveMyTrainingListMock = ({
  page = 1,
  pageSize = API_PAGE_SIZE,
  search = '',
} = {}) => {
  let results = [...mockTrainings];
  const trimmedSearch = search?.trim().toLowerCase();

  if (hasDisplayValue(trimmedSearch)) {
    results = results.filter((row) => (
      String(row.title || '').toLowerCase().includes(trimmedSearch)
      || String(row.description || '').toLowerCase().includes(trimmedSearch)
      || String(row.provider || '').toLowerCase().includes(trimmedSearch)
    ));
  }

  const count = results.length;
  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const pagedResults = results.slice(start, start + pageSize);

  return {
    items: mapMyTrainingListResults(pagedResults),
    count,
    page: safePage,
    pageSize,
    totalPages,
  };
};

/**
 * @param {string|number} trainingId
 */
export const resolveMyTrainingDetailMock = (trainingId) => {
  const detail = mockTrainingDetails[String(trainingId)];

  if (!detail) {
    return null;
  }

  return mapMyTrainingDetail(detail);
};

/**
 * @param {string|number} trainingId
 * @param {{
 *   status?: string,
 *   rating?: number|null,
 *   feedback?: string,
 *   proofFile?: File|null,
 *   proofFileName?: string,
 * }} payload
 */
export const resolveMyTrainingUpdateMock = (trainingId, payload = {}) => {
  const listIndex = mockTrainings.findIndex((row) => String(row.id) === String(trainingId));
  const detailKey = String(trainingId);
  const currentDetail = mockTrainingDetails[detailKey];

  if (listIndex < 0 || !currentDetail) {
    return {
      ok: false,
      message: 'Training not found.',
    };
  }

  const current = mockTrainings[listIndex];
  const nextStatus = hasDisplayValue(payload.status) ? payload.status : current.status;

  mockTrainings[listIndex] = {
    ...current,
    status: nextStatus,
  };

  const updatedDetail = {
    ...currentDetail,
    status: nextStatus,
  };

  if (payload.proofFile instanceof File) {
    updatedDetail.proof_file_name = payload.proofFile.name;
  } else if (hasDisplayValue(payload.proofFileName)) {
    updatedDetail.proof_file_name = payload.proofFileName;
  }

  if (nextStatus === MY_TRAINING_STATUS.COMPLETED) {
    updatedDetail.rating = payload.rating != null ? Number(payload.rating) : currentDetail.rating;
    updatedDetail.feedback = hasDisplayValue(payload.feedback)
      ? payload.feedback.trim()
      : currentDetail.feedback;
  }

  mockTrainingDetails[detailKey] = updatedDetail;

  return {
    ok: true,
    message: 'Training updated successfully.',
    data: updatedDetail,
  };
};

/**
 * @param {string|number} trainingId
 */
export const resolveMyTrainingStartMock = (trainingId) => (
  resolveMyTrainingUpdateMock(trainingId, { status: MY_TRAINING_STATUS.IN_PROGRESS })
);
