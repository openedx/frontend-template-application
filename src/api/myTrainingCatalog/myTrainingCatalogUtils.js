import { hasDisplayValue } from '../../utils/hasDisplayValue';
import {
  mapSearnTrainingCatalogDetail,
  mapSearnTrainingCatalogFeedback,
  mapSearnTrainingCatalogListRow,
  unwrapSearnTrainingCatalogDetail,
  unwrapSearnTrainingCatalogFeedback,
} from '../searnTrainingCatalog/searnTrainingCatalogUtils';
import { mapCatalogFilterOptionsToDropdown } from '../searnTrainingCatalog/trainingsCatalogOptionsUtils';

export {
  mapSearnTrainingCatalogDetail as mapMyTrainingCatalogDetail,
  mapSearnTrainingCatalogFeedback as mapMyTrainingCatalogFeedback,
  unwrapSearnTrainingCatalogDetail as unwrapMyTrainingCatalogDetail,
  unwrapSearnTrainingCatalogFeedback as unwrapMyTrainingCatalogFeedback,
};

/**
 * @param {Array<object>} results
 */
export const normalizeMyTrainingCatalogList = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapSearnTrainingCatalogListRow)
    .filter((row) => hasDisplayValue(row?.id));
};

/**
 * @param {Array<{ id: string, value: string, label: string }>} results
 */
export const mapMyTrainingFormOptions = (results) => mapCatalogFilterOptionsToDropdown(results);
