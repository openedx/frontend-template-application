import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchActivitiesList } from '../../api/activities/activitiesApi';
import { ACTIVITY_FILTER_ALL } from '../../api/activities/activitiesConstants';
import { normalizeActivityListResults } from '../../api/activities/activitiesUtils';
import activitiesMessages from '../../pages/activities/messages';

export const activitiesListQueryKey = ({
  page,
  search,
  competencyFramework,
  role,
  domain,
  subDomain,
  proficiencyLevel,
  trainingStatus,
}) => [
  'activities',
  'list',
  page,
  search ?? '',
  competencyFramework ?? '',
  role ?? ACTIVITY_FILTER_ALL,
  domain ?? ACTIVITY_FILTER_ALL,
  subDomain ?? ACTIVITY_FILTER_ALL,
  proficiencyLevel ?? ACTIVITY_FILTER_ALL,
  trainingStatus ?? ACTIVITY_FILTER_ALL,
];

/**
 * @param {{
 *   page: number,
 *   search?: string,
 *   competencyFramework?: string,
 *   role?: string,
 *   domain?: string,
 *   subDomain?: string,
 *   proficiencyLevel?: string,
 *   trainingStatus?: string,
 *   enabled?: boolean,
 * }} options
 */
const useActivitiesList = ({
  page,
  search = '',
  competencyFramework = '',
  role = ACTIVITY_FILTER_ALL,
  domain = ACTIVITY_FILTER_ALL,
  subDomain = ACTIVITY_FILTER_ALL,
  proficiencyLevel = ACTIVITY_FILTER_ALL,
  trainingStatus = ACTIVITY_FILTER_ALL,
  enabled = true,
} = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: activitiesListQueryKey({
      page,
      search,
      competencyFramework,
      role,
      domain,
      subDomain,
      proficiencyLevel,
      trainingStatus,
    }),
    enabled,
    queryFn: async () => {
      const result = await fetchActivitiesList({
        formatMessage,
        page,
        search,
        competencyFramework,
        role,
        domain,
        subDomain,
        proficiencyLevel,
        trainingStatus,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};

      return {
        items: normalizeActivityListResults(data.results),
        count: data.count ?? 0,
        page: data.page ?? page,
        pageSize: data.page_size ?? 20,
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
    errorMessage: query.error?.message ?? formatMessage(activitiesMessages.listLoadError),
    refetch: query.refetch,
  };
};

export default useActivitiesList;
