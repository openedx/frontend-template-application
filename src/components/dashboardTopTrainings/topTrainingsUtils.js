import { hasDisplayValue } from '../../utils/hasDisplayValue';

const hasValidLearnersCount = (value) => (
  typeof value === 'number' && !Number.isNaN(value) && value >= 0
);

const hasValidRating = (value) => (
  typeof value === 'number' && !Number.isNaN(value) && value > 0
);

/**
 * @param {Array<{ id?: string, training?: string, learners?: number, rating?: number | null }>} items
 */
export const normalizeTopTrainings = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter((row) => {
    if (!row || !hasDisplayValue(row.id)) {
      return false;
    }

    return hasDisplayValue(row.training)
      || hasValidLearnersCount(row.learners)
      || hasValidRating(row.rating);
  });
};

export { hasDisplayValue, hasValidLearnersCount, hasValidRating };
