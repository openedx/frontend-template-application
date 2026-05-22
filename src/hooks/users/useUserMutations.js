import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createUser,
  deleteUser,
  updateUser,
} from '../../api/users/usersApi';
import { userDetailQueryKey } from './useUserDetail';
import { usersListQueryKey } from './useUsersList';

const useUserMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const invalidateList = () => {
    queryClient.invalidateQueries({ queryKey: ['users', 'list'] });
  };

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await createUser({ formatMessage, payload });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: invalidateList,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ userId, payload }) => {
      const result = await updateUser({ formatMessage, userId, payload });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { userId }) => {
      invalidateList();
      queryClient.invalidateQueries({ queryKey: userDetailQueryKey(userId) });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId) => {
      const result = await deleteUser({ formatMessage, userId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: invalidateList,
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};

export default useUserMutations;
