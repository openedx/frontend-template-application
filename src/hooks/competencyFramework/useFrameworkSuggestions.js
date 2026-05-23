import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchFrameworkSuggestions } from '../../api/competencyFramework/competencyFrameworkSuggestionsApi';
import { mapSuggestionsListFromApi } from '../../api/competencyFramework/competencyFrameworkSuggestionsUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkSuggestionsQueryKey = (frameworkUuid) => (
  ['competency-framework', 'suggestions', frameworkUuid ?? '']
);

/**
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useFrameworkSuggestions = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: frameworkSuggestionsQueryKey(frameworkUuid),
    enabled: enabled && hasDisplayValue(frameworkUuid),
    queryFn: async () => {
      const result = await fetchFrameworkSuggestions({
        formatMessage,
        frameworkUuid,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const suggestions = mapSuggestionsListFromApi(result.data?.results);

      return {
        suggestions,
        raw: result.data,
      };
    },
  });

  return {
    suggestions: query.data?.suggestions ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.suggestionsLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkSuggestions;
