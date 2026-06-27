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
  columnAction: {
    id: 'app.searnTrainingCatalog.table.column.action',
    defaultMessage: 'Action',
    description: 'Action column header on SEARN training catalog table',
  },
  requestTraining: {
    id: 'app.searnTrainingCatalog.actions.requestTraining',
    defaultMessage: 'Request Training',
    description: 'Button to open request training modal on catalog page',
  },
  requestAccess: {
    id: 'app.searnTrainingCatalog.actions.requestAccess',
    defaultMessage: 'Request Access',
    description: 'Button to request access to a training in catalog table',
  },
  requested: {
    id: 'app.searnTrainingCatalog.badge.requested',
    defaultMessage: 'Requested',
    description: 'Badge when user has already requested access to a training',
  },
  requestTrainingModalTitle: {
    id: 'app.searnTrainingCatalog.requestTraining.modal.title',
    defaultMessage: 'Request Training',
    description: 'Title for request training modal on catalog page',
  },
  requestTrainingModalDescription: {
    id: 'app.searnTrainingCatalog.requestTraining.modal.description',
    defaultMessage: 'Submit a training request by selecting the relevant activity and providing details.',
    description: 'Description for request training modal on catalog page',
  },
  requestTrainingActivityLabel: {
    id: 'app.searnTrainingCatalog.requestTraining.modal.activity.label',
    defaultMessage: 'Select Activity',
    description: 'Activity field label in request training modal',
  },
  requestTrainingActivityPlaceholder: {
    id: 'app.searnTrainingCatalog.requestTraining.modal.activity.placeholder',
    defaultMessage: 'Choose an activity',
    description: 'Activity field placeholder in request training modal',
  },
  requestTrainingDescriptionLabel: {
    id: 'app.searnTrainingCatalog.requestTraining.modal.description.label',
    defaultMessage: 'Description',
    description: 'Description field label in request training modal',
  },
  requestTrainingDescriptionPlaceholder: {
    id: 'app.searnTrainingCatalog.requestTraining.modal.description.placeholder',
    defaultMessage: 'Describe the training need, expected outcomes, target audience...',
    description: 'Description field placeholder in request training modal',
  },
  requestTrainingCancel: {
    id: 'app.searnTrainingCatalog.requestTraining.modal.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button in request training modal',
  },
  requestTrainingSubmit: {
    id: 'app.searnTrainingCatalog.requestTraining.modal.submit',
    defaultMessage: 'Submit Request',
    description: 'Submit button in request training modal',
  },
  requestTrainingSubmittedTitle: {
    id: 'app.searnTrainingCatalog.requestTraining.toast.submitted.title',
    defaultMessage: 'Training request submitted',
    description: 'Toast title after submitting request training form',
  },
  requestTrainingSubmittedDescription: {
    id: 'app.searnTrainingCatalog.requestTraining.toast.submitted.description',
    defaultMessage: 'Your training request has been submitted for review.',
    description: 'Toast description after submitting request training form',
  },
  requestTrainingCreateError: {
    id: 'app.searnTrainingCatalog.requestTraining.create.error',
    defaultMessage: 'Unable to submit training request. Please try again.',
    description: 'Fallback when create requested training POST fails from catalog modal',
  },
  requestTrainingCreateErrorTitle: {
    id: 'app.searnTrainingCatalog.requestTraining.create.errorTitle',
    defaultMessage: 'Request not submitted',
    description: 'Toast title when create requested training POST fails from catalog modal',
  },
  requestAccessSubmittedTitle: {
    id: 'app.searnTrainingCatalog.requestAccess.toast.submitted.title',
    defaultMessage: 'Access requested',
    description: 'Toast title after requesting access to a training',
  },
  requestAccessSubmittedDescription: {
    id: 'app.searnTrainingCatalog.requestAccess.toast.submitted.description',
    defaultMessage: 'Your request will be sent to your Manager for approval.',
    description: 'Toast description after requesting access to a training',
  },
  requestAccessConfirmTitle: {
    id: 'app.searnTrainingCatalog.requestAccess.confirm.title',
    defaultMessage: 'Request Access',
    description: 'Title for request access confirmation dialog',
  },
  requestAccessConfirmDescription: {
    id: 'app.searnTrainingCatalog.requestAccess.confirm.description',
    defaultMessage: 'Do you want to request access to "{name}"? Your request will be sent to your Manager for approval.',
    description: 'Description for request access confirmation dialog',
  },
  requestAccessConfirmCancel: {
    id: 'app.searnTrainingCatalog.requestAccess.confirm.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button in request access confirmation dialog',
  },
  requestAccessConfirmSubmit: {
    id: 'app.searnTrainingCatalog.requestAccess.confirm.submit',
    defaultMessage: 'Request Access',
    description: 'Confirm button in request access confirmation dialog',
  },
  requestAccessCreateError: {
    id: 'app.searnTrainingCatalog.requestAccess.create.error',
    defaultMessage: 'Unable to submit access request. Please try again.',
    description: 'Fallback when request access POST fails',
  },
  requestAccessCreateErrorTitle: {
    id: 'app.searnTrainingCatalog.requestAccess.create.errorTitle',
    defaultMessage: 'Access request not submitted',
    description: 'Toast title when request access POST fails',
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
  paginationLabel: {
    id: 'app.searnTrainingCatalog.pagination.label',
    defaultMessage: 'SEARN training catalog pagination',
    description: 'Accessible label for SEARN training catalog table pagination',
  },
  userFeedback: {
    id: 'app.searnTrainingCatalog.badge.userFeedback',
    defaultMessage: 'User Feedback',
    description: 'Badge label for user feedback',
  },
  listLoadError: {
    id: 'app.searnTrainingCatalog.list.loadError',
    defaultMessage: 'Unable to load trainings. Please try again.',
    description: 'Fallback when SEARN training catalog list GET fails',
  },
  listLoadErrorTitle: {
    id: 'app.searnTrainingCatalog.list.loadErrorTitle',
    defaultMessage: 'Trainings unavailable',
    description: 'Toast title when SEARN training catalog list GET fails',
  },
  detailLoadError: {
    id: 'app.searnTrainingCatalog.detail.loadError',
    defaultMessage: 'Unable to load training details. Please try again.',
    description: 'Fallback when SEARN training catalog detail GET fails',
  },
  detailLoadErrorTitle: {
    id: 'app.searnTrainingCatalog.detail.loadErrorTitle',
    defaultMessage: 'Training unavailable',
    description: 'Toast title when SEARN training catalog detail GET fails',
  },
  feedbackLoadError: {
    id: 'app.searnTrainingCatalog.feedback.loadError',
    defaultMessage: 'Unable to load feedback. Please try again.',
    description: 'Fallback when SEARN training catalog feedback GET fails',
  },
  feedbackLoadErrorTitle: {
    id: 'app.searnTrainingCatalog.feedback.loadErrorTitle',
    defaultMessage: 'Feedback unavailable',
    description: 'Toast title when SEARN training catalog feedback GET fails',
  },
  providerLoadError: {
    id: 'app.searnTrainingCatalog.provider.loadError',
    defaultMessage: 'Unable to load provider details. Please try again.',
    description: 'Fallback when SEARN training catalog provider GET fails',
  },
  providerLoadErrorTitle: {
    id: 'app.searnTrainingCatalog.provider.loadErrorTitle',
    defaultMessage: 'Provider unavailable',
    description: 'Toast title when SEARN training catalog provider GET fails',
  },
  providerNotFound: {
    id: 'app.searnTrainingCatalog.provider.notFound',
    defaultMessage: 'No provider found.',
    description: 'Empty state when provider detail is missing',
  },
  detailNotFound: {
    id: 'app.searnTrainingCatalog.detail.notFound',
    defaultMessage: 'No training found.',
    description: 'Empty state when training detail is missing',
  },
  feedbackNotFound: {
    id: 'app.searnTrainingCatalog.feedback.notFound',
    defaultMessage: 'No feedback found.',
    description: 'Empty state when training feedback is missing',
  },
  frameworkOptionsLoadError: {
    id: 'app.searnTrainingCatalog.options.framework.loadError',
    defaultMessage: 'Unable to load competency frameworks.',
    description: 'Fallback when competency framework options GET fails',
  },
  roleOptionsLoadError: {
    id: 'app.searnTrainingCatalog.options.role.loadError',
    defaultMessage: 'Unable to load roles.',
    description: 'Fallback when role options GET fails',
  },
  domainOptionsLoadError: {
    id: 'app.searnTrainingCatalog.options.domain.loadError',
    defaultMessage: 'Unable to load domains.',
    description: 'Fallback when domain options GET fails',
  },
  subDomainOptionsLoadError: {
    id: 'app.searnTrainingCatalog.options.subDomain.loadError',
    defaultMessage: 'Unable to load sub-domains.',
    description: 'Fallback when sub-domain options GET fails',
  },
  activityOptionsLoadError: {
    id: 'app.searnTrainingCatalog.options.activity.loadError',
    defaultMessage: 'Unable to load activities.',
    description: 'Fallback when mapped activity options GET fails',
  },
  nraObjectiveOptionsLoadError: {
    id: 'app.searnTrainingCatalog.options.nraObjective.loadError',
    defaultMessage: 'Unable to load NRA objectives.',
    description: 'Fallback when NRA objective options GET fails',
  },
  providerOptionsLoadError: {
    id: 'app.searnTrainingCatalog.options.provider.loadError',
    defaultMessage: 'Unable to load training providers.',
    description: 'Fallback when training provider options GET fails',
  },
  filterOptionsErrorTitle: {
    id: 'app.searnTrainingCatalog.options.errorTitle',
    defaultMessage: 'Filter options unavailable',
    description: 'Toast title when catalog filter options fail to load',
  },
  dropdownSearchPlaceholder: {
    id: 'app.searnTrainingCatalog.dropdown.searchPlaceholder',
    defaultMessage: 'Search…',
    description: 'Search placeholder for catalog filter dropdowns',
  },
  dropdownNoOptions: {
    id: 'app.searnTrainingCatalog.dropdown.noOptions',
    defaultMessage: 'No matches',
    description: 'Empty text for catalog filter dropdowns',
  },
  backToProvider: {
    id: 'app.searnTrainingCatalog.backToProvider',
    defaultMessage: 'Back to Provider',
    description: 'Back button from provider-scoped catalog to provider profile',
  },
  viewCatalog: {
    id: 'app.searnTrainingCatalog.provider.viewCatalog',
    defaultMessage: 'View Catalog',
    description: 'Button on provider page to open catalog filtered by provider',
  },
  providerSubtitle: {
    id: 'app.searnTrainingCatalog.provider.subtitle',
    defaultMessage: 'Training Provider',
    description: 'Subtitle on provider profile hero',
  },
  providerOverview: {
    id: 'app.searnTrainingCatalog.provider.overview',
    defaultMessage: 'Overview',
    description: 'Overview section heading on provider page',
  },
  providerWebsite: {
    id: 'app.searnTrainingCatalog.provider.website',
    defaultMessage: 'Website',
    description: 'Website section heading on provider page',
  },
  basedOnReviews: {
    id: 'app.searnTrainingCatalog.feedback.basedOnReviews',
    defaultMessage: 'Based on {count} anonymous reviews',
    description: 'Review count summary on feedback page',
  },
  overallRating: {
    id: 'app.searnTrainingCatalog.feedback.overallRating',
    defaultMessage: 'Overall Rating',
    description: 'Overall rating card title on feedback page',
  },
  ratingDistribution: {
    id: 'app.searnTrainingCatalog.feedback.ratingDistribution',
    defaultMessage: 'Rating Distribution',
    description: 'Rating distribution card title on feedback page',
  },
  userFeedbackSection: {
    id: 'app.searnTrainingCatalog.feedback.userFeedbackSection',
    defaultMessage: 'User Feedback',
    description: 'User feedback list section title',
  },
  detailStatProvider: {
    id: 'app.searnTrainingCatalog.detail.stat.provider',
    defaultMessage: 'Provider',
    description: 'Provider stat label on training detail page',
  },
  detailStatLanguage: {
    id: 'app.searnTrainingCatalog.detail.stat.language',
    defaultMessage: 'Language',
    description: 'Language stat label on training detail page',
  },
  detailStatDuration: {
    id: 'app.searnTrainingCatalog.detail.stat.duration',
    defaultMessage: 'Duration',
    description: 'Duration stat label on training detail page',
  },
  detailStatCost: {
    id: 'app.searnTrainingCatalog.detail.stat.cost',
    defaultMessage: 'Cost',
    description: 'Cost stat label on training detail page',
  },
  detailSectionTrainingDetails: {
    id: 'app.searnTrainingCatalog.detail.section.trainingDetails',
    defaultMessage: 'Training Details',
    description: 'Training details panel title on training detail page',
  },
  detailFieldApproach: {
    id: 'app.searnTrainingCatalog.detail.field.approach',
    defaultMessage: 'Approach',
    description: 'Approach field label on training detail page',
  },
  detailFieldMode: {
    id: 'app.searnTrainingCatalog.detail.field.mode',
    defaultMessage: 'Mode',
    description: 'Mode field label on training detail page',
  },
  detailFieldEvaluation: {
    id: 'app.searnTrainingCatalog.detail.field.evaluation',
    defaultMessage: 'Evaluation',
    description: 'Evaluation field label on training detail page',
  },
  detailFieldOutcome: {
    id: 'app.searnTrainingCatalog.detail.field.outcome',
    defaultMessage: 'Outcome',
    description: 'Outcome field label on training detail page',
  },
  detailSectionNraObjectives: {
    id: 'app.searnTrainingCatalog.detail.section.nraObjectives',
    defaultMessage: 'NRA Objectives',
    description: 'NRA objectives panel title on training detail page',
  },
  detailSectionMappedCompetencies: {
    id: 'app.searnTrainingCatalog.detail.section.mappedCompetencies',
    defaultMessage: 'Mapped Competencies',
    description: 'Mapped competencies panel title on training detail page',
  },
  detailSectionMappedActivities: {
    id: 'app.searnTrainingCatalog.detail.section.mappedActivities',
    defaultMessage: 'Mapped Activities',
    description: 'Mapped activities panel title on training detail page',
  },
});

export default messages;

