/**
 * @param {Array<unknown>|number} currentItemsOrCount
 * @param {number} totalCount
 */
export const buildPaginationShowingParams = (currentItemsOrCount, totalCount) => {
  const count = Array.isArray(currentItemsOrCount)
    ? currentItemsOrCount.length
    : Number(currentItemsOrCount) || 0;

  return {
    count,
    total: totalCount ?? 0,
  };
};
