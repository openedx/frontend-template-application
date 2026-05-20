import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUserProfile } from '../../api/profile/profileApi';
import { mapProfileResult } from '../../api/profile/profileUtils';
import profileMessages from '../../pages/profile/messages';

export const currentUserProfileQueryKey = ['profile', 'current-user'];

const useCurrentUserProfile = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: currentUserProfileQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchCurrentUserProfile({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapProfileResult(result.data);
    },
  });

  return {
    profile: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(profileMessages.profileLoadError),
    refetch: query.refetch,
  };
};

export default useCurrentUserProfile;
