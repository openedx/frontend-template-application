import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchOrganizationDetails } from '../../api/organization/organizationApi';
import { mapOrganizationDetails } from '../../api/organization/organizationUtils';
import settingsMessages from '../../pages/settings/messages';

export const organizationDetailsQueryKey = ['organization', 'details'];

const useOrganizationDetails = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: organizationDetailsQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchOrganizationDetails({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapOrganizationDetails(result.data);
    },
  });

  return {
    details: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(settingsMessages.loadError),
    refetch: query.refetch,
  };
};

export default useOrganizationDetails;
