import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {object} row
 */
export const mapOrganizationProfileAdministrator = (row) => ({
  id: row?.id,
  name: row?.name,
  email: row?.email,
});

/**
 * @param {object} payload
 */
export const mapOrganizationProfile = (payload) => {
  const data = payload?.results ?? payload;

  if (!data || typeof data !== 'object') {
    return null;
  }

  const administrators = Array.isArray(data.administrators)
    ? data.administrators
      .map(mapOrganizationProfileAdministrator)
      .filter((row) => hasDisplayValue(row.id))
    : [];

  return {
    logoUrl: data.logo_url,
    organizationName: data.organization_name,
    website: data.website,
    contactEmail: data.contact_email,
    country: data.country,
    overview: data.overview,
    administrators,
  };
};

/**
 * @param {{
 *   organizationName: string,
 *   website: string,
 *   contactEmail: string,
 *   country: string,
 *   overview: string,
 *   logoFile?: File|null,
 *   administrators?: Array<{ id?: string, name: string, email: string }>,
 * }} params
 */
export const buildOrganizationProfilePatchFormData = ({
  organizationName,
  website,
  contactEmail,
  country,
  overview,
  logoFile = null,
  administrators = [],
}) => {
  const formData = new FormData();

  formData.append('organization_name', organizationName.trim());
  formData.append('website', website.trim());
  formData.append('contact_email', contactEmail.trim());
  formData.append('country', country.trim());
  formData.append('overview', overview.trim());

  if (logoFile instanceof File) {
    formData.append('logo', logoFile, logoFile.name);
  }

  if (administrators.length > 0) {
    formData.append('administrators', JSON.stringify(administrators));
  }

  return formData;
};
