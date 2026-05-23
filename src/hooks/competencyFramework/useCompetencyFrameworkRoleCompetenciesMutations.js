import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { syncFrameworkRoleCompetencies } from '../../api/competencyFramework/competencyFrameworkRoleCompetenciesApi';
import { frameworkRoleCompetenciesQueryKey } from './useFrameworkRoleCompetencies';

const useCompetencyFrameworkRoleCompetenciesMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const syncRoleCompetenciesMutation = useMutation({
    mutationFn: async ({ frameworkUuid, payload }) => {
      const result = await syncFrameworkRoleCompetencies({
        formatMessage,
        frameworkUuid,
        payload,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { frameworkUuid }) => {
      queryClient.invalidateQueries({
        queryKey: frameworkRoleCompetenciesQueryKey(frameworkUuid),
      });
    },
  });

  return {
    syncRoleCompetenciesMutation,
  };
};

export default useCompetencyFrameworkRoleCompetenciesMutations;
