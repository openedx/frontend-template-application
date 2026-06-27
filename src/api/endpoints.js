/** API path segments (no base URL). */

/** Default `page_size` for paginated list endpoints. */
export const API_PAGE_SIZE = 20;

export const CORE_PERMISSIONS = '/api/v1/core-permissions/';

export const DASHBOARD_STATS = '/api/v1/dashboard/stats/';
export const DASHBOARD_USERS_PER_COUNTRY = '/api/v1/dashboard/users-per-country/';
export const DASHBOARD_TOP_REQUESTED_ACTIVITIES = '/api/v1/dashboard/top-requested-activities/?limit=5';
export const DASHBOARD_TOP_TRAININGS = '/api/v1/dashboard/top-trainings/';
export const DASHBOARD_RECENT_ACTIVITIES = '/api/v1/dashboard/recent-activities/';
export const DASHBOARD_POPULAR_TRAININGS = '/api/v1/dashboard/popular-trainings/';
export const DASHBOARD_QUICK_ACTIONS = '/api/v1/dashboard/quick-actions/';
export const DASHBOARD_RECENT_TRAINING_COMPLETIONS = '/api/v1/dashboard/recent-training-completions/';

export const MY_TRAINING_CATALOG_LIST = '/api/v1/my-training-catalog/';
export const NRA_SPECIFIC_TRAINING_CATALOG_LIST = '/api/v1/nra-specific-training-catalog/';

/** @param {string|number} trainingId */
export const nraSpecificTrainingCatalogRequestAccess = (trainingId) => (
  `/api/v1/nra-specific-training-catalog/${trainingId}/request-access/`
);

/** @param {string|number} trainingId */
export const searnTrainingCatalogRequestAccess = (trainingId) => (
  `/api/v1/searn-training-catalog/${trainingId}/request-access/`
);

export const MY_TRAINING_LIST = '/api/v1/my-training/';
export const MY_TRAINING_STATUS_OPTIONS = '/api/v1/my-training/status-options/';

export const MY_TEAM_LIST = '/api/v1/my-team/members/';
export const MY_TEAM_CANDIDATE_USERS = '/api/v1/my-team/candidate-users/';

/** @param {string|number} userId */
export const myTeamMemberDetail = (userId) => `/api/v1/my-team/members/${userId}/`;

/** @param {string|number} trainingId */
export const myTrainingDetail = (trainingId) => `/api/v1/my-training/${trainingId}/`;

/** `page_size` for pending requests on the dashboard card. */
export const DASHBOARD_PENDING_REQUESTS_PAGE_SIZE = 4;

export const COMPETENCY_FRAMEWORKS = '/api/v1/competency-frameworks/';
export const COMPETENCY_FRAMEWORK_GENERAL_INFORMATION = '/api/v1/competency-framework/general-information/';
export const OPTIONS_PRODUCT_TYPES = '/api/v1/options/product-types/';
export const OPTIONS_SOURCE_FRAMEWORK = '/api/v1/options/source-framework/';

/** @param {string} frameworkUuid */
export const competencyFrameworkDetail = (frameworkUuid) => `/api/v1/competency-framework/${frameworkUuid}/`;

/** @param {string} frameworkUuid */
export const competencyFrameworkDomains = (frameworkUuid) => `/api/v1/competency-framework/${frameworkUuid}/domains/`;

/** @param {string} frameworkUuid */
export const competencyFrameworkSubDomains = (frameworkUuid) => `/api/v1/competency-framework/${frameworkUuid}/sub-domains/`;

/** @param {string} frameworkUuid */
export const competencyFrameworkRoles = (frameworkUuid) => `/api/v1/competency-framework/${frameworkUuid}/roles/`;

/** @param {string} frameworkUuid */
export const competencyFrameworkProficiencyLevels = (frameworkUuid) => `/api/v1/competency-framework/${frameworkUuid}/proficiency-levels/`;

/** @param {string} frameworkUuid */
export const competencyFrameworkOrganizationCompetencies = (frameworkUuid) => `/api/v1/competency-framework/${frameworkUuid}/organization-competencies/`;

/** @param {string} frameworkUuid */
export const competencyFrameworkRoleCompetencies = (frameworkUuid) => `/api/v1/competency-framework/${frameworkUuid}/role-competencies/`;

/** @param {string} frameworkUuid */
export const competencyFrameworkActivities = (frameworkUuid) => `/api/v1/competency-framework/${frameworkUuid}/activities/`;

/** @param {string} frameworkUuid */
export const competencyFrameworkSuggestions = (frameworkUuid) => `/api/v1/competency-framework/${frameworkUuid}/suggestions/`;

/** @param {string|number} suggestionId */
export const competencyFrameworkSuggestionDetail = (suggestionId) => `/api/v1/competency-framework/suggestions/${suggestionId}/`;

/** @param {string} frameworkUuid */
export const optionsCompetencyFrameworkCompetencyTypes = (frameworkUuid) => `/api/v1/options/competency-framework/${frameworkUuid}/competency-types/`;

export const COUNTRIES = '/api/v1/countries/';
export const NRAS_ONBOARD = '/api/v1/nras-management/onboard/';
export const TRAINING_PROVIDERS_ONBOARD = '/api/v1/training-providers/onboard/';

export const PENDING_REQUESTS_FILTERS = '/api/v1/pending-requests/filters/';
export const PENDING_REQUESTS_LIST = '/api/v1/pending-requests/';

export const REQUESTED_TRAININGS_FILTERS = '/api/v1/requested-trainings/filters-requested-training/';
export const REQUESTED_TRAININGS_LIST = '/api/v1/requested-trainings/';
export const REQUESTED_TRAININGS_ACTIVITIES = '/api/v1/requested-trainings/activities/';

export const ROLE_ASSIGNMENT_PROFILE = '/api/v1/role-assignment/profile/';
export const ROLE_ASSIGNMENT_PROFILE_MANAGER_OPTIONS = '/api/v1/role-assignment/profile/manager-options/';
export const ROLE_ASSIGNMENT_LANGUAGES = '/api/v1/role-assignment/languages/';
export const ROLE_ASSIGNMENT_ROLES = '/api/v1/role-assignment/roles/';
export const ROLE_ASSIGNMENT_ROLE_OPTIONS = '/api/v1/role-assignment/roles/options/';
export const ROLE_ASSIGNMENT_PERMISSIONS = '/api/v1/role-assignment/permissions/';
export const ROLE_ASSIGNMENT_USERS = '/api/v1/role-assignment/users/';

/** @param {string|number} userId */
export const roleAssignmentUserRegulatoryPassport = (userId) => (
  `/api/v1/role-assignment/users/${userId}/regulatory-passport/`
);

/** @param {string|number} userId */
export const roleAssignmentUserRegulatoryPassportDomainCoverage = (userId) => (
  `/api/v1/role-assignment/users/${userId}/regulatory-passport/domain-coverage/`
);

/** @param {string|number} userId */
export const roleAssignmentUserRegulatoryPassportCompletedTrainings = (userId) => (
  `/api/v1/role-assignment/users/${userId}/regulatory-passport/completed-trainings/`
);

export const ORGANIZATION_DETAILS = '/api/v1/options/organization/details/';
export const ORGANIZATION_PROFILE = '/api/v1/organization-profile/';

export const ACTIVITIES_LIST = '/api/v1/activities/';

export const SEARN_TRAINING_CATALOG = '/api/v1/searn-training-catalog/';

/** @param {string|number} trainingId */
export const searnTrainingCatalogDetail = (trainingId) => `/api/v1/searn-training-catalog/${trainingId}/`;

/** @param {string|number} trainingId */
export const searnTrainingCatalogFeedback = (trainingId) => `/api/v1/searn-training-catalog/${trainingId}/feedback/`;

/** @param {string} providerSlug */
export const searnTrainingCatalogProviderDetail = (providerSlug) => `/api/v1/searn-training-catalog/providers/${providerSlug}/`;

export const TRAININGS_CATALOG_OPTIONS_COMPETENCY_FRAMEWORKS = '/api/v1/trainings-catalog/options/competency-frameworks/';
export const TRAININGS_CATALOG_OPTIONS_MAPPED_ACTIVITIES = '/api/v1/trainings-catalog/options/mapped-activities/';
export const TRAININGS_CATALOG_OPTIONS_NRA_OBJECTIVES = '/api/v1/trainings-catalog/options/nra-objectives/';
export const TRAININGS_CATALOG_OPTIONS_TRAINING_PROVIDERS = '/api/v1/trainings-catalog/options/training-providers/';

/** @param {string} identifier Framework UUID or `all`. */
export const trainingsCatalogOptionsFrameworkRoles = (identifier) => `/api/v1/trainings-catalog/options/framework/${identifier}/roles/`;
/** @param {string} identifier Framework UUID or `all`. */
export const trainingsCatalogOptionsFrameworkDomains = (identifier) => `/api/v1/trainings-catalog/options/framework/${identifier}/domains/`;
/** @param {string} identifier Framework UUID or `all`. */
export const trainingsCatalogOptionsFrameworkSubDomains = (identifier) => `/api/v1/trainings-catalog/options/framework/${identifier}/sub-domains/`;

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
