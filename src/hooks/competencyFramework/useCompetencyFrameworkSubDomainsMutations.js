import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createSubDomainOption,
  syncFrameworkSubDomains,
} from '../../api/competencyFramework/competencyFrameworkSubDomainsApi';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { frameworkSubDomainsQueryKey } from './useFrameworkSubDomains';
import { subDomainOptionsByDomainQueryKey } from './useSubDomainOptionsByDomains';
import { subDomainOptionsQueryKey } from './useSubDomainOptions';

const useCompetencyFrameworkSubDomainsMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const createSubDomainMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await createSubDomainOption({
        formatMessage,
        payload,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: subDomainOptionsQueryKey });
      const parentDomainId = variables?.parent_domain_id ?? variables?.parentDomainId;

      if (parentDomainId != null) {
        queryClient.invalidateQueries({
          queryKey: subDomainOptionsByDomainQueryKey(parentDomainId),
        });
      }
    },
  });

  const syncSubDomainsMutation = useMutation({
    mutationFn: async ({ frameworkUuid, payload }) => {
      const result = await syncFrameworkSubDomains({
        formatMessage,
        frameworkUuid,
        payload,
        fallbackMessage: competencyFrameworkMessages.subDomainsSaveError,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { frameworkUuid }) => {
      queryClient.invalidateQueries({
        queryKey: frameworkSubDomainsQueryKey(frameworkUuid),
      });
    },
  });

  return {
    createSubDomainMutation,
    syncSubDomainsMutation,
  };
};

export default useCompetencyFrameworkSubDomainsMutations;
