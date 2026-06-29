import profileMock from '../../mock/profile/profile.json';
import { parseCompetencyRoleForApi } from './profileUtils';

const MANAGER_NONE_OPTION_ID = 'manager-none';

const resolveMockManagerValue = (manager) => {
  if (!manager || manager === MANAGER_NONE_OPTION_ID) {
    return null;
  }

  return String(manager);
};

let mockProfileState = structuredClone(profileMock);

export const resetProfileMockState = () => {
  mockProfileState = structuredClone(profileMock);
};

export const resolveCurrentUserProfileMock = () => mockProfileState;

/**
 * @param {{
 *   fullName?: string,
 *   country?: string,
 *   language?: string,
 *   about?: string,
 *   manager?: string,
 *   competencyRole?: string[]|string,
 *   profileImagePreviewUrl?: string,
 *   requestAdminRole?: boolean,
 * }} payload
 */
export const resolveCurrentUserProfileSaveMock = ({
  fullName,
  country,
  language,
  about,
  manager,
  competencyRole,
  profileImagePreviewUrl = '',
  requestAdminRole = false,
}) => {
  if (requestAdminRole) {
    if (mockProfileState.results?.access_admin_status ?? mockProfileState.results?.is_admin) {
      return {
        ok: false,
        message: 'You already have administrator access.',
        data: null,
      };
    }

    return {
      ok: true,
      message: 'Admin role request submitted.',
      data: mockProfileState,
    };
  }

  mockProfileState = {
    ...mockProfileState,
    results: {
      ...mockProfileState.results,
      full_name: fullName.trim(),
      country: String(country),
      language: String(language),
      about: about.trim(),
      ...(manager !== undefined ? { manager: resolveMockManagerValue(manager) } : {}),
      ...(competencyRole !== undefined ? { competency_role: parseCompetencyRoleForApi(competencyRole) } : {}),
    },
  };

  if (profileImagePreviewUrl) {
    mockProfileState.results.profile_image_url = profileImagePreviewUrl;
  }

  return {
    ok: true,
    message: null,
    data: mockProfileState,
  };
};
