import membersMock from '../../mock/myTeam/members.json';
import usersData from '../../mock/users/users.json';
import myTeamMessages from '../../pages/myTeam/messages';
import { API_PAGE_SIZE } from '../endpoints';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import {
  mapMyTeamMemberRow,
  mapUserToMyTeamCandidateOption,
  normalizeMyTeamMemberResults,
} from './myTeamUtils';

/** Mock-only: users already assigned to another team (POST conflict simulation). */
const MOCK_CANDIDATE_TEAM_CONFLICTS = {
  u5: 'courses@trainingprovider.com',
};

let teamMembers = normalizeMyTeamMemberResults(membersMock?.results);

const getUsersCatalog = () => (Array.isArray(usersData) ? usersData : []);

const getCandidateCatalog = () => getUsersCatalog()
  .map(mapUserToMyTeamCandidateOption)
  .filter((row) => hasDisplayValue(row.id) && hasDisplayValue(row.value) && hasDisplayValue(row.label));

const findUserById = (userId) => getUsersCatalog().find(
  (row) => String(row.id) === String(userId),
) ?? null;

export const resetMyTeamMockState = () => {
  teamMembers = normalizeMyTeamMemberResults(membersMock?.results);
};

export const resolveMyTeamListMock = ({
  page = 1,
  pageSize = API_PAGE_SIZE,
} = {}) => {
  const count = teamMembers.length;
  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const pagedItems = teamMembers.slice(start, start + pageSize);

  return {
    items: pagedItems,
    count,
    page: safePage,
    pageSize,
    totalPages,
  };
};

export const resolveMyTeamCandidateUsersMock = () => {
  const memberIds = new Set(teamMembers.map((member) => member.id));

  return getCandidateCatalog().filter((candidate) => !memberIds.has(candidate.value));
};

/**
 * @param {string} userId
 * @param {Function} formatMessage
 */
export const resolveAddMyTeamMemberMock = (userId, formatMessage) => {
  const user = findUserById(userId);

  if (!user) {
    return {
      ok: false,
      message: formatMessage(myTeamMessages.addMemberNotFoundError),
      data: null,
    };
  }

  const conflictOwner = MOCK_CANDIDATE_TEAM_CONFLICTS[userId] ?? null;

  if (hasDisplayValue(conflictOwner)) {
    return {
      ok: false,
      message: formatMessage(myTeamMessages.addMemberConflictError, {
        owner: conflictOwner,
      }),
      data: null,
    };
  }

  if (teamMembers.some((member) => String(member.id) === String(userId))) {
    return {
      ok: false,
      message: formatMessage(myTeamMessages.addMemberAlreadyOnTeamError),
      data: null,
    };
  }

  const member = mapMyTeamMemberRow({
    id: user.id,
    name: user.name,
    email: user.email,
  });
  teamMembers = [...teamMembers, member];

  return {
    ok: true,
    message: formatMessage(myTeamMessages.addMemberSuccess),
    data: member,
  };
};

/**
 * @param {string} userId
 * @param {Function} formatMessage
 */
export const resolveRemoveMyTeamMemberMock = (userId, formatMessage) => {
  const exists = teamMembers.some((member) => String(member.id) === String(userId));

  if (!exists) {
    return {
      ok: false,
      message: formatMessage(myTeamMessages.removeMemberNotFoundError),
      data: null,
    };
  }

  teamMembers = teamMembers.filter((member) => String(member.id) !== String(userId));

  return {
    ok: true,
    message: formatMessage(myTeamMessages.removeMemberSuccess),
    data: null,
  };
};
