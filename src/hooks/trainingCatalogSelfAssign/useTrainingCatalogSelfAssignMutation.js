import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { selfEnrollTrainingCatalog } from '../../api/trainingCatalogSelfAssign/trainingCatalogSelfAssignApi';

const useTrainingCatalogSelfAssignMutation = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ trainingId }) => {
      const result = await selfEnrollTrainingCatalog({
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
      queryClient.invalidateQueries({ queryKey: ['explore-training', 'trainings'] });
      queryClient.invalidateQueries({ queryKey: ['explore-training', 'preview'] });
    },
  });
};

export default useTrainingCatalogSelfAssignMutation;
