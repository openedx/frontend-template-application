import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchExploreTrainingRoles } from '../../api/exploreTraining/exploreTrainingApi';
import { mapExploreRoles } from '../../api/exploreTraining/exploreTrainingUtils';
import exploreTrainingMessages from '../../pages/exploreTraining/messages';

export const exploreTrainingRolesQueryKey = ['explore-training', 'roles'];

const useExploreTrainingRoles = () => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: exploreTrainingRolesQueryKey,
    queryFn: async () => {
      const result = await fetchExploreTrainingRoles({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapExploreRoles(result.data?.results);
    },
  });

  return {
    roles: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(exploreTrainingMessages.rolesLoadError),
    refetch: query.refetch,
  };
};

export default useExploreTrainingRoles;
