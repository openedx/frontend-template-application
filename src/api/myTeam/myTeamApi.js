import { executeApiRequest } from '../apiRequest';
import { API_PAGE_SIZE, MY_TEAM_CANDIDATE_USERS, MY_TEAM_LIST, myTeamMemberDetail } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import myTeamMessages from '../../pages/myTeam/messages';
import {
  resolveAddMyTeamMemberMock,
  resolveMyTeamCandidateUsersMock,
  resolveMyTeamListMock,
  resolveRemoveMyTeamMemberMock,
} from './myTeamPageMockData';

const USE_MY_TEAM_MOCK = true;

/**
 * @param {{ formatMessage: Function, page?: number }} params
 */
export const fetchMyTeamList = ({ formatMessage, page = 1 }) => {
  if (USE_MY_TEAM_MOCK) {
    const result = resolveMyTeamListMock({ page, pageSize: API_PAGE_SIZE });
    return Promise.resolve({
      ok: true,
      message: null,
      data: {
        results: result.items,
        count: result.count,
        page: result.page,
        page_size: result.pageSize,
        total_pages: result.totalPages,
      },
    });
  }

  return executeApiRequest({
    request: () => {
      const httpClient = getHttpClient();
      const url = `${getApiBaseUrl()}${MY_TEAM_LIST}`;
      return httpClient.get(url, {
        params: {
          page,
          page_size: API_PAGE_SIZE,
        },
      });
    },
    formatMessage,
    fallbackMessage: myTeamMessages.listLoadError,
  });
};

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchMyTeamCandidateUsers = ({ formatMessage }) => {
  if (USE_MY_TEAM_MOCK) {
    const candidates = resolveMyTeamCandidateUsersMock();
    return Promise.resolve({
      ok: true,
      message: null,
      data: { results: candidates },
    });
  }

  return executeApiRequest({
    request: () => {
      const httpClient = getHttpClient();
      const url = `${getApiBaseUrl()}${MY_TEAM_CANDIDATE_USERS}`;
      return httpClient.get(url);
    },
    formatMessage,
    fallbackMessage: myTeamMessages.candidatesLoadError,
  });
};

/**
 * @param {{ formatMessage: Function, userId: string }} params
 */
export const addMyTeamMember = ({ formatMessage, userId }) => {
  if (USE_MY_TEAM_MOCK) {
    const result = resolveAddMyTeamMemberMock(userId, formatMessage);
    return Promise.resolve({
      ok: result.ok,
      message: result.message,
      data: result.data,
    });
  }

  return executeApiRequest({
    request: () => {
      const httpClient = getHttpClient();
      const url = `${getApiBaseUrl()}${MY_TEAM_LIST}`;
      return httpClient.post(url, { user_id: userId });
    },
    formatMessage,
    fallbackMessage: myTeamMessages.addMemberError,
  });
};

/**
 * @param {{ formatMessage: Function, userId: string }} params
 */
export const removeMyTeamMember = ({ formatMessage, userId }) => {
  if (USE_MY_TEAM_MOCK) {
    const result = resolveRemoveMyTeamMemberMock(userId, formatMessage);
    return Promise.resolve({
      ok: result.ok,
      message: result.message,
      data: result.data,
    });
  }

  return executeApiRequest({
    request: () => {
      const httpClient = getHttpClient();
      const url = `${getApiBaseUrl()}${myTeamMemberDetail(userId)}`;
      return httpClient.delete(url);
    },
    formatMessage,
    fallbackMessage: myTeamMessages.removeMemberError,
  });
};
