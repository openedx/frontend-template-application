import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchCurrentUserProfile } from '../../api/profile/profileApi';
import { currentUserProfileQueryKey } from './useCurrentUserProfile';

const useProfileMutation = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await patchCurrentUserProfile({
        formatMessage,
        ...payload,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currentUserProfileQueryKey });
    },
  });

  return { updateMutation };
};

export default useProfileMutation;
