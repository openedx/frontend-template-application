import { useIntl } from '@edx/frontend-platform/i18n';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchSubDomainOptions } from '../../api/competencyFramework/competencyFrameworkSubDomainsApi';
import { mapSubDomainOptionsToMultiSelect } from '../../api/competencyFramework/competencyFrameworkSubDomainsUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const subDomainOptionsByDomainQueryKey = (domainId) => (
  ['competency-framework', 'options', 'sub-domains', 'by-domain', String(domainId ?? '')]
);

/**
 * Fetches sub-domain picker rows per parent domain id (GET ?domain=).
 * @param {{ domainIds?: string[], enabled?: boolean }} options
 */
const useSubDomainOptionsByDomains = ({ domainIds = [], enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const uniqueDomainIds = useMemo(
    () => [...new Set((domainIds ?? []).filter((id) => hasDisplayValue(id)).map((id) => String(id)))],
    [domainIds],
  );

  const queries = useQueries({
    queries: uniqueDomainIds.map((domainId) => ({
      queryKey: subDomainOptionsByDomainQueryKey(domainId),
      enabled: enabled && hasDisplayValue(domainId),
      queryFn: async () => {
        const result = await fetchSubDomainOptions({
          formatMessage,
          domainId,
        });

        if (!result.ok) {
          throw new Error(result.message);
        }

        const options = mapSubDomainOptionsToMultiSelect(result.data?.results);

        return {
          domainId,
          options: options.map((row) => ({
            ...row,
            parentDomain: domainId,
          })),
        };
      },
    })),
  });

  const optionsByDomain = useMemo(() => {
    const map = {};

    queries.forEach((query) => {
      if (query.data?.domainId) {
        map[query.data.domainId] = query.data.options;
      }
    });

    return map;
  }, [queries]);

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const errorMessage = queries.find((query) => query.error)?.error?.message
    ?? formatMessage(competencyFrameworkMessages.subDomainOptionsLoadError);

  return {
    optionsByDomain,
    isLoading,
    isError,
    errorMessage,
  };
};

export default useSubDomainOptionsByDomains;
