import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchMyTrainingList } from '../../api/myTraining/myTrainingApi';
import { mapMyTrainingListResults } from '../../api/myTraining/myTrainingUtils';
import { API_PAGE_SIZE } from '../../api/endpoints';
import myTrainingMessages from '../../pages/myTraining/messages';

export const myTrainingListQueryKey = (filters) => [
  'my-training',
  'list',
  filters.page,
  filters.search ?? '',
];

/**
 * Uses mock data until GET /api/v1/my-training/ is available.
 *
 * @param {{ page?: number, search?: string, enabled?: boolean }} options
 */
const useMyTrainingList = ({
  page = 1,
  search = '',
  enabled = true,
} = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: myTrainingListQueryKey({ page, search }),
    enabled,
    queryFn: async () => {
      const result = await fetchMyTrainingList({
        formatMessage,
        page,
        pageSize: API_PAGE_SIZE,
        search,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};

      return {
        items: mapMyTrainingListResults(data.results),
        count: data.count ?? 0,
        page: data.page ?? page,
        pageSize: data.page_size ?? API_PAGE_SIZE,
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
    errorMessage: query.error?.message ?? formatMessage(myTrainingMessages.listLoadError),
    refetch: query.refetch,
  };
};

export default useMyTrainingList;
