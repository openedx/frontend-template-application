import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchMyTeamList } from '../../api/myTeam/myTeamApi';
import { normalizeMyTeamMemberResults } from '../../api/myTeam/myTeamUtils';
import myTeamMessages from '../../pages/myTeam/messages';

export const myTeamListQueryKey = (page) => ['my-team', 'list', page ?? ''];

export const myTeamListQueryRootKey = () => ['my-team', 'list'];

/**
 * @param {{ page?: number, enabled?: boolean }} options
 */
const useMyTeamList = ({ page = 1, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: myTeamListQueryKey(page),
    enabled,
    queryFn: async () => {
      const result = await fetchMyTeamList({ formatMessage, page });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const items = normalizeMyTeamMemberResults(result.data?.results);

      return {
        items,
        count: result.data?.count ?? items.length,
        page: result.data?.page ?? page,
        totalPages: result.data?.total_pages ?? 1,
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
    errorMessage: query.error?.message ?? formatMessage(myTeamMessages.listLoadError),
    refetch: query.refetch,
  };
};

export default useMyTeamList;
