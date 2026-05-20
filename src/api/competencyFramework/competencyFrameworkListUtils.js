import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {object} item - API list row
 * @returns {object} Card-friendly shape for FrameworkCard
 */
export const mapFrameworkListItemFromApi = (item) => ({
  id: item?.id,
  title: item?.title,
  description: item?.description,
  domains: item?.domains,
  subDomains: item?.sub_domains,
  createdAt: item?.created_at,
});

/**
 * @param {Array<object>} results
 */
export const normalizeFrameworkListResults = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapFrameworkListItemFromApi)
    .filter((row) => hasDisplayValue(row.id));
};
