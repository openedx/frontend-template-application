import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMyTeamMember, removeMyTeamMember } from '../../api/myTeam/myTeamApi';
import myTeamMessages from '../../pages/myTeam/messages';
import { myTeamCandidatesQueryKey } from './useMyTeamCandidateUsers';
import { myTeamListQueryRootKey } from './useMyTeamList';

const useMyTeamMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const invalidateTeamQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: myTeamListQueryRootKey() }),
      queryClient.invalidateQueries({ queryKey: myTeamCandidatesQueryKey() }),
    ]);
  };

  const addMutation = useMutation({
    mutationFn: async (userId) => {
      const result = await addMyTeamMember({ formatMessage, userId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: invalidateTeamQueries,
  });

  const removeMutation = useMutation({
    mutationFn: async (userId) => {
      const result = await removeMyTeamMember({ formatMessage, userId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: invalidateTeamQueries,
  });

  return {
    addMutation,
    removeMutation,
  };
};

export default useMyTeamMutations;
