import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../../api/countries/countriesApi';
import {
  normalizeCountryOptions,
  toCountryDropdownOptions,
} from '../../api/countries/countriesUtils';

export const searnCountriesQueryKey = ['countries', 'searn'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useSearnCountries = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: searnCountriesQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchCountries({
        formatMessage,
        isSearnCountry: true,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const options = normalizeCountryOptions(result.data?.results);

      return {
        options,
        dropdownOptions: toCountryDropdownOptions(options),
      };
    },
  });

  return {
    options: query.data?.options ?? [],
    dropdownOptions: query.data?.dropdownOptions ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useSearnCountries;
