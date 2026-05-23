import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchFrameworkSuggestionDetail } from '../../api/competencyFramework/competencyFrameworkSuggestionsApi';
import {
  mapSuggestionFromApi,
  parseSuggestionId,
  unwrapSuggestionDetailPayload,
} from '../../api/competencyFramework/competencyFrameworkSuggestionsUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkSuggestionDetailQueryKey = (suggestionId) => (
  ['competency-framework', 'suggestion-detail', suggestionId ?? '']
);

/**
 * @param {{ suggestionId?: string|null, enabled?: boolean }} options
 */
const useFrameworkSuggestionDetail = ({ suggestionId, enabled = true } = {}) => {
  const { formatMessage } = useIntl();
  const resolvedId = parseSuggestionId(suggestionId);

  const query = useQuery({
    queryKey: frameworkSuggestionDetailQueryKey(suggestionId),
    enabled: enabled && resolvedId != null,
    queryFn: async () => {
      const result = await fetchFrameworkSuggestionDetail({
        formatMessage,
        suggestionId: resolvedId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapSuggestionFromApi(unwrapSuggestionDetailPayload(result.data));

      if (!detail || !hasDisplayValue(detail.id)) {
        throw new Error(result.message || formatMessage(competencyFrameworkMessages.suggestionDetailLoadError));
      }

      return detail;
    },
  });

  return {
    detail: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.suggestionDetailLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkSuggestionDetail;
