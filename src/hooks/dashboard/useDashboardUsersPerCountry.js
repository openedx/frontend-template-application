import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardUsersPerCountry } from '../../api/dashboard/dashboardApi';

export const DASHBOARD_USERS_PER_COUNTRY_QUERY_KEY = ['dashboard', 'users-per-country'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardUsersPerCountry = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: DASHBOARD_USERS_PER_COUNTRY_QUERY_KEY,
    enabled,
    queryFn: async () => {
      const result = await fetchDashboardUsersPerCountry({ formatMessage });

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

export default useDashboardUsersPerCountry;
