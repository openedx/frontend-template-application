/**
 * Admin app paths must end with `/` (security requirement).
 * Use `adminPath()` for any dynamic path; prefer `ADMIN_PATHS` for static routes.
 */

/**
 * @param {string} path
 * @returns {string}
 */
export const adminPath = (path) => {
  if (!path || typeof path !== 'string') {
    return '/';
  }

  const suffixIndex = path.search(/[?#]/);
  const pathname = suffixIndex === -1 ? path : path.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? '' : path.slice(suffixIndex);

  if (pathname === '/') {
    return `${pathname}${suffix}`;
  }

  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${normalized}${suffix}`;
};

export const ADMIN_PATHS = {
  dashboard: '/admin/dashboard/',
  competencyFrameworks: '/admin/competency-frameworks/',
  competencyFrameworkNew: '/admin/competency-frameworks/new/',
  activities: '/admin/activities-management/',
  trainingCatalog: '/admin/searn-training-catalog/',
  myTrainingCatalog: '/admin/my-training-catalog/',
  myTrainingCatalogNew: '/admin/my-training-catalog/new/',
  nras: '/admin/nras/',
  countries: '/admin/countries/',
  trainingProviders: '/admin/training-providers/',
  pendingRequests: '/admin/pending-requests/',
  requestedTrainings: '/admin/requested-trainings/',
  profile: '/admin/profile/',
  users: '/admin/users/',
  organizationProfile: '/admin/organization-profile/',
  roles: '/admin/roles/',
  settings: '/admin/settings/',
  reportsStaffTrained: '/admin/reports/staff-trained/',
  reportsTrainingOffers: '/admin/reports/training-offers/',
  reportsCompetencyCoverage: '/admin/reports/competency-coverage/',
  reportsStaffPerTraining: '/admin/reports/staff-per-training/',
  reportsTraineeSatisfaction: '/admin/reports/trainee-satisfaction/',
  reportsPriorityFeedback: '/admin/reports/priority-feedback/',
  dashboardRole: (role) => adminPath(`/admin/dashboard/${role}`),
  competencyFrameworkEdit: (frameworkId) => adminPath(`/admin/competency-frameworks/${frameworkId}/edit`),
  pendingRequestDetail: (requestId) => adminPath(`/admin/pending-requests/${requestId}`),
  userDetail: (userId) => adminPath(`/admin/users/${userId}`),
  userRegulatoryPassport: (userId) => adminPath(`/admin/users/${userId}/regulatory-passport`),
  trainingCatalogDetail: (trainingId) => adminPath(`/admin/searn-training-catalog/${trainingId}`),
  trainingCatalogFeedback: (trainingId) => adminPath(`/admin/searn-training-catalog/${trainingId}/feedback`),
  myTrainingCatalogDetail: (trainingId) => adminPath(`/admin/my-training-catalog/${trainingId}`),
  myTrainingCatalogFeedback: (trainingId) => adminPath(`/admin/my-training-catalog/${trainingId}/feedback`),
  trainingCatalogProvider: (providerSlug) => adminPath(`/admin/searn-training-catalog/providers/${providerSlug}`),
  trainingCatalogProviderCatalog: (providerSlug) => adminPath(`/admin/searn-training-catalog/providers/${providerSlug}/catalog`),
  trainingCatalogWithProviderFilter: (providerId) => adminPath(`/admin/searn-training-catalog?training-provider=${providerId}`),
  certificateDetail: (certificateId) => adminPath(`/admin/certificates/${certificateId}`),
};
