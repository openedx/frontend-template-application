import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {object} row
 */
export const mapNraListRow = (row) => ({
  id: row?.id,
  name: row?.name,
  countryId: row?.country_id,
  countryName: row?.country_name,
  adminCount: row?.admin_count,
});

/**
 * @param {Array<object>} results
 */
export const normalizeNraListResults = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapNraListRow)
    .filter((row) => hasDisplayValue(row.id));
};

/**
 * @param {object} payload
 */
export const mapNraDetail = (payload) => {
  const data = payload?.results ?? payload;

  if (!data || typeof data !== 'object') {
    return null;
  }

  const admins = Array.isArray(data.admins)
    ? data.admins
      .filter((admin) => hasDisplayValue(admin?.name) && hasDisplayValue(admin?.email))
      .map((admin) => ({
        id: admin.id,
        name: admin.name,
        email: admin.email,
      }))
    : [];

  return {
    id: data.id,
    name: data.name,
    countryId: data.country_id,
    countryName: data.country_name,
    admins,
  };
};

/**
 * @param {{ name: string, countryId: string|number, admins: Array<{ name: string, email: string }> }} params
 */
export const buildNraOnboardPayload = ({
  id,
  name,
  countryId,
  admins,
  includeIds = false,
}) => {
  const parsedCountryId = Number.parseInt(String(countryId), 10);
  const parsedNraId = Number.parseInt(String(id), 10);
  const hasPersistedNraId = Number.isInteger(parsedNraId);

  const payload = {
    name: name.trim(),
    admins: admins.map(({ id: adminId, name: adminName, email }) => {
      const parsedAdminId = Number.parseInt(String(adminId), 10);
      const hasPersistedAdminId = Number.isInteger(parsedAdminId)
        && String(adminId).trim() === String(parsedAdminId);

      if (includeIds && hasPersistedAdminId) {
        return {
          id: parsedAdminId,
          name: adminName.trim(),
          email: email.trim(),
        };
      }

      return {
        name: adminName.trim(),
        email: email.trim(),
      };
    }),
  };

  if (Number.isInteger(parsedCountryId)) {
    payload.country_id = parsedCountryId;
  }

  if (includeIds && hasPersistedNraId) {
    payload.id = parsedNraId;
  }

  return payload;
};
