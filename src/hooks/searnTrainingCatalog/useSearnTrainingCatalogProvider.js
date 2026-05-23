import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchSearnTrainingCatalogProvider } from '../../api/searnTrainingCatalog/searnTrainingCatalogApi';
import {
  mapSearnTrainingCatalogProvider,
  unwrapSearnTrainingCatalogProvider,
} from '../../api/searnTrainingCatalog/searnTrainingCatalogUtils';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const searnTrainingCatalogProviderQueryKey = (providerSlug) => (
  ['searn-training-catalog', 'provider', providerSlug ?? '']
);

/**
 * @param {{ providerSlug?: string|null, enabled?: boolean }} options
 */
const useSearnTrainingCatalogProvider = ({ providerSlug, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: searnTrainingCatalogProviderQueryKey(providerSlug),
    enabled: enabled && hasDisplayValue(providerSlug),
    queryFn: async () => {
      const result = await fetchSearnTrainingCatalogProvider({
        formatMessage,
        providerSlug,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const provider = mapSearnTrainingCatalogProvider(unwrapSearnTrainingCatalogProvider(result.data));

      if (!provider || !hasDisplayValue(provider.slug)) {
        throw new Error(result.message || formatMessage(catalogMessages.providerLoadError));
      }

      return provider;
    },
  });

  return {
    provider: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(catalogMessages.providerLoadError),
    refetch: query.refetch,
  };
};

export default useSearnTrainingCatalogProvider;
