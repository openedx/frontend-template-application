import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchUserAboutDetail } from '../../api/users/usersApi';
import { mapUserAboutDetail } from '../../api/users/usersUtils';
import messages from '../../pages/users/messages';

export const userAboutDetailQueryKey = (userId) => ['users', 'about-detail', userId];

/**
 * @param {{ userId: string|number|null, enabled?: boolean }} options
 */
const useUserAboutDetail = ({ userId, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: userAboutDetailQueryKey(userId),
    enabled: enabled && userId != null && userId !== '',
    queryFn: async () => {
      const result = await fetchUserAboutDetail({ formatMessage, userId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapUserAboutDetail(result.data);
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

export default useUserAboutDetail;
