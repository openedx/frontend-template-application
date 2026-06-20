import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { resolveOrganizationProfileMock } from '../../api/organizationProfile/organizationProfilePageMockData';
import organizationProfileMessages from '../../pages/organizationProfile/messages';

export const organizationProfileQueryKey = ['organization-profile'];

const useOrganizationProfile = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: organizationProfileQueryKey,
    enabled,
    queryFn: async () => {
      const profile = resolveOrganizationProfileMock();
      if (!profile) {
        throw new Error(formatMessage(organizationProfileMessages.loadError));
      }
      return profile;
    },
  });

  return {
    profile: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(organizationProfileMessages.loadError),
    refetch: query.refetch,
  };
};

export default useOrganizationProfile;
