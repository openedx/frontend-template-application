import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchSearnTrainingCatalogList } from '../../api/searnTrainingCatalog/searnTrainingCatalogApi';
import { mapSearnTrainingCatalogListResults } from '../../api/searnTrainingCatalog/searnTrainingCatalogUtils';
import { API_PAGE_SIZE } from '../../api/endpoints';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';

export const searnTrainingCatalogListQueryKey = (filters) => [
  'searn-training-catalog',
  'list',
  filters.page,
  filters.search ?? '',
  filters.frameworkFilter ?? 'all',
  filters.roleFilter ?? 'all',
  filters.domainFilter ?? 'all',
  filters.subDomainFilter ?? 'all',
  filters.activityFilter ?? 'all',
  filters.nraGoalFilter ?? 'all',
  filters.providerFilter ?? 'all',
];

/**
 * @param {{
 *   page: number,
 *   search?: string,
 *   frameworkFilter?: string,
 *   roleFilter?: string,
 *   domainFilter?: string,
 *   subDomainFilter?: string,
 *   activityFilter?: string,
 *   nraGoalFilter?: string,
 *   providerFilter?: string,
 *   enabled?: boolean,
 * }} options
 */
const useSearnTrainingCatalogList = ({
  page,
  search = '',
  frameworkFilter = 'all',
  roleFilter = 'all',
  domainFilter = 'all',
  subDomainFilter = 'all',
  activityFilter = 'all',
  nraGoalFilter = 'all',
  providerFilter = 'all',
  enabled = true,
} = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: searnTrainingCatalogListQueryKey({
      page,
      search,
      frameworkFilter,
      roleFilter,
      domainFilter,
      subDomainFilter,
      activityFilter,
      nraGoalFilter,
      providerFilter,
    }),
    enabled,
    queryFn: async () => {
      const result = await fetchSearnTrainingCatalogList({
        formatMessage,
        page,
        pageSize: API_PAGE_SIZE,
        search,
        frameworkFilter,
        roleFilter,
        domainFilter,
        subDomainFilter,
        activityFilter,
        nraGoalFilter,
        providerFilter,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};

      return {
        items: mapSearnTrainingCatalogListResults(data.results),
        count: data.count ?? 0,
        page: data.page ?? page,
        pageSize: data.page_size ?? API_PAGE_SIZE,
        totalPages: data.total_pages ?? 1,
      };
    },
  });

  return {
    items: query.data?.items ?? [],
    count: query.data?.count ?? 0,
    currentPage: query.data?.page ?? page,
    totalPages: query.data?.totalPages ?? 1,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(catalogMessages.listLoadError),
    refetch: query.refetch,
  };
};

export default useSearnTrainingCatalogList;
