import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {Array<{
 *   id?: string,
 *   label?: string,
 *   description?: string,
 *   href?: string,
 *   icon?: string,
 *   iconBackground?: string,
 * }>} items
 */
export const normalizeQuickActions = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter((row) => {
    if (!row || !hasDisplayValue(row.id)) {
      return false;
    }

    return hasDisplayValue(row.label)
      || hasDisplayValue(row.description)
      || hasDisplayValue(row.href);
  });
};
