import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import { fetchNraOnboardDetail } from '../../api/nras/nrasApi';
import { mapNraDetail } from '../../api/nras/nrasUtils';
import nrasMessages from '../../pages/nras/messages';

export const nraDetailQueryKey = (nraId) => ['nras', 'onboard', 'detail', nraId];

/**
 * @param {{ nraId: string|number|null, enabled?: boolean }} options
 */
const useNraDetail = ({ nraId, enabled = true }) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: nraDetailQueryKey(nraId),
    enabled: enabled && nraId != null && nraId !== '',
    queryFn: async () => {
      const result = await fetchNraOnboardDetail({ formatMessage, nraId });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const detail = mapNraDetail(result.data);

      if (!detail) {
        throw new Error(result.message || formatMessage(nrasMessages.detailLoadError));
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

export default useNraDetail;
