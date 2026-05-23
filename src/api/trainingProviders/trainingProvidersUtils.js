import { hasDisplayValue } from '../../utils/hasDisplayValue';

export const mapTrainingProviderListRow = (row) => ({
  id: row?.id,
  name: row?.name,
  email: row?.email,
  adminCount: row?.admin_count,
  courses: row?.courses,
});

export const normalizeTrainingProviderList = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapTrainingProviderListRow)
    .filter((row) => hasDisplayValue(row.id));
};

export const mapTrainingProviderDetail = (payload) => {
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
    email: data.email,
    countryName: data.country_name,
    courses: data.courses,
    admins,
  };
};

export const buildTrainingProviderPayload = ({
  id,
  name,
  email,
  countryName,
  admins,
  includeIds = false,
}) => {
  const parsedProviderId = Number.parseInt(String(id), 10);
  const hasPersistedProviderId = Number.isInteger(parsedProviderId);

  const trimmedCountryName = countryName?.trim();

  const payload = {
    name: name.trim(),
    email: email.trim(),
    admins: admins.map(({ id: adminId, name: adminName, email: adminEmail }) => {
      const parsedAdminId = Number.parseInt(String(adminId), 10);
      const hasPersistedAdminId = Number.isInteger(parsedAdminId)
        && String(adminId).trim() === String(parsedAdminId);

      if (includeIds && hasPersistedAdminId) {
        return {
          id: parsedAdminId,
          name: adminName.trim(),
          email: adminEmail.trim(),
        };
      }

      return {
        name: adminName.trim(),
        email: adminEmail.trim(),
      };
    }),
  };

  if (hasDisplayValue(trimmedCountryName)) {
    payload.country_name = trimmedCountryName;
  }

  if (includeIds && hasPersistedProviderId) {
    payload.id = parsedProviderId;
  }

  return payload;
};
