import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { isUploadableFile } from '../multipartRequest';

/**
 * @param {object} row
 */
export const mapOrganizationProfileAdministrator = (row) => ({
  id: row?.id != null ? String(row.id) : '',
  name: row?.name ?? '',
  email: row?.email ?? '',
});

/**
 * Maps GET /api/v1/training-providers/organization-profile/ results.
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
      .filter((row) => hasDisplayValue(row.name) && hasDisplayValue(row.email))
    : [];

  return {
    logoUrl: data.logo_url ?? '',
    organizationName: data.organization_name ?? '',
    website: data.website ?? '',
    contactEmail: data.contact_email ?? '',
    country: data.country != null ? String(data.country) : '',
    overview: data.overview ?? '',
    administrators,
  };
};

/**
 * PATCH administrators — send name and email only (omit id).
 * @param {Array<{ name?: string, email?: string }>} administrators
 */
export const buildOrganizationProfileAdministratorsPayload = (administrators) => {
  if (!Array.isArray(administrators)) {
    return [];
  }

  return administrators
    .filter((admin) => hasDisplayValue(admin?.name) && hasDisplayValue(admin?.email))
    .map((admin) => ({
      name: admin.name.trim(),
      email: admin.email.trim(),
    }));
};

/**
 * Builds PATCH JSON body for organization profile.
 * @param {{
 *   organizationName: string,
 *   website: string,
 *   contactEmail: string,
 *   country: string,
 *   overview: string,
 *   logoUrl?: string,
 *   administrators?: Array<{ name?: string, email?: string }>|null,
 * }} params
 */
export const buildOrganizationProfilePatchBody = ({
  organizationName,
  website,
  contactEmail,
  country,
  overview,
  logoUrl = '',
  administrators = null,
}) => {
  const body = {
    logo_url: logoUrl ?? '',
    organization_name: organizationName.trim(),
    website: website.trim(),
    contact_email: contactEmail.trim(),
    country: country.trim(),
    overview: overview.trim(),
  };

  if (administrators !== null) {
    body.administrators = buildOrganizationProfileAdministratorsPayload(administrators);
  }

  return body;
};

/**
 * Multipart PATCH when a new logo file is uploaded (`logo` file field).
 * Text fields and administrators follow the same JSON PATCH contract.
 * @param {{
 *   organizationName: string,
 *   website: string,
 *   contactEmail: string,
 *   country: string,
 *   overview: string,
 *   logoUrl?: string,
 *   logoFile?: File|null,
 *   administrators?: Array<{ name?: string, email?: string }>|null,
 * }} params
 */
export const buildOrganizationProfilePatchFormData = ({
  organizationName,
  website,
  contactEmail,
  country,
  overview,
  logoUrl = '',
  logoFile = null,
  administrators = null,
}) => {
  const formData = new FormData();

  formData.append('logo_url', logoUrl ?? '');
  formData.append('organization_name', organizationName.trim());
  formData.append('website', website.trim());
  formData.append('contact_email', contactEmail.trim());
  formData.append('country', country.trim());
  formData.append('overview', overview.trim());

  if (isUploadableFile(logoFile)) {
    formData.append('logo', logoFile, logoFile.name);
  }

  if (administrators !== null) {
    formData.append(
      'administrators',
      JSON.stringify(buildOrganizationProfileAdministratorsPayload(administrators)),
    );
  }

  return formData;
};
