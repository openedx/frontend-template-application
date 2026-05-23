import { defineMessages } from '@edx/frontend-platform/i18n';

const appMessages = defineMessages({
  dashboardTitle: {
    id: 'app.layout.route.dashboard.title',
    defaultMessage: 'Dashboard',
    description: 'Top header title for dashboard route',
  },
  usersTitle: {
    id: 'app.layout.route.users.title',
    defaultMessage: 'Users',
    description: 'Top header title for users route',
  },
  competencyFrameworkTitle: {
    id: 'app.layout.route.competencyFramework.title',
    defaultMessage: 'Competency Framework',
    description: 'Top header title for competency framework route',
  },
  rolesTitle: {
    id: 'app.layout.route.roles.title',
    defaultMessage: 'Roles',
    description: 'Top header title for roles route',
  },
  reportsTitle: {
    id: 'app.layout.route.reports.title',
    defaultMessage: 'Reports',
    description: 'Top header title for reports routes',
  },
  settingsTitle: {
    id: 'app.layout.route.settings.title',
    defaultMessage: 'Settings',
    description: 'Top header title for settings route',
  },
  countriesTitle: {
    id: 'app.layout.route.countries.title',
    defaultMessage: 'Countries',
    description: 'Top header title for countries route',
  },
  pendingRequestsTitle: {
    id: 'app.layout.route.pendingRequests.title',
    defaultMessage: 'Pending Requests',
    description: 'Top header title for pending requests route',
  },
  requestedTrainingsTitle: {
    id: 'app.layout.route.requestedTrainings.title',
    defaultMessage: 'Requested Trainings',
    description: 'Top header title for requested trainings route',
  },
  profileTitle: {
    id: 'app.layout.route.profile.title',
    defaultMessage: 'Profile',
    description: 'Top header title for profile route',
  },
  activitiesTitle: {
    id: 'app.layout.route.activities.title',
    defaultMessage: 'Activities',
    description: 'Top header title for activities management route',
  },
  trainingCatalogTitle: {
    id: 'app.layout.route.trainingCatalog.title',
    defaultMessage: 'SEARN Training Catalog',
    description: 'Top header title for SEARN training catalog routes',
  },
  nrasTitle: {
    id: 'app.layout.route.nras.title',
    defaultMessage: 'NRAs Management',
    description: 'Top header title for NRAs management route',
  },
  trainingProvidersTitle: {
    id: 'app.layout.route.trainingProviders.title',
    defaultMessage: 'Training Providers',
    description: 'Top header title for training providers route',
  },
  rolePermissionsLoadError: {
    id: 'app.rolePermissions.loadError',
    defaultMessage: 'Unable to load permissions. Please refresh and try again.',
    description: 'Fallback error when core permissions API fails',
  },
});

export default appMessages;
