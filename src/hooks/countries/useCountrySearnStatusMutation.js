import { useIntl } from '@edx/frontend-platform/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchCountrySearnStatus } from '../../api/countries/countriesApi';

const useCountrySearnStatusMutation = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ countryId, isSearnCountry }) => {
      const result = await patchCountrySearnStatus({
        formatMessage,
        countryId,
        isSearnCountry,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });
};

export default useCountrySearnStatusMutation;
