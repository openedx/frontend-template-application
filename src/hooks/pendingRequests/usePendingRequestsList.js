import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchPendingRequestsList } from '../../api/pendingRequests/pendingRequestsApi';
import { normalizePendingRequestList } from '../../api/pendingRequests/pendingRequestsUtils';
import pendingRequestsMessages from '../../pages/pendingRequests/messages';

export const pendingRequestsListQueryKey = (page, search, type) => (
  ['pending-requests', 'list', page, search ?? '', type ?? 'all']
);

/**
 * @param {{ page: number, search?: string, type?: string, enabled?: boolean }} options
 */
const usePendingRequestsList = ({
  page,
  search = '',
  type = 'all',
  enabled = true,
} = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: pendingRequestsListQueryKey(page, search, type),
    enabled,
    queryFn: async () => {
      const result = await fetchPendingRequestsList({
        formatMessage,
        page,
        search,
        type,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};

      return {
        items: normalizePendingRequestList(data.results),
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
    errorMessage: query.error?.message ?? formatMessage(pendingRequestsMessages.listLoadError),
    refetch: query.refetch,
  };
};

export default usePendingRequestsList;