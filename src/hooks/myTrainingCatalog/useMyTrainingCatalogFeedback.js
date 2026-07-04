import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchMyTrainingCatalogFeedback } from '../../api/myTrainingCatalog/myTrainingCatalogApi';
import {
  mapMyTrainingCatalogFeedback,
  unwrapMyTrainingCatalogFeedback,
} from '../../api/myTrainingCatalog/myTrainingCatalogUtils';
import myTrainingCatalogMessages from '../../pages/myTrainingCatalog/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import useTrainingCatalogVariant from './useTrainingCatalogVariant';

export const myTrainingCatalogFeedbackQueryKey = (catalogVariantId, trainingId) => (
  ['training-catalog', 'feedback', catalogVariantId ?? '', trainingId ?? '']
);

/**
 * @param {{ trainingId?: string, enabled?: boolean }} options
 */
const useMyTrainingCatalogFeedback = ({ trainingId, enabled = true } = {}) => {
  const { formatMessage } = useIntl();
  const variant = useTrainingCatalogVariant();

  const query = useQuery({
    queryKey: myTrainingCatalogFeedbackQueryKey(variant.id, trainingId),
    enabled: enabled && hasDisplayValue(trainingId),
    queryFn: async () => {
      const result = await fetchMyTrainingCatalogFeedback({
        formatMessage,
        trainingId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const feedback = mapMyTrainingCatalogFeedback(unwrapMyTrainingCatalogFeedback(result.data));

      if (!feedback) {
        throw new Error(result.message || formatMessage(myTrainingCatalogMessages.feedbackNotFound));
      }

      return feedback;
    },
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(myTrainingCatalogMessages.feedbackLoadError),
    refetch: query.refetch,
  };
};

export default useMyTrainingCatalogFeedback;
