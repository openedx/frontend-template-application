import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchMyTrainingDetail } from '../../api/myTraining/myTrainingApi';
import {
  mapMyTrainingDetail,
  unwrapMyTrainingDetail,
} from '../../api/myTraining/myTrainingUtils';
import myTrainingMessages from '../../pages/myTraining/messages';

export const myTrainingDetailQueryKey = (trainingId) => [
  'my-training',
  'detail',
  trainingId ?? '',
];

/**
 * @param {{ trainingId?: string, enabled?: boolean }} options
 */
const useMyTrainingDetail = ({ trainingId, enabled = false } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: myTrainingDetailQueryKey(trainingId),
    enabled: enabled && Boolean(trainingId),
    queryFn: async () => {
      const result = await fetchMyTrainingDetail({
        formatMessage,
        trainingId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapMyTrainingDetail(unwrapMyTrainingDetail(result.data));

      if (!detail) {
        throw new Error(formatMessage(myTrainingMessages.detailNotFound));
      }

      return detail;
    },
  });

  return {
    training: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(myTrainingMessages.detailLoadError),
    refetch: query.refetch,
  };
};

export default useMyTrainingDetail;
