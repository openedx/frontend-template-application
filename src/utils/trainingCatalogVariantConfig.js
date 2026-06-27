import { ADMIN_PATHS } from './adminPaths';

export const TRAINING_CATALOG_VARIANT_IDS = {
  MY_TRAINING_CATALOG: 'myTrainingCatalog',
  NRA_SPECIFIC_TRAINING_CATALOG: 'nraSpecificTrainingCatalog',
  SEARN_TRAINING_CATALOG: 'searnTrainingCatalog',
};

export const TRAINING_CATALOG_VARIANTS = {
  [TRAINING_CATALOG_VARIANT_IDS.MY_TRAINING_CATALOG]: {
    id: TRAINING_CATALOG_VARIANT_IDS.MY_TRAINING_CATALOG,
    navbarAccessKey: 'accessMyTrainingCatalog',
    componentAccessKey: 'myTrainingCatalog',
    pathPrefix: '/admin/my-training-catalog',
    paths: {
      list: ADMIN_PATHS.myTrainingCatalog,
      new: ADMIN_PATHS.myTrainingCatalogNew,
      edit: ADMIN_PATHS.myTrainingCatalogEdit,
      detail: ADMIN_PATHS.myTrainingCatalogDetail,
      feedback: ADMIN_PATHS.myTrainingCatalogFeedback,
    },
  },
  [TRAINING_CATALOG_VARIANT_IDS.NRA_SPECIFIC_TRAINING_CATALOG]: {
    id: TRAINING_CATALOG_VARIANT_IDS.NRA_SPECIFIC_TRAINING_CATALOG,
    navbarAccessKey: 'accessNraSpecificTrainingCatalog',
    componentAccessKey: 'nraSpecificTrainingCatalog',
    pathPrefix: '/admin/nra-specific-training-catalog',
    paths: {
      list: ADMIN_PATHS.nraSpecificTrainingCatalog,
      new: ADMIN_PATHS.nraSpecificTrainingCatalogNew,
      edit: ADMIN_PATHS.nraSpecificTrainingCatalogEdit,
      detail: ADMIN_PATHS.nraSpecificTrainingCatalogDetail,
      feedback: ADMIN_PATHS.nraSpecificTrainingCatalogFeedback,
      provider: ADMIN_PATHS.nraSpecificTrainingCatalogProvider,
      providerCatalog: ADMIN_PATHS.nraSpecificTrainingCatalogProviderCatalog,
    },
  },
};

const VARIANTS_BY_PATH_PREFIX = Object.values(TRAINING_CATALOG_VARIANTS)
  .sort((left, right) => right.pathPrefix.length - left.pathPrefix.length);

/**
 * @param {string} pathname
 */
export const getTrainingCatalogVariantFromPath = (pathname) => {
  const match = VARIANTS_BY_PATH_PREFIX.find(
    (variant) => pathname.startsWith(variant.pathPrefix),
  );

  return match || TRAINING_CATALOG_VARIANTS[TRAINING_CATALOG_VARIANT_IDS.MY_TRAINING_CATALOG];
};
