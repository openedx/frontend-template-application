import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchUserForEdit } from '../../api/users/usersApi';
import { mapUserEditDetail } from '../../api/users/usersUtils';
import messages from '../../pages/users/messages';

export const userEditDetailQueryKey = (userId) => ['users', 'edit-detail', userId];

/**
 * @param {{ userId: string|number|null, enabled?: boolean }} options
 */
const useUserEditDetail = ({ userId, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: userEditDetailQueryKey(userId),
    enabled: enabled && userId != null && userId !== '',
    queryFn: async () => {
      const result = await fetchUserForEdit({ formatMessage, userId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapUserEditDetail(result.data);
      if (!detail) {
        throw new Error(result.message || formatMessage(messages.editUserLoadError));
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

export default useUserEditDetail;
