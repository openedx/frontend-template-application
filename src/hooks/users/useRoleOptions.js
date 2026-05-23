import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchRoleOptions } from '../../api/users/usersApi';
import { normalizeRoleOptionRows } from '../../api/users/usersUtils';

export const roleOptionsQueryKey = () => ['users', 'role-options'];

const useRoleOptions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: roleOptionsQueryKey(),
    enabled,
    queryFn: async () => {
      const result = await fetchRoleOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return normalizeRoleOptionRows(result.data?.results);
    },
  });

  return {
    roleOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useRoleOptions;
