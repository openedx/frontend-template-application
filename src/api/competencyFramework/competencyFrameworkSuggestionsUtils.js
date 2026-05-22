import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {object} data
 */
export const unwrapSuggestionDetailPayload = (data) => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  if (data.result && typeof data.result === 'object') {
    return data.result;
  }

  return data;
};

/**
 * @param {object|null|undefined} row
 */
export const mapSuggestionFromApi = (row) => {
  if (!row || typeof row !== 'object') {
    return null;
  }

  return {
    id: row.id != null ? String(row.id) : '',
    type: row.type ?? '',
    name: row.name ?? '',
    description: row.description ?? '',
    status: row.status ?? 'pending',
  };
};

/**
 * @param {Array<object>|undefined} results
 */
export const mapSuggestionsListFromApi = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapSuggestionFromApi)
    .filter((row) => hasDisplayValue(row?.id));
};

/**
 * @param {{ type?: string, name?: string, description?: string, status?: string }} form
 */
export const buildSuggestionCreatePayload = (form) => ({
  type: form.type,
  name: form.name?.trim() ?? '',
  description: form.description?.trim() ?? '',
  status: form.status || 'pending',
});

/**
 * @param {{ type?: string, name?: string, description?: string, status?: string }} form
 */
export const buildSuggestionUpdatePayload = (form) => {
  const payload = {};

  if (hasDisplayValue(form.type)) {
    payload.type = form.type;
  }

  if (hasDisplayValue(form.name?.trim())) {
    payload.name = form.name.trim();
  }

  payload.description = form.description?.trim() ?? '';

  if (hasDisplayValue(form.status)) {
    payload.status = form.status;
  }

  return payload;
};

/**
 * @param {string|number|null|undefined} suggestionId
 */
export const parseSuggestionId = (suggestionId) => {
  if (!hasDisplayValue(suggestionId)) {
    return null;
  }

  const parsed = Number.parseInt(String(suggestionId), 10);
  return Number.isNaN(parsed) ? suggestionId : parsed;
};

/**
 * @param {object|null|undefined} row
 */
export const mapSuggestionToFormState = (row) => {
  const mapped = mapSuggestionFromApi(row);

  if (!mapped) {
    return {
      type: 'competency',
      name: '',
      description: '',
      status: 'pending',
    };
  }

  return {
    type: mapped.type,
    name: mapped.name,
    description: mapped.description,
    status: mapped.status,
  };
};
