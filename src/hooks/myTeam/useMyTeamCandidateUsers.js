import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchMyTeamCandidateUsers } from '../../api/myTeam/myTeamApi';
import { mapMyTeamCandidateOptionsToDropdown } from '../../api/myTeam/myTeamUtils';
import myTeamMessages from '../../pages/myTeam/messages';

export const myTeamCandidatesQueryKey = () => ['my-team', 'candidates'];

const useMyTeamCandidateUsers = ({ enabled = false } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: myTeamCandidatesQueryKey(),
    enabled,
    queryFn: async () => {
      const result = await fetchMyTeamCandidateUsers({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapMyTeamCandidateOptionsToDropdown(result.data?.results);
    },
  });

  return {
    dropdownOptions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(myTeamMessages.candidatesLoadError),
    refetch: query.refetch,
  };
};

export default useMyTeamCandidateUsers;
