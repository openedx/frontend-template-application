import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { startMyTraining, updateMyTraining } from '../../api/myTraining/myTrainingApi';
import { myTrainingDetailQueryKey } from './useMyTrainingDetail';

const useMyTrainingMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const invalidateList = () => {
    queryClient.invalidateQueries({ queryKey: ['my-training', 'list'] });
  };

  const invalidateDetail = (trainingId) => {
    queryClient.invalidateQueries({ queryKey: myTrainingDetailQueryKey(trainingId) });
  };

  const updateMutation = useMutation({
    mutationFn: async ({
      trainingId,
      status,
      rating,
      feedback,
      proofFile,
      proofFileName,
    }) => {
      const result = await updateMyTraining({
        formatMessage,
        trainingId,
        status,
        rating,
        feedback,
        proofFile,
        proofFileName,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_data, variables) => {
      invalidateList();
      invalidateDetail(variables.trainingId);
    },
  });

  const startMutation = useMutation({
    mutationFn: async ({ trainingId }) => {
      const result = await startMyTraining({ formatMessage, trainingId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_data, variables) => {
      invalidateList();
      invalidateDetail(variables.trainingId);
    },
  });

  return {
    updateMutation,
    startMutation,
  };
};

export default useMyTrainingMutations;
