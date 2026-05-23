import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchPendingRequestDetail } from '../../api/pendingRequests/pendingRequestsApi';
import { mapPendingRequestDetail } from '../../api/pendingRequests/pendingRequestsUtils';
import pendingRequestsMessages from '../../pages/pendingRequests/messages';

export const pendingRequestDetailQueryKey = (id) => ['pending-requests', 'detail', id];

/**
 * @param {{ id: string|number, enabled?: boolean }} options
 */
const usePendingRequestDetail = ({ id, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: pendingRequestDetailQueryKey(id),
    enabled: enabled && Boolean(id),
    queryFn: async () => {
      const result = await fetchPendingRequestDetail({
        formatMessage,
        id,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapPendingRequestDetail(result.data);
    },
  });

  return {
    detail: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(pendingRequestsMessages.detailLoadError),
    refetch: query.refetch,
  };
};

export default usePendingRequestDetail;