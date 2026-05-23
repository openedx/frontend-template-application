import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createDomainOption,
  syncFrameworkDomains,
} from '../../api/competencyFramework/competencyFrameworkDomainsApi';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { frameworkDomainsQueryKey } from './useFrameworkDomains';
import { frameworkCompetencyTypeOptionsQueryKey } from './useFrameworkCompetencyTypeOptions';
import { frameworkLinkedDomainOptionsQueryKey } from './useFrameworkLinkedDomainOptions';
import { domainOptionsQueryKey } from './useDomainOptions';

const useCompetencyFrameworkDomainsMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const createDomainMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await createDomainOption({
        formatMessage,
        payload,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: domainOptionsQueryKey });
    },
  });

  const syncDomainsMutation = useMutation({
    mutationFn: async ({ frameworkUuid, payload }) => {
      const result = await syncFrameworkDomains({
        formatMessage,
        frameworkUuid,
        payload,
        fallbackMessage: competencyFrameworkMessages.domainsSaveError,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { frameworkUuid }) => {
      queryClient.invalidateQueries({
        queryKey: frameworkDomainsQueryKey(frameworkUuid),
      });
      queryClient.invalidateQueries({
        queryKey: frameworkLinkedDomainOptionsQueryKey(frameworkUuid),
      });
      queryClient.invalidateQueries({
        queryKey: frameworkCompetencyTypeOptionsQueryKey(frameworkUuid),
      });
    },
  });

  return {
    createDomainMutation,
    syncDomainsMutation,
  };
};

export default useCompetencyFrameworkDomainsMutations;
