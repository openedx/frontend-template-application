import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchFrameworkProficiencyLevels } from '../../api/competencyFramework/competencyFrameworkProficiencyApi';
import {
  mapProficiencyApiResultsToDropdownOptions,
  unwrapProficiencyResultsPayload,
} from '../../api/competencyFramework/competencyFrameworkProficiencyUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkProficiencyDropdownOptionsQueryKey = (frameworkUuid) => (
  ['competency-framework', 'proficiency-dropdown', frameworkUuid ?? '']
);

/**
 * Proficiency options for dropdowns (value is `level-{code}` per org/role competency APIs).
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useFrameworkProficiencyDropdownOptions = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: frameworkProficiencyDropdownOptionsQueryKey(frameworkUuid),
    enabled: enabled && hasDisplayValue(frameworkUuid),
    queryFn: async () => {
      const result = await fetchFrameworkProficiencyLevels({
        formatMessage,
        frameworkUuid,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const results = unwrapProficiencyResultsPayload(result.data);

      return mapProficiencyApiResultsToDropdownOptions(results);
    },
  });

  return {
    proficiencyLevelOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.proficiencyLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkProficiencyDropdownOptions;
