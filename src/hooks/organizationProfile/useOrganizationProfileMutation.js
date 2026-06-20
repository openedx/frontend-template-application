import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resolveOrganizationProfileSaveMock } from '../../api/organizationProfile/organizationProfilePageMockData';
import { organizationProfileQueryKey } from './useOrganizationProfile';

const useOrganizationProfileMutation = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (payload) => {
      const result = resolveOrganizationProfileSaveMock(payload);
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
