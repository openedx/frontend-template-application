const navigationItems = [
  {
    key: 'dashboard', labelKey: 'navDashboard', iconKey: 'dashboard', path: '/searn-administrator/dashboard',
  },
  {
    key: 'competencyFramework', labelKey: 'navCompetencyFramework', iconKey: 'competencyFramework', path: '/searn-administrator/competency-frameworks',
  },
  {
    key: 'domains', labelKey: 'navDomains', iconKey: 'domains', path: '/searn-administrator/domains',
  },
  {
    key: 'subDomains', labelKey: 'navSubDomains', iconKey: 'subDomains', path: '/searn-administrator/sub-domains',
  },
  {
    key: 'competencies', labelKey: 'navCompetencies', iconKey: 'competencies', path: '/searn-administrator/competencies-management',
  },
  {
    key: 'activities', labelKey: 'navActivities', iconKey: 'activities', path: '/searn-administrator/activities-management',
  },
  {
    key: 'trainingCatalog', labelKey: 'navTrainingCatalog', iconKey: 'trainingCatalog', path: '/searn-administrator/training-catalog',
  },
  {
    key: 'nras', labelKey: 'navNras', iconKey: 'nras', path: '/searn-administrator/nras',
  },
  {
    key: 'trainingProviders', labelKey: 'navTrainingProviders', iconKey: 'trainingProviders', path: '/searn-administrator/training-providers',
  },
  {
    key: 'cbModules', labelKey: 'navCbModules', iconKey: 'cbModules', path: '/searn-administrator/cb-modules',
  },
  {
    key: 'users', labelKey: 'navUsers', iconKey: 'users', path: '/searn-administrator/users',
  },
  {
    key: 'roles', labelKey: 'navRoles', iconKey: 'roles', path: '/searn-administrator/roles',
  },
  {
    key: 'settings', labelKey: 'navSettings', iconKey: 'settings', path: '/searn-administrator/settings',
  },
  {
    key: 'reports',
    labelKey: 'navReports',
    iconKey: 'reports',
    children: [
      { key: 'staffTrained', labelKey: 'navReportsStaffTrained', path: '/searn-administrator/reports/staff-trained' },
      { key: 'trainingOffers', labelKey: 'navReportsTrainingOffers', path: '/searn-administrator/reports/training-offers' },
      { key: 'competencyCoverage', labelKey: 'navReportsCompetencyCoverage', path: '/searn-administrator/reports/competency-coverage' },
      { key: 'staffPerTraining', labelKey: 'navReportsStaffPerTraining', path: '/searn-administrator/reports/staff-per-training' },
      { key: 'traineeSatisfaction', labelKey: 'navReportsTraineeSatisfaction', path: '/searn-administrator/reports/trainee-satisfaction' },
      { key: 'priorityFeedback', labelKey: 'navReportsPriorityFeedback', path: '/searn-administrator/reports/priority-feedback' },
    ],
  },
];

const navigationAccessMap = {
  dashboard: 'accessDashboard',
  competencyFramework: 'accessCompetencyFramework',
  domains: 'accessDomains',
  subDomains: 'accessSubDomains',
  competencies: 'accessCompetencies',
  activities: 'accessActivities',
  trainingCatalog: 'accessTrainingCatalog',
  nras: 'accessNras',
  trainingProviders: 'accessTrainingProviders',
  cbModules: 'accessCbModules',
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
