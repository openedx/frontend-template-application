import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchRolesList } from '../../api/roles/rolesApi';
import { normalizeRoleListResults } from '../../api/roles/rolesUtils';

export const rolesListQueryKey = (page) => ['roles', 'list', page];

/**
 * @param {{ page: number, enabled?: boolean }} options
 */
const useRolesList = ({ page, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: rolesListQueryKey(page),
    enabled,
    queryFn: async () => {
      const result = await fetchRolesList({ formatMessage, page });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};

      return {
        items: normalizeRoleListResults(data.results),
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

export default useRolesList;
