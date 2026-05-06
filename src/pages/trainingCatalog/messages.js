import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  searchPlaceholder: {
    id: 'app.trainingCatalog.search.placeholder',
    defaultMessage: 'Search by keywords...',
    description: 'Search placeholder for training catalog page',
  },
  allFrameworks: {
    id: 'app.trainingCatalog.filter.allFrameworks',
    defaultMessage: 'All Competency Frameworks',
    description: 'All competency frameworks option label',
  },
  allRoles: {
    id: 'app.trainingCatalog.filter.allRoles',
    defaultMessage: 'All Roles',
    description: 'All roles option label',
  },
  allDomains: {
    id: 'app.trainingCatalog.filter.allDomains',
    defaultMessage: 'All Domains',
    description: 'All domains option label',
  },
  allSubDomains: {
    id: 'app.trainingCatalog.filter.allSubDomains',
    defaultMessage: 'All Sub-Domains',
    description: 'All sub-domains option label',
  },
  allActivities: {
    id: 'app.trainingCatalog.filter.allActivities',
    defaultMessage: 'All Activities',
    description: 'All activities option label',
  },
  allNraGoals: {
    id: 'app.trainingCatalog.filter.allNraGoals',
    defaultMessage: 'All NRA Goals',
    description: 'All NRA goals option label',
  },
  allProviders: {
    id: 'app.trainingCatalog.filter.allProviders',
    defaultMessage: 'All Providers',
    description: 'All providers option label',
  },
  columnTraining: {
    id: 'app.trainingCatalog.table.column.training',
    defaultMessage: 'Training',
    description: 'Training column header',
  },
  columnMode: {
    id: 'app.trainingCatalog.table.column.mode',
    defaultMessage: 'Mode',
    description: 'Mode column header',
  },
  columnProvider: {
    id: 'app.trainingCatalog.table.column.provider',
    defaultMessage: 'Provider',
    description: 'Provider column header',
  },
  columnSatisfaction: {
    id: 'app.trainingCatalog.table.column.satisfaction',
    defaultMessage: 'User Satisfaction',
    description: 'Satisfaction column header',
  },
  columnCost: {
    id: 'app.trainingCatalog.table.column.cost',
    defaultMessage: 'Cost',
    description: 'Cost column header',
  },
  noTrainingsFound: {
    id: 'app.trainingCatalog.empty.noTrainingsFound',
    defaultMessage: 'No trainings found.',
    description: 'Empty state when no training rows match filters',
  },
  showingRange: {
    id: 'app.trainingCatalog.pagination.showingRange',
    defaultMessage: 'Showing {start}–{end} of {total}',
    description: 'Pagination range summary for training catalog table',
  },
  backToCatalog: {
    id: 'app.trainingCatalog.backToCatalog',
    defaultMessage: 'Back to Training Catalog',
    description: 'Back button label to return to training catalog list',
  },
  userFeedback: {
    id: 'app.trainingCatalog.badge.userFeedback',
    defaultMessage: 'User Feedback',
    description: 'Badge label for user feedback',
  },
});

export default messages;

