import { useQuery } from '@tanstack/react-query';
import { resolveMyTrainingCatalogFormOptionsMock } from '../../api/myTrainingCatalog/myTrainingCatalogPageMockData';

export const MY_TRAINING_CATALOG_FORM_OPTIONS_QUERY_KEY = ['my-training-catalog', 'form-options'];

const useMyTrainingCatalogFormOptions = ({ enabled = true } = {}) => {
  const query = useQuery({
    queryKey: MY_TRAINING_CATALOG_FORM_OPTIONS_QUERY_KEY,
    enabled,
    queryFn: async () => resolveMyTrainingCatalogFormOptionsMock(),
  });

  return {
    ...query.data,
    languageOptions: query.data?.languageOptions ?? [],
    modeOptions: query.data?.modeOptions ?? [],
    approachOptions: query.data?.approachOptions ?? [],
    evaluationOptions: query.data?.evaluationOptions ?? [],
    outcomeOptions: query.data?.outcomeOptions ?? [],
    productTypeOptions: query.data?.productTypeOptions ?? [],
    nraObjectiveOptions: query.data?.nraObjectiveOptions ?? [],
    mappedCompetencyOptions: query.data?.mappedCompetencyOptions ?? [],
    mappedActivityOptions: query.data?.mappedActivityOptions ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? null,
  };
};

export default useMyTrainingCatalogFormOptions;
