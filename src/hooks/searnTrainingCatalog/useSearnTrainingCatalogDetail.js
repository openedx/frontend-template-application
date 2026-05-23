import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchSearnTrainingCatalogDetail } from '../../api/searnTrainingCatalog/searnTrainingCatalogApi';
import {
  mapSearnTrainingCatalogDetail,
  unwrapSearnTrainingCatalogDetail,
} from '../../api/searnTrainingCatalog/searnTrainingCatalogUtils';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const searnTrainingCatalogDetailQueryKey = (trainingId) => (
  ['searn-training-catalog', 'detail', trainingId ?? '']
);

/**
 * @param {{ trainingId?: string|null, enabled?: boolean }} options
 */
const useSearnTrainingCatalogDetail = ({ trainingId, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: searnTrainingCatalogDetailQueryKey(trainingId),
    enabled: enabled && hasDisplayValue(trainingId),
    queryFn: async () => {
      const result = await fetchSearnTrainingCatalogDetail({
        formatMessage,
        trainingId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapSearnTrainingCatalogDetail(unwrapSearnTrainingCatalogDetail(result.data));

      if (!detail || !hasDisplayValue(detail.id)) {
        throw new Error(result.message || formatMessage(catalogMessages.detailLoadError));
      }

      return detail;
    },
  });

  return {
    training: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(catalogMessages.detailLoadError),
    refetch: query.refetch,
  };
};

export default useSearnTrainingCatalogDetail;
