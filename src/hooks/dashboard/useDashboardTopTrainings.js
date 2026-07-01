import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardTopTrainings } from '../../api/dashboard/dashboardApi';
import dashboardMessages from '../../pages/dashboard/messages';

export const DASHBOARD_TOP_TRAININGS_QUERY_KEY = ['dashboard', 'top-trainings'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useDashboardTopTrainings = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: DASHBOARD_TOP_TRAININGS_QUERY_KEY,
    enabled,
    queryFn: async () => {
      const result = await fetchDashboardTopTrainings({ formatMessage });

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
    errorMessage: query.error?.message ?? formatMessage(dashboardMessages.topTrainingsLoadError),
    refetch: query.refetch,
  };
};

export default useDashboardTopTrainings;
