import { useQuery } from '@tanstack/react-query';
import { resolveDashboardRecentActivitiesMock } from '../../api/dashboard/dashboardPageMockData';

export const DASHBOARD_RECENT_ACTIVITIES_QUERY_KEY = ['dashboard', 'recent-activities'];

/**
 * Loads recent activities for the dashboard.
 * Uses mock data until GET /api/v1/dashboard/recent-activities/ is available
 * (switch queryFn to fetchDashboardRecentActivities when ready).
 *
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardRecentActivities = ({ enabled = true } = {}) => {
  const query = useQuery({
    queryKey: DASHBOARD_RECENT_ACTIVITIES_QUERY_KEY,
    enabled,
    queryFn: async () => resolveDashboardRecentActivitiesMock(),
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useDashboardRecentActivities;
