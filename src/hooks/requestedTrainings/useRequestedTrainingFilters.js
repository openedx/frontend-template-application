import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchRequestedTrainingFilters } from '../../api/requestedTrainings/requestedTrainingsApi';
import { normalizeRequestedTrainingFilters } from '../../api/requestedTrainings/requestedTrainingsUtils';
import requestedTrainingsMessages from '../../pages/requestedTrainings/messages';

export const requestedTrainingFiltersQueryKey = ['requested-trainings', 'filters'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useRequestedTrainingFilters = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: requestedTrainingFiltersQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchRequestedTrainingFilters({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const options = normalizeRequestedTrainingFilters(result.data?.results);

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
    errorMessage: query.error?.message ?? formatMessage(requestedTrainingsMessages.filtersLoadError),
  };
};

export default useRequestedTrainingFilters;
