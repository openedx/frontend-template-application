import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardRecentTrainingCompletions } from '../../api/dashboard/dashboardApi';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import dashboardMessages from '../../pages/dashboard/messages';

export const dashboardRecentTrainingCompletionsQueryKey = ['dashboard', 'completed-trainings'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardRecentTrainingCompletions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: dashboardRecentTrainingCompletionsQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchDashboardRecentTrainingCompletions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return {
        items: result.data?.results ?? [],
        viewAllHref: ADMIN_PATHS.myTraining,
      };
    },
  });

  return {
    items: query.data?.items ?? [],
    viewAllHref: query.data?.viewAllHref ?? ADMIN_PATHS.myTraining,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(dashboardMessages.recentTrainingCompletionsLoadError),
    refetch: query.refetch,
  };
};

export default useDashboardRecentTrainingCompletions;
