import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchOrganizationProfile } from '../../api/organizationProfile/organizationProfileApi';
import { mapOrganizationProfile } from '../../api/organizationProfile/organizationProfileUtils';
import organizationProfileMessages from '../../pages/organizationProfile/messages';

export const organizationProfileQueryKey = ['organization-profile'];

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useOrganizationProfile = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: organizationProfileQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchOrganizationProfile({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const profile = mapOrganizationProfile(result.data);
      if (!profile) {
        throw new Error(result.message || formatMessage(organizationProfileMessages.loadError));
      }

      return profile;
    },
  });

  return {
    profile: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
    refetch: query.refetch,
  };
};

export default useOrganizationProfile;
