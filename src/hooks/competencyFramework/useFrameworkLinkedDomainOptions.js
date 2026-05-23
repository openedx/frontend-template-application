import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import {
  fetchFrameworkLinkedDomainOptions,
  mapFrameworkLinkedDomainOptionsToDropdown,
} from '../../api/competencyFramework/competencyFrameworkBuilderOptionsApi';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkLinkedDomainOptionsQueryKey = (frameworkUuid) => (
  ['competency-framework', 'options', 'framework-domains', frameworkUuid ?? '']
);

/**
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useFrameworkLinkedDomainOptions = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: frameworkLinkedDomainOptionsQueryKey(frameworkUuid),
    enabled: enabled && hasDisplayValue(frameworkUuid),
    queryFn: async () => {
      const result = await fetchFrameworkLinkedDomainOptions({
        formatMessage,
        frameworkUuid,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapFrameworkLinkedDomainOptionsToDropdown(result.data?.results);
    },
  });

  return {
    domainOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.frameworkDomainOptionsLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkLinkedDomainOptions;
