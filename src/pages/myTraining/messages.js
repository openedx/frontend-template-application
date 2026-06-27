import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  searchPlaceholder: {
    id: 'app.myTraining.search.placeholder',
    defaultMessage: 'Search trainings...',
    description: 'Search placeholder on My Training page',
  },
  columnTraining: {
    id: 'app.myTraining.table.column.training',
    defaultMessage: 'Training',
    description: 'Training column header on My Training page',
  },
  columnProvider: {
    id: 'app.myTraining.table.column.provider',
    defaultMessage: 'Provider',
    description: 'Provider column header on My Training page',
  },
  columnStatus: {
    id: 'app.myTraining.table.column.status',
    defaultMessage: 'Status',
    description: 'Status column header on My Training page',
  },
  columnActions: {
    id: 'app.myTraining.table.column.actions',
    defaultMessage: 'Actions',
    description: 'Actions column header on My Training page',
  },
  empty: {
    id: 'app.myTraining.empty',
    defaultMessage: 'No trainings found.',
    description: 'Empty state on My Training page',
  },
  listLoadError: {
    id: 'app.myTraining.list.loadError',
    defaultMessage: 'Unable to load trainings. Please try again.',
    description: 'Fallback when My Training list GET fails',
  },
  listLoadErrorTitle: {
    id: 'app.myTraining.list.loadErrorTitle',
    defaultMessage: 'Trainings unavailable',
    description: 'Toast title when My Training list GET fails',
  },
  detailLoadError: {
    id: 'app.myTraining.detail.loadError',
    defaultMessage: 'Unable to load training details. Please try again.',
    description: 'Fallback when My Training detail GET fails',
  },
  detailLoadErrorTitle: {
    id: 'app.myTraining.detail.loadErrorTitle',
    defaultMessage: 'Training unavailable',
    description: 'Toast title when My Training detail GET fails',
  },
  detailNotFound: {
    id: 'app.myTraining.detail.notFound',
    defaultMessage: 'No training found.',
    description: 'Empty state when My Training detail is missing',
  },
  statusOptionsLoadError: {
    id: 'app.myTraining.statusOptions.loadError',
    defaultMessage: 'Unable to load status options.',
    description: 'Fallback when My Training status options GET fails',
  },
  updateError: {
    id: 'app.myTraining.update.error',
    defaultMessage: 'Unable to update training. Please try again.',
    description: 'Fallback when My Training PATCH fails',
  },
  updateErrorTitle: {
    id: 'app.myTraining.update.errorTitle',
    defaultMessage: 'Update failed',
    description: 'Toast title when My Training PATCH fails',
  },
  startError: {
    id: 'app.myTraining.start.error',
    defaultMessage: 'Unable to start training. Please try again.',
    description: 'Fallback when My Training start PATCH fails',
  },
  startErrorTitle: {
    id: 'app.myTraining.start.errorTitle',
    defaultMessage: 'Training not started',
    description: 'Toast title when My Training start PATCH fails',
  },
  accessTraining: {
    id: 'app.myTraining.actions.accessTraining',
    defaultMessage: 'Access training',
    description: 'Accessible label for access training action button',
  },
  accessTooltip: {
    id: 'app.myTraining.actions.accessTooltip',
    defaultMessage: 'Access',
    description: 'Tooltip for access training action button',
  },
  updateTraining: {
    id: 'app.myTraining.actions.updateTraining',
    defaultMessage: 'Update training',
    description: 'Accessible label for update training action button',
  },
  updateTooltip: {
    id: 'app.myTraining.actions.updateTooltip',
    defaultMessage: 'Update',
    description: 'Tooltip for update training action button',
  },
  startConfirmTitle: {
    id: 'app.myTraining.startConfirm.title',
    defaultMessage: 'Start Training?',
    description: 'Title for start training confirmation dialog',
  },
  startConfirmDescription: {
    id: 'app.myTraining.startConfirm.description',
    defaultMessage: 'Do you want to indicate that this training is started?',
    description: 'Description for start training confirmation dialog',
  },
  startConfirmNo: {
    id: 'app.myTraining.startConfirm.no',
    defaultMessage: 'No',
    description: 'Cancel button on start training confirmation dialog',
  },
  startConfirmYes: {
    id: 'app.myTraining.startConfirm.yes',
    defaultMessage: 'Yes',
    description: 'Confirm button on start training confirmation dialog',
  },
  startSuccessTitle: {
    id: 'app.myTraining.start.successTitle',
    defaultMessage: 'Training started',
    description: 'Toast title after starting a training',
  },
  startSuccessDescription: {
    id: 'app.myTraining.start.successDescription',
    defaultMessage: '"{name}" marked as In Progress.',
    description: 'Toast description after starting a training',
  },
  updateSuccessTitle: {
    id: 'app.myTraining.update.successTitle',
    defaultMessage: 'Training updated',
    description: 'Toast title after updating a training',
  },
  updateSuccessDescription: {
    id: 'app.myTraining.update.successDescription',
    defaultMessage: 'Status set to {status}.',
    description: 'Toast description after updating a training',
  },
  proofRequiredTitle: {
    id: 'app.myTraining.validation.proofRequired.title',
    defaultMessage: 'Proof required',
    description: 'Toast title when completion proof is missing',
  },
  proofRequiredDescription: {
    id: 'app.myTraining.validation.proofRequired.description',
    defaultMessage: 'Please upload a completion proof before marking as completed.',
    description: 'Toast description when completion proof is missing',
  },
  ratingRequiredTitle: {
    id: 'app.myTraining.validation.ratingRequired.title',
    defaultMessage: 'Rating required',
    description: 'Toast title when rating is missing for completed status',
  },
  ratingRequiredDescription: {
    id: 'app.myTraining.validation.ratingRequired.description',
    defaultMessage: 'Please provide a rating before marking as completed.',
    description: 'Toast description when rating is missing for completed status',
  },
  showingCount: {
    id: 'app.myTraining.pagination.showing',
    defaultMessage: 'Showing {count} of {total} trainings',
    description: 'Pagination summary for My Training table',
  },
  paginationLabel: {
    id: 'app.myTraining.pagination.label',
    defaultMessage: 'My Training pagination',
    description: 'Accessible label for My Training table pagination',
  },
  modalTitle: {
    id: 'app.myTraining.modal.title',
    defaultMessage: 'Update Training Status',
    description: 'Title for update training status modal',
  },
  modalStatusLabel: {
    id: 'app.myTraining.modal.status.label',
    defaultMessage: 'Status',
    description: 'Status field label in update training modal',
  },
  modalProofLabel: {
    id: 'app.myTraining.modal.proof.label',
    defaultMessage: 'Completion proof',
    description: 'Completion proof field label in update training modal',
  },
  modalProofHint: {
    id: 'app.myTraining.modal.proof.hint',
    defaultMessage: 'Upload a valid certificate, completion report, or similar proof.',
    description: 'Hint text for completion proof upload',
  },
  modalProofChoose: {
    id: 'app.myTraining.modal.proof.choose',
    defaultMessage: 'Choose file',
    description: 'Button label to choose completion proof file',
  },
  modalProofReplace: {
    id: 'app.myTraining.modal.proof.replace',
    defaultMessage: 'Replace: {fileName}',
    description: 'Button label when replacing an existing proof file',
  },
  modalRatingLabel: {
    id: 'app.myTraining.modal.rating.label',
    defaultMessage: 'Your rating',
    description: 'Rating field label in update training modal',
  },
  modalRatingHint: {
    id: 'app.myTraining.modal.rating.hint',
    defaultMessage: 'Rate this training out of 5 stars. You can edit it later.',
    description: 'Hint text for rating field in update training modal',
  },
  modalRatingValue: {
    id: 'app.myTraining.modal.rating.value',
    defaultMessage: '{rating} / 5',
    description: 'Selected rating summary in update training modal',
  },
  modalRatingStar: {
    id: 'app.myTraining.modal.rating.star',
    defaultMessage: '{count} star',
    description: 'Accessible label for a single star rating button',
  },
  modalRatingStars: {
    id: 'app.myTraining.modal.rating.stars',
    defaultMessage: '{count} stars',
    description: 'Accessible label for a multi-star rating button',
  },
  modalFeedbackLabel: {
    id: 'app.myTraining.modal.feedback.label',
    defaultMessage: 'Feedback / comments',
    description: 'Feedback field label in update training modal',
  },
  modalFeedbackPlaceholder: {
    id: 'app.myTraining.modal.feedback.placeholder',
    defaultMessage: 'Share your experience about this training...',
    description: 'Placeholder for feedback field in update training modal',
  },
  modalCancel: {
    id: 'app.myTraining.modal.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button in update training modal',
  },
  modalSave: {
    id: 'app.myTraining.modal.save',
    defaultMessage: 'Save',
    description: 'Save button in update training modal',
  },
  dropdownNoOptions: {
    id: 'app.myTraining.dropdown.noOptions',
    defaultMessage: 'No matches',
    description: 'Empty text for status dropdown in update training modal',
  },
});

export default messages;
