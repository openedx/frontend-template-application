import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchSearnTrainingCatalogDetail } from '../../api/searnTrainingCatalog/searnTrainingCatalogApi';
import {
  mapSearnTrainingCatalogDetail,
  unwrapSearnTrainingCatalogDetail,
} from '../../api/searnTrainingCatalog/searnTrainingCatalogUtils';
import exploreTrainingMessages from '../../pages/exploreTraining/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const exploreTrainingPreviewQueryKey = (trainingId) => (
  ['explore-training', 'preview', trainingId ?? '']
);

/**
 * Full detail for the preview column:
 * GET /api/v1/searn-training-catalog/<trainingId>/
 *
 * @param {{ trainingId?: string|null, enabled?: boolean }} options
 */
const useExploreTrainingPreview = ({ trainingId, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: exploreTrainingPreviewQueryKey(trainingId),
    enabled: enabled && hasDisplayValue(trainingId),
    queryFn: async () => {
      const result = await fetchSearnTrainingCatalogDetail({
        formatMessage,
        trainingId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapSearnTrainingCatalogDetail(unwrapSearnTrainingCatalogDetail(result.data));
    },
  });

  return {
    detail: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message
      ?? formatMessage(exploreTrainingMessages.trainingDetailLoadError),
    refetch: query.refetch,
  };
};

export default useExploreTrainingPreview;
