import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchUserDetail } from '../../api/users/usersApi';
import { mapUserDetail } from '../../api/users/usersUtils';
import messages from '../../pages/users/messages';

export const userDetailQueryKey = (userId) => ['users', 'detail', userId];

/**
 * @param {{ userId: string|number|null, enabled?: boolean }} options
 */
const useUserDetail = ({ userId, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: userDetailQueryKey(userId),
    enabled: enabled && userId != null && userId !== '',
    queryFn: async () => {
      const result = await fetchUserDetail({ formatMessage, userId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapUserDetail(result.data);
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

export default useUserDetail;
