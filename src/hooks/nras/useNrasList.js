import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchNrasOnboardList } from '../../api/nras/nrasApi';
import { normalizeNraListResults } from '../../api/nras/nrasUtils';

export const nrasListQueryKey = (page, search) => ['nras', 'onboard', 'list', page, search ?? ''];

/**
 * @param {{ page: number, search?: string, enabled?: boolean }} options
 */
const useNrasList = ({ page, search = '', enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: nrasListQueryKey(page, search),
    enabled,
    queryFn: async () => {
      const result = await fetchNrasOnboardList({ formatMessage, page, search });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};

      return {
        items: normalizeNraListResults(data.results),
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
    refetch: query.refetch,
  };
};

export default useNrasList;
