import { hasDisplayValue } from '../../utils/hasDisplayValue';

const OPTION_META_KEYS = new Set(['id', 'value', 'label']);

/**
 * @param {Array<object>} roleOptions
 * @param {string} value
 */
export const findRoleOptionByValue = (roleOptions, value) => {
  if (!Array.isArray(roleOptions) || !hasDisplayValue(value)) {
    return null;
  }

  return roleOptions.find((item) => String(item.value) === String(value)) ?? null;
};

/**
 * @param {object|null} roleOption
 */
export const roleOptionHasSubOptions = (roleOption) => Boolean(
  roleOption?.subKey
  && Array.isArray(roleOption.subOptions)
  && roleOption.subOptions.length > 0,
);

/**
 * @param {string} key
 */
export const formatRoleSubFieldLabel = (key) => {
  if (!hasDisplayValue(key)) {
    return '';
  }
  return key.charAt(0).toUpperCase() + key.slice(1);
};

/**
 * @param {Array<object>} results
 */
export const normalizeRoleOptionRows = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .filter((row) => hasDisplayValue(row?.value) && hasDisplayValue(row?.label))
    .map((row) => {
      const subKey = Object.keys(row).find(
        (key) => !OPTION_META_KEYS.has(key) && Array.isArray(row[key]),
      );
      const rawSubOptions = subKey ? row[subKey] : [];
      const subOptions = Array.isArray(rawSubOptions)
        ? rawSubOptions
          .filter((sub) => hasDisplayValue(sub?.id) && hasDisplayValue(sub?.label))
          .map((sub) => ({
            id: sub.id,
            value: String(sub.id),
            label: sub.label,
          }))
        : [];

      return {
        id: row.id,
        value: row.value,
        label: row.label,
        subKey: subKey || null,
        subOptions,
      };
    });
};

/**
 * @param {object} row
 */
export const mapUserListRow = (row) => ({
  id: row?.id,
  name: row?.name,
  email: row?.email,
  role: row?.role ?? '',
  userProfileImage: row?.user_profile_image ?? '',
  competencyRole: row?.competency_role ?? '',
});

/**
 * @param {Array<object>} results
 */
export const normalizeUserListResults = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapUserListRow)
    .filter((row) => hasDisplayValue(row.id));
};

/**
 * @param {object} payload
 */
export const mapUserDetail = (payload) => {
  const data = payload?.results ?? payload;

  if (!data || typeof data !== 'object') {
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    country: data.country != null ? String(data.country) : '',
    role: data.role ?? '',
    provider: data.provider != null ? String(data.provider) : '',
    userProfileImage: data.user_profile_image ?? '',
  };
};

/**
 * @param {{
 *   name: string,
 *   email: string,
 *   country: string,
 *   role: string,
 *   provider?: string,
 * }} params
 */
export const buildUserWritePayload = ({
  name,
  email,
  country,
  role,
  provider,
}) => {
  const payload = {
    name: name.trim(),
    email: email.trim(),
    country: String(country),
    role,
  };

  const parsedProvider = Number.parseInt(String(provider), 10);
  if (Number.isInteger(parsedProvider) && parsedProvider > 0) {
    payload.provider = parsedProvider;
  }

  return payload;
};
