import { useIntl } from '@edx/frontend-platform/i18n';
import { useQueries } from '@tanstack/react-query';
import { fetchActivityFilterOptions } from '../../api/activities/activitiesOptionsApi';
import { ACTIVITY_FILTER_ALL } from '../../api/activities/activitiesConstants';
import { mapPickerRowsToDropdownOptions } from '../../api/activities/activitiesUtils';
import activitiesMessages from '../../pages/activities/messages';

const FILTER_SEGMENTS = ['roles', 'domains', 'subDomains', 'proficiencyLevels'];

export const activityFilterOptionsQueryKey = (frameworkFilter) => [
  'activities',
  'options',
  'filters',
  frameworkFilter ?? '',
];

const prependAllOption = (options, allLabel) => [
  { value: ACTIVITY_FILTER_ALL, label: allLabel },
  ...options,
];

/**
 * Role, domain, sub-domain, and proficiency options scoped by competency framework filter.
 * @param {{ frameworkFilter?: string, enabled?: boolean }} [options]
 */
const useActivityFilterOptions = ({ frameworkFilter = '', enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const allRolesLabel = formatMessage(activitiesMessages.allRoles);
  const allDomainsLabel = formatMessage(activitiesMessages.allDomains);
  const allSubDomainsLabel = formatMessage(activitiesMessages.allSubDomains);
  const allLevelsLabel = formatMessage(activitiesMessages.allLevels);

  const queries = useQueries({
    queries: FILTER_SEGMENTS.map((segment) => ({
      queryKey: [...activityFilterOptionsQueryKey(frameworkFilter), segment],
      enabled,
      queryFn: async () => {
        const result = await fetchActivityFilterOptions({
          formatMessage,
          segment,
          frameworkFilter,
        });

        if (!result.ok) {
          throw new Error(result.message);
        }

        return mapPickerRowsToDropdownOptions(result.data?.results);
      },
    })),
  });

  const [rolesQuery, domainsQuery, subDomainsQuery, proficiencyQuery] = queries;

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const errorMessage = queries.find((q) => q.isError)?.error?.message
    ?? formatMessage(activitiesMessages.filterOptionsLoadError);

  return {
    roleOptions: prependAllOption(rolesQuery.data ?? [], allRolesLabel),
    domainOptions: prependAllOption(domainsQuery.data ?? [], allDomainsLabel),
    subDomainOptions: prependAllOption(subDomainsQuery.data ?? [], allSubDomainsLabel),
    proficiencyOptions: prependAllOption(proficiencyQuery.data ?? [], allLevelsLabel),
    isLoading,
    isError,
    errorMessage,
  };
};

export default useActivityFilterOptions;
