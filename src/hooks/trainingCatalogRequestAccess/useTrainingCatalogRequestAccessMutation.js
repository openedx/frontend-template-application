import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestTrainingCatalogAccess } from '../../api/trainingCatalogRequestAccess/trainingCatalogRequestAccessApi';

const useTrainingCatalogRequestAccessMutation = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ trainingId }) => {
      const result = await requestTrainingCatalogAccess({
        formatMessage,
        trainingId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searn-training-catalog', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['training-catalog', 'list'] });
    },
  });
};

export default useTrainingCatalogRequestAccessMutation;
