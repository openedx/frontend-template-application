import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchTrainingProviderOnboardDetail } from '../../api/trainingProviders/trainingProvidersApi';
import { mapTrainingProviderDetail } from '../../api/trainingProviders/trainingProvidersUtils';
import messages from '../../pages/trainingProviders/messages';

export const trainingProviderDetailQueryKey = (providerId) => [
  'training-providers',
  'onboard',
  'detail',
  providerId,
];

const useTrainingProviderDetail = ({ providerId, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: trainingProviderDetailQueryKey(providerId),
    enabled: enabled && providerId != null && providerId !== '',
    queryFn: async () => {
      const result = await fetchTrainingProviderOnboardDetail({ formatMessage, providerId });
      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapTrainingProviderDetail(result.data);
      if (!detail) {
        throw new Error(result.message || formatMessage(messages.detailLoadError));
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

export default useTrainingProviderDetail;
