import { normalizePickerOptionRows } from '../competencyFramework/competencyFrameworkUtils';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const EXPLORE_FILTER_ALL = 'all';

/**
 * Map picker option rows (`{ id, value, label }`) to `{ value, label }` dropdown options,
 * using the stable `id` as the submitted value.
 * @param {Array<object>|undefined} results
 */
export const mapExploreOptionsToDropdown = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows.map((row) => ({
    value: String(row.id),
    label: row.label,
  }));
};

/**
 * @param {Array<{ value: string, label: string }>} options
 * @param {string} allLabel
 */
export const withExploreAllOption = (options, allLabel) => [
  { value: EXPLORE_FILTER_ALL, label: allLabel },
  ...options,
];

/**
 * @param {object|null|undefined} row
 */
export const mapExploreRoleCard = (row) => {
  if (!row || typeof row !== 'object') {
    return null;
  }

  const activityCount = Number(row.no_of_activities);

  return {
    id: row.id != null ? String(row.id) : '',
    value: row.value != null ? String(row.value) : '',
    label: row.label ?? '',
    activityCount: Number.isNaN(activityCount) ? 0 : activityCount,
  };
};

/**
 * @param {Array<object>|undefined} results
 */
export const mapExploreRoles = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapExploreRoleCard)
    .filter((row) => hasDisplayValue(row?.id) && hasDisplayValue(row?.label));
};

/**
 * @param {object|null|undefined} row
 */
export const mapExploreActivityRow = (row) => {
  if (!row || typeof row !== 'object') {
    return null;
  }

  const trainingCountRaw = row.no_of_trainings
    ?? row.training_count
    ?? row.trainings_count
    ?? row.no_of_training;
  const trainingCount = Number(trainingCountRaw);

  return {
    id: row.id != null ? String(row.id) : '',
    title: row.title ?? '',
    level: row.proficiency_level
      ?? row.level
      ?? row.nra_objective
      ?? '',
    trainingCount: Number.isNaN(trainingCount) ? null : trainingCount,
  };
};

/**
 * @param {Array<object>|undefined} results
 */
export const mapExploreActivities = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapExploreActivityRow)
    .filter((row) => hasDisplayValue(row?.id));
};

/**
 * Build query params for the explore-training activities list.
 * Only sends filters that are set and not the "all" sentinel.
 * @param {{
 *   page?: number,
 *   pageSize: number,
 *   role: string|number,
 *   search?: string,
 *   productType?: string,
 *   domain?: string,
 *   subDomain?: string,
 *   objective?: string,
 *   profile?: string,
 * }} filters
 */
export const buildExploreActivityParams = ({
  page = 1,
  pageSize,
  role,
  search,
  productType,
  domain,
  subDomain,
  objective,
  profile,
}) => {
  const params = {
    page,
    page_size: pageSize,
  };

  if (hasDisplayValue(role)) {
    params.role = role;
  }

  const trimmedSearch = search?.trim();
  if (hasDisplayValue(trimmedSearch)) {
    params.search = trimmedSearch;
  }

  if (hasDisplayValue(productType) && productType !== EXPLORE_FILTER_ALL) {
    params.product_type = productType;
  }

  if (hasDisplayValue(domain) && domain !== EXPLORE_FILTER_ALL) {
    params.domain = domain;
  }

  if (hasDisplayValue(subDomain) && subDomain !== EXPLORE_FILTER_ALL) {
    params['sub-domain'] = subDomain;
  }

  if (hasDisplayValue(objective) && objective !== EXPLORE_FILTER_ALL) {
    params.objective = objective;
  }

  if (hasDisplayValue(profile) && profile !== EXPLORE_FILTER_ALL) {
    params.profile = profile;
  }

  return params;
};
