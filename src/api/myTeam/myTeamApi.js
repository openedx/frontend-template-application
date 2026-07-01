import { executeApiRequest } from '../apiRequest';
import {
  API_PAGE_SIZE,
  MY_TEAM_CANDIDATE_USERS,
  MY_TEAM_LIST,
  myTeamMemberDetail,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import myTeamMessages from '../../pages/myTeam/messages';

/**
 * @param {{ formatMessage: Function, page?: number }} params
 */
export const fetchMyTeamList = ({ formatMessage, page = 1 }) => executeApiRequest({
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

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchMyTeamCandidateUsers = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${MY_TEAM_CANDIDATE_USERS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: myTeamMessages.candidatesLoadError,
});

/**
 * @param {{ formatMessage: Function, userId: string }} params
 */
export const addMyTeamMember = ({ formatMessage, userId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${MY_TEAM_LIST}`;
    return httpClient.post(url, { user_id: userId });
  },
  formatMessage,
  fallbackMessage: myTeamMessages.addMemberError,
});

/**
 * @param {{ formatMessage: Function, userId: string }} params
 */
export const removeMyTeamMember = ({ formatMessage, userId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${myTeamMemberDetail(userId)}`;
    return httpClient.delete(url);
  },
  formatMessage,
  fallbackMessage: myTeamMessages.removeMemberError,
});
