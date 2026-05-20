import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchTrainingProvidersOnboardList } from '../../api/trainingProviders/trainingProvidersApi';
import { normalizeTrainingProviderList } from '../../api/trainingProviders/trainingProvidersUtils';

export const trainingProvidersListQueryKey = (page, search) => [
  'training-providers',
  'onboard',
  'list',
  page,
  search ?? '',
];

const useTrainingProvidersList = ({ page, search = '', enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: trainingProvidersListQueryKey(page, search),
    enabled,
    queryFn: async () => {
      const result = await fetchTrainingProvidersOnboardList({
        formatMessage,
        page,
        search,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};
      return {
        items: normalizeTrainingProviderList(data.results),
        count: data.count ?? 0,
        page: data.page ?? page,
        pageSize: data.page_size ?? 20,
        totalPages: data.total_pages ?? 1,
      };
    },
  });

  return {
    items: query.data?.items ?? [],
    count: query.data?.count ?? 0,
    currentPage: query.data?.page ?? page,
    totalPages: query.data?.totalPages ?? 1,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useTrainingProvidersList;
