import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createRequestedTraining,
  patchRequestedTrainingFlag,
  patchRequestedTrainingStatus,
} from '../../api/requestedTrainings/requestedTrainingsApi';

const useRequestedTrainingMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const invalidateRequestedTrainings = () => {
    queryClient.invalidateQueries({ queryKey: ['requested-trainings'] });
  };

  const createMutation = useMutation({
    mutationFn: async ({ activityId, description }) => {
      const result = await createRequestedTraining({
        formatMessage,
        activityId,
        description,
      });
      if (!result.ok) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: invalidateRequestedTrainings,
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const result = await patchRequestedTrainingStatus({
        formatMessage,
        id,
        action,
      });
      if (!result.ok) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: invalidateRequestedTrainings,
  });

  const flagMutation = useMutation({
    mutationFn: async ({ id, isFlagged }) => {
      const result = await patchRequestedTrainingFlag({
        formatMessage,
        id,
        isFlagged,
      });
      if (!result.ok) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: invalidateRequestedTrainings,
  });

  return {
    createMutation,
    statusMutation,
    flagMutation,
  };
};

export default useRequestedTrainingMutations;
