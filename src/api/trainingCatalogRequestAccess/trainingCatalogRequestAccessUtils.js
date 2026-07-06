export const TRAINING_ACCESS_REQUEST_STATUS = {
  NOT_REQUESTED: 'not_requested',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CLOSED: 'closed',
};

const REQUEST_STATUS_VALUES = new Set(Object.values(TRAINING_ACCESS_REQUEST_STATUS));

/**
 * @param {unknown} value
 * @returns {string}
 */
export const mapTrainingAccessRequestStatus = (value) => {
  const normalized = String(value ?? '').trim().toLowerCase();

  if (REQUEST_STATUS_VALUES.has(normalized)) {
    return normalized;
  }

  if (value === true) {
    return TRAINING_ACCESS_REQUEST_STATUS.PENDING;
  }

  return TRAINING_ACCESS_REQUEST_STATUS.NOT_REQUESTED;
};

/**
 * @param {string} status
 */
export const canRequestTrainingAccess = (status) => (
  status === TRAINING_ACCESS_REQUEST_STATUS.NOT_REQUESTED
);

/**
 * @param {{ id: string, requestStatus?: string }} row
 * @param {Record<string, string>} [statusOverrides]
 */
export const resolveTrainingAccessRequestStatus = (row, statusOverrides = {}) => {
  if (!row?.id) {
    return TRAINING_ACCESS_REQUEST_STATUS.NOT_REQUESTED;
  }

  const override = statusOverrides[row.id];
  if (override && REQUEST_STATUS_VALUES.has(override)) {
    return override;
  }

  return mapTrainingAccessRequestStatus(row.requestStatus);
};
