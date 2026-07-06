import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import {
  fetchExploreTrainingDomainOptions,
  fetchExploreTrainingObjectiveOptions,
  fetchExploreTrainingProductTypeOptions,
  fetchExploreTrainingSubDomainOptions,
} from '../../api/exploreTraining/exploreTrainingApi';
import {
  mapExploreOptionsToDropdown,
  withExploreAllOption,
} from '../../api/exploreTraining/exploreTrainingUtils';
import exploreTrainingMessages from '../../pages/exploreTraining/messages';

const useExploreTrainingFilterOptions = () => {
  const { formatMessage } = useIntl();

  const productTypesQuery = useQuery({
    queryKey: ['explore-training', 'options', 'product-types'],
    queryFn: async () => {
      const result = await fetchExploreTrainingProductTypeOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapExploreOptionsToDropdown(result.data?.results);
    },
  });

  const domainsQuery = useQuery({
    queryKey: ['explore-training', 'options', 'domains'],
    queryFn: async () => {
      const result = await fetchExploreTrainingDomainOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapExploreOptionsToDropdown(result.data?.results);
    },
  });

  const subDomainsQuery = useQuery({
    queryKey: ['explore-training', 'options', 'sub-domains'],
    queryFn: async () => {
      const result = await fetchExploreTrainingSubDomainOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapExploreOptionsToDropdown(result.data?.results);
    },
  });

  const objectivesQuery = useQuery({
    queryKey: ['explore-training', 'options', 'nra-objectives'],
    queryFn: async () => {
      const result = await fetchExploreTrainingObjectiveOptions({ formatMessage });

      if (!result.ok) {
        throw new Error(result.message);
      }

      return mapExploreOptionsToDropdown(result.data?.results);
    },
  });

  const productTypeOptions = withExploreAllOption(
    productTypesQuery.data ?? [],
    formatMessage(exploreTrainingMessages.allProducts),
  );

  const domainOptions = withExploreAllOption(
    domainsQuery.data ?? [],
    formatMessage(exploreTrainingMessages.allDomains),
  );

  const subDomainOptions = withExploreAllOption(
    subDomainsQuery.data ?? [],
    formatMessage(exploreTrainingMessages.allSubDomains),
  );

  const objectiveOptions = objectivesQuery.data ?? [];

  const isOptionsLoading = productTypesQuery.isLoading
    || domainsQuery.isLoading
    || subDomainsQuery.isLoading
    || objectivesQuery.isLoading;

  return {
    productTypeOptions,
    domainOptions,
    subDomainOptions,
    objectiveOptions,
    isOptionsLoading,
  };
};

export default useExploreTrainingFilterOptions;
