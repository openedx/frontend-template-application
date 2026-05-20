import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../../api/countries/countriesApi';
import { normalizeCountryOptions } from '../../api/countries/countriesUtils';
import messages from '../../pages/countries/messages';

export const countriesListQueryKey = (isSearnCountry, search) => [
  'countries',
  'list',
  String(isSearnCountry),
  search ?? '',
];

const useCountriesList = ({
  isSearnCountry = true,
  search = '',
  enabled = true,
} = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: countriesListQueryKey(isSearnCountry, search),
    enabled,
    queryFn: async () => {
      const result = await fetchCountries({
        formatMessage,
        isSearnCountry,
        search,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const items = normalizeCountryOptions(result.data?.results);
      return {
        items,
        count: result.data?.count ?? items.length,
      };
    },
  });

  return {
    items: query.data?.items ?? [],
    count: query.data?.count ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(messages.listLoadError),
  };
};

export default useCountriesList;
