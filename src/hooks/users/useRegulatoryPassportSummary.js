import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchRegulatoryPassportSummary } from '../../api/users/usersApi';
import { mapUserRegulatoryPassport } from '../../api/users/usersUtils';
import usersMessages from '../../pages/users/messages';

export const regulatoryPassportSummaryQueryKey = (userId = null) => (
  ['regulatory-passport', 'summary', userId ?? 'current']
);

/**
 * @param {{ userId?: string|number|null, enabled?: boolean }} options
 */
const useRegulatoryPassportSummary = ({ userId = null, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: regulatoryPassportSummaryQueryKey(userId),
    enabled,
    queryFn: async () => {
      const result = await fetchRegulatoryPassportSummary({ formatMessage, userId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapUserRegulatoryPassport(result.data);
      if (!detail) {
        throw new Error(result.message || formatMessage(usersMessages.regulatoryPassportLoadError));
      }

      return detail;
    },
  });

  return {
    detail: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useRegulatoryPassportSummary;
