import { normalizePickerOptionRows } from '../competencyFramework/competencyFrameworkUtils';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { FILTER_ALL } from '../searnTrainingCatalog/trainingsCatalogOptionsUtils';
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

/**
 * @param {Array<object>|undefined} results
 */
export const mapMyTrainingCatalogFormOptionsToDropdown = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows.map((row) => ({
    value: String(row.value ?? ''),
    label: row.label,
    optionId: String(row.id),
  }));
};

/**
 * @param {object|null|undefined} data
 */
export const unwrapMyTrainingCatalogFormDetail = (data) => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  if (data.results && typeof data.results === 'object' && !Array.isArray(data.results)) {
    return data.results;
  }

  return data;
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
    registrationBy: row.registration_by ?? row.registrationBy ?? 'url',
    registrationUrl: row.registration_url ?? row.registrationUrl ?? '',
    registrationEmail: row.registration_email ?? row.registrationEmail ?? '',
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

  const registrationValue = registrationBy === 'email'
    ? (detail.registrationEmail ?? '')
    : (detail.registrationUrl ?? '');

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
    registrationValue,
  };
};

/**
 * @param {{
 *   title: string,
 *   description?: string,
 *   language?: string,
 *   duration?: string,
 *   cost: string,
 *   mode: string,
 *   approach: string,
 *   evaluation: string,
 *   outcome?: string,
 *   productType: string,
 *   nraObjectives?: string[],
 *   registrationBy?: string,
 *   registrationValue?: string,
 *   mappedCompetencies?: string[],
 *   mappedActivities: string[],
 * }} params
 */
export const buildMyTrainingCatalogWriteBody = ({
  title,
  description = '',
  language = '',
  duration = '',
  cost,
  mode,
  approach,
  evaluation,
  outcome = '',
  productType,
  nraObjectives = [],
  registrationBy = 'url',
  registrationValue = '',
  mappedCompetencies = [],
  mappedActivities,
}) => {
  const body = {
    title: title.trim(),
    description: description.trim(),
    language: String(language),
    duration: duration.trim(),
    cost: String(cost),
    mode: String(mode),
    approach: String(approach),
    evaluation: String(evaluation),
    product_type: String(productType),
    nra_objectives: nraObjectives,
    registration_by: registrationBy,
    registration_url: registrationBy === 'url' ? registrationValue.trim() || null : null,
    registration_email: registrationBy === 'email' ? registrationValue.trim() || null : null,
    mapped_competencies: mappedCompetencies,
    mapped_activities: mappedActivities,
  };

  if (hasDisplayValue(outcome)) {
    body.outcome = String(outcome);
  }

  return body;
};

/**
 * @param {{
 *   page: number,
 *   pageSize: number,
 *   search?: string,
 *   frameworkFilter?: string,
 *   roleFilter?: string,
 *   domainFilter?: string,
 *   subDomainFilter?: string,
 *   activityFilter?: string,
 *   nraGoalFilter?: string,
 * }} filters
 */
export const buildMyTrainingCatalogListParams = ({
  page,
  pageSize,
  search,
  frameworkFilter,
  roleFilter,
  domainFilter,
  subDomainFilter,
  activityFilter,
  nraGoalFilter,
}) => {
  const params = {
    page,
    page_size: pageSize,
  };

  const trimmedSearch = search?.trim();
  if (hasDisplayValue(trimmedSearch)) {
    params.search = trimmedSearch;
  }

  if (hasDisplayValue(frameworkFilter) && frameworkFilter !== FILTER_ALL) {
    params.competency_framework_id = frameworkFilter;
  }

  if (hasDisplayValue(roleFilter) && roleFilter !== FILTER_ALL) {
    params.role_id = roleFilter;
  }

  if (hasDisplayValue(domainFilter) && domainFilter !== FILTER_ALL) {
    params.domain_id = domainFilter;
  }

  if (hasDisplayValue(subDomainFilter) && subDomainFilter !== FILTER_ALL) {
    params.sub_domain_id = subDomainFilter;
  }

  if (hasDisplayValue(activityFilter) && activityFilter !== FILTER_ALL) {
    params.mapped_activity_id = activityFilter;
  }

  if (hasDisplayValue(nraGoalFilter) && nraGoalFilter !== FILTER_ALL) {
    params.nra_objective_id = nraGoalFilter;
  }

  return params;
};
