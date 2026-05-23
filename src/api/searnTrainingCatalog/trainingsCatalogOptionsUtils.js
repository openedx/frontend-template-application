import { normalizePickerOptionRows } from '../competencyFramework/competencyFrameworkUtils';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const FILTER_ALL = 'all';

/**
 * @param {string} text
 */
export const slugifyCatalogLabel = (text) => String(text || '')
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

/**
 * @param {Array<{ value: string, label: string, optionId?: string }>} options
 * @param {string} slug
 */
export const findTrainingProviderOptionBySlug = (options, slug) => {
  if (!hasDisplayValue(slug) || !Array.isArray(options)) {
    return null;
  }

  const normalizedSlug = slugifyCatalogLabel(slug);

  return options.find(
    (option) => slugifyCatalogLabel(option.label) === normalizedSlug
      || slugifyCatalogLabel(option.value) === normalizedSlug,
  ) ?? null;
};

/**
 * @param {Array<object>|undefined} results
 * @param {{ useUuidValue?: boolean }} config
 */
export const mapCompetencyFrameworkOptionsToDropdown = (results, { useUuidValue = true } = {}) => {
  const rows = normalizePickerOptionRows(results);

  return rows.map((row) => ({
    value: useUuidValue ? String(row.id) : String(row.value),
    label: row.label,
    optionId: String(row.id),
  }));
};

/**
 * @param {Array<object>|undefined} results
 */
export const mapCatalogFilterOptionsToDropdown = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows.map((row) => ({
    value: String(row.id),
    label: row.label,
    optionId: String(row.id),
  }));
};

/**
 * @param {Array<{ value: string, label: string }>} options
 * @param {string} allLabel
 */
export const withAllFilterOption = (options, allLabel) => [
  { value: FILTER_ALL, label: allLabel },
  ...options,
];
