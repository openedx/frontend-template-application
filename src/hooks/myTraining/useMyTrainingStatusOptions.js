import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchMyTrainingStatusOptions } from '../../api/myTraining/myTrainingApi';
import {
  mapMyTrainingStatusOptions,
  unwrapMyTrainingStatusOptions,
} from '../../api/myTraining/myTrainingUtils';
import myTrainingMessages from '../../pages/myTraining/messages';

export const myTrainingStatusOptionsQueryKey = ['my-training', 'status-options'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useMyTrainingStatusOptions = ({ enabled = false } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: myTrainingStatusOptionsQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchMyTrainingStatusOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapMyTrainingStatusOptions(unwrapMyTrainingStatusOptions(result.data));
    },
  });

  return {
    statusOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(myTrainingMessages.statusOptionsLoadError),
  };
};

export default useMyTrainingStatusOptions;
