import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchMyTrainingCatalogFormDetail } from '../../api/myTrainingCatalog/myTrainingCatalogApi';
import {
  mapMyTrainingCatalogFormDetail,
  unwrapMyTrainingCatalogFormDetail,
} from '../../api/myTrainingCatalog/myTrainingCatalogUtils';
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
      const result = await fetchMyTrainingCatalogFormDetail({
        formatMessage,
        trainingId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapMyTrainingCatalogFormDetail(
        unwrapMyTrainingCatalogFormDetail(result.data),
      );

      if (!detail || !detail.id) {
        throw new Error(formatMessage(myTrainingCatalogMessages.formDetailNotFound));
      }

      return detail;
    },
  });

  return {
    training: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(myTrainingCatalogMessages.formDetailLoadError),
    refetch: query.refetch,
  };
};

export default useMyTrainingCatalogFormDetail;
