import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { resolveMyTrainingCatalogFormDetailMock } from '../../api/myTrainingCatalog/myTrainingCatalogPageMockData';
import myTrainingCatalogMessages from '../../pages/myTrainingCatalog/messages';

export const myTrainingCatalogFormDetailQueryKey = (trainingId) => (
  ['training-catalog', 'form-detail', trainingId ?? '']
);

/**
 * @param {{ trainingId?: string, enabled?: boolean }} options
 */
const useMyTrainingCatalogFormDetail = ({ trainingId, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: myTrainingCatalogFormDetailQueryKey(trainingId),
    enabled: enabled && Boolean(trainingId),
    queryFn: async () => {
      const detail = resolveMyTrainingCatalogFormDetailMock(trainingId);

      if (!detail) {
        throw new Error(formatMessage(myTrainingCatalogMessages.formDetailNotFound));
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

export default useMyTrainingCatalogFormDetail;
