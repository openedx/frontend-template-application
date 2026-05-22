import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchFrameworkDomains } from '../../api/competencyFramework/competencyFrameworkDomainsApi';
import {
  mapFrameworkDomainsToFormRows,
  unwrapDomainsResultsPayload,
} from '../../api/competencyFramework/competencyFrameworkDomainsUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkDomainsQueryKey = (frameworkUuid) => (
  ['competency-framework', 'domains', frameworkUuid ?? '']
);

/**
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useFrameworkDomains = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: frameworkDomainsQueryKey(frameworkUuid),
    enabled: enabled && hasDisplayValue(frameworkUuid),
    queryFn: async () => {
      const result = await fetchFrameworkDomains({
        formatMessage,
        frameworkUuid,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const payload = unwrapDomainsResultsPayload(result.data);
      const competencyTypes = mapFrameworkDomainsToFormRows(payload?.competency_types);

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
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.domainsLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkDomains;
