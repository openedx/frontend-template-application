import userDetailsMock from '../../mock/users/userDetails.json';
import userCompletedTrainingsMock from '../../mock/users/userCompletedTrainings.json';
import userTrainingStatusMock from '../../mock/users/userTrainingStatus.json';
import userAssignedTrainingsMock from '../../mock/users/userAssignedTrainings.json';
import userMappedCompetenciesMock from '../../mock/users/userMappedCompetencies.json';
import regulatoryPassportMock from '../../mock/users/regulatoryPassport.json';
import regulatoryPassportDomainCoverageMock from '../../mock/users/regulatoryPassportDomainCoverage.json';
import regulatoryPassportCompletedTrainingsMock from '../../mock/users/regulatoryPassportCompletedTrainings.json';
import usersData from '../../mock/users/users.json';
import {
  mapRegulatoryPassportCompletedTrainingsPage,
  mapRegulatoryPassportDomainCoverageList,
  mapUserAboutDetail,
  mapUserAssignedTrainingsList,
  mapUserCompletedTrainingsList,
  mapUserMappedCompetenciesList,
  mapUserRegulatoryPassport,
  mapUserTrainingStatusList,
  mergeRegulatoryPassportIdentity,
  mergeUserIdentityIntoAboutDetail,
} from './usersUtils';

/**
 * Normalize a users-list row (API or mock) for about/passport pages.
 * @param {object|null|undefined} row
 * @param {string|number} userId
 */
export const normalizeUserListNavigationRow = (row, userId) => {
  if (!row || typeof row !== 'object') {
    return null;
  }

  const resolvedId = row.id ?? userId;
  if (resolvedId == null || resolvedId === '') {
    return null;
  }

  return {
    id: resolvedId,
    name: row.name ?? '',
    email: row.email ?? '',
    country: row.country ?? '',
    role: row.role ?? '',
    roleSub: row.roleSub ?? row.role_sub ?? '',
    competencyRole: row.competencyRole ?? row.competency_role ?? '',
    userProfileImage: row.userProfileImage ?? row.user_profile_image ?? '',
    joined: row.joined ?? '',
  };
};

/**
 * @param {object} user
 */
export const buildUserNavigationState = (user) => ({
  userProfileImage: user?.userProfileImage ?? '',
  userListRow: normalizeUserListNavigationRow(user, user?.id),
});

/**
 * Resolve a list-row user for mock pages.
 * @param {string|number} userId
 * @param {object|null|undefined} userRowOverride
 */
export const findMockUserRow = (userId, userRowOverride = null) => (
  normalizeUserListNavigationRow(userRowOverride, userId)
  ?? usersData.find((item) => String(item.id) === String(userId))
  ?? null
);

/**
 * Shared about-detail mock for every user (identity merged from list row).
 * @param {string|number} userId
 * @param {object|null|undefined} userRowOverride
 */
export const resolveUserAboutDetailMock = (userId, userRowOverride = null) => {
  const userRow = findMockUserRow(userId, userRowOverride);
  if (!userRow || String(userRow.id) !== String(userId)) {
    return null;
  }

  const detail = mapUserAboutDetail(userDetailsMock);
  if (!detail) {
    return null;
  }

  return mergeUserIdentityIntoAboutDetail(detail, userRow);
};

/** Shared completed trainings mock for every user. */
export const resolveUserCompletedTrainingsMock = () => (
  mapUserCompletedTrainingsList(userCompletedTrainingsMock)
);

/** Shared training status mock for every user. */
export const resolveUserTrainingStatusMock = () => (
  mapUserTrainingStatusList(userTrainingStatusMock)
);

/** Shared assigned trainings mock for every user. */
export const resolveUserAssignedTrainingsMock = () => (
  mapUserAssignedTrainingsList(userAssignedTrainingsMock)
);

/** Shared mapped competencies mock for every user. */
export const resolveUserMappedCompetenciesMock = () => (
  mapUserMappedCompetenciesList(userMappedCompetenciesMock)
);

/**
 * Shared regulatory passport mock (identity + profile + stats) for every user.
 * @param {string|number} userId
 * @param {object|null|undefined} userRowOverride
 */
export const resolveUserRegulatoryPassportMock = (userId, userRowOverride = null) => {
  const userRow = findMockUserRow(userId, userRowOverride);
  if (!userRow || String(userRow.id) !== String(userId)) {
    return null;
  }

  const passport = mapUserRegulatoryPassport(regulatoryPassportMock);
  if (!passport) {
    return null;
  }

  return mergeRegulatoryPassportIdentity(passport, userRow);
};

/** Shared regulatory passport domain coverage mock for every user. */
export const resolveRegulatoryPassportDomainCoverageMock = () => (
  mapRegulatoryPassportDomainCoverageList(regulatoryPassportDomainCoverageMock)
);

/** Shared regulatory passport completed trainings mock for every user. */
export const resolveRegulatoryPassportCompletedTrainingsMock = () => (
  mapRegulatoryPassportCompletedTrainingsPage(regulatoryPassportCompletedTrainingsMock)
);
