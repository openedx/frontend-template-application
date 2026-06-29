import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createMyTrainingCatalog,
  deleteMyTrainingCatalog,
  updateMyTrainingCatalog,
} from '../../api/myTrainingCatalog/myTrainingCatalogApi';
import { myTrainingCatalogListQueryKey } from './useMyTrainingCatalogList';
import { TRAINING_CATALOG_VARIANT_IDS } from '../../utils/trainingCatalogVariantConfig';

const useMyTrainingCatalogMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const invalidateList = () => {
    queryClient.invalidateQueries({
      queryKey: ['training-catalog', 'list', TRAINING_CATALOG_VARIANT_IDS.MY_TRAINING_CATALOG],
    });
  };

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await createMyTrainingCatalog({ formatMessage, payload });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: invalidateList,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ trainingId, payload }) => {
      const result = await updateMyTrainingCatalog({
        formatMessage,
        trainingId,
        payload,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { trainingId }) => {
      invalidateList();
      queryClient.invalidateQueries({ queryKey: ['training-catalog', 'form-detail', trainingId] });
      queryClient.invalidateQueries({ queryKey: ['training-catalog', 'detail', TRAINING_CATALOG_VARIANT_IDS.MY_TRAINING_CATALOG, trainingId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (trainingId) => {
      const result = await deleteMyTrainingCatalog({ formatMessage, trainingId });

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

export default useMyTrainingCatalogMutations;
