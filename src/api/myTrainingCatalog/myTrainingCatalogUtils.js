import { hasDisplayValue } from '../../utils/hasDisplayValue';
import {
  mapSearnTrainingCatalogDetail,
  mapSearnTrainingCatalogFeedback,
  mapSearnTrainingCatalogListRow,
  unwrapSearnTrainingCatalogDetail,
  unwrapSearnTrainingCatalogFeedback,
} from '../searnTrainingCatalog/searnTrainingCatalogUtils';
import { mapCatalogFilterOptionsToDropdown } from '../searnTrainingCatalog/trainingsCatalogOptionsUtils';

export {
  mapSearnTrainingCatalogDetail as mapMyTrainingCatalogDetail,
  mapSearnTrainingCatalogFeedback as mapMyTrainingCatalogFeedback,
  unwrapSearnTrainingCatalogDetail as unwrapMyTrainingCatalogDetail,
  unwrapSearnTrainingCatalogFeedback as unwrapMyTrainingCatalogFeedback,
};

/**
 * @param {Array<object>} results
 */
export const normalizeMyTrainingCatalogList = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapSearnTrainingCatalogListRow)
    .filter((row) => hasDisplayValue(row?.id));
};

/**
 * @param {Array<{ id: string, value: string, label: string }>} results
 */
export const mapMyTrainingFormOptions = (results) => mapCatalogFilterOptionsToDropdown(results);

const matchOptionValue = (options = [], rawValue = '') => {
  if (!hasDisplayValue(rawValue)) {
    return '';
  }

  const match = options.find(
    (option) => option.value === rawValue || option.label === rawValue,
  );

  return match?.value ?? rawValue;
};

const matchOptionValues = (options = [], rawValues = []) => {
  if (!Array.isArray(rawValues)) {
    return [];
  }

  return rawValues
    .map((value) => matchOptionValue(options, value))
    .filter((value) => hasDisplayValue(value));
};

/**
 * @param {object|null|undefined} row
 */
export const mapMyTrainingCatalogFormDetail = (row) => {
  if (!row || typeof row !== 'object') {
    return null;
  }

  return {
    id: row.id != null ? String(row.id) : '',
    title: row.title ?? '',
    description: row.description ?? '',
    language: row.language ?? '',
    duration: row.duration ?? '',
    cost: row.cost ?? '',
    mode: row.mode ?? '',
    approach: row.approach ?? '',
    evaluation: row.evaluation ?? '',
    outcome: row.outcome ?? '',
    productType: row.product_type ?? row.productType ?? '',
    nraObjectives: Array.isArray(row.nra_objectives)
      ? row.nra_objectives.filter(hasDisplayValue)
      : Array.isArray(row.nraObjectives)
        ? row.nraObjectives.filter(hasDisplayValue)
        : [],
    registrationBy: row.registration_by ?? row.registrationBy ?? '',
    registrationValue: row.registration_value ?? row.registrationValue ?? '',
    mappedCompetencies: Array.isArray(row.mapped_competencies)
      ? row.mapped_competencies.filter(hasDisplayValue)
      : Array.isArray(row.mappedCompetencies)
        ? row.mappedCompetencies.filter(hasDisplayValue)
        : [],
    mappedActivities: Array.isArray(row.mapped_activities)
      ? row.mapped_activities.filter(hasDisplayValue)
      : Array.isArray(row.mappedActivities)
        ? row.mappedActivities.filter(hasDisplayValue)
        : [],
  };
};

/**
 * @param {object|null|undefined} detail
 * @param {object} options
 */
export const mapMyTrainingCatalogFormDetailToState = (detail, options = {}) => {
  if (!detail) {
    return null;
  }

  const registrationBy = hasDisplayValue(detail.registrationBy)
    ? detail.registrationBy
    : 'url';

  return {
    name: detail.title ?? '',
    description: detail.description ?? '',
    language: matchOptionValue(options.languageOptions, detail.language),
    duration: detail.duration ?? '',
    cost: detail.cost ?? '',
    mode: matchOptionValue(options.modeOptions, detail.mode),
    approach: matchOptionValue(options.approachOptions, detail.approach),
    evaluation: matchOptionValue(options.evaluationOptions, detail.evaluation),
    outcome: matchOptionValue(options.outcomeOptions, detail.outcome),
    productType: matchOptionValue(options.productTypeOptions, detail.productType),
    nraObjectives: matchOptionValues(options.nraObjectiveOptions, detail.nraObjectives),
    mappedCompetencies: matchOptionValues(options.mappedCompetencyOptions, detail.mappedCompetencies),
    mappedActivities: matchOptionValues(options.mappedActivityOptions, detail.mappedActivities),
    registrationBy,
    registrationValue: detail.registrationValue ?? '',
  };
};
