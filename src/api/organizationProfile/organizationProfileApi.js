import { executeApiRequest } from '../apiRequest';
import { TRAINING_PROVIDERS_ORGANIZATION_PROFILE } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import organizationProfileMessages from '../../pages/organizationProfile/messages';
import {
  buildOrganizationProfilePatchBody,
  buildOrganizationProfilePatchFormData,
} from './organizationProfileUtils';

/**
 * GET /api/v1/training-providers/organization-profile/
 * @param {{ formatMessage: Function }} params
 */
export const fetchOrganizationProfile = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAINING_PROVIDERS_ORGANIZATION_PROFILE}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: organizationProfileMessages.loadError,
});

/**
 * PATCH /api/v1/training-providers/organization-profile/
 * @param {{
 *   formatMessage: Function,
 *   organizationName: string,
 *   website: string,
 *   contactEmail: string,
 *   country: string,
 *   overview: string,
 *   logoFile?: File|null,
 *   logoUrl?: string,
 *   administrators?: Array<{ id?: string, name: string, email: string }>,
 *   includeAdministrators?: boolean,
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
  logoUrl = '',
  administrators = [],
  includeAdministrators = false,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${TRAINING_PROVIDERS_ORGANIZATION_PROFILE}`;
    const administratorsPayload = includeAdministrators ? administrators : null;

    if (logoFile instanceof File) {
      const formData = buildOrganizationProfilePatchFormData({
        organizationName,
        website,
        contactEmail,
        country,
        overview,
        logoFile,
        administrators: administratorsPayload,
      });

      return httpClient.patch(url, formData);
    }

    return httpClient.patch(url, buildOrganizationProfilePatchBody({
      organizationName,
      website,
      contactEmail,
      country,
      overview,
      logoUrl,
      administrators: administratorsPayload,
    }));
  },
  formatMessage,
  fallbackMessage: organizationProfileMessages.saveError,
});
