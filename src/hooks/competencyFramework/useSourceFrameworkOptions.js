import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchSourceFrameworkOptions } from '../../api/competencyFramework/competencyFrameworkApi';
import { mapSourceFrameworkDropdownOptions } from '../../api/competencyFramework/competencyFrameworkUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';

export const sourceFrameworkOptionsQueryKey = ['competency-framework', 'options', 'source-framework'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useSourceFrameworkOptions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: sourceFrameworkOptionsQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchSourceFrameworkOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapSourceFrameworkDropdownOptions(result.data?.results);
    },
  });

  return {
    dropdownOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.sourceFrameworkOptionsLoadError),
  };
};

export default useSourceFrameworkOptions;
