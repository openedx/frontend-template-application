import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import {
  fetchRegulatoryPassportDomainOptions,
  fetchRegulatoryPassportLevelOptions,
  fetchRegulatoryPassportProductTypeOptions,
  fetchRegulatoryPassportSubdomainOptions,
} from '../../api/users/usersApi';
import { normalizeDropdownOptionRows } from '../../api/users/usersUtils';

export const REGULATORY_PASSPORT_DOMAIN_FILTER_OPTIONS_QUERY_KEY = ['regulatory-passport', 'domain-filter-options'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useRegulatoryPassportDomainFilterOptions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: REGULATORY_PASSPORT_DOMAIN_FILTER_OPTIONS_QUERY_KEY,
    enabled,
    queryFn: async () => {
      const [
        domainResult,
        subdomainResult,
        productTypeResult,
        levelResult,
      ] = await Promise.all([
        fetchRegulatoryPassportDomainOptions({ formatMessage }),
        fetchRegulatoryPassportSubdomainOptions({ formatMessage }),
        fetchRegulatoryPassportProductTypeOptions({ formatMessage }),
        fetchRegulatoryPassportLevelOptions({ formatMessage }),
      ]);

      if (!domainResult.ok) {
        throw new Error(domainResult.message);
      }
      if (!subdomainResult.ok) {
        throw new Error(subdomainResult.message);
      }
      if (!productTypeResult.ok) {
        throw new Error(productTypeResult.message);
      }
      if (!levelResult.ok) {
        throw new Error(levelResult.message);
      }

      return {
        domainOptions: normalizeDropdownOptionRows(domainResult.data?.results),
        subDomainOptions: normalizeDropdownOptionRows(subdomainResult.data?.results),
        productTypeOptions: normalizeDropdownOptionRows(productTypeResult.data?.results),
        levelOptions: normalizeDropdownOptionRows(levelResult.data?.results),
      };
    },
  });

  return {
    domainOptions: query.data?.domainOptions ?? [],
    subDomainOptions: query.data?.subDomainOptions ?? [],
    productTypeOptions: query.data?.productTypeOptions ?? [],
    levelOptions: query.data?.levelOptions ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useRegulatoryPassportDomainFilterOptions;
