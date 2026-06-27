import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation } from '@tanstack/react-query';
import { requestTrainingCatalogAccess } from '../../api/trainingCatalogRequestAccess/trainingCatalogRequestAccessApi';

const useTrainingCatalogRequestAccessMutation = () => {
  const { formatMessage } = useIntl();

  return useMutation({
    mutationFn: async ({ catalogVariantId, trainingId }) => {
      const result = await requestTrainingCatalogAccess({
        formatMessage,
        catalogVariantId,
        trainingId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
};

export default useTrainingCatalogRequestAccessMutation;
