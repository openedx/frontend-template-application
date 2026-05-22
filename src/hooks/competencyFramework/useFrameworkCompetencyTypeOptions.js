import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import {
  fetchFrameworkCompetencyTypeOptions,
  mapCompetencyTypeOptionsToDropdown,
} from '../../api/competencyFramework/competencyFrameworkBuilderOptionsApi';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkCompetencyTypeOptionsQueryKey = (frameworkUuid) => (
  ['competency-framework', 'options', 'competency-types', frameworkUuid ?? '']
);

/**
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useFrameworkCompetencyTypeOptions = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: frameworkCompetencyTypeOptionsQueryKey(frameworkUuid),
    enabled: enabled && hasDisplayValue(frameworkUuid),
    queryFn: async () => {
      const result = await fetchFrameworkCompetencyTypeOptions({
        formatMessage,
        frameworkUuid,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapCompetencyTypeOptionsToDropdown(result.data?.results);
    },
  });

  return {
    competencyTypeOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.competencyTypeOptionsLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkCompetencyTypeOptions;
