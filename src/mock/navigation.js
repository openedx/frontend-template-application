const navigationItems = [
  {
    key: 'dashboard', labelKey: 'navDashboard', iconKey: 'dashboard', path: '/admin/dashboard',
  },
  {
    key: 'competencyFramework', labelKey: 'navCompetencyFramework', iconKey: 'competencyFramework', path: '/admin/competency-frameworks',
  },
  {
    key: 'activities', labelKey: 'navActivities', iconKey: 'activities', path: '/admin/activities-management',
  },
  {
    key: 'trainingCatalog', labelKey: 'navTrainingCatalog', iconKey: 'trainingCatalog', path: '/admin/searn-training-catalog',
  },
  {
    key: 'nras', labelKey: 'navNras', iconKey: 'nras', path: '/admin/nras',
  },
  {
    key: 'countries', labelKey: 'navCountries', iconKey: 'countries', path: '/admin/countries',
  },
  {
    key: 'trainingProviders', labelKey: 'navTrainingProviders', iconKey: 'trainingProviders', path: '/admin/training-providers',
  },
  {
    key: 'pendingRequests', labelKey: 'navPendingRequests', iconKey: 'pendingRequests', path: '/admin/pending-requests',
  },
  {
    key: 'requestedTrainings', labelKey: 'navRequestedTrainings', iconKey: 'requestedTrainings', path: '/admin/requested-trainings',
  },
  {
    key: 'profile', labelKey: 'navProfile', iconKey: 'profile', path: '/admin/profile',
  },
  {
    key: 'users', labelKey: 'navUsers', iconKey: 'users', path: '/admin/users',
  },
  {
    key: 'roles', labelKey: 'navRoles', iconKey: 'roles', path: '/admin/roles',
  },
  {
    key: 'settings', labelKey: 'navSettings', iconKey: 'settings', path: '/admin/settings',
  },
  {
    key: 'reports',
    labelKey: 'navReports',
    iconKey: 'reports',
    children: [
      { key: 'staffTrained', labelKey: 'navReportsStaffTrained', path: '/admin/reports/staff-trained' },
      { key: 'trainingOffers', labelKey: 'navReportsTrainingOffers', path: '/admin/reports/training-offers' },
      { key: 'competencyCoverage', labelKey: 'navReportsCompetencyCoverage', path: '/admin/reports/competency-coverage' },
      { key: 'staffPerTraining', labelKey: 'navReportsStaffPerTraining', path: '/admin/reports/staff-per-training' },
      { key: 'traineeSatisfaction', labelKey: 'navReportsTraineeSatisfaction', path: '/admin/reports/trainee-satisfaction' },
      { key: 'priorityFeedback', labelKey: 'navReportsPriorityFeedback', path: '/admin/reports/priority-feedback' },
    ],
  },
];

const navigationAccessMap = {
  competencyFramework: 'accessCompetencyFramework',
  activities: 'accessActivities',
  nras: 'accessNrasManagement',
  countries: 'accessCountries',
  trainingProviders: 'accessTrainingProviders',
  pendingRequests: 'accessPendingRequests',
  users: 'accessUsers',
  roles: 'accessRoles',
  settings: 'accessSettings',
  reports: 'accessReports',
};

const getNavigationItemsByAccess = (navbarAccess = {}) => navigationItems.filter((item) => {
  const accessKey = navigationAccessMap[item.key];
  if (!accessKey) {
    return true;
  }

  return Boolean(navbarAccess[accessKey]);
});

const getNavigationItemsByRole = (role, navbarAccess = {}) => {
  if (Object.keys(navbarAccess).length > 0) {
    return getNavigationItemsByAccess(navbarAccess);
  }

  return navigationItems;
};

export {
  getNavigationItemsByAccess,
  getNavigationItemsByRole,
};

export default navigationItems;
