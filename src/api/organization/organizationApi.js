import { executeApiRequest } from '../apiRequest';
import { ORGANIZATION_DETAILS } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import { buildOrganizationPatchFormData } from './organizationUtils';
import settingsMessages from '../../pages/settings/messages';

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchOrganizationDetails = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ORGANIZATION_DETAILS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: settingsMessages.loadError,
});

/**
 * @param {{
 *   formatMessage: Function,
 *   supportEmail: string,
 *   organisationName: string,
 *   logoFile?: File|null,
 * }} params
 */
export const patchOrganizationDetails = ({
  formatMessage,
  supportEmail,
  organisationName,
  logoFile = null,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ORGANIZATION_DETAILS}`;
    const hasLogoFile = logoFile instanceof File;

    if (hasLogoFile) {
      const formData = buildOrganizationPatchFormData({
        supportEmail,
        organisationName,
        logoFile,
      });

      return httpClient.patch(url, formData);
    }

    return httpClient.patch(url, {
      support_email: supportEmail.trim(),
      organisation_name: organisationName.trim(),
    });
  },
  formatMessage,
  fallbackMessage: settingsMessages.saveError,
});
