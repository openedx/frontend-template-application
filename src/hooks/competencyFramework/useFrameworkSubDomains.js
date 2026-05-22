import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchFrameworkSubDomains } from '../../api/competencyFramework/competencyFrameworkSubDomainsApi';
import {
  mapFrameworkSubDomainsToFormRows,
  unwrapSubDomainsResultsPayload,
} from '../../api/competencyFramework/competencyFrameworkSubDomainsUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkSubDomainsQueryKey = (frameworkUuid) => (
  ['competency-framework', 'sub-domains', frameworkUuid ?? '']
);

/**
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useFrameworkSubDomains = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: frameworkSubDomainsQueryKey(frameworkUuid),
    enabled: enabled && hasDisplayValue(frameworkUuid),
    queryFn: async () => {
      const result = await fetchFrameworkSubDomains({
        formatMessage,
        frameworkUuid,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const payload = unwrapSubDomainsResultsPayload(result.data);
      const competencyTypes = mapFrameworkSubDomainsToFormRows(payload?.competency_types);

      return {
        competencyTypes,
        raw: payload,
      };
    },
  });

  return {
    competencyTypes: query.data?.competencyTypes ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.subDomainsLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkSubDomains;
