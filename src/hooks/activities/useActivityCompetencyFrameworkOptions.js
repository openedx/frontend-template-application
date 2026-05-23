import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchActivityCompetencyFrameworkOptions } from '../../api/activities/activitiesOptionsApi';
import { mapPickerRowsToDropdownOptions } from '../../api/activities/activitiesUtils';
import activitiesMessages from '../../pages/activities/messages';

export const activityCompetencyFrameworkOptionsQueryKey = ['activities', 'options', 'competency-frameworks'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useActivityCompetencyFrameworkOptions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: activityCompetencyFrameworkOptionsQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchActivityCompetencyFrameworkOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapPickerRowsToDropdownOptions(result.data?.results);
    },
  });

  return {
    dropdownOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(activitiesMessages.frameworkOptionsLoadError),
  };
};

export default useActivityCompetencyFrameworkOptions;
