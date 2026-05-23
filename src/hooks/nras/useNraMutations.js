import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createNraOnboard,
  deleteNraOnboard,
  updateNraOnboard,
} from '../../api/nras/nrasApi';

const useNraMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const invalidateList = () => {
    queryClient.invalidateQueries({ queryKey: ['nras', 'onboard', 'list'] });
  };

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await createNraOnboard({ formatMessage, payload });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: invalidateList,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ nraId, payload }) => {
      const result = await updateNraOnboard({ formatMessage, nraId, payload });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { nraId }) => {
      invalidateList();
      queryClient.invalidateQueries({ queryKey: ['nras', 'onboard', 'detail', nraId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (nraId) => {
      const result = await deleteNraOnboard({ formatMessage, nraId });

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

export default useNraMutations;
