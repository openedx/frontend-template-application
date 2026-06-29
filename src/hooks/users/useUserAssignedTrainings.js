import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchUserAssignedTrainings } from '../../api/users/usersApi';
import { mapUserAssignedTrainingsList } from '../../api/users/usersUtils';

export const userAssignedTrainingsQueryKey = (userId) => ['users', userId, 'assigned-trainings'];

/**
 * @param {{ userId: string|number|null, enabled?: boolean }} options
 */
const useUserAssignedTrainings = ({ userId, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: userAssignedTrainingsQueryKey(userId),
    enabled: enabled && userId != null && userId !== '',
    queryFn: async () => {
      const result = await fetchUserAssignedTrainings({ formatMessage, userId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapUserAssignedTrainingsList(result.data);
    },
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useUserAssignedTrainings;
