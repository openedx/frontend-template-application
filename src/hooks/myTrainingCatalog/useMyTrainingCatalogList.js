import { useQuery } from '@tanstack/react-query';
import { API_PAGE_SIZE } from '../../api/endpoints';
import { resolveMyTrainingCatalogListMock } from '../../api/myTrainingCatalog/myTrainingCatalogPageMockData';

import { TRAINING_CATALOG_VARIANT_IDS } from '../../utils/trainingCatalogVariantConfig';

export const myTrainingCatalogListQueryKey = (filters) => [
  'training-catalog',
  'list',
  filters.catalogVariantId ?? TRAINING_CATALOG_VARIANT_IDS.MY_TRAINING_CATALOG,
  filters.page,
  filters.search ?? '',
  filters.frameworkFilter ?? 'all',
  filters.roleFilter ?? 'all',
  filters.domainFilter ?? 'all',
  filters.subDomainFilter ?? 'all',
  filters.activityFilter ?? 'all',
  filters.nraGoalFilter ?? 'all',
  filters.providerSlug ?? '',
];

/**
 * Uses mock data until GET /api/v1/my-training-catalog/ is available.
 *
 * @param {{
 *   page?: number,
 *   search?: string,
 *   frameworkFilter?: string,
 *   roleFilter?: string,
 *   domainFilter?: string,
 *   subDomainFilter?: string,
 *   activityFilter?: string,
 *   nraGoalFilter?: string,
 *   providerSlug?: string,
 *   catalogVariantId?: string,
 *   enabled?: boolean,
 * }} options
 */
const useMyTrainingCatalogList = ({
  page = 1,
  search = '',
  frameworkFilter = 'all',
  roleFilter = 'all',
  domainFilter = 'all',
  subDomainFilter = 'all',
  activityFilter = 'all',
  nraGoalFilter = 'all',
  providerSlug = '',
  catalogVariantId = TRAINING_CATALOG_VARIANT_IDS.MY_TRAINING_CATALOG,
  enabled = true,
} = {}) => {
  const query = useQuery({
    queryKey: myTrainingCatalogListQueryKey({
      page,
      search,
      frameworkFilter,
      roleFilter,
      domainFilter,
      subDomainFilter,
      activityFilter,
      nraGoalFilter,
      catalogVariantId,
      providerSlug,
    }),
    enabled,
    queryFn: async () => resolveMyTrainingCatalogListMock({
      page,
      pageSize: API_PAGE_SIZE,
      search,
      catalogVariantId,
      providerSlug,
    }),
  });

  return {
    items: query.data?.items ?? [],
    count: query.data?.count ?? 0,
    currentPage: query.data?.page ?? page,
    totalPages: query.data?.totalPages ?? 1,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useMyTrainingCatalogList;
