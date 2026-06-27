import { useQuery } from '@tanstack/react-query';
import { resolveDashboardPopularTrainingsMock } from '../../api/dashboard/dashboardPageMockData';

export const DASHBOARD_POPULAR_TRAININGS_QUERY_KEY = ['dashboard', 'popular-trainings'];

/**
 * Loads popular trainings for the dashboard.
 * Uses mock data until GET /api/v1/dashboard/popular-trainings/ is available
 * (switch queryFn to fetchDashboardPopularTrainings when ready).
 *
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardPopularTrainings = ({ enabled = true } = {}) => {
  const query = useQuery({
    queryKey: DASHBOARD_POPULAR_TRAININGS_QUERY_KEY,
    enabled,
    queryFn: async () => resolveDashboardPopularTrainingsMock(),
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useDashboardPopularTrainings;
