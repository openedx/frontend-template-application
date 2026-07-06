import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  heroBadge: {
    id: 'app.exploreTraining.hero.badge',
    defaultMessage: 'Explore trainings',
    description: 'Small badge label on the explore training hero',
  },
  heroTitle: {
    id: 'app.exploreTraining.hero.title',
    defaultMessage: 'Start by telling us your role',
    description: 'Explore training hero heading',
  },
  heroSubtitle: {
    id: 'app.exploreTraining.hero.subtitle',
    defaultMessage: "We'll open an explorer with the right activities and trainings for you.",
    description: 'Explore training hero subheading',
  },
  activitiesCount: {
    id: 'app.exploreTraining.role.activitiesCount',
    defaultMessage: '{count, plural, one {# activity} other {# activities}}',
    description: 'Number of activities shown on a role card',
  },
  searchPlaceholder: {
    id: 'app.exploreTraining.search.placeholder',
    defaultMessage: 'Quick search — type a training, provider or activity...',
    description: 'Placeholder for the explore training search input',
  },
  productLabel: {
    id: 'app.exploreTraining.filter.product.label',
    defaultMessage: 'Product',
    description: 'Label for the product filter',
  },
  domainLabel: {
    id: 'app.exploreTraining.filter.domain.label',
    defaultMessage: 'Domain',
    description: 'Label for the domain filter',
  },
  subDomainLabel: {
    id: 'app.exploreTraining.filter.subDomain.label',
    defaultMessage: 'Subdomain',
    description: 'Label for the subdomain filter',
  },
  objectivesLabel: {
    id: 'app.exploreTraining.filter.objectives.label',
    defaultMessage: 'NRA Objectives',
    description: 'Label for the NRA objectives filter',
  },
  profileLabel: {
    id: 'app.exploreTraining.filter.profile.label',
    defaultMessage: 'Profile',
    description: 'Label for the profile filter',
  },
  allProducts: {
    id: 'app.exploreTraining.filter.allProducts',
    defaultMessage: 'All products',
    description: 'Default option for the product filter',
  },
  allDomains: {
    id: 'app.exploreTraining.filter.allDomains',
    defaultMessage: 'All domains',
    description: 'Default option for the domain filter',
  },
  allSubDomains: {
    id: 'app.exploreTraining.filter.allSubDomains',
    defaultMessage: 'All subdomains',
    description: 'Default option for the subdomain filter',
  },
  allObjectives: {
    id: 'app.exploreTraining.filter.allObjectives',
    defaultMessage: 'All objectives',
    description: 'Default label for the objectives filter when none selected',
  },
  objectivesSelected: {
    id: 'app.exploreTraining.filter.objectivesSelected',
    defaultMessage: '{count} selected',
    description: 'Label for the objectives filter when some are selected',
  },
  allProfiles: {
    id: 'app.exploreTraining.filter.allProfiles',
    defaultMessage: 'All profiles',
    description: 'Default option for the profile filter',
  },
  profileMeta: {
    id: 'app.exploreTraining.filter.profile.meta',
    defaultMessage: 'Meta',
    description: 'Meta profile option',
  },
  profileCore: {
    id: 'app.exploreTraining.filter.profile.core',
    defaultMessage: 'Core',
    description: 'Core profile option',
  },
  dropdownSearchPlaceholder: {
    id: 'app.exploreTraining.dropdown.searchPlaceholder',
    defaultMessage: 'Search...',
    description: 'Placeholder for searchable dropdown inputs',
  },
  dropdownNoOptions: {
    id: 'app.exploreTraining.dropdown.noOptions',
    defaultMessage: 'No options found',
    description: 'Empty text for searchable dropdown',
  },
  activitiesColumnTitle: {
    id: 'app.exploreTraining.column.activities',
    defaultMessage: 'Activities',
    description: 'Title of the activities column',
  },
  trainingsColumnTitle: {
    id: 'app.exploreTraining.column.trainings',
    defaultMessage: 'Trainings',
    description: 'Title of the trainings column',
  },
  previewColumnTitle: {
    id: 'app.exploreTraining.column.preview',
    defaultMessage: 'Preview',
    description: 'Title of the preview column',
  },
  selectActivity: {
    id: 'app.exploreTraining.trainings.selectActivity',
    defaultMessage: 'Select an activity',
    description: 'Subtitle shown in the trainings column before an activity is selected',
  },
  selectTraining: {
    id: 'app.exploreTraining.preview.selectTraining',
    defaultMessage: 'Select a training',
    description: 'Subtitle shown in the preview column before a training is selected',
  },
  pickActivityHint: {
    id: 'app.exploreTraining.trainings.pickHint',
    defaultMessage: 'Pick an activity from the left to see matching trainings.',
    description: 'Empty hint in the trainings column',
  },
  chooseTrainingHint: {
    id: 'app.exploreTraining.preview.chooseHint',
    defaultMessage: 'Choose a training to preview the details here.',
    description: 'Empty hint in the preview column',
  },
  noActivities: {
    id: 'app.exploreTraining.activities.empty',
    defaultMessage: 'No activities found for this role.',
    description: 'Empty state for the activities column',
  },
  noTrainings: {
    id: 'app.exploreTraining.trainings.empty',
    defaultMessage: 'No training available for this activity',
    description: 'Empty state for the trainings column',
  },
  trainingsCount: {
    id: 'app.exploreTraining.activity.trainingsCount',
    defaultMessage: '{count, plural, one {# training} other {# trainings}}',
    description: 'Number of trainings for an activity',
  },
  searnBadge: {
    id: 'app.exploreTraining.badge.searn',
    defaultMessage: 'SEARN',
    description: 'Badge for SEARN provided trainings',
  },
  partnerBadge: {
    id: 'app.exploreTraining.badge.partner',
    defaultMessage: 'Partner',
    description: 'Badge for partner provided trainings',
  },
  searnRcoeBadge: {
    id: 'app.exploreTraining.badge.searnRcoe',
    defaultMessage: 'SEARN RCOE',
    description: 'Preview badge for SEARN provided trainings',
  },
  partnerTrainingBadge: {
    id: 'app.exploreTraining.badge.partnerTraining',
    defaultMessage: 'Partner training',
    description: 'Preview badge for partner provided trainings',
  },
  previewMode: {
    id: 'app.exploreTraining.preview.mode',
    defaultMessage: 'Mode',
    description: 'Preview field label for mode',
  },
  previewDuration: {
    id: 'app.exploreTraining.preview.duration',
    defaultMessage: 'Duration',
    description: 'Preview field label for duration',
  },
  previewApproach: {
    id: 'app.exploreTraining.preview.approach',
    defaultMessage: 'Approach',
    description: 'Preview field label for approach',
  },
  previewEvaluation: {
    id: 'app.exploreTraining.preview.evaluation',
    defaultMessage: 'Evaluation',
    description: 'Preview field label for evaluation',
  },
  competenciesTitle: {
    id: 'app.exploreTraining.preview.competencies',
    defaultMessage: 'Competencies',
    description: 'Preview competencies section title',
  },
  requestTraining: {
    id: 'app.exploreTraining.requestTraining',
    defaultMessage: 'Request Training',
    description: 'Button to open the request training modal',
  },
  requestTrainingSubmittedTitle: {
    id: 'app.exploreTraining.requestTraining.submitted.title',
    defaultMessage: 'Training Requested',
    description: 'Toast title after submitting a training request',
  },
  requestTrainingSubmittedDescription: {
    id: 'app.exploreTraining.requestTraining.submitted.description',
    defaultMessage: 'Your training request has been submitted.',
    description: 'Toast description after submitting a training request',
  },
  requestTrainingErrorTitle: {
    id: 'app.exploreTraining.requestTraining.error.title',
    defaultMessage: 'Request failed',
    description: 'Toast title when a training request fails',
  },
  requestTrainingError: {
    id: 'app.exploreTraining.requestTraining.error.description',
    defaultMessage: 'We could not submit your training request. Please try again.',
    description: 'Toast description when a training request fails',
  },
  loadErrorTitle: {
    id: 'app.exploreTraining.load.errorTitle',
    defaultMessage: 'Something went wrong',
    description: 'Generic toast title for explore training load failures',
  },
  rolesLoadError: {
    id: 'app.exploreTraining.roles.loadError',
    defaultMessage: 'Unable to load roles. Please try again.',
    description: 'Fallback error for the explore training roles API',
  },
  activitiesLoadError: {
    id: 'app.exploreTraining.activities.loadError',
    defaultMessage: 'Unable to load activities. Please try again.',
    description: 'Fallback error for the explore training activities API',
  },
  trainingsLoadError: {
    id: 'app.exploreTraining.trainings.loadError',
    defaultMessage: 'Unable to load trainings. Please try again.',
    description: 'Fallback error for the explore training trainings API',
  },
  trainingDetailLoadError: {
    id: 'app.exploreTraining.trainingDetail.loadError',
    defaultMessage: 'Unable to load training details. Please try again.',
    description: 'Fallback error for the explore training detail API',
  },
  productTypeOptionsLoadError: {
    id: 'app.exploreTraining.options.productType.loadError',
    defaultMessage: 'Unable to load product types.',
    description: 'Fallback error for the product type options API',
  },
  domainOptionsLoadError: {
    id: 'app.exploreTraining.options.domain.loadError',
    defaultMessage: 'Unable to load domains.',
    description: 'Fallback error for the domain options API',
  },
  subDomainOptionsLoadError: {
    id: 'app.exploreTraining.options.subDomain.loadError',
    defaultMessage: 'Unable to load subdomains.',
    description: 'Fallback error for the subdomain options API',
  },
  objectiveOptionsLoadError: {
    id: 'app.exploreTraining.options.objective.loadError',
    defaultMessage: 'Unable to load objectives.',
    description: 'Fallback error for the objective options API',
  },
});

export default messages;
