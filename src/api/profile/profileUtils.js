import { normalizePickerOptionRows } from '../competencyFramework/competencyFrameworkUtils';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { isUploadableFile } from '../multipartRequest';

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
    manager: data.manager != null ? String(data.manager) : '',
    competencyRole: normalizeCompetencyRoleList(data.competency_role),
    accessAdminStatus: data.access_admin_status ?? false,
    isAdmin: data.access_admin_status === true,
    adminRequestPending: data.access_admin_status === 'pending',
    canRequestAdminRoleFromApi: data.access_admin_status === true,
  };
};

/**
 * @param {Array<object>|undefined} results
 */
export const mapProfileManagerOptionsToDropdown = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows.map((row) => ({
    value: String(row.value ?? ''),
    label: row.label,
    optionId: String(row.id ?? ''),
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
    const noneOption = options.find(
      (option) => !hasDisplayValue(option.value)
        || String(option.optionId) === MANAGER_NONE_OPTION_ID,
    );
    return noneOption ? String(noneOption.value) : '';
  }

  const token = String(managerField);
  const byValue = options.find((option) => String(option.value) === token);
  if (byValue) {
    return String(byValue.value);
  }

  const byOptionId = options.find((option) => String(option.optionId) === token);
  if (byOptionId) {
    return String(byOptionId.value);
  }

  if (token.startsWith('manager-')) {
    const suffix = token.slice('manager-'.length);
    const bySuffix = options.find(
      (option) => String(option.value) === suffix || String(option.optionId) === token,
    );
    if (bySuffix) {
      return String(bySuffix.value);
    }
  }

  return token;
};

/**
 * PATCH expects manager token (e.g. manager-u2) when available from options.
 * @param {string} managerValue
 * @param {Array<{ value: string, optionId?: string }>} options
 */
export const formatManagerForProfileApi = (managerValue, options) => {
  if (!hasDisplayValue(managerValue)) {
    return '';
  }

  const token = String(managerValue);
  const match = options?.find((option) => String(option.value) === token);
  if (match && hasDisplayValue(match.optionId)) {
    return String(match.optionId);
  }

  return token;
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
 * @param {string} languageField - API may return label (GET) or value
 * @param {Array<{ value: string, label: string }>} options
 */
export const resolveLanguageDropdownValue = (languageField, options) => {
  if (!hasDisplayValue(languageField) || !Array.isArray(options)) {
    return '';
  }

  const normalized = String(languageField);
  const byValue = options.find((option) => String(option.value) === normalized);
  if (byValue) {
    return String(byValue.value);
  }

  const byLabel = options.find((option) => option.label === normalized);
  return byLabel ? String(byLabel.value) : normalized;
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
    formData.append(
      'competency_role',
      JSON.stringify(parseCompetencyRoleForApi(competencyRole)),
    );
  }

  if (isUploadableFile(profileImageFile)) {
    formData.append('profile_image', profileImageFile, profileImageFile.name);
  }

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
 * POST /api/v1/nras-management/admin-role-requests/
 */
export const buildAdminRoleRequestBody = () => ({
  access_admin_status: true,
});
