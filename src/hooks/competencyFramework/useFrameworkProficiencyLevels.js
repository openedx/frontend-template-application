import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchFrameworkProficiencyLevels } from '../../api/competencyFramework/competencyFrameworkProficiencyApi';
import {
  mapFrameworkProficiencyLevelsToFormRows,
  unwrapProficiencyResultsPayload,
} from '../../api/competencyFramework/competencyFrameworkProficiencyUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkProficiencyLevelsQueryKey = (frameworkUuid) => (
  ['competency-framework', 'proficiency-levels', frameworkUuid ?? '']
);

/**
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useFrameworkProficiencyLevels = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: frameworkProficiencyLevelsQueryKey(frameworkUuid),
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
      const levels = mapFrameworkProficiencyLevelsToFormRows(results);

      return {
        levels,
        raw: results,
      };
    },
  });

  return {
    levels: query.data?.levels ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.proficiencyLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkProficiencyLevels;
