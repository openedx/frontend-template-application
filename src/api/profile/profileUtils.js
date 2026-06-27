import { normalizePickerOptionRows } from '../competencyFramework/competencyFrameworkUtils';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

const MANAGER_NONE_OPTION_ID = 'manager-none';

/**
 * @param {string[]|string|undefined|null} value
 * @returns {string[]}
 */
export const normalizeCompetencyRoleList = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => (hasDisplayValue(item) ? String(item).trim() : ''))
      .filter(Boolean);
  }

  if (!hasDisplayValue(value)) {
    return [];
  }

  return String(value)
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
};

/**
 * @param {string[]|string|undefined|null} value
 * @returns {string}
 */
export const formatCompetencyRoleForInput = (value) => normalizeCompetencyRoleList(value).join(', ');

/**
 * @param {string[]|string|undefined|null} value
 * @returns {string[]}
 */
export const parseCompetencyRoleForApi = (value) => normalizeCompetencyRoleList(value);

/**
 * @param {object} payload
 */
export const mapProfileResult = (payload) => {
  const data = payload?.results ?? payload;

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return null;
  }

  return {
    fullName: data.full_name ?? '',
    email: data.email ?? '',
    country: data.country ?? '',
    language: data.language ?? '',
    about: data.about ?? '',
    profileImageUrl: data.profile_image_url ?? '',
    manager: data.manager ?? '',
    competencyRole: normalizeCompetencyRoleList(data.competency_role),
    isAdmin: Boolean(data.is_admin),
  };
};

/**
 * @param {Array<object>|undefined} results
 */
export const mapProfileManagerOptionsToDropdown = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows.map((row) => ({
    value: String(row.id ?? ''),
    label: row.label,
  }));
};

/**
 * @param {Array<{ value: string, label: string }>} options
 * @param {string} manager
 */
export const getManagerLabelByValue = (manager, options) => {
  if (!Array.isArray(options)) {
    return '';
  }

  const normalized = String(manager ?? '');
  const match = options.find((option) => String(option.value) === normalized);
  return match?.label ?? '';
};

/**
 * @param {string} managerField
 * @param {Array<{ value: string, label: string }>} options
 */
export const resolveManagerDropdownValue = (managerField, options) => {
  if (!Array.isArray(options)) {
    return '';
  }

  if (!hasDisplayValue(managerField)) {
    const noneOption = options.find((option) => String(option.value) === MANAGER_NONE_OPTION_ID);
    return noneOption ? String(noneOption.value) : '';
  }

  const normalized = String(managerField);
  const byId = options.find((option) => String(option.value) === normalized);
  return byId ? String(byId.value) : normalized;
};

/**
 * @param {Array<object>} results
 */
export const normalizeLanguageOptions = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results.filter(
    (row) => hasDisplayValue(row.id) && hasDisplayValue(row.value) && hasDisplayValue(row.label),
  );
};

/**
 * @param {Array<{ value: string, label: string }>} options
 * @param {string} countryField - API may return label (GET) or value
 */
export const resolveCountryDropdownValue = (countryField, options) => {
  if (!hasDisplayValue(countryField) || !Array.isArray(options)) {
    return '';
  }

  const normalized = String(countryField);
  const byValue = options.find((option) => String(option.value) === normalized);
  if (byValue) {
    return String(byValue.value);
  }

  const byLabel = options.find((option) => option.label === normalized);
  return byLabel ? String(byLabel.value) : '';
};

/**
 * @param {Array<{ value: string, label: string }>} options
 * @param {string} value
 */
export const getCountryLabelByValue = (value, options) => {
  if (!hasDisplayValue(value) || !Array.isArray(options)) {
    return '';
  }

  const match = options.find((option) => String(option.value) === String(value));
  return match?.label ?? '';
};

/**
 * @param {Array<{ value: string, label: string }>} options
 * @param {string} value
 */
export const getLanguageLabelByValue = (value, options) => {
  if (!hasDisplayValue(value) || !Array.isArray(options)) {
    return '';
  }

  const match = options.find((option) => String(option.value) === String(value));
  return match?.label ?? '';
};

/**
 * @param {{
 *   fullName: string,
 *   country: string,
 *   language: string,
 *   about: string,
 *   manager?: string,
 *   competencyRole?: string[]|string,
 *   profileImageFile: File,
 * }} params
 */
export const buildProfilePatchFormData = ({
  fullName,
  country,
  language,
  about,
  manager,
  competencyRole,
  profileImageFile,
}) => {
  const formData = new FormData();

  formData.append('full_name', fullName.trim());
  formData.append('country', String(country));
  formData.append('language', String(language));
  formData.append('about', about.trim());

  if (manager !== undefined) {
    formData.append('manager', String(manager ?? ''));
  }

  if (competencyRole !== undefined) {
    formData.append('competency_role', JSON.stringify(parseCompetencyRoleForApi(competencyRole)));
  }

  formData.append('profile_image', profileImageFile, profileImageFile.name);

  return formData;
};

/**
 * @param {{
 *   fullName: string,
 *   country: string,
 *   language: string,
 *   about: string,
 *   manager?: string,
 *   competencyRole?: string[]|string,
 * }} params
 */
export const buildProfilePatchBody = ({
  fullName,
  country,
  language,
  about,
  manager,
  competencyRole,
}) => {
  const body = {
    full_name: fullName.trim(),
    country: String(country),
    language: String(language),
    about: about.trim(),
  };

  if (manager !== undefined) {
    body.manager = String(manager ?? '');
  }

  if (competencyRole !== undefined) {
    body.competency_role = parseCompetencyRoleForApi(competencyRole);
  }

  return body;
};

/**
 * @param {{ requestAdminRole?: boolean }} params
 */
export const buildProfileRequestAdminRoleBody = ({ requestAdminRole = false } = {}) => ({
  request_admin_role: requestAdminRole,
});
