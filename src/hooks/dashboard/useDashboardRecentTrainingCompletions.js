import { useQuery } from '@tanstack/react-query';
import { resolveDashboardRecentTrainingCompletionsMock } from '../../api/dashboard/dashboardPageMockData';

export const DASHBOARD_RECENT_TRAINING_COMPLETIONS_QUERY_KEY = ['dashboard', 'recent-training-completions'];

/**
 * Loads recent training completions for the dashboard.
 * Uses mock data until GET /api/v1/dashboard/recent-training-completions/ is available
 * (switch queryFn to fetchDashboardRecentTrainingCompletions when ready).
 *
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardRecentTrainingCompletions = ({ enabled = true } = {}) => {
  const query = useQuery({
    queryKey: DASHBOARD_RECENT_TRAINING_COMPLETIONS_QUERY_KEY,
    enabled,
    queryFn: async () => resolveDashboardRecentTrainingCompletionsMock(),
  });

  return {
    items: query.data?.items ?? [],
    viewAllHref: query.data?.viewAllHref ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useDashboardRecentTrainingCompletions;
