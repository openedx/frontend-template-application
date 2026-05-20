import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {object} payload
 */
export const mapProfileResult = (payload) => {
  const data = payload?.result ?? payload;

  if (!data || typeof data !== 'object') {
    return null;
  }

  return {
    id: data.id,
    username: data.username,
    fullName: data.full_name,
    name: data.name,
    email: data.email,
    country: data.country,
    language: data.language,
    about: data.about,
    profileImageUrl: data.profile_image_url,
    createdAtDisplay: data.created_at_display,
    lastLoginDisplay: data.last_login_display,
  };
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
 * Build multipart form data for profile PATCH when an image file is included.
 * Backend field for uploads is `profile_image` (not `profile_image_url`).
 * @param {{
 *   fullName: string,
 *   country: string,
 *   language: string,
 *   about: string,
 *   profileImageFile: File,
 * }} params
 */
export const buildProfilePatchFormData = ({
  fullName,
  country,
  language,
  about,
  profileImageFile,
}) => {
  const formData = new FormData();

  formData.append('full_name', fullName.trim());
  formData.append('country', String(country));
  formData.append('language', String(language));
  formData.append('about', about.trim());
  formData.append('profile_image', profileImageFile, profileImageFile.name);

  return formData;
};
