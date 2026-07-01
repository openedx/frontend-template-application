import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardQuickActions } from '../../api/dashboard/dashboardApi';
import dashboardMessages from '../../pages/dashboard/messages';

export const dashboardQuickActionsQueryKey = ['dashboard', 'quick-actions'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardQuickActions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: dashboardQuickActionsQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchDashboardQuickActions({ formatMessage });

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
    errorMessage: query.error?.message ?? formatMessage(dashboardMessages.quickActionsLoadError),
    refetch: query.refetch,
  };
};

export default useDashboardQuickActions;
