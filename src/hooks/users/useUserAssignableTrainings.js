import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchUserAssignableTrainings } from '../../api/users/usersApi';
import { normalizeAssignableTrainingOptions } from '../../api/users/usersUtils';

export const userAssignableTrainingsQueryKey = (userId, search) => (
  ['users', userId, 'assignable-trainings', search ?? '']
);

/**
 * @param {{ userId: string|number|null, search?: string, enabled?: boolean }} options
 */
const useUserAssignableTrainings = ({ userId, search = '', enabled = true }) => {
  const { formatMessage } = useIntl();
  const trimmedSearch = search.trim();

  const query = useQuery({
    queryKey: userAssignableTrainingsQueryKey(userId, trimmedSearch),
    enabled: enabled && userId != null && userId !== '',
    queryFn: async () => {
      const result = await fetchUserAssignableTrainings({
        formatMessage,
        userId,
        search: trimmedSearch,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return normalizeAssignableTrainingOptions(result.data?.results);
    },
  });

  return {
    options: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useUserAssignableTrainings;
