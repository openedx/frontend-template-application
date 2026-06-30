import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardQuickActions } from '../../api/dashboard/dashboardApi';
import { resolveDashboardQuickActionsScope } from '../../api/dashboard/dashboardScopeUtils';
import { useUserRole } from '../../contexts/UserRoleContext';
import dashboardMessages from '../../pages/dashboard/messages';

export const dashboardQuickActionsQueryKey = (scope) => (
  ['dashboard', 'quick-actions', scope ?? 'default']
);

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardQuickActions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();
  const { role } = useUserRole();
  const scope = resolveDashboardQuickActionsScope(role);

  const query = useQuery({
    queryKey: dashboardQuickActionsQueryKey(scope),
    enabled,
    queryFn: async () => {
      const result = await fetchDashboardQuickActions({ formatMessage, userRole: role });

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
