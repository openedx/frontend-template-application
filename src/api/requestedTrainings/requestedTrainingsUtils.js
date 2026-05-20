import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {Array<object>} results
 */
export const normalizeRequestedTrainingFilters = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results.filter(
    (row) => hasDisplayValue(row.id) && hasDisplayValue(row.value) && hasDisplayValue(row.label),
  );
};

/**
 * @param {object} row
 */
export const mapRequestedTrainingListRow = (row) => ({
  id: row?.id,
  activity: row?.activity,
  description: row?.description,
  status: row?.status,
  flags: row?.flags,
});

/**
 * @param {Array<object>} results
 */
export const normalizeRequestedTrainingList = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapRequestedTrainingListRow)
    .filter((row) => hasDisplayValue(row.id));
};

/**
 * @param {Array<object>} results
 */
export const normalizeRequestedTrainingActivities = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results.filter(
    (row) => hasDisplayValue(row.id) && hasDisplayValue(row.label),
  );
};

/**
 * Map activity options for SearchableDropdown; `value` is activity id for POST `activity_id`.
 * @param {Array<object>} results
 */
export const mapRequestedTrainingActivityDropdownOptions = (results) => {
  const items = normalizeRequestedTrainingActivities(results);

  return items.map(({ id, label }) => ({
    value: String(id),
    label,
  }));
};
