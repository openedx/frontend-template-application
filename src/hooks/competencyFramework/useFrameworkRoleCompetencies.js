import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchFrameworkRoleCompetencies } from '../../api/competencyFramework/competencyFrameworkRoleCompetenciesApi';
import {
  mapRoleCompetenciesToFormRoles,
  unwrapRoleSpecificResultsPayload,
} from '../../api/competencyFramework/competencyFrameworkRoleSpecificUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkRoleCompetenciesQueryKey = (frameworkUuid) => (
  ['competency-framework', 'role-competencies', frameworkUuid ?? '']
);

/**
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useFrameworkRoleCompetencies = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: frameworkRoleCompetenciesQueryKey(frameworkUuid),
    enabled: enabled && hasDisplayValue(frameworkUuid),
    queryFn: async () => {
      const result = await fetchFrameworkRoleCompetencies({
        formatMessage,
        frameworkUuid,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const payload = unwrapRoleSpecificResultsPayload(result.data);
      const roles = mapRoleCompetenciesToFormRoles(payload?.roles);

      return {
        roles,
        raw: payload,
      };
    },
  });

  return {
    roles: query.data?.roles ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.roleCompetenciesLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkRoleCompetencies;
