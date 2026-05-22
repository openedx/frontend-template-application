import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import {
  fetchFrameworkRoleOptions,
  mapFrameworkRoleOptionsToDropdown,
} from '../../api/competencyFramework/competencyFrameworkBuilderOptionsApi';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const frameworkRoleOptionsQueryKey = (frameworkUuid) => (
  ['competency-framework', 'options', 'framework-roles', frameworkUuid ?? '']
);

/**
 * @param {{ frameworkUuid?: string|null, enabled?: boolean }} options
 */
const useFrameworkRoleOptions = ({ frameworkUuid, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: frameworkRoleOptionsQueryKey(frameworkUuid),
    enabled: enabled && hasDisplayValue(frameworkUuid),
    queryFn: async () => {
      const result = await fetchFrameworkRoleOptions({
        formatMessage,
        frameworkUuid,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapFrameworkRoleOptionsToDropdown(result.data?.results);
    },
  });

  return {
    roleOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.frameworkRoleOptionsLoadError),
    refetch: query.refetch,
  };
};

export default useFrameworkRoleOptions;
