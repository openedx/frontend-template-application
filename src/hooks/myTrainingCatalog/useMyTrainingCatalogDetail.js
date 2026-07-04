import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import {
  fetchMyTrainingCatalogDetail,
  fetchNraTrainingCatalogDetail,
} from '../../api/myTrainingCatalog/myTrainingCatalogApi';
import {
  mapMyTrainingCatalogDetail,
  unwrapMyTrainingCatalogDetail,
} from '../../api/myTrainingCatalog/myTrainingCatalogUtils';
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
      const result = isNraVariant
        ? await fetchNraTrainingCatalogDetail({ formatMessage, trainingId })
        : await fetchMyTrainingCatalogDetail({ formatMessage, trainingId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapMyTrainingCatalogDetail(unwrapMyTrainingCatalogDetail(result.data));

      if (!detail || !hasDisplayValue(detail.id)) {
        throw new Error(result.message || formatMessage(myTrainingCatalogMessages.detailNotFound));
      }

      return detail;
    },
  });

  return {
    training: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(myTrainingCatalogMessages.detailLoadError),
    refetch: query.refetch,
  };
};

export default useMyTrainingCatalogDetail;
