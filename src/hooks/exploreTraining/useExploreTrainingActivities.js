import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { API_PAGE_SIZE } from '../../api/endpoints';
import { fetchExploreTrainingActivities } from '../../api/exploreTraining/exploreTrainingApi';
import {
  EXPLORE_FILTER_ALL,
  mapExploreActivities,
} from '../../api/exploreTraining/exploreTrainingUtils';
import exploreTrainingMessages from '../../pages/exploreTraining/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const exploreTrainingActivitiesQueryKey = (filters) => [
  'explore-training',
  'activities',
  filters.role ?? '',
  filters.page ?? 1,
  filters.search ?? '',
  filters.productType ?? EXPLORE_FILTER_ALL,
  filters.domain ?? EXPLORE_FILTER_ALL,
  filters.subDomain ?? EXPLORE_FILTER_ALL,
  filters.objective ?? EXPLORE_FILTER_ALL,
  filters.profile ?? EXPLORE_FILTER_ALL,
];

/**
 * @param {{
 *   role: string,
 *   page?: number,
 *   search?: string,
 *   productType?: string,
 *   domain?: string,
 *   subDomain?: string,
 *   objective?: string,
 *   profile?: string,
 *   enabled?: boolean,
 * }} options
 */
const useExploreTrainingActivities = ({
  role,
  page = 1,
  search = '',
  productType = EXPLORE_FILTER_ALL,
  domain = EXPLORE_FILTER_ALL,
  subDomain = EXPLORE_FILTER_ALL,
  objective = EXPLORE_FILTER_ALL,
  profile = EXPLORE_FILTER_ALL,
  enabled = true,
} = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: exploreTrainingActivitiesQueryKey({
      role, page, search, productType, domain, subDomain, objective, profile,
    }),
    enabled: enabled && hasDisplayValue(role),
    queryFn: async () => {
      const result = await fetchExploreTrainingActivities({
        formatMessage,
        role,
        page,
        pageSize: API_PAGE_SIZE,
        search,
        productType,
        domain,
        subDomain,
        objective,
        profile,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};

      return {
        items: mapExploreActivities(data.results),
        count: data.count ?? 0,
        page: data.page ?? page,
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
    errorMessage: query.error?.message ?? formatMessage(exploreTrainingMessages.activitiesLoadError),
    refetch: query.refetch,
  };
};

export default useExploreTrainingActivities;
