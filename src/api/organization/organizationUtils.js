/**
 * @param {object} payload
 */
export const mapOrganizationDetails = (payload) => {
  const data = payload?.results ?? payload;

  if (!data || typeof data !== 'object') {
    return null;
  }

  return {
    platformName: data.platform_name,
    supportEmail: data.support_email,
    organisationName: data.organisation_name,
    logoUrl: data.logo_url,
  };
};

/**
 * Multipart PATCH when a logo file is included.
 * Backend upload field is `logo` (response returns `logo_url`).
 * @param {{
 *   supportEmail: string,
 *   organisationName: string,
 *   logoFile: File,
 * }} params
 */
export const buildOrganizationPatchFormData = ({
  supportEmail,
  organisationName,
  logoFile,
}) => {
  const formData = new FormData();

  formData.append('support_email', supportEmail.trim());
  formData.append('organisation_name', organisationName.trim());
  formData.append('logo', logoFile, logoFile.name);

  return formData;
};
