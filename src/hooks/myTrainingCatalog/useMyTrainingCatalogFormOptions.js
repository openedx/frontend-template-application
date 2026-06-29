import { useIntl } from '@edx/frontend-platform/i18n';
import { useQuery } from '@tanstack/react-query';
import {
  fetchMyTrainingCatalogApproachOptions,
  fetchMyTrainingCatalogEvaluationOptions,
  fetchMyTrainingCatalogLanguageOptions,
  fetchMyTrainingCatalogMappedCompetencyOptions,
  fetchMyTrainingCatalogOutcomeOptions,
  fetchMyTrainingCatalogProductTypeOptions,
  fetchMyTrainingCatalogTrainingModeOptions,
} from '../../api/myTrainingCatalog/myTrainingCatalogApi';
import { mapMyTrainingCatalogFormOptionsToDropdown } from '../../api/myTrainingCatalog/myTrainingCatalogUtils';
import {
  fetchTrainingsCatalogMappedActivityOptions,
  fetchTrainingsCatalogNraObjectiveOptions,
} from '../../api/searnTrainingCatalog/trainingsCatalogOptionsApi';
import myTrainingCatalogMessages from '../../pages/myTrainingCatalog/messages';

export const MY_TRAINING_CATALOG_FORM_OPTIONS_QUERY_KEY = ['my-training-catalog', 'form-options'];

const loadOptionResults = async ({ fetchFn, formatMessage }) => {
  const result = await fetchFn({ formatMessage });

  if (!result.ok) {
    throw new Error(result.message);
  }

  return result.data?.results ?? [];
};

/**
 * @param {{ enabled?: boolean }} [options]
 */
const useMyTrainingCatalogFormOptions = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();

  const query = useQuery({
    queryKey: MY_TRAINING_CATALOG_FORM_OPTIONS_QUERY_KEY,
    enabled,
    queryFn: async () => {
      const [
        languageResults,
        modeResults,
        approachResults,
        evaluationResults,
        outcomeResults,
        productTypeResults,
        nraObjectiveResults,
        mappedCompetencyResults,
        mappedActivityResults,
      ] = await Promise.all([
        loadOptionResults({ fetchFn: fetchMyTrainingCatalogLanguageOptions, formatMessage }),
        loadOptionResults({ fetchFn: fetchMyTrainingCatalogTrainingModeOptions, formatMessage }),
        loadOptionResults({ fetchFn: fetchMyTrainingCatalogApproachOptions, formatMessage }),
        loadOptionResults({ fetchFn: fetchMyTrainingCatalogEvaluationOptions, formatMessage }),
        loadOptionResults({ fetchFn: fetchMyTrainingCatalogOutcomeOptions, formatMessage }),
        loadOptionResults({ fetchFn: fetchMyTrainingCatalogProductTypeOptions, formatMessage }),
        loadOptionResults({ fetchFn: fetchTrainingsCatalogNraObjectiveOptions, formatMessage }),
        loadOptionResults({ fetchFn: fetchMyTrainingCatalogMappedCompetencyOptions, formatMessage }),
        loadOptionResults({ fetchFn: fetchTrainingsCatalogMappedActivityOptions, formatMessage }),
      ]);

      return {
        languageOptions: mapMyTrainingCatalogFormOptionsToDropdown(languageResults),
        modeOptions: mapMyTrainingCatalogFormOptionsToDropdown(modeResults),
        approachOptions: mapMyTrainingCatalogFormOptionsToDropdown(approachResults),
        evaluationOptions: mapMyTrainingCatalogFormOptionsToDropdown(evaluationResults),
        outcomeOptions: mapMyTrainingCatalogFormOptionsToDropdown(outcomeResults),
        productTypeOptions: mapMyTrainingCatalogFormOptionsToDropdown(productTypeResults),
        nraObjectiveOptions: mapMyTrainingCatalogFormOptionsToDropdown(nraObjectiveResults),
        mappedCompetencyOptions: mapMyTrainingCatalogFormOptionsToDropdown(mappedCompetencyResults),
        mappedActivityOptions: mapMyTrainingCatalogFormOptionsToDropdown(mappedActivityResults),
      };
    },
  });

  return {
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
    errorMessage: query.error?.message ?? formatMessage(myTrainingCatalogMessages.formOptionsLoadError),
  };
};

export default useMyTrainingCatalogFormOptions;
