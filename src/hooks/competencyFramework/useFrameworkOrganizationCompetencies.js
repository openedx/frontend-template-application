import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchFrameworkOrganizationCompetencies } from '../../api/competencyFramework/competencyFrameworkOrganizationCompetenciesApi';
import {
  mapOrganizationCompetenciesToFormItems,
  unwrapOrganizationCompetenciesResultsPayload,
} from '../../api/competencyFramework/competencyFrameworkOrganizationCompetenciesUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkOrganizationCompetenciesQueryKey = (frameworkUuid) => (
  ['competency-framework', 'organization-competencies', frameworkUuid ?? '']
);

/**
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useFrameworkOrganizationCompetencies = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: frameworkOrganizationCompetenciesQueryKey(frameworkUuid),
    enabled: enabled && hasDisplayValue(frameworkUuid),
    queryFn: async () => {
      const result = await fetchFrameworkOrganizationCompetencies({
        formatMessage,
        frameworkUuid,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const payload = unwrapOrganizationCompetenciesResultsPayload(result.data);
      const items = mapOrganizationCompetenciesToFormItems(payload?.items);

      return {
        items,
        raw: payload,
      };
    },
  });

  return {
    items: query.data?.items ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.orgCompetenciesLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkOrganizationCompetencies;
