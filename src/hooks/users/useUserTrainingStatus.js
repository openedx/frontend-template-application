import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchUserTrainingStatus } from '../../api/users/usersApi';
import { mapUserTrainingStatusList } from '../../api/users/usersUtils';

export const userTrainingStatusQueryKey = (userId) => ['users', userId, 'training-status'];

/**
 * @param {{ userId: string|number|null, enabled?: boolean }} options
 */
const useUserTrainingStatus = ({ userId, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: userTrainingStatusQueryKey(userId),
    enabled: enabled && userId != null && userId !== '',
    queryFn: async () => {
      const result = await fetchUserTrainingStatus({ formatMessage, userId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapUserTrainingStatusList(result.data);
    },
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useUserTrainingStatus;
