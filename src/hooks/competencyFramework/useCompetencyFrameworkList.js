import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchCompetencyFrameworkList } from '../../api/competencyFramework/competencyFrameworkApi';
import { normalizeFrameworkListResults } from '../../api/competencyFramework/competencyFrameworkListUtils';

export const competencyFrameworkListQueryKey = (sourceFramework, page) => (
  ['competency-frameworks', sourceFramework, page]
);

/**
 * @param {{ sourceFramework: string, page: number, enabled?: boolean }} options
 */
const useCompetencyFrameworkList = ({
  sourceFramework,
  page,
  enabled = true,
}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: competencyFrameworkListQueryKey(sourceFramework, page),
    enabled: enabled && Boolean(sourceFramework),
    queryFn: async () => {
      const result = await fetchCompetencyFrameworkList({
        formatMessage,
        sourceFramework,
        page,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};

      return {
        frameworks: normalizeFrameworkListResults(data.results),
        count: data.count ?? 0,
        page: data.page ?? page,
        pageSize: data.page_size ?? 20,
        totalPages: data.total_pages ?? 1,
      };
    },
  });

  return {
    frameworks: query.data?.frameworks ?? [],
    count: query.data?.count ?? 0,
    currentPage: query.data?.page ?? page,
    totalPages: query.data?.totalPages ?? 1,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useCompetencyFrameworkList;
