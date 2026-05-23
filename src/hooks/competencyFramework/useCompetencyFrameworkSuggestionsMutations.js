import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createFrameworkSuggestion,
  deleteFrameworkSuggestion,
  patchFrameworkSuggestion,
} from '../../api/competencyFramework/competencyFrameworkSuggestionsApi';
import { parseSuggestionId } from '../../api/competencyFramework/competencyFrameworkSuggestionsUtils';
import { frameworkSuggestionDetailQueryKey } from './useFrameworkSuggestionDetail';
import { frameworkSuggestionsQueryKey } from './useFrameworkSuggestions';

const useCompetencyFrameworkSuggestionsMutations = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const invalidateSuggestions = (frameworkUuid) => {
    queryClient.invalidateQueries({
      queryKey: frameworkSuggestionsQueryKey(frameworkUuid),
    });
  };

  const createSuggestionMutation = useMutation({
    mutationFn: async ({ frameworkUuid, payload }) => {
      const result = await createFrameworkSuggestion({
        formatMessage,
        frameworkUuid,
        payload,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { frameworkUuid }) => {
      invalidateSuggestions(frameworkUuid);
    },
  });

  const updateSuggestionMutation = useMutation({
    mutationFn: async ({ suggestionId, payload }) => {
      const resolvedId = parseSuggestionId(suggestionId);

      const result = await patchFrameworkSuggestion({
        formatMessage,
        suggestionId: resolvedId,
        payload,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { frameworkUuid, suggestionId }) => {
      invalidateSuggestions(frameworkUuid);
      queryClient.invalidateQueries({
        queryKey: frameworkSuggestionDetailQueryKey(suggestionId),
      });
    },
  });

  const deleteSuggestionMutation = useMutation({
    mutationFn: async ({ suggestionId }) => {
      const resolvedId = parseSuggestionId(suggestionId);

      const result = await deleteFrameworkSuggestion({
        formatMessage,
        suggestionId: resolvedId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (_, { frameworkUuid, suggestionId }) => {
      invalidateSuggestions(frameworkUuid);
      queryClient.invalidateQueries({
        queryKey: frameworkSuggestionDetailQueryKey(suggestionId),
      });
    },
  });

  return {
    createSuggestionMutation,
    updateSuggestionMutation,
    deleteSuggestionMutation,
  };
};

export default useCompetencyFrameworkSuggestionsMutations;
