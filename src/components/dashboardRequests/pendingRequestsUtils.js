import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {Array<{ id?: string, title?: string, description?: string, tag?: string, timeAgo?: string }>} items
 */
export const normalizePendingRequests = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter((row) => {
    if (!row || !hasDisplayValue(row.id)) {
      return false;
    }

    return hasDisplayValue(row.title)
      || hasDisplayValue(row.description)
      || hasDisplayValue(row.tag)
      || hasDisplayValue(row.timeAgo);
  });
};
