import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchUsersList } from '../../api/users/usersApi';
import { normalizeUserListResults } from '../../api/users/usersUtils';

export const usersListQueryKey = (page, search, roleValue, providerId) => [
  'users',
  'list',
  page,
  search ?? '',
  roleValue ?? '',
  providerId ?? '',
];

/**
 * @param {{
 *   page: number,
 *   search?: string,
 *   roleValue?: string,
 *   providerId?: string|number,
 *   enabled?: boolean,
 * }} options
 */
const useUsersList = ({
  page,
  search = '',
  roleValue,
  providerId,
  enabled = true,
}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: usersListQueryKey(page, search, roleValue, providerId),
    enabled,
    queryFn: async () => {
      const result = await fetchUsersList({
        formatMessage,
        page,
        search,
        roleValue,
        providerId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};

      return {
        items: normalizeUserListResults(data.results),
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

export default useUsersList;
