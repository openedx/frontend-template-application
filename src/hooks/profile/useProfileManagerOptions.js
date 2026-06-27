import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProfileManagerOptions } from '../../api/profile/profileApi';
import { mapProfileManagerOptionsToDropdown } from '../../api/profile/profileUtils';
import profileMessages from '../../pages/profile/messages';

export const profileManagerOptionsQueryKey = ['profile', 'manager-options'];

const useProfileManagerOptions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: profileManagerOptionsQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchProfileManagerOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapProfileManagerOptionsToDropdown(result.data?.results);
    },
  });

  const dropdownOptions = useMemo(
    () => query.data ?? [],
    [query.data],
  );

  return {
    dropdownOptions,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(profileMessages.managerOptionsLoadError),
  };
};

export default useProfileManagerOptions;
