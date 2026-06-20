import { useQuery } from '@tanstack/react-query';
import { resolveDashboardTopTrainingsMock } from '../../api/dashboard/dashboardPageMockData';

export const DASHBOARD_TOP_TRAININGS_QUERY_KEY = ['dashboard', 'top-trainings'];

/**
 * Loads top trainings for the dashboard.
 * Uses mock data until GET /api/v1/dashboard/top-trainings/ is available
 * (switch queryFn to fetchDashboardTopTrainings when ready).
 *
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardTopTrainings = ({ enabled = true } = {}) => {
  const query = useQuery({
    queryKey: DASHBOARD_TOP_TRAININGS_QUERY_KEY,
    enabled,
    queryFn: async () => resolveDashboardTopTrainingsMock(),
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useDashboardTopTrainings;
