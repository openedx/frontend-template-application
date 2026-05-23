import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import {
  fetchTrainingsCatalogCompetencyFrameworkOptions,
  fetchTrainingsCatalogFrameworkDomainOptions,
  fetchTrainingsCatalogFrameworkRoleOptions,
  fetchTrainingsCatalogFrameworkSubDomainOptions,
  fetchTrainingsCatalogMappedActivityOptions,
  fetchTrainingsCatalogNraObjectiveOptions,
  fetchTrainingsCatalogTrainingProviderOptions,
} from '../../api/searnTrainingCatalog/trainingsCatalogOptionsApi';
import {
  FILTER_ALL,
  mapCatalogFilterOptionsToDropdown,
  mapCompetencyFrameworkOptionsToDropdown,
  withAllFilterOption,
} from '../../api/searnTrainingCatalog/trainingsCatalogOptionsUtils';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {string} frameworkFilter
 */
const resolveFrameworkIdentifier = (frameworkFilter) => (
  !hasDisplayValue(frameworkFilter) || frameworkFilter === FILTER_ALL ? 'all' : frameworkFilter
);

/**
 * @param {{ frameworkFilter?: string, enabled?: boolean }} options
 */
const useTrainingCatalogFilterOptions = ({ frameworkFilter = FILTER_ALL, enabled = true } = {}) => {
  const { formatMessage } = useIntl();
  const frameworkIdentifier = resolveFrameworkIdentifier(frameworkFilter);

  const competencyFrameworksQuery = useQuery({
    queryKey: ['trainings-catalog', 'options', 'competency-frameworks'],
    enabled,
    queryFn: async () => {
      const result = await fetchTrainingsCatalogCompetencyFrameworkOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapCompetencyFrameworkOptionsToDropdown(result.data?.results);
    },
  });

  const rolesQuery = useQuery({
    queryKey: ['trainings-catalog', 'options', 'roles', frameworkIdentifier],
    enabled,
    queryFn: async () => {
      const result = await fetchTrainingsCatalogFrameworkRoleOptions({
        formatMessage,
        frameworkIdentifier,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapCatalogFilterOptionsToDropdown(result.data?.results);
    },
  });

  const domainsQuery = useQuery({
    queryKey: ['trainings-catalog', 'options', 'domains', frameworkIdentifier],
    enabled,
    queryFn: async () => {
      const result = await fetchTrainingsCatalogFrameworkDomainOptions({
        formatMessage,
        frameworkIdentifier,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapCatalogFilterOptionsToDropdown(result.data?.results);
    },
  });

  const subDomainsQuery = useQuery({
    queryKey: ['trainings-catalog', 'options', 'sub-domains', frameworkIdentifier],
    enabled,
    queryFn: async () => {
      const result = await fetchTrainingsCatalogFrameworkSubDomainOptions({
        formatMessage,
        frameworkIdentifier,
      });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapCatalogFilterOptionsToDropdown(result.data?.results);
    },
  });

  const activitiesQuery = useQuery({
    queryKey: ['trainings-catalog', 'options', 'mapped-activities'],
    enabled,
    queryFn: async () => {
      const result = await fetchTrainingsCatalogMappedActivityOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapCatalogFilterOptionsToDropdown(result.data?.results);
    },
  });

  const nraObjectivesQuery = useQuery({
    queryKey: ['trainings-catalog', 'options', 'nra-objectives'],
    enabled,
    queryFn: async () => {
      const result = await fetchTrainingsCatalogNraObjectiveOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapCatalogFilterOptionsToDropdown(result.data?.results);
    },
  });

  const providersQuery = useQuery({
    queryKey: ['trainings-catalog', 'options', 'training-providers'],
    enabled,
    queryFn: async () => {
      const result = await fetchTrainingsCatalogTrainingProviderOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapCatalogFilterOptionsToDropdown(result.data?.results);
    },
  });

  const frameworkOptions = withAllFilterOption(
    competencyFrameworksQuery.data ?? [],
    formatMessage(catalogMessages.allFrameworks),
  );

  const roleOptions = withAllFilterOption(
    rolesQuery.data ?? [],
    formatMessage(catalogMessages.allRoles),
  );

  const domainOptions = withAllFilterOption(
    domainsQuery.data ?? [],
    formatMessage(catalogMessages.allDomains),
  );

  const subDomainOptions = withAllFilterOption(
    subDomainsQuery.data ?? [],
    formatMessage(catalogMessages.allSubDomains),
  );

  const activityOptions = withAllFilterOption(
    activitiesQuery.data ?? [],
    formatMessage(catalogMessages.allActivities),
  );

  const nraGoalOptions = withAllFilterOption(
    nraObjectivesQuery.data ?? [],
    formatMessage(catalogMessages.allNraGoals),
  );

  const providerOptions = withAllFilterOption(
    providersQuery.data ?? [],
    formatMessage(catalogMessages.allProviders),
  );

  const isOptionsLoading = competencyFrameworksQuery.isLoading
    || rolesQuery.isLoading
    || domainsQuery.isLoading
    || subDomainsQuery.isLoading
    || activitiesQuery.isLoading
    || nraObjectivesQuery.isLoading
    || providersQuery.isLoading;

  const optionsError = competencyFrameworksQuery.error
    || rolesQuery.error
    || domainsQuery.error
    || subDomainsQuery.error
    || activitiesQuery.error
    || nraObjectivesQuery.error
    || providersQuery.error;

  return {
    frameworkOptions,
    roleOptions,
    domainOptions,
    subDomainOptions,
    activityOptions,
    nraGoalOptions,
    providerOptions,
    providerOptionsRaw: providersQuery.data ?? [],
    isOptionsLoading,
    optionsErrorMessage: optionsError?.message ?? null,
  };
};

export default useTrainingCatalogFilterOptions;
