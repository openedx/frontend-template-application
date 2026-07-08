import { executeApiRequest } from '../apiRequest';
import {
  API_PAGE_SIZE,
  COUNTRIES,
  nrasManagementUserAssignTrainings,
  nrasManagementUserAssignedTrainingDetail,
  nrasManagementUserAssignedTrainings,
  nrasManagementUserAssignableTrainings,
  nrasManagementUserCompletedTrainings,
  nrasManagementUserDetail,
  nrasManagementUserTrainingStatus,
  REGULATORY_PASSPORT_DOMAIN_COVERAGE,
  REGULATORY_PASSPORT_DOMAIN_COVERAGE_PAGE_SIZE,
  REGULATORY_PASSPORT_DOMAIN_OPTIONS,
  REGULATORY_PASSPORT_LEVEL_OPTIONS,
  REGULATORY_PASSPORT_PRODUCT_TYPE_OPTIONS,
  REGULATORY_PASSPORT_SUBDOMAIN_OPTIONS,
  REGULATORY_PASSPORT_SUMMARY,
  REGULATORY_PASSPORT_TRAINING_COMPLETED,
  REGULATORY_PASSPORT_WHITE_LOGO,
  ROLE_ASSIGNMENT_ROLE_OPTIONS,
  ROLE_ASSIGNMENT_USERS,
  roleAssignmentUserDetail,
  trainingProvidersUserMappedCompetencies,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import usersMessages from '../../pages/users/messages';
import detailMessages from '../../pages/users/detailMessages';
import regulatoryPassportMessages from '../../pages/users/regulatoryPassportMessages';
import { buildRegulatoryPassportDomainCoverageParams } from './usersUtils';

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchRoleOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_ROLE_OPTIONS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: usersMessages.roleOptionsLoadError,
});

/**
 * Paginated users table — GET /api/v1/role-assignment/users/
 * Response: { results, count, page, page_size, total_pages, has_next, has_previous }
 * Row: { id, name, email, role, competency_role, user_profile_image }
 * @param {{
 *   formatMessage: Function,
 *   page?: number,
 *   search?: string,
 *   roleValue?: string,
 *   providerId?: string|number,
 * }} params
 */
export const fetchUsersList = ({
  formatMessage,
  page = 1,
  search,
  roleValue,
  providerId,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_USERS}`;
    const params = {
      page,
      page_size: API_PAGE_SIZE,
    };
    const trimmedSearch = search?.trim();
    if (trimmedSearch) {
      params.search = trimmedSearch;
    }
    const trimmedRole = roleValue?.trim();
    if (trimmedRole) {
      params.value = trimmedRole;
    }
    if (providerId != null && providerId !== '') {
      params.provider = providerId;
    }
    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: usersMessages.listLoadError,
});

/**
 * About page — hero, stats, and read-only sections.
 * @param {{ formatMessage: Function, userId: string|number }} params
 */
export const fetchUserAboutDetail = ({ formatMessage, userId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${nrasManagementUserDetail(userId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: usersMessages.detailLoadError,
});

/**
 * Edit user modal — prefill form fields.
 * @param {{ formatMessage: Function, userId: string|number }} params
 */
export const fetchUserForEdit = ({ formatMessage, userId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${roleAssignmentUserDetail(userId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: usersMessages.editUserLoadError,
});

/**
 * @param {{ formatMessage: Function, userId: string|number }} params
 */
export const fetchUserCompletedTrainings = ({ formatMessage, userId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${nrasManagementUserCompletedTrainings(userId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: detailMessages.completedTrainingsLoadError,
});

/**
 * @param {{ formatMessage: Function, userId: string|number }} params
 */
export const fetchUserTrainingStatus = ({ formatMessage, userId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${nrasManagementUserTrainingStatus(userId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: detailMessages.trainingStatusLoadError,
});

/**
 * @param {{ formatMessage: Function, userId: string|number }} params
 */
export const fetchUserAssignedTrainings = ({ formatMessage, userId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${nrasManagementUserAssignedTrainings(userId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: detailMessages.assignedTrainingsLoadError,
});

/**
 * @param {{ formatMessage: Function, userId: string|number, search?: string }} params
 */
export const fetchUserAssignableTrainings = ({ formatMessage, userId, search }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${nrasManagementUserAssignableTrainings(userId)}`;
    const params = {};
    const trimmedSearch = search?.trim();
    if (trimmedSearch) {
      params.search = trimmedSearch;
    }
    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: detailMessages.assignableTrainingsLoadError,
});

/**
 * @param {{ formatMessage: Function, userId: string|number, trainingIds: string[] }} params
 */
export const assignUserTrainings = ({ formatMessage, userId, trainingIds }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${nrasManagementUserAssignTrainings(userId)}`;
    return httpClient.post(url, { training_ids: trainingIds });
  },
  formatMessage,
  fallbackMessage: detailMessages.assignTrainingsError,
});

/**
 * @param {{ formatMessage: Function, userId: string|number, assignmentId: string|number }} params
 */
export const removeUserAssignedTraining = ({ formatMessage, userId, assignmentId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${nrasManagementUserAssignedTrainingDetail(userId, assignmentId)}`;
    return httpClient.delete(url);
  },
  formatMessage,
  fallbackMessage: detailMessages.removeAssignedTrainingError,
});

/**
 * @param {{ formatMessage: Function, userId: string|number }} params
 */
export const fetchUserMappedCompetencies = ({ formatMessage, userId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${trainingProvidersUserMappedCompetencies(userId)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: detailMessages.mappedCompetenciesLoadError,
});

/**
 * @param {{ formatMessage: Function, userId?: string|number|null }} params
 */
export const fetchRegulatoryPassportSummary = ({ formatMessage, userId = null }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REGULATORY_PASSPORT_SUMMARY}`;
    const params = userId != null && userId !== '' ? { user_id: userId } : undefined;
    return httpClient.get(url, params ? { params } : undefined);
  },
  formatMessage,
  fallbackMessage: usersMessages.regulatoryPassportLoadError,
});

/**
 * GET /api/v1/nras-management/regulatory-passport/white-logo/
 * Returns the white brand logo as a binary image (used for PDF export).
 * @param {{ formatMessage: Function }} params
 */
export const fetchRegulatoryPassportWhiteLogo = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REGULATORY_PASSPORT_WHITE_LOGO}`;
    return httpClient.get(url, { responseType: 'blob' });
  },
  formatMessage,
  fallbackMessage: regulatoryPassportMessages.whiteLogoLoadError,
});

/**
 * @param {{
 *   formatMessage: Function,
 *   userId?: string|number|null,
 *   page?: number,
 *   pageSize?: number,
 *   domainId?: string|number,
 *   subDomainId?: string|number,
 *   levelId?: string|number,
 *   productTypeId?: string|number,
 * }} params
 */
export const fetchRegulatoryPassportDomainCoverage = ({
  formatMessage,
  userId = null,
  page = 1,
  pageSize = REGULATORY_PASSPORT_DOMAIN_COVERAGE_PAGE_SIZE,
  domainId,
  subDomainId,
  levelId,
  productTypeId,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REGULATORY_PASSPORT_DOMAIN_COVERAGE}`;
    const params = buildRegulatoryPassportDomainCoverageParams({
      page,
      pageSize,
      domainId,
      subDomainId,
      levelId,
      productTypeId,
      userId,
    });
    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: regulatoryPassportMessages.domainCoverageLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchRegulatoryPassportDomainOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REGULATORY_PASSPORT_DOMAIN_OPTIONS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: regulatoryPassportMessages.domainOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchRegulatoryPassportSubdomainOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REGULATORY_PASSPORT_SUBDOMAIN_OPTIONS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: regulatoryPassportMessages.subdomainOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchRegulatoryPassportProductTypeOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REGULATORY_PASSPORT_PRODUCT_TYPE_OPTIONS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: regulatoryPassportMessages.productTypeOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function }} params
 */
export const fetchRegulatoryPassportLevelOptions = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REGULATORY_PASSPORT_LEVEL_OPTIONS}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: regulatoryPassportMessages.levelOptionsLoadError,
});

/**
 * @param {{
 *   formatMessage: Function,
 *   userId?: string|number|null,
 *   page?: number,
 *   pageSize?: number,
 * }} params
 */
export const fetchRegulatoryPassportCompletedTrainings = ({
  formatMessage,
  userId = null,
  page = 1,
  pageSize = API_PAGE_SIZE,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${REGULATORY_PASSPORT_TRAINING_COMPLETED}`;
    const params = { page, page_size: pageSize };
    if (userId != null && userId !== '') {
      params.user_id = userId;
    }
    return httpClient.get(url, { params });
  },
  formatMessage,
  fallbackMessage: regulatoryPassportMessages.completedTrainingsLoadError,
});

/**
 * Create user — POST /api/v1/role-assignment/users/
 * @param {{ formatMessage: Function, payload: object }} params
 */
export const createUser = ({ formatMessage, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${ROLE_ASSIGNMENT_USERS}`;
    return httpClient.post(url, payload);
  },
  formatMessage,
  fallbackMessage: usersMessages.createError,
});

/**
 * Edit user — PATCH /api/v1/role-assignment/users/{user_id}/
 * @param {{ formatMessage: Function, userId: string|number, payload: object }} params
 */
export const updateUser = ({ formatMessage, userId, payload }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${roleAssignmentUserDetail(userId)}`;
    return httpClient.patch(url, payload);
  },
  formatMessage,
  fallbackMessage: usersMessages.updateError,
});

/**
 * Delete user — DELETE /api/v1/role-assignment/users/{user_id}/
 * @param {{ formatMessage: Function, userId: string|number }} params
 */
export const deleteUser = ({ formatMessage, userId }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${roleAssignmentUserDetail(userId)}`;
    return httpClient.delete(url);
  },
  formatMessage,
  fallbackMessage: usersMessages.deleteError,
});

/**
 * Countries catalog for user form (all countries).
 * @param {{ formatMessage: Function }} params
 */
export const fetchCountriesForUserForm = ({ formatMessage }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${COUNTRIES}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: usersMessages.countriesLoadError,
});
