import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchProductTypeOptions } from '../../api/competencyFramework/competencyFrameworkApi';
import { mapProductTypeDropdownOptions } from '../../api/competencyFramework/competencyFrameworkUtils';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';

export const productTypeOptionsQueryKey = ['competency-framework', 'options', 'product-types'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useProductTypeOptions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: productTypeOptionsQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchProductTypeOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapProductTypeDropdownOptions(result.data?.results);
    },
  });

  return {
    dropdownOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(competencyFrameworkMessages.productTypesLoadError),
  };
};

export default useProductTypeOptions;
