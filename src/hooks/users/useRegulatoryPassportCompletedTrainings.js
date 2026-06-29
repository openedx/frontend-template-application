import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchRegulatoryPassportCompletedTrainings } from '../../api/users/usersApi';
import { mapRegulatoryPassportCompletedTrainingsPage } from '../../api/users/usersUtils';

export const regulatoryPassportCompletedTrainingsQueryKey = (userId = null, page = 1) => (
  ['regulatory-passport', 'training-completed', userId ?? 'current', page]
);

/**
 * @param {{ userId?: string|number|null, page?: number, enabled?: boolean }} options
 */
const useRegulatoryPassportCompletedTrainings = ({
  userId = null,
  page = 1,
  enabled = true,
}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: regulatoryPassportCompletedTrainingsQueryKey(userId, page),
    enabled,
    queryFn: async () => {
      const result = await fetchRegulatoryPassportCompletedTrainings({
        formatMessage,
        userId,
        page,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapRegulatoryPassportCompletedTrainingsPage(result.data);
    },
  });

  return {
    page: query.data ?? {
      items: [],
      count: 0,
      page: 1,
      pageSize: 20,
      totalPages: 1,
    },
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useRegulatoryPassportCompletedTrainings;
