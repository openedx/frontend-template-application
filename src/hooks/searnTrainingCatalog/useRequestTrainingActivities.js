import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchTrainingsCatalogMappedActivityOptions } from '../../api/searnTrainingCatalog/trainingsCatalogOptionsApi';
import { mapCatalogFilterOptionsToDropdown } from '../../api/searnTrainingCatalog/trainingsCatalogOptionsUtils';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';

export const requestTrainingActivitiesQueryKey = ['trainings-catalog', 'options', 'mapped-activities'];

/**
 * Mapped activity options for the request training modal (same API as catalog filters).
 *
 * @param {{ enabled?: boolean }} [options]
 */
const useRequestTrainingActivities = ({ enabled = false } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: requestTrainingActivitiesQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchTrainingsCatalogMappedActivityOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapCatalogFilterOptionsToDropdown(result.data?.results);
    },
  });

  return {
    dropdownOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(catalogMessages.activityOptionsLoadError),
  };
};

export default useRequestTrainingActivities;
