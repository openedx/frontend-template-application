import profileMock from '../../mock/organizationProfile/profile.json';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { mapOrganizationProfile } from './organizationProfileUtils';

let mockProfileState = structuredClone(profileMock.results ?? {});

export const resetOrganizationProfileMock = () => {
  mockProfileState = structuredClone(profileMock.results ?? {});
};

export const resolveOrganizationProfileMock = () => mapOrganizationProfile({ results: mockProfileState });

/**
 * @param {{
 *   organizationName: string,
 *   website: string,
 *   contactEmail: string,
 *   country: string,
 *   overview: string,
 *   logoFile?: File|null,
 *   logoPreviewUrl?: string,
 *   administrators?: Array<{ id?: string, name: string, email: string }>,
 * }} payload
 */
export const resolveOrganizationProfileSaveMock = ({
  organizationName,
  website,
  contactEmail,
  country,
  overview,
  logoFile = null,
  logoPreviewUrl = '',
  administrators = [],
}) => {
  mockProfileState = {
    ...mockProfileState,
    organization_name: organizationName.trim(),
    website: website.trim(),
    contact_email: contactEmail.trim(),
    country: country.trim(),
    overview: overview.trim(),
    administrators: administrators.map((admin) => ({
      id: admin.id || `admin-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: admin.name.trim(),
      email: admin.email.trim(),
    })),
  };

  if (logoFile instanceof File && hasDisplayValue(logoPreviewUrl)) {
    mockProfileState.logo_url = logoPreviewUrl;
  }

  return {
    ok: true,
    message: null,
    data: { results: mockProfileState },
  };
};
