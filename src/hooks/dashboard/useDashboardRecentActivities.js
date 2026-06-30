import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardRecentActivities } from '../../api/dashboard/dashboardApi';
import { resolveDashboardRecentActivityScope } from '../../api/dashboard/dashboardScopeUtils';
import { useUserRole } from '../../contexts/UserRoleContext';
import dashboardMessages from '../../pages/dashboard/messages';

export const dashboardRecentActivitiesQueryKey = (scope) => (
  ['dashboard', 'recent-activity', scope ?? 'nra-admin']
);

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardRecentActivities = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();
  const { role } = useUserRole();
  const scope = resolveDashboardRecentActivityScope(role);

  const query = useQuery({
    queryKey: dashboardRecentActivitiesQueryKey(scope),
    enabled,
    queryFn: async () => {
      const result = await fetchDashboardRecentActivities({ formatMessage, userRole: role });

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
    errorMessage: query.error?.message ?? formatMessage(dashboardMessages.recentActivitiesLoadError),
    refetch: query.refetch,
  };
};

export default useDashboardRecentActivities;
