import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {Array<{
 *   id?: string,
 *   title?: string,
 *   provider?: string,
 *   completedDate?: string,
 *   hasProof?: boolean,
 * }>} items
 */
export const normalizeRecentTrainingCompletions = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter((row) => {
    if (!row || !hasDisplayValue(row.id)) {
      return false;
    }

    return hasDisplayValue(row.title)
      || hasDisplayValue(row.provider)
      || hasDisplayValue(row.completedDate)
      || row.hasProof === true;
  });
};

export const hasProofAvailable = (value) => value === true;

/**
 * @param {{ provider?: string, completedDate?: string }} item
 * @param {Function} formatMessage
 * @param {{ completedOn: object }} completionMessages
 * @returns {string}
 */
export const buildCompletionSubtitle = (item, formatMessage, completionMessages) => {
  const segments = [];

  if (hasDisplayValue(item.provider)) {
    segments.push(item.provider);
  }

  if (hasDisplayValue(item.completedDate)) {
    segments.push(formatMessage(completionMessages.completedOn, { date: item.completedDate }));
  }

  return segments.join(' · ');
};
