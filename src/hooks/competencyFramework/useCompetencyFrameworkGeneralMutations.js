import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createCompetencyFrameworkGeneralInformation,
  patchCompetencyFramework,
} from '../../api/competencyFramework/competencyFrameworkApi';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { resolveFrameworkIdFromApiResponse } from '../../api/competencyFramework/competencyFrameworkUtils';
import { competencyFrameworkDetailQueryKey } from './useCompetencyFrameworkDetail';

const useCompetencyFrameworkGeneralMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await createCompetencyFrameworkGeneralInformation({
        formatMessage,
        payload,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competency-frameworks'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ frameworkUuid, payload, fallbackMessage }) => {
      const result = await patchCompetencyFramework({
        formatMessage,
        frameworkUuid,
        payload,
        fallbackMessage: fallbackMessage ?? competencyFrameworkMessages.frameworkSectionSaveError,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { frameworkUuid }) => {
      queryClient.invalidateQueries({ queryKey: ['competency-frameworks'] });
      queryClient.invalidateQueries({
        queryKey: competencyFrameworkDetailQueryKey(frameworkUuid),
      });
    },
  });

  return {
    createMutation,
    updateMutation,
    resolveFrameworkIdFromApiResponse,
  };
};

export default useCompetencyFrameworkGeneralMutations;
