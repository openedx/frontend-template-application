import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchFrameworkRoles } from '../../api/competencyFramework/competencyFrameworkRolesApi';
import {
  mapFrameworkRolesToFormRows,
  unwrapRolesResultsPayload,
} from '../../api/competencyFramework/competencyFrameworkRolesUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkRolesQueryKey = (frameworkUuid) => (
  ['competency-framework', 'roles', frameworkUuid ?? '']
);

/**
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useFrameworkRoles = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: frameworkRolesQueryKey(frameworkUuid),
    enabled: enabled && hasDisplayValue(frameworkUuid),
    queryFn: async () => {
      const result = await fetchFrameworkRoles({
        formatMessage,
        frameworkUuid,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const payload = unwrapRolesResultsPayload(result.data);
      const roles = mapFrameworkRolesToFormRows(payload?.roles);

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
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.rolesLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkRoles;
