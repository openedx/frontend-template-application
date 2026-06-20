import { useQuery } from '@tanstack/react-query';
import { resolveMyTrainingCatalogDetailMock } from '../../api/myTrainingCatalog/myTrainingCatalogPageMockData';

export const myTrainingCatalogDetailQueryKey = (trainingId) => (
  ['my-training-catalog', 'detail', trainingId ?? '']
);

/**
 * @param {{ trainingId?: string, enabled?: boolean }} options
 */
const useMyTrainingCatalogDetail = ({ trainingId, enabled = true } = {}) => {
  const query = useQuery({
    queryKey: myTrainingCatalogDetailQueryKey(trainingId),
    enabled: enabled && Boolean(trainingId),
    queryFn: async () => {
      const detail = resolveMyTrainingCatalogDetailMock(trainingId);
      if (!detail) {
        throw new Error('NOT_FOUND');
      }
      return detail;
    },
  });

  return {
    training: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useMyTrainingCatalogDetail;
