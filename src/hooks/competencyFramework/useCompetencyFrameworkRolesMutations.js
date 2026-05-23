import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { syncFrameworkRoles } from '../../api/competencyFramework/competencyFrameworkRolesApi';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { frameworkRoleOptionsQueryKey } from './useFrameworkRoleOptions';
import { frameworkRolesQueryKey } from './useFrameworkRoles';

const useCompetencyFrameworkRolesMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const syncRolesMutation = useMutation({
    mutationFn: async ({ frameworkUuid, payload }) => {
      const result = await syncFrameworkRoles({
        formatMessage,
        frameworkUuid,
        payload,
        fallbackMessage: competencyFrameworkMessages.rolesSaveError,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { frameworkUuid }) => {
      queryClient.invalidateQueries({
        queryKey: frameworkRolesQueryKey(frameworkUuid),
      });
      queryClient.invalidateQueries({
        queryKey: frameworkRoleOptionsQueryKey(frameworkUuid),
      });
    },
  });

  return {
    syncRolesMutation,
  };
};

export default useCompetencyFrameworkRolesMutations;
