import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createTrainingProviderOnboard,
  deleteTrainingProviderOnboard,
  updateTrainingProviderOnboard,
} from '../../api/trainingProviders/trainingProvidersApi';

const useTrainingProviderMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const invalidateList = () => {
    queryClient.invalidateQueries({ queryKey: ['training-providers', 'onboard', 'list'] });
  };

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await createTrainingProviderOnboard({ formatMessage, payload });
      if (!result.ok) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: invalidateList,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ providerId, payload }) => {
      const result = await updateTrainingProviderOnboard({
        formatMessage,
        providerId,
        payload,
      });
      if (!result.ok) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: (_, { providerId }) => {
      invalidateList();
      queryClient.invalidateQueries({ queryKey: ['training-providers', 'onboard', 'detail', providerId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (providerId) => {
      const result = await deleteTrainingProviderOnboard({ formatMessage, providerId });
      if (!result.ok) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: invalidateList,
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};

export default useTrainingProviderMutations;
