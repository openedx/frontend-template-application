import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchRoleDetail } from '../../api/roles/rolesApi';
import { mapRoleDetail } from '../../api/roles/rolesUtils';
import messages from '../../pages/roles/messages';

export const roleDetailQueryKey = (roleId) => ['roles', 'detail', roleId];

/**
 * @param {{ roleId: string|number|null, enabled?: boolean }} options
 */
const useRoleDetail = ({ roleId, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: roleDetailQueryKey(roleId),
    enabled: enabled && roleId != null && roleId !== '',
    queryFn: async () => {
      const result = await fetchRoleDetail({ formatMessage, roleId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapRoleDetail(result.data);
      if (!detail) {
        throw new Error(result.message || formatMessage(messages.detailLoadError));
      }

      return detail;
    },
  });

  return {
    detail: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useRoleDetail;
