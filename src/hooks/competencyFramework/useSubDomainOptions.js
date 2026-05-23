import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchSubDomainOptions } from '../../api/competencyFramework/competencyFrameworkSubDomainsApi';
import { mapSubDomainOptionsToMultiSelect } from '../../api/competencyFramework/competencyFrameworkSubDomainsUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';

export const subDomainOptionsQueryKey = ['competency-framework', 'options', 'sub-domains'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useSubDomainOptions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: subDomainOptionsQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchSubDomainOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapSubDomainOptionsToMultiSelect(result.data?.results);
    },
  });

  return {
    subDomainOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.subDomainOptionsLoadError),
    refetch: query.refetch,
  };
};

export default useSubDomainOptions;
