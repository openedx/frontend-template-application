import { formatUserListCompetencyRole } from './usersUtils';

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
    id: resolvedId != null ? String(resolvedId) : '',
    name: row.name ?? '',
    email: row.email ?? '',
    country: row.country ?? '',
    role: row.role ?? '',
    roleSub: row.roleSub ?? row.role_sub ?? '',
    competencyRole: formatUserListCompetencyRole(row.competencyRole ?? row.competency_role),
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
