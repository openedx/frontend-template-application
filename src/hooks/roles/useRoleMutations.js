import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createRole,
  deleteRole,
  updateRole,
} from '../../api/roles/rolesApi';
import { roleDetailQueryKey } from './useRoleDetail';

const useRoleMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const invalidateList = () => {
    queryClient.invalidateQueries({ queryKey: ['roles', 'list'] });
  };

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await createRole({ formatMessage, payload });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: invalidateList,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ roleId, payload }) => {
      const result = await updateRole({ formatMessage, roleId, payload });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { roleId }) => {
      invalidateList();
      queryClient.invalidateQueries({ queryKey: roleDetailQueryKey(roleId) });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (roleId) => {
      const result = await deleteRole({ formatMessage, roleId });

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

export default useRoleMutations;
