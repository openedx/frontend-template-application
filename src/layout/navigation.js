import { ADMIN_PATHS } from '../utils/adminPaths';

const navigationItems = [
  {
    key: 'dashboard', labelKey: 'navDashboard', iconKey: 'dashboard', path: ADMIN_PATHS.dashboard,
  },
  {
    key: 'competencyFramework', labelKey: 'navCompetencyFramework', iconKey: 'competencyFramework', path: ADMIN_PATHS.competencyFrameworks,
  },
  {
    key: 'activities', labelKey: 'navActivities', iconKey: 'activities', path: ADMIN_PATHS.activities,
  },
  {
    key: 'trainingCatalog', labelKey: 'navTrainingCatalog', iconKey: 'trainingCatalog', path: ADMIN_PATHS.trainingCatalog,
  },
  {
    key: 'nras', labelKey: 'navNras', iconKey: 'nras', path: ADMIN_PATHS.nras,
  },
  {
    key: 'countries', labelKey: 'navCountries', iconKey: 'countries', path: ADMIN_PATHS.countries,
  },
  {
    key: 'trainingProviders', labelKey: 'navTrainingProviders', iconKey: 'trainingProviders', path: ADMIN_PATHS.trainingProviders,
  },
  {
    key: 'pendingRequests', labelKey: 'navPendingRequests', iconKey: 'pendingRequests', path: ADMIN_PATHS.pendingRequests,
  },
  {
    key: 'requestedTrainings', labelKey: 'navRequestedTrainings', iconKey: 'requestedTrainings', path: ADMIN_PATHS.requestedTrainings,
  },
  {
    key: 'profile', labelKey: 'navProfile', iconKey: 'profile', path: ADMIN_PATHS.profile,
  },
  {
    key: 'users', labelKey: 'navUsers', iconKey: 'users', path: ADMIN_PATHS.users,
  },
  {
    key: 'roles', labelKey: 'navRoles', iconKey: 'roles', path: ADMIN_PATHS.roles,
  },
  {
    key: 'settings', labelKey: 'navSettings', iconKey: 'settings', path: ADMIN_PATHS.settings,
  },
  {
    key: 'reports',
    labelKey: 'navReports',
    iconKey: 'reports',
    children: [
      { key: 'staffTrained', labelKey: 'navReportsStaffTrained', path: ADMIN_PATHS.reportsStaffTrained },
      { key: 'trainingOffers', labelKey: 'navReportsTrainingOffers', path: ADMIN_PATHS.reportsTrainingOffers },
      { key: 'competencyCoverage', labelKey: 'navReportsCompetencyCoverage', path: ADMIN_PATHS.reportsCompetencyCoverage },
      { key: 'staffPerTraining', labelKey: 'navReportsStaffPerTraining', path: ADMIN_PATHS.reportsStaffPerTraining },
      { key: 'traineeSatisfaction', labelKey: 'navReportsTraineeSatisfaction', path: ADMIN_PATHS.reportsTraineeSatisfaction },
      { key: 'priorityFeedback', labelKey: 'navReportsPriorityFeedback', path: ADMIN_PATHS.reportsPriorityFeedback },
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
