import trainingsMock from '../../mock/myTrainingCatalog/trainings.json';
import nraTrainingsMock from '../../mock/nraSpecificTrainingCatalog/trainings.json';
import trainingFormDetailsMock from '../../mock/myTrainingCatalog/trainingFormDetails.json';
import trainingDetailMock from '../../mock/myTrainingCatalog/trainingDetail.json';
import trainingFeedbackMock from '../../mock/myTrainingCatalog/trainingFeedback.json';
import formOptionsMock from '../../mock/myTrainingCatalog/formOptions.json';
import {
  isNraSpecificTrainingRequestedMock,
} from '../trainingCatalogRequestAccess/trainingCatalogRequestAccessMockData';
import { TRAINING_CATALOG_VARIANT_IDS } from '../../utils/trainingCatalogVariantConfig';
import { API_PAGE_SIZE } from '../endpoints';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import {
  mapMyTrainingCatalogDetail,
  mapMyTrainingCatalogFeedback,
  mapMyTrainingCatalogFormDetail,
  mapMyTrainingFormOptions,
  normalizeMyTrainingCatalogList,
  unwrapMyTrainingCatalogDetail,
  unwrapMyTrainingCatalogFeedback,
} from './myTrainingCatalogUtils';

/**
 * @param {{ page?: number, pageSize?: number, search?: string, catalogVariantId?: string, providerSlug?: string }} params
 */
export const resolveMyTrainingCatalogListMock = ({
  page = 1,
  pageSize = API_PAGE_SIZE,
  search = '',
  catalogVariantId = TRAINING_CATALOG_VARIANT_IDS.MY_TRAINING_CATALOG,
  providerSlug = '',
} = {}) => {
  const sourceMock = catalogVariantId === TRAINING_CATALOG_VARIANT_IDS.NRA_SPECIFIC_TRAINING_CATALOG
    ? nraTrainingsMock
    : trainingsMock;

  let items = normalizeMyTrainingCatalogList(sourceMock?.results).map((row) => {
    if (catalogVariantId !== TRAINING_CATALOG_VARIANT_IDS.NRA_SPECIFIC_TRAINING_CATALOG) {
      return row;
    }

    return {
      ...row,
      isRequested: row.isRequested || isNraSpecificTrainingRequestedMock(row.id),
    };
  });
  const trimmedSearch = search?.trim().toLowerCase();

  if (hasDisplayValue(trimmedSearch)) {
    items = items.filter((row) => (
      String(row.title || '').toLowerCase().includes(trimmedSearch)
      || String(row.description || '').toLowerCase().includes(trimmedSearch)
    ));
  }

  if (hasDisplayValue(providerSlug)) {
    items = items.filter((row) => String(row.providerSlug) === String(providerSlug));
  }

  const count = sourceMock?.count ?? items.length;
  const totalPages = Math.max(1, sourceMock?.total_pages ?? 1);
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
  const formPayload = trainingFormDetailsMock[String(trainingId)];
  if (formPayload) {
    return mapMyTrainingCatalogDetail({
      ...formPayload,
      nra_goals: formPayload.nra_objectives,
      mapped_competencies: formPayload.mapped_competencies,
      mapped_activities: formPayload.mapped_activities,
    });
  }

  const payload = unwrapMyTrainingCatalogDetail(trainingDetailMock);
  if (!payload || String(payload.id) !== String(trainingId)) {
    return null;
  }

  return mapMyTrainingCatalogDetail(payload);
};

/**
 * @param {string|number} trainingId
 */
export const resolveMyTrainingCatalogFormDetailMock = (trainingId) => {
  const formPayload = trainingFormDetailsMock[String(trainingId)];

  if (formPayload) {
    return mapMyTrainingCatalogFormDetail(formPayload);
  }

  const listRow = [...(trainingsMock?.results ?? []), ...(nraTrainingsMock?.results ?? [])]
    .find((row) => String(row.id) === String(trainingId));

  if (!listRow) {
    return null;
  }

  return mapMyTrainingCatalogFormDetail({
    id: listRow.id,
    title: listRow.title,
    description: listRow.description,
    language: 'English',
    duration: '',
    cost: listRow.cost,
    mode: listRow.mode,
    approach: 'Course',
    evaluation: 'Pre and post evaluation',
    outcome: 'Certificate of completion',
    product_type: '1',
    nra_objectives: [],
    registration_by: 'url',
    registration_value: '',
    mapped_competencies: [],
    mapped_activities: ['act-001'],
  });
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
