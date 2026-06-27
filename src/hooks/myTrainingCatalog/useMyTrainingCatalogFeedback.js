import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchSearnTrainingCatalogFeedback } from '../../api/searnTrainingCatalog/searnTrainingCatalogApi';
import {
  mapSearnTrainingCatalogFeedback,
  unwrapSearnTrainingCatalogFeedback,
} from '../../api/searnTrainingCatalog/searnTrainingCatalogUtils';
import { resolveMyTrainingCatalogFeedbackMock } from '../../api/myTrainingCatalog/myTrainingCatalogPageMockData';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';
import myTrainingCatalogMessages from '../../pages/myTrainingCatalog/messages';
import { TRAINING_CATALOG_VARIANT_IDS } from '../../utils/trainingCatalogVariantConfig';
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
  const isNraVariant = variant.id === TRAINING_CATALOG_VARIANT_IDS.NRA_SPECIFIC_TRAINING_CATALOG;

  const query = useQuery({
    queryKey: myTrainingCatalogFeedbackQueryKey(variant.id, trainingId),
    enabled: enabled && hasDisplayValue(trainingId),
    queryFn: async () => {
      if (isNraVariant) {
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
      }

      const data = resolveMyTrainingCatalogFeedbackMock(trainingId);
      if (!data) {
        throw new Error(formatMessage(myTrainingCatalogMessages.feedbackNotFound));
      }

      return data;
    },
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? (
      isNraVariant
        ? formatMessage(catalogMessages.feedbackLoadError)
        : formatMessage(myTrainingCatalogMessages.feedbackNotFound)
    ),
    refetch: query.refetch,
  };
};

export default useMyTrainingCatalogFeedback;
