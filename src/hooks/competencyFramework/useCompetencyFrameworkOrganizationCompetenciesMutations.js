import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { syncFrameworkOrganizationCompetencies } from '../../api/competencyFramework/competencyFrameworkOrganizationCompetenciesApi';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { frameworkOrganizationCompetenciesQueryKey } from './useFrameworkOrganizationCompetencies';

const useCompetencyFrameworkOrganizationCompetenciesMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const syncOrganizationCompetenciesMutation = useMutation({
    mutationFn: async ({ frameworkUuid, payload }) => {
      const result = await syncFrameworkOrganizationCompetencies({
        formatMessage,
        frameworkUuid,
        payload,
        fallbackMessage: competencyFrameworkMessages.orgCompetenciesSaveError,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { frameworkUuid }) => {
      queryClient.invalidateQueries({
        queryKey: frameworkOrganizationCompetenciesQueryKey(frameworkUuid),
      });
    },
  });

  return {
    syncOrganizationCompetenciesMutation,
  };
};

export default useCompetencyFrameworkOrganizationCompetenciesMutations;
