import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { syncFrameworkRoleActivities } from '../../api/competencyFramework/competencyFrameworkRoleActivitiesApi';
import { frameworkRoleActivitiesQueryKey } from './useFrameworkRoleActivities';

const useCompetencyFrameworkRoleActivitiesMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const syncRoleActivitiesMutation = useMutation({
    mutationFn: async ({ frameworkUuid, payload }) => {
      const result = await syncFrameworkRoleActivities({
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
        queryKey: frameworkRoleActivitiesQueryKey(frameworkUuid),
      });
    },
  });

  return {
    syncRoleActivitiesMutation,
  };
};

export default useCompetencyFrameworkRoleActivitiesMutations;
