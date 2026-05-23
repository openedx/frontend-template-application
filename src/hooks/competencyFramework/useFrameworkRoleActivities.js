import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchFrameworkRoleActivities } from '../../api/competencyFramework/competencyFrameworkRoleActivitiesApi';
import {
  mapRoleActivitiesToFormRoles,
  unwrapRoleSpecificResultsPayload,
} from '../../api/competencyFramework/competencyFrameworkRoleSpecificUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkRoleActivitiesQueryKey = (frameworkUuid) => (
  ['competency-framework', 'role-activities', frameworkUuid ?? '']
);

/**
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useFrameworkRoleActivities = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: frameworkRoleActivitiesQueryKey(frameworkUuid),
    enabled: enabled && hasDisplayValue(frameworkUuid),
    queryFn: async () => {
      const result = await fetchFrameworkRoleActivities({
        formatMessage,
        frameworkUuid,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const payload = unwrapRoleSpecificResultsPayload(result.data);
      const roles = mapRoleActivitiesToFormRoles(payload?.roles);

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
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.roleActivitiesLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkRoleActivities;
