import { API_PAGE_SIZE } from '../endpoints';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import {
  ACTIVITY_FILTER_ALL,
  ACTIVITY_FRAMEWORK_FILTER_ALL,
  ACTIVITY_FRAMEWORK_FILTER_NONE,
} from './activitiesConstants';

/**
 * @param {Array<object>} results
 */
export const normalizePickerOptionRows = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results.filter(
    (row) => hasDisplayValue(row?.id) && hasDisplayValue(row?.label),
  );
};

/**
 * Dropdown values use option `id` for API filter query params.
 * @param {Array<object>} results
 */
export const mapPickerRowsToDropdownOptions = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows.map((row) => ({
    value: String(row.id),
    label: row.label,
  }));
};

/**
 * @param {object} row
 */
export const mapActivityListRow = (row) => ({
  id: row?.id,
  title: row?.title ?? '',
  description: row?.description ?? '',
  domain: row?.domain ?? '',
  subDomain: row?.sub_domain ?? '',
  proficiencyLevel: row?.proficiency_level ?? '',
  targetRole: row?.target_role ?? '',
});

/**
 * @param {Array<object>} results
 */
export const normalizeActivityListResults = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapActivityListRow)
    .filter((row) => hasDisplayValue(row.id));
};

/**
 * @param {{
 *   page: number,
 *   search?: string,
 *   competencyFramework?: string,
 *   role?: string,
 *   domain?: string,
 *   subDomain?: string,
 *   proficiencyLevel?: string,
 *   trainingStatus?: string,
 * }} filters
 */
export const buildActivityListQueryParams = ({
  page,
  search,
  competencyFramework,
  role,
  domain,
  subDomain,
  proficiencyLevel,
  trainingStatus,
}) => {
  const params = {
    page,
    page_size: API_PAGE_SIZE,
  };

  const trimmedSearch = search?.trim();
  if (hasDisplayValue(trimmedSearch)) {
    params.search = trimmedSearch;
  }

  if (
    hasDisplayValue(competencyFramework)
    && competencyFramework !== ACTIVITY_FRAMEWORK_FILTER_NONE
    && competencyFramework !== ACTIVITY_FRAMEWORK_FILTER_ALL
  ) {
    params['competency-framework'] = competencyFramework;
  }

  if (hasDisplayValue(role) && role !== ACTIVITY_FILTER_ALL) {
    params.role = role;
  }

  if (hasDisplayValue(domain) && domain !== ACTIVITY_FILTER_ALL) {
    params.domain = domain;
  }

  if (hasDisplayValue(subDomain) && subDomain !== ACTIVITY_FILTER_ALL) {
    params['sub-domain'] = subDomain;
  }

  if (hasDisplayValue(proficiencyLevel) && proficiencyLevel !== ACTIVITY_FILTER_ALL) {
    params['proficiency-levels'] = proficiencyLevel;
  }

  if (hasDisplayValue(trainingStatus) && trainingStatus !== ACTIVITY_FILTER_ALL) {
    params['training-status'] = trainingStatus;
  }

  return params;
};
