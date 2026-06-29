import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchOrganizationProfile } from '../../api/organizationProfile/organizationProfileApi';
import { organizationProfileQueryKey } from './useOrganizationProfile';

const useOrganizationProfileMutation = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await patchOrganizationProfile({ formatMessage, ...payload });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationProfileQueryKey });
    },
  });

  return {
    updateMutation,
  };
};

export default useOrganizationProfileMutation;
