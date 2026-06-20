import { useQuery } from '@tanstack/react-query';
import { resolveMyTrainingCatalogFeedbackMock } from '../../api/myTrainingCatalog/myTrainingCatalogPageMockData';

export const myTrainingCatalogFeedbackQueryKey = (trainingId) => (
  ['my-training-catalog', 'feedback', trainingId ?? '']
);

/**
 * @param {{ trainingId?: string, enabled?: boolean }} options
 */
const useMyTrainingCatalogFeedback = ({ trainingId, enabled = true } = {}) => {
  const query = useQuery({
    queryKey: myTrainingCatalogFeedbackQueryKey(trainingId),
    enabled: enabled && Boolean(trainingId),
    queryFn: async () => {
      const data = resolveMyTrainingCatalogFeedbackMock(trainingId);
      if (!data) {
        throw new Error('NOT_FOUND');
      }
      return data;
    },
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useMyTrainingCatalogFeedback;
