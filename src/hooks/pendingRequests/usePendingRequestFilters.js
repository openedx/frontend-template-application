import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchPendingRequestFilters } from '../../api/pendingRequests/pendingRequestsApi';
import { normalizePendingRequestFilters } from '../../api/pendingRequests/pendingRequestsUtils';
import pendingRequestsMessages from '../../pages/pendingRequests/messages';

export const pendingRequestFiltersQueryKey = ['pending-requests', 'filters'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const usePendingRequestFilters = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: pendingRequestFiltersQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchPendingRequestFilters({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const options = normalizePendingRequestFilters(result.data?.results);

      return {
        options,
        dropdownOptions: options.map(({ value, label }) => ({ value, label })),
      };
    },
  });

  return {
    options: query.data?.options ?? [],
    dropdownOptions: query.data?.dropdownOptions ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(pendingRequestsMessages.filtersLoadError),
  };
};

export default usePendingRequestFilters;