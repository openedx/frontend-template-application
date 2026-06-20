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
export const hasRequestedTrainingIsFlaggedField = (row) => (
  row != null
  && typeof row === 'object'
  && Object.prototype.hasOwnProperty.call(row, 'is_flagged')
  && row.is_flagged !== null
  && row.is_flagged !== undefined
);

/**
 * @param {object} row
 */
export const mapRequestedTrainingListRow = (row) => {
  const mapped = {
    id: row?.id,
    activity: row?.activity,
    description: row?.description,
    status: row?.status,
    flags: row?.flags,
  };

  if (hasRequestedTrainingIsFlaggedField(row)) {
    mapped.isFlagged = Boolean(row.is_flagged);
  }

  return mapped;
};

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
