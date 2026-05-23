import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchCountriesForUserForm } from '../../api/users/usersApi';
import { normalizeCountryOptions, toCountryDropdownOptions } from '../../api/countries/countriesUtils';

export const userFormCountriesQueryKey = () => ['users', 'form-countries'];

const useUserFormCountries = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: userFormCountriesQueryKey(),
    enabled,
    queryFn: async () => {
      const result = await fetchCountriesForUserForm({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return toCountryDropdownOptions(normalizeCountryOptions(result.data?.results));
    },
  });

  return {
    options: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useUserFormCountries;
