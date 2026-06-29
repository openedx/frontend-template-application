import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { API_PAGE_SIZE } from '../../api/endpoints';
import { fetchMyTrainingCatalogList } from '../../api/myTrainingCatalog/myTrainingCatalogApi';
import { normalizeMyTrainingCatalogList } from '../../api/myTrainingCatalog/myTrainingCatalogUtils';
import { resolveMyTrainingCatalogListMock } from '../../api/myTrainingCatalog/myTrainingCatalogPageMockData';
import myTrainingCatalogMessages from '../../pages/myTrainingCatalog/messages';
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
  const { formatMessage } = useIntl();
  const isNraVariant = catalogVariantId === TRAINING_CATALOG_VARIANT_IDS.NRA_SPECIFIC_TRAINING_CATALOG;

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
    queryFn: async () => {
      if (isNraVariant) {
        return resolveMyTrainingCatalogListMock({
          page,
          pageSize: API_PAGE_SIZE,
          search,
          catalogVariantId,
          providerSlug,
        });
      }

      const result = await fetchMyTrainingCatalogList({
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
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};

      return {
        items: normalizeMyTrainingCatalogList(data.results),
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
    errorMessage: query.error?.message ?? formatMessage(myTrainingCatalogMessages.listLoadError),
    refetch: query.refetch,
  };
};

export default useMyTrainingCatalogList;
