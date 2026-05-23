import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {Array<object>} results
 */
export const normalizeCountryOptions = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results.filter(
    (row) => hasDisplayValue(row?.id)
      && hasDisplayValue(row?.value)
      && hasDisplayValue(row?.label),
  );
};

/**
 * @param {Array<object>} options
 */
export const toCountryDropdownOptions = (options) => options.map(({ value, label }) => ({
  value: String(value),
  label,
}));
