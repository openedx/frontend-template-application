import { defineMessages } from '@edx/frontend-platform/i18n';

const regulatoryPassportMessages = defineMessages({
  brandAlt: {
    id: 'app.users.regulatoryPassport.brandAlt',
    defaultMessage: 'SEARN',
    description: 'Accessible label for SEARN brand mark on regulatory passport',
  },
  backToUser: {
    id: 'app.users.regulatoryPassport.backToUser',
    defaultMessage: 'Back to User',
    description: 'Back button label on regulatory passport page',
  },
  passportIdLabel: {
    id: 'app.users.regulatoryPassport.passportIdLabel',
    defaultMessage: 'Passport ID',
    description: 'Passport ID label',
  },
  aboutTitle: {
    id: 'app.users.regulatoryPassport.aboutTitle',
    defaultMessage: 'About',
    description: 'About section title',
  },
  competencyRoleLabel: {
    id: 'app.users.regulatoryPassport.competencyRoleLabel',
    defaultMessage: 'Competency Role',
    description: 'Competency role label',
  },
  statTrainingsCompleted: {
    id: 'app.users.regulatoryPassport.stat.trainingsCompleted',
    defaultMessage: 'Trainings completed',
    description: 'Stat label',
  },
  statAssignedTrainings: {
    id: 'app.users.regulatoryPassport.stat.assignedTrainings',
    defaultMessage: 'Assigned Trainings',
    description: 'Stat label',
  },
  statCompletionRate: {
    id: 'app.users.regulatoryPassport.stat.completionRate',
    defaultMessage: 'Completion Rate',
    description: 'Stat label',
  },
  statActivitiesCovered: {
    id: 'app.users.regulatoryPassport.stat.activitiesCovered',
    defaultMessage: 'Activities Covered',
    description: 'Stat label',
  },
  domainCoverageTitle: {
    id: 'app.users.regulatoryPassport.domainCoverageTitle',
    defaultMessage: 'Activities Coverage By Domain',
    description: 'Domain coverage section title',
  },
  completedTrainingTitle: {
    id: 'app.users.regulatoryPassport.completedTrainingTitle',
    defaultMessage: 'Completed Training',
    description: 'Completed training section title',
  },
  tableTraining: { id: 'app.users.regulatoryPassport.table.training', defaultMessage: 'Training', description: 'Table header' },
  tableProvider: { id: 'app.users.regulatoryPassport.table.provider', defaultMessage: 'Provider', description: 'Table header' },
  tableCompleted: { id: 'app.users.regulatoryPassport.table.completed', defaultMessage: 'Completed', description: 'Table header' },
  tableActivities: { id: 'app.users.regulatoryPassport.table.activities', defaultMessage: 'Activities', description: 'Table header' },
  tableRemoteType: { id: 'app.users.regulatoryPassport.table.remoteType', defaultMessage: 'Remote Type', description: 'Table header' },
  tableCertificate: { id: 'app.users.regulatoryPassport.table.certificate', defaultMessage: 'Cert.', description: 'Table header' },
  certificateView: { id: 'app.users.regulatoryPassport.certificate.view', defaultMessage: 'View', description: 'Certificate link label' },
  paginationLabel: {
    id: 'app.users.regulatoryPassport.pagination.label',
    defaultMessage: 'Regulatory passport pagination',
    description: 'Accessible label for regulatory passport table pagination',
  },
  showingCount: {
    id: 'app.users.regulatoryPassport.pagination.showingCount',
    defaultMessage: 'Showing {count} of {total} completed trainings',
    description: 'Pagination summary for completed trainings table',
  },
  exportTitle: {
    id: 'app.users.regulatoryPassport.export.title',
    defaultMessage: 'Export Regulatory Passport — {name}',
    description: 'Export section title on regulatory passport page',
  },
  exportDownloadButton: {
    id: 'app.users.regulatoryPassport.export.downloadButton',
    defaultMessage: 'Download Regulatory Passport',
    description: 'Download button label on regulatory passport page',
  },
  exportDownloadUpcomingTitle: {
    id: 'app.users.regulatoryPassport.export.upcomingTitle',
    defaultMessage: 'Coming soon',
    description: 'Toast title when regulatory passport download is not yet available',
  },
  exportDownloadUpcomingDescription: {
    id: 'app.users.regulatoryPassport.export.upcomingDescription',
    defaultMessage: 'Regulatory passport download will be available soon.',
    description: 'Toast description when regulatory passport download is not yet available',
  },
  domainCoverageLoadError: {
    id: 'app.users.regulatoryPassport.domainCoverage.loadError',
    defaultMessage: 'Unable to load domain coverage. Please try again.',
    description: 'Fallback when domain coverage API fails',
  },
  completedTrainingsLoadError: {
    id: 'app.users.regulatoryPassport.completedTrainings.loadError',
    defaultMessage: 'Unable to load completed trainings. Please try again.',
    description: 'Fallback when regulatory passport completed trainings API fails',
  },
  domainOptionsLoadError: {
    id: 'app.users.regulatoryPassport.domainOptions.loadError',
    defaultMessage: 'Unable to load domain options. Please try again.',
    description: 'Fallback when domain filter options API fails',
  },
  subdomainOptionsLoadError: {
    id: 'app.users.regulatoryPassport.subdomainOptions.loadError',
    defaultMessage: 'Unable to load subdomain options. Please try again.',
    description: 'Fallback when subdomain filter options API fails',
  },
  productTypeOptionsLoadError: {
    id: 'app.users.regulatoryPassport.productTypeOptions.loadError',
    defaultMessage: 'Unable to load product type options. Please try again.',
    description: 'Fallback when product type filter options API fails',
  },
  levelOptionsLoadError: {
    id: 'app.users.regulatoryPassport.levelOptions.loadError',
    defaultMessage: 'Unable to load level options. Please try again.',
    description: 'Fallback when level filter options API fails',
  },
  filterAllDomains: {
    id: 'app.users.regulatoryPassport.filter.allDomains',
    defaultMessage: 'All domains',
    description: 'Default domain filter label',
  },
  filterAllSubDomains: {
    id: 'app.users.regulatoryPassport.filter.allSubDomains',
    defaultMessage: 'All subdomains',
    description: 'Default subdomain filter label',
  },
  filterAllProductTypes: {
    id: 'app.users.regulatoryPassport.filter.allProductTypes',
    defaultMessage: 'All product types',
    description: 'Default product type filter label',
  },
  filterAllLevels: {
    id: 'app.users.regulatoryPassport.filter.allLevels',
    defaultMessage: 'All levels',
    description: 'Default level filter label',
  },
  dropdownSearchPlaceholder: {
    id: 'app.users.regulatoryPassport.filter.searchPlaceholder',
    defaultMessage: 'Type to filter options...',
    description: 'Search placeholder inside regulatory passport filter dropdowns',
  },
  dropdownNoOptions: {
    id: 'app.users.regulatoryPassport.filter.noOptions',
    defaultMessage: 'No options found.',
    description: 'Empty state for regulatory passport filter dropdowns',
  },
  loadingPassport: {
    id: 'app.users.regulatoryPassport.loading',
    defaultMessage: 'Loading regulatory passport',
    description: 'Aria label for regulatory passport skeleton',
  },
  domainCoverageEmpty: {
    id: 'app.users.regulatoryPassport.domainCoverage.empty',
    defaultMessage: 'No domain coverage data available.',
    description: 'Empty state when domain coverage list has no results',
  },
});

export default regulatoryPassportMessages;

