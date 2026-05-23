import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../../api/countries/countriesApi';
import countriesMessages from '../../api/countries/countriesMessages';
import { normalizeCountryOptions, toCountryDropdownOptions } from '../../api/countries/countriesUtils';

export const profileCountriesQueryKey = ['profile', 'countries'];

const useProfileCountries = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: profileCountriesQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchCountries({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return normalizeCountryOptions(result.data?.results);
    },
  });

  const dropdownOptions = useMemo(() => {
    const options = toCountryDropdownOptions(query.data ?? []);
    return [...options].sort((a, b) => a.label.localeCompare(b.label));
  }, [query.data]);

  return {
    dropdownOptions,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(countriesMessages.countriesCatalogLoadError),
  };
};

export default useProfileCountries;
