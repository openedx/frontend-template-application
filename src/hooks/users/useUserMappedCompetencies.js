import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchUserMappedCompetencies } from '../../api/users/usersApi';
import { mapUserMappedCompetenciesList } from '../../api/users/usersUtils';

export const userMappedCompetenciesQueryKey = (userId) => ['users', userId, 'mapped-competencies'];

/**
 * @param {{ userId: string|number|null, enabled?: boolean }} options
 */
const useUserMappedCompetencies = ({ userId, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: userMappedCompetenciesQueryKey(userId),
    enabled: enabled && userId != null && userId !== '',
    queryFn: async () => {
      const result = await fetchUserMappedCompetencies({ formatMessage, userId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapUserMappedCompetenciesList(result.data);
    },
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useUserMappedCompetencies;
