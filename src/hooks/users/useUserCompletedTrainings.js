import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchUserCompletedTrainings } from '../../api/users/usersApi';
import { mapUserCompletedTrainingsList } from '../../api/users/usersUtils';

export const userCompletedTrainingsQueryKey = (userId) => ['users', userId, 'completed-trainings'];

/**
 * @param {{ userId: string|number|null, enabled?: boolean }} options
 */
const useUserCompletedTrainings = ({ userId, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: userCompletedTrainingsQueryKey(userId),
    enabled: enabled && userId != null && userId !== '',
    queryFn: async () => {
      const result = await fetchUserCompletedTrainings({ formatMessage, userId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapUserCompletedTrainingsList(result.data);
    },
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useUserCompletedTrainings;
