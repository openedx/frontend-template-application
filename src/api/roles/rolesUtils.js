import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {object} row
 */
export const mapRoleListRow = (row) => ({
  id: row?.id,
  code: row?.code,
  name: row?.name,
  description: row?.description ?? '',
  userCount: row?.user_count ?? 0,
  permissionCount: row?.permission_count ?? 0,
});

/**
 * @param {Array<object>} results
 */
export const normalizeRoleListResults = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapRoleListRow)
    .filter((row) => hasDisplayValue(row.id));
};

/**
 * @param {object} payload
 */
export const mapRoleDetail = (payload) => {
  const data = payload?.results ?? payload;

  if (!data || typeof data !== 'object') {
    return null;
  }

  const permissions = Array.isArray(data.permissions)
    ? data.permissions.filter((code) => hasDisplayValue(code))
    : [];

  return {
    id: data.id,
    code: data.code,
    name: data.name,
    description: data.description ?? '',
    permissions,
    userCount: data.user_count ?? 0,
    permissionCount: data.permission_count ?? permissions.length,
    isActive: data.is_active,
  };
};

/**
 * @param {Array<object>} results
 */
export const mapPermissionOptions = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .filter((row) => hasDisplayValue(row?.value) && hasDisplayValue(row?.label))
    .map(({ value, label }) => ({ value, label }));
};

/**
 * @param {{ name: string, description: string, permissions: string[] }} params
 */
export const buildRoleWritePayload = ({ name, description, permissions }) => ({
  name: name.trim(),
  description: (description ?? '').trim(),
  permissions: Array.isArray(permissions) ? permissions : [],
});

/**
 * @param {Array<{ value: string, label: string }>} options
 */
export const buildPermissionLabelByValue = (options) => options.reduce((acc, option) => {
  if (hasDisplayValue(option.value)) {
    acc[option.value] = option.label;
  }
  return acc;
}, {});
