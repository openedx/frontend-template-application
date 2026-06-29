import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchMyTrainingCatalogDetail } from '../../api/myTrainingCatalog/myTrainingCatalogApi';
import { fetchSearnTrainingCatalogDetail } from '../../api/searnTrainingCatalog/searnTrainingCatalogApi';
import {
  mapMyTrainingCatalogDetail,
  unwrapMyTrainingCatalogDetail,
} from '../../api/myTrainingCatalog/myTrainingCatalogUtils';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';
import myTrainingCatalogMessages from '../../pages/myTrainingCatalog/messages';
import { TRAINING_CATALOG_VARIANT_IDS } from '../../utils/trainingCatalogVariantConfig';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import useTrainingCatalogVariant from './useTrainingCatalogVariant';

export const myTrainingCatalogDetailQueryKey = (catalogVariantId, trainingId) => (
  ['training-catalog', 'detail', catalogVariantId ?? '', trainingId ?? '']
);

/**
 * @param {{ trainingId?: string, enabled?: boolean }} options
 */
const useMyTrainingCatalogDetail = ({ trainingId, enabled = true } = {}) => {
  const { formatMessage } = useIntl();
  const variant = useTrainingCatalogVariant();
  const isNraVariant = variant.id === TRAINING_CATALOG_VARIANT_IDS.NRA_SPECIFIC_TRAINING_CATALOG;

  const query = useQuery({
    queryKey: myTrainingCatalogDetailQueryKey(variant.id, trainingId),
    enabled: enabled && hasDisplayValue(trainingId),
    queryFn: async () => {
      if (isNraVariant) {
        const result = await fetchSearnTrainingCatalogDetail({
          formatMessage,
          trainingId,
        });

        if (!result.ok) {
          throw new Error(result.message);
        }

        const detail = mapMyTrainingCatalogDetail(unwrapMyTrainingCatalogDetail(result.data));

        if (!detail || !hasDisplayValue(detail.id)) {
          throw new Error(result.message || formatMessage(catalogMessages.detailLoadError));
        }

        return detail;
      }

      const result = await fetchMyTrainingCatalogDetail({
        formatMessage,
        trainingId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapMyTrainingCatalogDetail(unwrapMyTrainingCatalogDetail(result.data));

      if (!detail || !hasDisplayValue(detail.id)) {
        throw new Error(formatMessage(myTrainingCatalogMessages.detailNotFound));
      }

      return detail;
    },
  });

  return {
    training: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? (
      isNraVariant
        ? formatMessage(catalogMessages.detailLoadError)
        : formatMessage(myTrainingCatalogMessages.detailLoadError)
    ),
    refetch: query.refetch,
  };
};

export default useMyTrainingCatalogDetail;
