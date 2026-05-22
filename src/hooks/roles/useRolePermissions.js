import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchRolePermissions } from '../../api/roles/rolesApi';
import { mapPermissionOptions } from '../../api/roles/rolesUtils';

export const rolePermissionsQueryKey = () => ['roles', 'permissions'];

/**
 * @param {{ enabled?: boolean }} options
 */
const useRolePermissions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: rolePermissionsQueryKey(),
    enabled,
    queryFn: async () => {
      const result = await fetchRolePermissions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapPermissionOptions(result.data?.results);
    },
  });

  return {
    options: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useRolePermissions;
