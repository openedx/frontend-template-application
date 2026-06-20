import { executeApiRequest } from '../apiRequest';
import { ORGANIZATION_PROFILE } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import organizationProfileMessages from '../../pages/organizationProfile/messages';
import { buildOrganizationProfilePatchFormData } from './organizationProfileUtils';

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchOrganizationProfile = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ORGANIZATION_PROFILE}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: organizationProfileMessages.loadError,
});

/**
 * @param {{
 *   formatMessage: Function,
 *   organizationName: string,
 *   website: string,
 *   contactEmail: string,
 *   country: string,
 *   overview: string,
 *   logoFile?: File|null,
 *   administrators?: Array<{ id?: string, name: string, email: string }>,
 * }} params
 */
export const patchOrganizationProfile = ({
  formatMessage,
  organizationName,
  website,
  contactEmail,
  country,
  overview,
  logoFile = null,
  administrators = [],
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ORGANIZATION_PROFILE}`;
    const hasLogoFile = logoFile instanceof File;
    const hasAdministrators = administrators.length > 0;

    if (hasLogoFile || hasAdministrators) {
      const formData = buildOrganizationProfilePatchFormData({
        organizationName,
        website,
        contactEmail,
        country,
        overview,
        logoFile,
        administrators,
      });

      return httpClient.patch(url, formData);
    }

    return httpClient.patch(url, {
      organization_name: organizationName.trim(),
      website: website.trim(),
      contact_email: contactEmail.trim(),
      country: country.trim(),
      overview: overview.trim(),
    });
  },
  formatMessage,
  fallbackMessage: organizationProfileMessages.saveError,
});
