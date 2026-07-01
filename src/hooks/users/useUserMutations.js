import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  assignUserTrainings,
  createUser,
  deleteUser,
  removeUserAssignedTraining,
  updateUser,
} from '../../api/users/usersApi';
import { userAboutDetailQueryKey } from './useUserAboutDetail';
import { userEditDetailQueryKey } from './useUserEditDetail';
import { userAssignedTrainingsQueryKey } from './useUserAssignedTrainings';

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
      queryClient.invalidateQueries({ queryKey: userAboutDetailQueryKey(userId) });
      queryClient.invalidateQueries({ queryKey: userEditDetailQueryKey(userId) });
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

  const assignTrainingsMutation = useMutation({
    mutationFn: async ({ userId, trainingIds }) => {
      const result = await assignUserTrainings({ formatMessage, userId, trainingIds });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: userAssignedTrainingsQueryKey(userId) });
      queryClient.invalidateQueries({ queryKey: ['users', userId, 'assignable-trainings'] });
    },
  });

  const removeAssignedTrainingMutation = useMutation({
    mutationFn: async ({ userId, assignmentId }) => {
      const result = await removeUserAssignedTraining({ formatMessage, userId, assignmentId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: userAssignedTrainingsQueryKey(userId) });
      queryClient.invalidateQueries({ queryKey: ['users', userId, 'assignable-trainings'] });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    assignTrainingsMutation,
    removeAssignedTrainingMutation,
  };
};

export default useUserMutations;
