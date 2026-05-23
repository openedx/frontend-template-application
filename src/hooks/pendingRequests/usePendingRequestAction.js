import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchPendingRequestAction } from '../../api/pendingRequests/pendingRequestsApi';
const usePendingRequestAction = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const invalidatePendingRequests = () => {
    queryClient.invalidateQueries({ queryKey: ['pending-requests'] });
  };

  const approveMutation = useMutation({
    mutationFn: async ({ id }) => {
      const result = await patchPendingRequestAction({
        formatMessage,
        id,
        action: 'approve',
      });
      if (!result.ok) throw new Error(result.message);
      return result;
    },
    onSuccess: invalidatePendingRequests,
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ id }) => {
      const result = await patchPendingRequestAction({
        formatMessage,
        id,
        action: 'reject',
      });
      if (!result.ok) throw new Error(result.message);
      return result;
    },
    onSuccess: invalidatePendingRequests,
  });

  const closeMutation = useMutation({
    mutationFn: async ({ id }) => {
      const result = await patchPendingRequestAction({
        formatMessage,
        id,
        action: 'close',
      });
      if (!result.ok) throw new Error(result.message);
      return result;
    },
    onSuccess: invalidatePendingRequests,
  });

  return {
    approveMutation,
    rejectMutation,
    closeMutation,
  };
};

export default usePendingRequestAction;