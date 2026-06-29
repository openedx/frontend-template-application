import nraTrainingsMock from '../../mock/nraSpecificTrainingCatalog/trainings.json';
import {
  isNraSpecificTrainingRequestedMock,
} from '../trainingCatalogRequestAccess/trainingCatalogRequestAccessMockData';
import { TRAINING_CATALOG_VARIANT_IDS } from '../../utils/trainingCatalogVariantConfig';
import { API_PAGE_SIZE } from '../endpoints';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { normalizeMyTrainingCatalogList } from './myTrainingCatalogUtils';

/**
 * NRA-specific training catalog list mock (until dedicated API is connected).
 *
 * @param {{ page?: number, pageSize?: number, search?: string, catalogVariantId?: string, providerSlug?: string }} params
 */
export const resolveMyTrainingCatalogListMock = ({
  page = 1,
  pageSize = API_PAGE_SIZE,
  search = '',
  catalogVariantId = TRAINING_CATALOG_VARIANT_IDS.MY_TRAINING_CATALOG,
  providerSlug = '',
} = {}) => {
  if (catalogVariantId !== TRAINING_CATALOG_VARIANT_IDS.NRA_SPECIFIC_TRAINING_CATALOG) {
    return {
      items: [],
      count: 0,
      page: 1,
      pageSize,
      totalPages: 1,
    };
  }

  let items = normalizeMyTrainingCatalogList(nraTrainingsMock?.results).map((row) => ({
    ...row,
    isRequested: row.isRequested || isNraSpecificTrainingRequestedMock(row.id),
  }));
  const trimmedSearch = search?.trim().toLowerCase();

  if (hasDisplayValue(trimmedSearch)) {
    items = items.filter((row) => (
      String(row.title || '').toLowerCase().includes(trimmedSearch)
      || String(row.description || '').toLowerCase().includes(trimmedSearch)
    ));
  }

  if (hasDisplayValue(providerSlug)) {
    items = items.filter((row) => String(row.providerSlug) === String(providerSlug));
  }

  const count = nraTrainingsMock?.count ?? items.length;
  const totalPages = Math.max(1, nraTrainingsMock?.total_pages ?? 1);
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const pagedItems = items.slice(start, start + pageSize);

  return {
    items: pagedItems,
    count,
    page: safePage,
    pageSize,
    totalPages,
  };
};
