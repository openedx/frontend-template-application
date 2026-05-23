import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { syncFrameworkProficiencyLevels } from '../../api/competencyFramework/competencyFrameworkProficiencyApi';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { frameworkProficiencyDropdownOptionsQueryKey } from './useFrameworkProficiencyDropdownOptions';
import { frameworkProficiencyLevelsQueryKey } from './useFrameworkProficiencyLevels';

const useCompetencyFrameworkProficiencyMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const syncProficiencyLevelsMutation = useMutation({
    mutationFn: async ({ frameworkUuid, payload }) => {
      const result = await syncFrameworkProficiencyLevels({
        formatMessage,
        frameworkUuid,
        payload,
        fallbackMessage: competencyFrameworkMessages.proficiencySaveError,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { frameworkUuid }) => {
      queryClient.invalidateQueries({
        queryKey: frameworkProficiencyLevelsQueryKey(frameworkUuid),
      });
      queryClient.invalidateQueries({
        queryKey: frameworkProficiencyDropdownOptionsQueryKey(frameworkUuid),
      });
    },
  });

  return {
    syncProficiencyLevelsMutation,
  };
};

export default useCompetencyFrameworkProficiencyMutations;
