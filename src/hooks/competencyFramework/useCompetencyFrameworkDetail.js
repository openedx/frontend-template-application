import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchCompetencyFrameworkDetail } from '../../api/competencyFramework/competencyFrameworkApi';
import { mapFrameworkDetailToBuilderForm } from '../../api/competencyFramework/competencyFrameworkUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const competencyFrameworkDetailQueryKey = (frameworkUuid) => (
  ['competency-framework', 'detail', frameworkUuid ?? '']
);

/**
 * Fetches framework detail and maps it to builder general-tab form shape.
 * @param {{ formatMessage: Function, frameworkUuid: string }} params
 */
export const fetchFrameworkDetailFormState = async ({ formatMessage, frameworkUuid }) => {
  const result = await fetchCompetencyFrameworkDetail({
    formatMessage,
    frameworkUuid,
  });

  if (!result.ok) {
    throw new Error(result.message);
  }

  return mapFrameworkDetailToBuilderForm(result.data);
};

/**
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useCompetencyFrameworkDetail = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: competencyFrameworkDetailQueryKey(frameworkUuid),
    enabled: enabled && hasDisplayValue(frameworkUuid),
    queryFn: async () => {
      const result = await fetchCompetencyFrameworkDetail({
        formatMessage,
        frameworkUuid,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapFrameworkDetailToBuilderForm(result.data);
    },
  });

  return {
    detail: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.frameworkDetailLoadError),
    refetch: query.refetch,
  };
};

export default useCompetencyFrameworkDetail;
