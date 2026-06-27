import { defineMessages } from '@edx/frontend-platform/i18n';

export default defineMessages({
  columnTraining: {
    id: 'app.myTrainingCatalog.table.column.training',
    defaultMessage: 'Training',
    description: 'Training column header in my training catalog table',
  },
  columnMode: {
    id: 'app.myTrainingCatalog.table.column.mode',
    defaultMessage: 'Mode',
    description: 'Mode column header in my training catalog table',
  },
  columnSatisfaction: {
    id: 'app.myTrainingCatalog.table.column.satisfaction',
    defaultMessage: 'User Satisfaction',
    description: 'User satisfaction column header in my training catalog table',
  },
  columnCost: {
    id: 'app.myTrainingCatalog.table.column.cost',
    defaultMessage: 'Cost',
    description: 'Cost column header in my training catalog table',
  },
  columnActions: {
    id: 'app.myTrainingCatalog.table.column.actions',
    defaultMessage: 'Actions',
    description: 'Actions column header in my training catalog table',
  },
  empty: {
    id: 'app.myTrainingCatalog.empty',
    defaultMessage: 'No trainings found.',
    description: 'Empty state when my training catalog list has no rows',
  },
  listLoadError: {
    id: 'app.myTrainingCatalog.list.loadError',
    defaultMessage: 'Unable to load your training catalog.',
    description: 'Fallback when my training catalog list API fails',
  },
  listLoadErrorTitle: {
    id: 'app.myTrainingCatalog.list.loadErrorTitle',
    defaultMessage: 'Training catalog unavailable',
    description: 'Toast title when my training catalog list API fails',
  },
  createTraining: {
    id: 'app.myTrainingCatalog.createTraining',
    defaultMessage: 'Create Training',
    description: 'Primary button to open create training page',
  },
  editTraining: {
    id: 'app.myTrainingCatalog.editTraining',
    defaultMessage: 'Edit training',
    description: 'Accessible label for edit training action',
  },
  deleteTraining: {
    id: 'app.myTrainingCatalog.deleteTraining',
    defaultMessage: 'Delete training',
    description: 'Accessible label for delete training action',
  },
  editUnavailableTitle: {
    id: 'app.myTrainingCatalog.editUnavailable.title',
    defaultMessage: 'Edit unavailable',
    description: 'Toast title when edit training is not yet available',
  },
  editUnavailableDescription: {
    id: 'app.myTrainingCatalog.editUnavailable.description',
    defaultMessage: 'Training edit will be available when the API is connected.',
    description: 'Toast description when edit training is not yet available',
  },
  deleteDialogTitle: {
    id: 'app.myTrainingCatalog.deleteDialog.title',
    defaultMessage: 'Delete Training',
    description: 'Delete training confirmation dialog title',
  },
  deleteDialogDescription: {
    id: 'app.myTrainingCatalog.deleteDialog.description',
    defaultMessage: 'Are you sure you want to delete "{name}"? This action cannot be undone.',
    description: 'Delete training confirmation dialog description',
  },
  deleteDialogCancel: {
    id: 'app.myTrainingCatalog.deleteDialog.cancel',
    defaultMessage: 'Cancel',
    description: 'Delete training confirmation cancel button',
  },
  deleteDialogConfirm: {
    id: 'app.myTrainingCatalog.deleteDialog.confirm',
    defaultMessage: 'Delete',
    description: 'Delete training confirmation confirm button',
  },
  deleteSuccessTitle: {
    id: 'app.myTrainingCatalog.delete.successTitle',
    defaultMessage: 'Training deleted',
    description: 'Toast title when training delete succeeds (mock)',
  },
  deleteSuccessDescription: {
    id: 'app.myTrainingCatalog.delete.successDescription',
    defaultMessage: '"{name}" has been removed from your catalog.',
    description: 'Toast description when training delete succeeds (mock)',
  },
  detailLoadError: {
    id: 'app.myTrainingCatalog.detail.loadError',
    defaultMessage: 'Unable to load training details.',
    description: 'Fallback when my training detail mock/API fails',
  },
  detailLoadErrorTitle: {
    id: 'app.myTrainingCatalog.detail.loadErrorTitle',
    defaultMessage: 'Training unavailable',
    description: 'Toast title when my training detail fails',
  },
  detailNotFound: {
    id: 'app.myTrainingCatalog.detail.notFound',
    defaultMessage: 'Training not found.',
    description: 'Empty state when my training detail is missing',
  },
  feedbackLoadError: {
    id: 'app.myTrainingCatalog.feedback.loadError',
    defaultMessage: 'Unable to load training feedback.',
    description: 'Fallback when my training feedback mock/API fails',
  },
  feedbackLoadErrorTitle: {
    id: 'app.myTrainingCatalog.feedback.loadErrorTitle',
    defaultMessage: 'Feedback unavailable',
    description: 'Toast title when my training feedback fails',
  },
  feedbackNotFound: {
    id: 'app.myTrainingCatalog.feedback.notFound',
    defaultMessage: 'Feedback not found for this training.',
    description: 'Empty state when my training feedback is missing',
  },
  createPageTitle: {
    id: 'app.myTrainingCatalog.create.pageTitle',
    defaultMessage: 'Create Training',
    description: 'Header title for create training page',
  },
  basicInformationTitle: {
    id: 'app.myTrainingCatalog.create.basicInformation',
    defaultMessage: 'Basic Information',
    description: 'Basic information card title on create training page',
  },
  trainingDetailsTitle: {
    id: 'app.myTrainingCatalog.create.trainingDetails',
    defaultMessage: 'Training Details',
    description: 'Training details card title on create training page',
  },
  fieldTrainingName: {
    id: 'app.myTrainingCatalog.create.field.trainingName',
    defaultMessage: 'Training Name',
    description: 'Training name field label',
  },
  fieldTrainingNamePlaceholder: {
    id: 'app.myTrainingCatalog.create.field.trainingName.placeholder',
    defaultMessage: 'Enter training name',
    description: 'Training name field placeholder',
  },
  fieldDescription: {
    id: 'app.myTrainingCatalog.create.field.description',
    defaultMessage: 'Description',
    description: 'Description field label',
  },
  fieldDescriptionPlaceholder: {
    id: 'app.myTrainingCatalog.create.field.description.placeholder',
    defaultMessage: 'Enter description',
    description: 'Description field placeholder',
  },
  fieldLanguage: {
    id: 'app.myTrainingCatalog.create.field.language',
    defaultMessage: 'Language',
    description: 'Language field label',
  },
  selectLanguage: {
    id: 'app.myTrainingCatalog.create.select.language',
    defaultMessage: 'Select language',
    description: 'Language dropdown placeholder',
  },
  fieldDuration: {
    id: 'app.myTrainingCatalog.create.field.duration',
    defaultMessage: 'Duration',
    description: 'Duration field label',
  },
  fieldDurationPlaceholder: {
    id: 'app.myTrainingCatalog.create.field.duration.placeholder',
    defaultMessage: 'e.g. 5 days',
    description: 'Duration field placeholder',
  },
  fieldCost: {
    id: 'app.myTrainingCatalog.create.field.cost',
    defaultMessage: 'Cost',
    description: 'Cost field label',
  },
  fieldCostPlaceholder: {
    id: 'app.myTrainingCatalog.create.field.cost.placeholder',
    defaultMessage: 'e.g. $500 or Free',
    description: 'Cost field placeholder',
  },
  fieldMode: {
    id: 'app.myTrainingCatalog.create.field.mode',
    defaultMessage: 'Training Mode',
    description: 'Training mode field label',
  },
  selectMode: {
    id: 'app.myTrainingCatalog.create.select.mode',
    defaultMessage: 'Select mode',
    description: 'Training mode dropdown placeholder',
  },
  fieldApproach: {
    id: 'app.myTrainingCatalog.create.field.approach',
    defaultMessage: 'Approach',
    description: 'Approach field label',
  },
  selectApproach: {
    id: 'app.myTrainingCatalog.create.select.approach',
    defaultMessage: 'Select approach',
    description: 'Approach dropdown placeholder',
  },
  fieldEvaluation: {
    id: 'app.myTrainingCatalog.create.field.evaluation',
    defaultMessage: 'Evaluation',
    description: 'Evaluation field label',
  },
  selectEvaluation: {
    id: 'app.myTrainingCatalog.create.select.evaluation',
    defaultMessage: 'Select evaluation',
    description: 'Evaluation dropdown placeholder',
  },
  fieldOutcome: {
    id: 'app.myTrainingCatalog.create.field.outcome',
    defaultMessage: 'Outcome',
    description: 'Outcome field label',
  },
  selectOutcome: {
    id: 'app.myTrainingCatalog.create.select.outcome',
    defaultMessage: 'Select outcome',
    description: 'Outcome dropdown placeholder',
  },
  fieldProductType: {
    id: 'app.myTrainingCatalog.create.field.productType',
    defaultMessage: 'Type of Product',
    description: 'Product type field label',
  },
  selectProductType: {
    id: 'app.myTrainingCatalog.create.select.productType',
    defaultMessage: 'Select type of product',
    description: 'Product type dropdown placeholder',
  },
  fieldNraObjectives: {
    id: 'app.myTrainingCatalog.create.field.nraObjectives',
    defaultMessage: 'NRA Objectives',
    description: 'NRA objectives multiselect label',
  },
  fieldRegistrationBy: {
    id: 'app.myTrainingCatalog.create.field.registrationBy',
    defaultMessage: 'Registration By',
    description: 'Registration method field label',
  },
  registrationUrl: {
    id: 'app.myTrainingCatalog.create.registration.url',
    defaultMessage: 'URL',
    description: 'Registration by URL radio label',
  },
  registrationEmail: {
    id: 'app.myTrainingCatalog.create.registration.email',
    defaultMessage: 'Email',
    description: 'Registration by email radio label',
  },
  registrationUrlPlaceholder: {
    id: 'app.myTrainingCatalog.create.registration.url.placeholder',
    defaultMessage: 'https://example.com/register',
    description: 'Registration URL input placeholder',
  },
  registrationEmailPlaceholder: {
    id: 'app.myTrainingCatalog.create.registration.email.placeholder',
    defaultMessage: 'training@example.com',
    description: 'Registration email input placeholder',
  },
  fieldMappedCompetencies: {
    id: 'app.myTrainingCatalog.create.field.mappedCompetencies',
    defaultMessage: 'Mapped Competencies',
    description: 'Mapped competencies multiselect label',
  },
  fieldMappedActivities: {
    id: 'app.myTrainingCatalog.create.field.mappedActivities',
    defaultMessage: 'Mapped Activities',
    description: 'Mapped activities multiselect label',
  },
  cancel: {
    id: 'app.myTrainingCatalog.create.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button on create training page',
  },
  submitCreate: {
    id: 'app.myTrainingCatalog.create.submit',
    defaultMessage: 'Create Training',
    description: 'Submit button on create training page',
  },
  createValidationTitle: {
    id: 'app.myTrainingCatalog.create.validation.title',
    defaultMessage: 'Required fields missing',
    description: 'Toast title when create training validation fails',
  },
  createValidationDescription: {
    id: 'app.myTrainingCatalog.create.validation.description',
    defaultMessage: 'Please complete all required fields before creating the training.',
    description: 'Toast description when create training validation fails',
  },
  createSuccessTitle: {
    id: 'app.myTrainingCatalog.create.success.title',
    defaultMessage: 'Training created',
    description: 'Toast title when create training succeeds (mock)',
  },
  createSuccessDescription: {
    id: 'app.myTrainingCatalog.create.success.description',
    defaultMessage: 'Your training has been saved.',
    description: 'Toast description when create training succeeds (mock)',
  },
  editPageTitle: {
    id: 'app.myTrainingCatalog.edit.pageTitle',
    defaultMessage: 'Edit Training',
    description: 'Header title for edit training page',
  },
  submitEdit: {
    id: 'app.myTrainingCatalog.edit.submit',
    defaultMessage: 'Save Changes',
    description: 'Submit button on edit training page',
  },
  updateSuccessTitle: {
    id: 'app.myTrainingCatalog.edit.success.title',
    defaultMessage: 'Training updated',
    description: 'Toast title when edit training succeeds (mock)',
  },
  updateSuccessDescription: {
    id: 'app.myTrainingCatalog.edit.success.description',
    defaultMessage: 'Your training changes have been saved.',
    description: 'Toast description when edit training succeeds (mock)',
  },
  formDetailLoadError: {
    id: 'app.myTrainingCatalog.formDetail.loadError',
    defaultMessage: 'Unable to load training details. Please try again.',
    description: 'Fallback when training form detail GET fails',
  },
  formDetailLoadErrorTitle: {
    id: 'app.myTrainingCatalog.formDetail.loadErrorTitle',
    defaultMessage: 'Training unavailable',
    description: 'Toast title when training form detail GET fails',
  },
  formDetailNotFound: {
    id: 'app.myTrainingCatalog.formDetail.notFound',
    defaultMessage: 'Training not found.',
    description: 'Empty state when training form detail is missing',
  },
});
