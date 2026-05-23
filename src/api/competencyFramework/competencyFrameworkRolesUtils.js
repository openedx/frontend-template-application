import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {object} data
 */
export const unwrapRolesResultsPayload = (data) => {
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
 * @param {Array<{ id?: number|string, name?: string }>|undefined} roles
 */
export const mapFrameworkRolesToFormRows = (roles) => {
  if (!Array.isArray(roles) || roles.length === 0) {
    return null;
  }

  return roles.map((row, index) => ({
    id: hasDisplayValue(row.id)
      ? String(row.id)
      : `role-${index}-${Date.now()}`,
    name: row.name ?? '',
  }));
};

/**
 * @param {Array<{ name?: string }>} roles
 */
export const buildRolesSyncPayload = (roles) => ({
  roles: (roles ?? [])
    .filter((row) => hasDisplayValue(row.name?.trim()))
    .map((row) => ({
      name: row.name.trim(),
    })),
});

/**
 * @param {Array<{ name?: string }>} roles
 */
export const hasRolesSectionData = (roles) => {
  if (!Array.isArray(roles)) {
    return false;
  }

  return roles.some((row) => hasDisplayValue(row.name?.trim()));
};
