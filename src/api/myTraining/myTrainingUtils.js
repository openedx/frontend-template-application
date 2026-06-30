import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const MY_TRAINING_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

/**
 * @param {object|null|undefined} row
 */
export const mapMyTrainingListRow = (row) => {
  if (!row || typeof row !== 'object') {
    return null;
  }

  return {
    id: row.id != null ? String(row.id) : '',
    title: row.title ?? '',
    description: row.description ?? '',
    provider: row.provider ?? '',
    status: row.status ?? '',
    accessUrl: row.access_url ?? '',
  };
};

/**
 * @param {object|null|undefined} data
 */
export const unwrapMyTrainingDetail = (data) => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  if (data.results && typeof data.results === 'object' && !Array.isArray(data.results)) {
    return data.results;
  }

  return data;
};

/**
 * @param {object|null|undefined} row
 */
export const mapMyTrainingDetail = (row) => {
  if (!row || typeof row !== 'object') {
    return null;
  }

  return {
    id: row.id != null ? String(row.id) : '',
    title: row.title ?? '',
    status: row.status ?? '',
    proofFileName: row.proof_file_name ?? '',
    rating: row.rating != null ? Number(row.rating) : null,
    feedback: row.feedback ?? '',
  };
};

/**
 * @param {Array<object>|undefined} results
 */
export const mapMyTrainingListResults = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapMyTrainingListRow)
    .filter((row) => hasDisplayValue(row?.id));
};

/**
 * @param {string} status
 * @param {Array<{ value: string, label: string }>} statusOptions
 */
export const getMyTrainingStatusLabel = (status, statusOptions = []) => {
  const match = statusOptions.find((option) => option.value === status);
  if (hasDisplayValue(match?.label)) {
    return match.label;
  }

  if (status === MY_TRAINING_STATUS.COMPLETED) {
    return 'Completed';
  }
  if (status === MY_TRAINING_STATUS.IN_PROGRESS) {
    return 'In Progress';
  }
  if (status === MY_TRAINING_STATUS.NOT_STARTED) {
    return 'Not Started';
  }

  return status;
};

/**
 * @param {string} status
 */
export const getMyTrainingStatusBadgeClass = (status) => {
  if (status === MY_TRAINING_STATUS.COMPLETED) {
    return 'my-training-page__status-badge my-training-page__status-badge--completed';
  }
  if (status === MY_TRAINING_STATUS.IN_PROGRESS) {
    return 'my-training-page__status-badge my-training-page__status-badge--in-progress';
  }

  return 'my-training-page__status-badge my-training-page__status-badge--not-started';
};

/**
 * @param {object|null|undefined} data
 */
export const unwrapMyTrainingStatusOptions = (data) => {
  if (!data || typeof data !== 'object') {
    return [];
  }

  const { results } = data;

  if (Array.isArray(results)) {
    return results;
  }

  if (results && typeof results === 'object' && Array.isArray(results.status_options)) {
    return results.status_options;
  }

  if (Array.isArray(data.status_options)) {
    return data.status_options;
  }

  return [];
};

/**
 * @param {Array<object>|undefined} results
 */
export const mapMyTrainingStatusOptions = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map((row) => {
      if (!row || typeof row !== 'object') {
        return null;
      }

      const label = hasDisplayValue(row.label) ? row.label : row.lable;
      const value = hasDisplayValue(row.value) ? row.value : row.Value;

      if (!hasDisplayValue(label) || !hasDisplayValue(value)) {
        return null;
      }

      const normalizedValue = String(value);

      return {
        value: normalizedValue,
        label,
        optionId: row.id != null ? String(row.id) : normalizedValue,
      };
    })
    .filter(Boolean);
};

/**
 * @param {{
 *   page: number,
 *   pageSize: number,
 *   search?: string,
 * }} filters
 */
export const buildMyTrainingListParams = ({ page, pageSize, search }) => {
  const params = {
    page,
    page_size: pageSize,
  };

  const trimmedSearch = search?.trim();
  if (hasDisplayValue(trimmedSearch)) {
    params.search = trimmedSearch;
  }

  return params;
};

/**
 * @param {object} payload
 */
export const buildMyTrainingUpdateBody = ({
  status,
  rating,
  feedback,
  proofFile,
  proofFileName,
}) => {
  const body = {};

  if (hasDisplayValue(status)) {
    body.status = status;
  }

  if (rating != null && !Number.isNaN(Number(rating))) {
    body.rating = Number(rating);
  }

  if (hasDisplayValue(feedback)) {
    body.feedback = feedback.trim();
  }

  if (proofFile instanceof File) {
    body.proof_file = proofFile;
  } else if (hasDisplayValue(proofFileName)) {
    body.proof_file_name = proofFileName;
  }

  return body;
};
