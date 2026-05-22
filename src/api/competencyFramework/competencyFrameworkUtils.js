import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {string} html
 */
export const hasRichTextContent = (html) => {
  if (!hasDisplayValue(html)) {
    return false;
  }

  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .trim();

  return hasDisplayValue(text);
};

/**
 * Whether general-information fields have saved/prefilled content (show Update).
 * @param {{ name?: string, description?: string, sourceFramework?: string, productTypes?: string[] }} values
 */
export const hasGeneralInformationSectionData = ({
  name,
  description,
  sourceFramework,
  productTypes,
}) => (
  hasDisplayValue(name?.trim())
  || hasRichTextContent(description)
  || hasDisplayValue(sourceFramework)
  || (Array.isArray(productTypes) && productTypes.length > 0)
);

/**
 * Whether introduction fields have saved/prefilled content (show Update).
 * @param {{ background?: string, objectives?: string }} values
 */
export const hasIntroductionSectionData = ({ background, objectives }) => (
  hasRichTextContent(background) || hasRichTextContent(objectives)
);

/**
 * Whether overview field has saved/prefilled content (show Update).
 * @param {string} competencyModel
 */
export const hasOverviewSectionData = (competencyModel) => hasRichTextContent(competencyModel);

/**
 * @param {Array<object>} results
 */
export const normalizePickerOptionRows = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results.filter(
    (row) => hasDisplayValue(row?.id) && hasDisplayValue(row?.label),
  );
};

/**
 * @param {Array<object>} results
 */
export const mapProductTypeDropdownOptions = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows.map((row) => ({
    value: String(row.id),
    label: row.label,
  }));
};

/**
 * Source framework options use API `value` for submit; dropdown `value` matches option value.
 * @param {Array<object>} results
 */
export const mapSourceFrameworkDropdownOptions = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows
    .filter((row) => hasDisplayValue(row.value))
    .map((row) => ({
      value: String(row.value),
      label: row.label,
    }));
};

/**
 * @param {{
 *   name: string,
 *   description: string,
 *   sourceFramework: string,
 *   productTypes: string[],
 * }} form
 */
export const buildGeneralInformationPayload = ({
  name,
  description,
  sourceFramework,
  productTypes,
}) => ({
  name: name.trim(),
  description: description.trim(),
  source_framework: sourceFramework,
  product_types: (productTypes ?? [])
    .map((id) => Number.parseInt(String(id), 10))
    .filter((id) => !Number.isNaN(id)),
});

/**
 * @param {{ background: string, objectives: string }} form
 */
export const buildIntroductionPayload = ({ background, objectives }) => ({
  introduction_background: (background ?? '').trim(),
  introduction_objectives: (objectives ?? '').trim(),
});

/**
 * @param {{ competencyModel: string }} form
 */
export const buildOverviewPayload = ({ competencyModel }) => ({
  overview_competency_model: (competencyModel ?? '').trim(),
});

/**
 * GET /api/v1/competency-framework/<id>/ returns `{ results: { ...framework } }`.
 * POST /general-information/ returns a flat framework object.
 * @param {object|null|undefined} data
 */
export const unwrapFrameworkApiPayload = (data) => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const { results } = data;

  if (results && typeof results === 'object' && !Array.isArray(results)) {
    return results;
  }

  return data;
};

/**
 * Maps general-information fields from API payloads (POST create or GET detail).
 * POST returns framework identifier as `id` (UUID string); GET may also include `uuid`.
 * @param {object} data
 */
export const mapGeneralInformationFieldsFromApi = (data) => {
  const payload = unwrapFrameworkApiPayload(data);

  if (!payload) {
    return null;
  }

  const productTypes = Array.isArray(payload.product_types)
    ? payload.product_types.map((productTypeId) => String(productTypeId))
    : [];

  return {
    name: payload.name ?? '',
    description: payload.description ?? '',
    sourceFramework: payload.source_framework ?? '',
    productTypes,
    introductionBackground: payload.background ?? '',
    introductionObjectives: payload.objectives ?? '',
    overviewCompetencyModel: payload.competency_model ?? '',
  };
};

/** @param {object} data - GET /api/v1/competency-framework/<id>/ */
export const mapFrameworkDetailToBuilderForm = (data) => mapGeneralInformationFieldsFromApi(data);

/**
 * Merges API detail into builder form state (general + introduction + overview fields).
 * @param {object} prev
 * @param {ReturnType<typeof mapFrameworkDetailToBuilderForm>|null} detail
 */
export const mergeFrameworkDetailIntoBuilderForm = (prev, detail) => {
  if (!detail) {
    return prev;
  }

  return {
    ...prev,
    name: detail.name ?? '',
    description: detail.description ?? '',
    sourceFramework: detail.sourceFramework ?? '',
    productTypes: Array.isArray(detail.productTypes) ? detail.productTypes : [],
    introductionBackground: detail.introductionBackground ?? '',
    introductionObjectives: detail.introductionObjectives ?? '',
    overviewCompetencyModel: detail.overviewCompetencyModel ?? '',
  };
};

/**
 * Framework path/query identifier for detail APIs.
 * - POST /general-information/ returns `id` as UUID string (no `uuid` field).
 * - GET detail may return numeric `id` plus string `uuid`; prefer `uuid` when present.
 * @param {object} data
 */
export const resolveFrameworkIdFromApiResponse = (data) => {
  const payload = unwrapFrameworkApiPayload(data);

  if (!payload) {
    return null;
  }

  if (hasDisplayValue(payload.uuid)) {
    return String(payload.uuid);
  }

  if (hasDisplayValue(payload.id)) {
    return String(payload.id);
  }

  return null;
};

/** @deprecated Use resolveFrameworkIdFromApiResponse */
export const resolveFrameworkUuidFromResponse = resolveFrameworkIdFromApiResponse;
