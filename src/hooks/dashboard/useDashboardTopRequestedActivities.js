import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardTopRequestedActivities } from '../../api/dashboard/dashboardApi';

export const DASHBOARD_TOP_REQUESTED_ACTIVITIES_QUERY_KEY = ['dashboard', 'top-requested-activities'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardTopRequestedActivities = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: DASHBOARD_TOP_REQUESTED_ACTIVITIES_QUERY_KEY,
    enabled,
    queryFn: async () => {
      const result = await fetchDashboardTopRequestedActivities({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result.data?.results ?? [];
    },
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useDashboardTopRequestedActivities;
