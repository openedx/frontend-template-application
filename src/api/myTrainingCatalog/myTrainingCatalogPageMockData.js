import trainingsMock from '../../mock/myTrainingCatalog/trainings.json';
import trainingDetailMock from '../../mock/myTrainingCatalog/trainingDetail.json';
import trainingFeedbackMock from '../../mock/myTrainingCatalog/trainingFeedback.json';
import formOptionsMock from '../../mock/myTrainingCatalog/formOptions.json';
import { API_PAGE_SIZE } from '../endpoints';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import {
  mapMyTrainingCatalogDetail,
  mapMyTrainingCatalogFeedback,
  mapMyTrainingFormOptions,
  normalizeMyTrainingCatalogList,
  unwrapMyTrainingCatalogDetail,
  unwrapMyTrainingCatalogFeedback,
} from './myTrainingCatalogUtils';

/**
 * @param {{ page?: number, pageSize?: number, search?: string }} params
 */
export const resolveMyTrainingCatalogListMock = ({
  page = 1,
  pageSize = API_PAGE_SIZE,
  search = '',
} = {}) => {
  let items = normalizeMyTrainingCatalogList(trainingsMock?.results);
  const trimmedSearch = search?.trim().toLowerCase();

  if (hasDisplayValue(trimmedSearch)) {
    items = items.filter((row) => (
      String(row.title || '').toLowerCase().includes(trimmedSearch)
      || String(row.description || '').toLowerCase().includes(trimmedSearch)
    ));
  }

  const count = trainingsMock?.count ?? items.length;
  const totalPages = Math.max(1, trainingsMock?.total_pages ?? 1);
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const pagedItems = items.slice(start, start + pageSize);

  return {
    items: pagedItems,
    count,
    page: safePage,
    pageSize,
    totalPages,
  };
};

/**
 * @param {string|number} trainingId
 */
export const resolveMyTrainingCatalogDetailMock = (trainingId) => {
  const payload = unwrapMyTrainingCatalogDetail(trainingDetailMock);
  if (!payload || String(payload.id) !== String(trainingId)) {
    return null;
  }

  return mapMyTrainingCatalogDetail(payload);
};

/**
 * @param {string|number} trainingId
 */
export const resolveMyTrainingCatalogFeedbackMock = (trainingId) => {
  const payload = unwrapMyTrainingCatalogFeedback(trainingFeedbackMock);
  if (!payload?.training || String(payload.training.id) !== String(trainingId)) {
    return null;
  }

  return mapMyTrainingCatalogFeedback(payload);
};

export const resolveMyTrainingCatalogFormOptionsMock = () => ({
  languageOptions: mapMyTrainingFormOptions(formOptionsMock.language),
  modeOptions: mapMyTrainingFormOptions(formOptionsMock.mode),
  approachOptions: mapMyTrainingFormOptions(formOptionsMock.approach),
  evaluationOptions: mapMyTrainingFormOptions(formOptionsMock.evaluation),
  outcomeOptions: mapMyTrainingFormOptions(formOptionsMock.outcome),
  productTypeOptions: mapMyTrainingFormOptions(formOptionsMock.productTypes),
  nraObjectiveOptions: mapMyTrainingFormOptions(formOptionsMock.nraObjectives),
  mappedCompetencyOptions: mapMyTrainingFormOptions(formOptionsMock.mappedCompetencies),
  mappedActivityOptions: mapMyTrainingFormOptions(formOptionsMock.mappedActivities),
});
