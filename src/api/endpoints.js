/** API path segments (no base URL). */

/** Default `page_size` for paginated list endpoints. */
export const API_PAGE_SIZE = 20;

export const DASHBOARD_STATS = '/api/v1/dashboard/stats/';
export const DASHBOARD_USERS_PER_COUNTRY = '/api/v1/dashboard/users-per-country/';
export const DASHBOARD_TOP_REQUESTED_ACTIVITIES = '/api/v1/dashboard/top-requested-activities/?limit=5';
export const DASHBOARD_PENDING_REQUESTS = '/api/v1/dashboard/pending-requests/';

export const COMPETENCY_FRAMEWORKS = '/api/v1/competency-frameworks/';

export const COUNTRIES = '/api/v1/countries/';
export const NRAS_ONBOARD = '/api/v1/nras-management/onboard/';
export const TRAINING_PROVIDERS_ONBOARD = '/api/v1/training-providers/onboard/';

export const PENDING_REQUESTS_FILTERS = '/api/v1/pending-requests/filters/';
export const PENDING_REQUESTS_LIST = '/api/v1/pending-requests/';

export const REQUESTED_TRAININGS_FILTERS = '/api/v1/requested-trainings/filters-requested-training/';
export const REQUESTED_TRAININGS_LIST = '/api/v1/requested-trainings/';
export const REQUESTED_TRAININGS_ACTIVITIES = '/api/v1/requested-trainings/activities/';

export const ROLE_ASSIGNMENT_PROFILE = '/api/v1/role-assignment/profile/';
export const ROLE_ASSIGNMENT_LANGUAGES = '/api/v1/role-assignment/languages/';
export const ROLE_ASSIGNMENT_ROLES = '/api/v1/role-assignment/roles/';
export const ROLE_ASSIGNMENT_ROLE_OPTIONS = '/api/v1/role-assignment/roles/options/';
export const ROLE_ASSIGNMENT_PERMISSIONS = '/api/v1/role-assignment/permissions/';
export const ROLE_ASSIGNMENT_USERS = '/api/v1/role-assignment/users/';

export const ORGANIZATION_DETAILS = '/api/v1/options/organization/details/';

export const ACTIVITIES_LIST = '/api/v1/activities/';

export const OPTIONS_COMPETENCY_FRAMEWORKS = '/api/v1/options/competency-frameworks/';
export const OPTIONS_FRAMEWORK_ROLES = '/api/v1/options/framework/roles/';
export const OPTIONS_DOMAINS = '/api/v1/options/domains/';
export const OPTIONS_SUB_DOMAINS = '/api/v1/options/sub-domains/';
export const OPTIONS_PROFICIENCY_LEVELS = '/api/v1/options/proficiency-levels/';

/** @param {string} identifier Framework UUID or `all`. */
export const optionsFrameworkRoles = (identifier) => `/api/v1/options/framework/${identifier}/roles/`;
/** @param {string} identifier Framework UUID or `all`. */
export const optionsFrameworkDomains = (identifier) => `/api/v1/options/framework/${identifier}/domains/`;
/** @param {string} identifier Framework UUID or `all`. */
export const optionsFrameworkSubDomains = (identifier) => `/api/v1/options/framework/${identifier}/sub-domains/`;
/** @param {string} identifier Framework UUID or `all`. */
export const optionsFrameworkProficiencyLevels = (identifier) => `/api/v1/options/framework/${identifier}/proficiency-levels/`;
