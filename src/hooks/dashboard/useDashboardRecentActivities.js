import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardRecentActivities } from '../../api/dashboard/dashboardApi';
import dashboardMessages from '../../pages/dashboard/messages';

export const dashboardRecentActivitiesQueryKey = ['dashboard', 'recent-activity'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardRecentActivities = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: dashboardRecentActivitiesQueryKey,
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
