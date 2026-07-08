/**
 * @param {unknown} value
 */
export const mapHaveAssigned = (value) => value === true;

/**
 * @param {{ id: string, haveAssigned?: boolean }} row
 * @param {Record<string, boolean>} [assignedOverrides]
 */
export const resolveHaveAssigned = (row, assignedOverrides = {}) => {
  if (!row?.id) {
    return false;
  }

  if (assignedOverrides[row.id] === true) {
    return true;
  }

  return mapHaveAssigned(row.haveAssigned);
};

/**
 * @param {boolean} haveAssigned
 */
export const canSelfAssignTraining = (haveAssigned) => !haveAssigned;
