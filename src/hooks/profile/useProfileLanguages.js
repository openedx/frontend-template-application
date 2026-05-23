import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProfileLanguages } from '../../api/profile/profileApi';
import { normalizeLanguageOptions } from '../../api/profile/profileUtils';
import profileMessages from '../../pages/profile/messages';

export const profileLanguagesQueryKey = ['profile', 'languages'];

const useProfileLanguages = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: profileLanguagesQueryKey,
    enabled,
    queryFn: async () => {
      const result = await fetchProfileLanguages({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      const options = normalizeLanguageOptions(result.data?.results);

      return {
        options,
        defaultLanguageCode: result.data?.default_language_code,
      };
    },
  });

  const dropdownOptions = useMemo(
    () => (query.data?.options ?? []).map(({ value, label }) => ({ value: String(value), label })),
    [query.data?.options],
  );

  return {
    dropdownOptions,
    defaultLanguageCode: query.data?.defaultLanguageCode,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? formatMessage(profileMessages.languagesLoadError),
  };
};

export default useProfileLanguages;
