import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardRecentActivities } from '../../api/dashboard/dashboardApi';
import dashboardMessages from '../../pages/dashboard/messages';

export const DASHBOARD_RECENT_ACTIVITIES_QUERY_KEY = ['dashboard', 'nra-admin', 'recent-activity'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardRecentActivities = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: DASHBOARD_RECENT_ACTIVITIES_QUERY_KEY,
    enabled,
    queryFn: async () => {
      const result = await fetchDashboardRecentActivities({ formatMessage });

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
    errorMessage: query.error?.message ?? formatMessage(dashboardMessages.recentActivitiesLoadError),
    refetch: query.refetch,
  };
};

export default useDashboardRecentActivities;
