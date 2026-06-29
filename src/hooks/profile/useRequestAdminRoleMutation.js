import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAdminRoleRequest } from '../../api/profile/profileApi';
import { currentUserProfileQueryKey } from './useCurrentUserProfile';

const useRequestAdminRoleMutation = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const requestMutation = useMutation({
    mutationFn: async () => {
      const result = await postAdminRoleRequest({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currentUserProfileQueryKey });
    },
  });

  return { requestMutation };
};

export default useRequestAdminRoleMutation;
