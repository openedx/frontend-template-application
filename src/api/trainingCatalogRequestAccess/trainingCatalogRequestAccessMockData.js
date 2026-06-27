const requestedNraTrainingIds = new Set(['nra-tr-001']);
const requestedSearnTrainingIds = new Set();

/**
 * @param {Set<string>} requestedIds
 * @param {string|number} trainingId
 */
const resolveRequestAccessMock = (requestedIds, trainingId) => {
  const normalizedId = String(trainingId);

  if (!normalizedId) {
    return {
      ok: false,
      message: 'Training not found.',
    };
  }

  requestedIds.add(normalizedId);

  return {
    ok: true,
    message: 'Access request submitted successfully.',
    data: {
      id: normalizedId,
      is_requested: true,
    },
  };
};

/**
 * @param {string|number} trainingId
 */
export const resolveNraSpecificTrainingCatalogRequestAccessMock = (trainingId) => (
  resolveRequestAccessMock(requestedNraTrainingIds, trainingId)
);

/**
 * @param {string|number} trainingId
 */
export const resolveSearnTrainingCatalogRequestAccessMock = (trainingId) => (
  resolveRequestAccessMock(requestedSearnTrainingIds, trainingId)
);

/**
 * @param {string|number} trainingId
 */
export const isNraSpecificTrainingRequestedMock = (trainingId) => (
  requestedNraTrainingIds.has(String(trainingId))
);
