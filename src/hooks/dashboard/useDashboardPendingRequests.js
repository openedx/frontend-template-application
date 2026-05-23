import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardPendingRequests } from '../../api/dashboard/dashboardApi';
import {
  mapPendingRequestToDashboardCard,
  normalizePendingRequestList,
} from '../../api/pendingRequests/pendingRequestsUtils';

export const DASHBOARD_PENDING_REQUESTS_QUERY_KEY = ['dashboard', 'pending-requests'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardPendingRequests = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: DASHBOARD_PENDING_REQUESTS_QUERY_KEY,
    enabled,
    queryFn: async () => {
      const result = await fetchDashboardPendingRequests({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const rows = normalizePendingRequestList(result.data?.results);
      return rows.map(mapPendingRequestToDashboardCard);
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

export default useDashboardPendingRequests;
