import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchSearnTrainingCatalogFeedback } from '../../api/searnTrainingCatalog/searnTrainingCatalogApi';
import {
  mapSearnTrainingCatalogFeedback,
  unwrapSearnTrainingCatalogFeedback,
} from '../../api/searnTrainingCatalog/searnTrainingCatalogUtils';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const searnTrainingCatalogFeedbackQueryKey = (trainingId) => (
  ['searn-training-catalog', 'feedback', trainingId ?? '']
);

/**
 * @param {{ trainingId?: string|null, enabled?: boolean }} options
 */
const useSearnTrainingCatalogFeedback = ({ trainingId, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: searnTrainingCatalogFeedbackQueryKey(trainingId),
    enabled: enabled && hasDisplayValue(trainingId),
    queryFn: async () => {
      const result = await fetchSearnTrainingCatalogFeedback({
        formatMessage,
        trainingId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const feedback = mapSearnTrainingCatalogFeedback(unwrapSearnTrainingCatalogFeedback(result.data));

      if (!feedback) {
        throw new Error(result.message || formatMessage(catalogMessages.feedbackLoadError));
      }

      return feedback;
    },
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(catalogMessages.feedbackLoadError),
    refetch: query.refetch,
  };
};

export default useSearnTrainingCatalogFeedback;
