import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchRequestedTrainingActivities } from '../../api/requestedTrainings/requestedTrainingsApi';
import { mapRequestedTrainingActivityDropdownOptions } from '../../api/requestedTrainings/requestedTrainingsUtils';
import requestedTrainingsMessages from '../../pages/requestedTrainings/messages';

export const requestedTrainingActivitiesQueryKey = ['requested-trainings', 'activities'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useRequestedTrainingActivities = ({ enabled = false } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: requestedTrainingActivitiesQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchRequestedTrainingActivities({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapRequestedTrainingActivityDropdownOptions(result.data?.results);
    },
  });

  return {
    dropdownOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(requestedTrainingsMessages.activitiesLoadError),
  };
};

export default useRequestedTrainingActivities;
