import { useQuery } from '@tanstack/react-query';
import { resolveDashboardQuickActionsMock } from '../../api/dashboard/dashboardPageMockData';

export const DASHBOARD_QUICK_ACTIONS_QUERY_KEY = ['dashboard', 'quick-actions'];

/**
 * Loads quick actions for the dashboard.
 * Uses mock data until GET /api/v1/dashboard/quick-actions/ is available
 * (switch queryFn to fetchDashboardQuickActions when ready).
 *
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardQuickActions = ({ enabled = true } = {}) => {
  const query = useQuery({
    queryKey: DASHBOARD_QUICK_ACTIONS_QUERY_KEY,
    enabled,
    queryFn: async () => resolveDashboardQuickActionsMock(),
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useDashboardQuickActions;
