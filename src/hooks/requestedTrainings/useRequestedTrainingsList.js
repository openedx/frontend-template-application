import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchRequestedTrainingsList } from '../../api/requestedTrainings/requestedTrainingsApi';
import { normalizeRequestedTrainingList } from '../../api/requestedTrainings/requestedTrainingsUtils';
import requestedTrainingsMessages from '../../pages/requestedTrainings/messages';

export const requestedTrainingsListQueryKey = (page, search, status) => (
  ['requested-trainings', 'list', page, search ?? '', status ?? 'all']
);

/**
 * @param {{ page: number, search?: string, status?: string, enabled?: boolean }} options
 */
const useRequestedTrainingsList = ({
  page,
  search = '',
  status = 'all',
  enabled = true,
} = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: requestedTrainingsListQueryKey(page, search, status),
    enabled,
    queryFn: async () => {
      const result = await fetchRequestedTrainingsList({
        formatMessage,
        page,
        search,
        status,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};

      return {
        items: normalizeRequestedTrainingList(data.results),
        count: data.count ?? 0,
        page: data.page ?? page,
        pageSize: data.page_size ?? 20,
        totalPages: data.total_pages ?? 1,
      };
    },
  });

  return {
    items: query.data?.items ?? [],
    count: query.data?.count ?? 0,
    currentPage: query.data?.page ?? page,
    totalPages: query.data?.totalPages ?? 1,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(requestedTrainingsMessages.listLoadError),
    refetch: query.refetch,
  };
};

export default useRequestedTrainingsList;
