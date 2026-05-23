import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchDomainOptions } from '../../api/competencyFramework/competencyFrameworkDomainsApi';
import { mapDomainOptionsToMultiSelect } from '../../api/competencyFramework/competencyFrameworkDomainsUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';

export const domainOptionsQueryKey = ['competency-framework', 'options', 'domains'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useDomainOptions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: domainOptionsQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchDomainOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapDomainOptionsToMultiSelect(result.data?.results);
    },
  });

  return {
    domainOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.domainOptionsLoadError),
    refetch: query.refetch,
  };
};

export default useDomainOptions;
