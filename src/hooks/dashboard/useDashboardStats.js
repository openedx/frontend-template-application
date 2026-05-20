import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '../../api/dashboard/dashboardApi';

export const DASHBOARD_STATS_QUERY_KEY = ['dashboard', 'stats'];

/**
 * Loads dashboard stat cards from the API.
 * HTTP logic lives in api/dashboard/dashboardApi.js — not in components.
 */
const useDashboardStats = () => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: DASHBOARD_STATS_QUERY_KEY,
    queryFn: async () => {
      const result = await fetchDashboardStats({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result.data?.results ?? [];
    },
  });

  return {
    stats: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useDashboardStats;
