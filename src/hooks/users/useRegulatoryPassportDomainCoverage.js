import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchRegulatoryPassportDomainCoverage } from '../../api/users/usersApi';
import { mapRegulatoryPassportDomainCoverageList } from '../../api/users/usersUtils';

export const regulatoryPassportDomainCoverageQueryKey = ({
  userId = null,
  page = 1,
  domainId,
  subDomainId,
  levelId,
  productTypeId,
} = {}) => ([
  'regulatory-passport',
  'domain-coverage',
  userId ?? 'current',
  page,
  domainId ?? '',
  subDomainId ?? '',
  levelId ?? '',
  productTypeId ?? '',
]);

/**
 * @param {{
 *   userId?: string|number|null,
 *   page?: number,
 *   domainId?: string,
 *   subDomainId?: string,
 *   levelId?: string,
 *   productTypeId?: string,
 *   enabled?: boolean,
 * }} options
 */
const useRegulatoryPassportDomainCoverage = ({
  userId = null,
  page = 1,
  domainId,
  subDomainId,
  levelId,
  productTypeId,
  enabled = true,
}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: regulatoryPassportDomainCoverageQueryKey({
      userId,
      page,
      domainId,
      subDomainId,
      levelId,
      productTypeId,
    }),
    enabled,
    queryFn: async () => {
      const result = await fetchRegulatoryPassportDomainCoverage({
        formatMessage,
        userId,
        page,
        domainId,
        subDomainId,
        levelId,
        productTypeId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapRegulatoryPassportDomainCoverageList(result.data);
    },
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useRegulatoryPassportDomainCoverage;
