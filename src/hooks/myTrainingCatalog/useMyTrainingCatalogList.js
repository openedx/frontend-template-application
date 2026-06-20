import { useQuery } from '@tanstack/react-query';
import { API_PAGE_SIZE } from '../../api/endpoints';
import { resolveMyTrainingCatalogListMock } from '../../api/myTrainingCatalog/myTrainingCatalogPageMockData';

export const myTrainingCatalogListQueryKey = (filters) => [
  'my-training-catalog',
  'list',
  filters.page,
  filters.search ?? '',
  filters.frameworkFilter ?? 'all',
  filters.roleFilter ?? 'all',
  filters.domainFilter ?? 'all',
  filters.subDomainFilter ?? 'all',
  filters.activityFilter ?? 'all',
  filters.nraGoalFilter ?? 'all',
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
    }),
    enabled,
    queryFn: async () => resolveMyTrainingCatalogListMock({
      page,
      pageSize: API_PAGE_SIZE,
      search,
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
