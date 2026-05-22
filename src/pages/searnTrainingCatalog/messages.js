import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  searchPlaceholder: {
    id: 'app.searnTrainingCatalog.search.placeholder',
    defaultMessage: 'Search by keywords...',
    description: 'Search placeholder for SEARN training catalog page',
  },
  allFrameworks: {
    id: 'app.searnTrainingCatalog.filter.allFrameworks',
    defaultMessage: 'All Competency Frameworks',
    description: 'All competency frameworks option label',
  },
  allRoles: {
    id: 'app.searnTrainingCatalog.filter.allRoles',
    defaultMessage: 'All Roles',
    description: 'All roles option label',
  },
  allDomains: {
    id: 'app.searnTrainingCatalog.filter.allDomains',
    defaultMessage: 'All Domains',
    description: 'All domains option label',
  },
  allSubDomains: {
    id: 'app.searnTrainingCatalog.filter.allSubDomains',
    defaultMessage: 'All Sub-Domains',
    description: 'All sub-domains option label',
  },
  allActivities: {
    id: 'app.searnTrainingCatalog.filter.allActivities',
    defaultMessage: 'All Activities',
    description: 'All activities option label',
  },
  allNraGoals: {
    id: 'app.searnTrainingCatalog.filter.allNraGoals',
    defaultMessage: 'All NRA Goals',
    description: 'All NRA goals option label',
  },
  allProviders: {
    id: 'app.searnTrainingCatalog.filter.allProviders',
    defaultMessage: 'All Providers',
    description: 'All providers option label',
  },
  columnTraining: {
    id: 'app.searnTrainingCatalog.table.column.training',
    defaultMessage: 'Training',
    description: 'Training column header',
  },
  columnMode: {
    id: 'app.searnTrainingCatalog.table.column.mode',
    defaultMessage: 'Mode',
    description: 'Mode column header',
  },
  columnProvider: {
    id: 'app.searnTrainingCatalog.table.column.provider',
    defaultMessage: 'Provider',
    description: 'Provider column header',
  },
  columnSatisfaction: {
    id: 'app.searnTrainingCatalog.table.column.satisfaction',
    defaultMessage: 'User Satisfaction',
    description: 'Satisfaction column header',
  },
  columnCost: {
    id: 'app.searnTrainingCatalog.table.column.cost',
    defaultMessage: 'Cost',
    description: 'Cost column header',
  },
  noTrainingsFound: {
    id: 'app.searnTrainingCatalog.empty.noTrainingsFound',
    defaultMessage: 'No trainings found.',
    description: 'Empty state when no training rows match filters',
  },
  showingRange: {
    id: 'app.searnTrainingCatalog.pagination.showingRange',
    defaultMessage: 'Showing {start}–{end} of {total}',
    description: 'Pagination range summary for SEARN training catalog table (legacy range format)',
  },
  showingCount: {
    id: 'app.searnTrainingCatalog.pagination.showing',
    defaultMessage: 'Showing {count} of {total} trainings',
    description: 'Pagination summary for SEARN training catalog table',
  },
  backToCatalog: {
    id: 'app.searnTrainingCatalog.backToCatalog',
    defaultMessage: 'Back to SEARN Training Catalog',
    description: 'Back button label to return to SEARN training catalog list',
  },
  userFeedback: {
    id: 'app.searnTrainingCatalog.badge.userFeedback',
    defaultMessage: 'User Feedback',
    description: 'Badge label for user feedback',
  },
});

export default messages;

