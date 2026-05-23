import { hasDisplayValue } from '../../utils/hasDisplayValue';

const hasValidRequestCount = (value) => (
  typeof value === 'number' && !Number.isNaN(value) && value >= 0
);

const hasValidRank = (value) => (
  typeof value === 'number' && !Number.isNaN(value) && value > 0
);

/**
 * @param {Array<{ id?: string, rank?: number, title?: string, subtitle?: string, requestCount?: number }>} items
 */
export const normalizeTopRequestedActivities = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter((row) => {
    if (!row) {
      return false;
    }

    return hasDisplayValue(row.title)
      || hasDisplayValue(row.subtitle)
      || hasValidRequestCount(row.requestCount)
      || hasValidRank(row.rank);
  });
};

export { hasDisplayValue, hasValidRank, hasValidRequestCount };
