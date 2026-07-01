import { hasDisplayValue } from '../../utils/hasDisplayValue';

const hasValidCompletedCount = (value) => (
  typeof value === 'number' && !Number.isNaN(value) && value >= 0
);

/**
 * @param {Array<{ id?: string, name?: string, completedCount?: number }>} items
 */
export const normalizePopularTrainings = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter((row) => {
    if (!row || !hasDisplayValue(row.id)) {
      return false;
    }

    return hasDisplayValue(row.name) || hasValidCompletedCount(row.completedCount);
  });
};

export { hasDisplayValue, hasValidCompletedCount };
