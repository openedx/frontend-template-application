import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { API_PAGE_SIZE } from '../../api/endpoints';
import { fetchSearnTrainingCatalogList } from '../../api/searnTrainingCatalog/searnTrainingCatalogApi';
import { mapSearnTrainingCatalogListResults } from '../../api/searnTrainingCatalog/searnTrainingCatalogUtils';
import exploreTrainingMessages from '../../pages/exploreTraining/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const exploreTrainingListQueryKey = (activityId) => (
  ['explore-training', 'trainings', activityId ?? '']
);

/**
 * Trainings mapped to a selected activity:
 * GET /api/v1/searn-training-catalog/?mapped-activity=<activityId>
 *
 * @param {{ activityId?: string|null, enabled?: boolean }} options
 */
const useExploreTrainingList = ({ activityId, enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: exploreTrainingListQueryKey(activityId),
    enabled: enabled && hasDisplayValue(activityId),
    queryFn: async () => {
      const result = await fetchSearnTrainingCatalogList({
        formatMessage,
        page: 1,
        pageSize: API_PAGE_SIZE,
        activityFilter: activityId,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const data = result.data ?? {};

      return {
        items: mapSearnTrainingCatalogListResults(data.results),
        count: data.count ?? 0,
      };
    },
  });

  return {
    items: query.data?.items ?? [],
    count: query.data?.count ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(exploreTrainingMessages.trainingsLoadError),
    refetch: query.refetch,
  };
};

export default useExploreTrainingList;
