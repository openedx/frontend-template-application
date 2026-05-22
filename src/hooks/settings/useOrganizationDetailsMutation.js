import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchOrganizationDetails } from '../../api/organization/organizationApi';
import { organizationDetailsQueryKey } from './useOrganizationDetails';

const useOrganizationDetailsMutation = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (payload) => {
      const result = await patchOrganizationDetails({
        formatMessage,
        ...payload,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationDetailsQueryKey });
    },
  });

  return { updateMutation };
};

export default useOrganizationDetailsMutation;
