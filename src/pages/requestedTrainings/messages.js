import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  searchPlaceholder: {
    id: 'app.requestedTrainings.search.placeholder',
    defaultMessage: 'Search requests...',
    description: 'Placeholder for requested trainings search',
  },
  filterPlaceholder: {
    id: 'app.requestedTrainings.filter.placeholder',
    defaultMessage: 'All Statuses',
    description: 'Default label for status filter',
  },
  requestTraining: {
    id: 'app.requestedTrainings.actions.requestTraining',
    defaultMessage: 'Request Training',
    description: 'Button label for request training',
  },
  tableActivity: {
    id: 'app.requestedTrainings.table.activity',
    defaultMessage: 'Activity',
    description: 'Table header for activity',
  },
  tableStatus: {
    id: 'app.requestedTrainings.table.status',
    defaultMessage: 'Status',
    description: 'Table header for status',
  },
  tableFlags: {
    id: 'app.requestedTrainings.table.flags',
    defaultMessage: 'Flags',
    description: 'Table header for flags',
  },
  tableActions: {
    id: 'app.requestedTrainings.table.actions',
    defaultMessage: 'Actions',
    description: 'Table header for actions',
  },
  close: {
    id: 'app.requestedTrainings.actions.close',
    defaultMessage: 'Close',
    description: 'Close button label',
  },
  reopen: {
    id: 'app.requestedTrainings.actions.reopen',
    defaultMessage: 'Reopen',
    description: 'Reopen button label',
  },
  empty: {
    id: 'app.requestedTrainings.empty',
    defaultMessage: 'No requested trainings found.',
    description: 'Empty state for requested trainings',
  },
  modalTitle: {
    id: 'app.requestedTrainings.modal.title',
    defaultMessage: 'Request Training',
    description: 'Modal title',
  },
  modalDescription: {
    id: 'app.requestedTrainings.modal.description',
    defaultMessage: 'Submit a training request by selecting the relevant activity and providing details.',
    description: 'Modal description',
  },
  modalActivityLabel: {
    id: 'app.requestedTrainings.modal.activity.label',
    defaultMessage: 'Select Activity',
    description: 'Label for select activity',
  },
  modalActivityPlaceholder: {
    id: 'app.requestedTrainings.modal.activity.placeholder',
    defaultMessage: 'Choose an activity',
    description: 'Placeholder for activity dropdown',
  },
  modalDescriptionLabel: {
    id: 'app.requestedTrainings.modal.description.label',
    defaultMessage: 'Description',
    description: 'Label for description textarea',
  },
  modalDescriptionPlaceholder: {
    id: 'app.requestedTrainings.modal.description.placeholder',
    defaultMessage: 'Describe the training need, expected outcomes, target audience...',
    description: 'Placeholder for description textarea',
  },
  cancel: {
    id: 'app.requestedTrainings.modal.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label',
  },
  submit: {
    id: 'app.requestedTrainings.modal.submit',
    defaultMessage: 'Submit Request',
    description: 'Submit request button label',
  },
  toastSubmittedTitle: {
    id: 'app.requestedTrainings.toast.submitted.title',
    defaultMessage: 'Request submitted',
    description: 'Toast title after submit request',
  },
  toastSubmittedDescription: {
    id: 'app.requestedTrainings.toast.submitted.description',
    defaultMessage: 'Your training request has been submitted.',
    description: 'Toast description after submit request',
  },
  filtersLoadError: {
    id: 'app.requestedTrainings.filters.loadError',
    defaultMessage: 'Unable to load status filters. Please try again.',
    description: 'Fallback when requested training filters API fails',
  },
  listLoadError: {
    id: 'app.requestedTrainings.list.loadError',
    defaultMessage: 'Unable to load requested trainings. Please try again.',
    description: 'Fallback when requested trainings list API fails',
  },
  activitiesLoadError: {
    id: 'app.requestedTrainings.activities.loadError',
    defaultMessage: 'Unable to load activities. Please try again.',
    description: 'Fallback when requested training activities API fails',
  },
  createError: {
    id: 'app.requestedTrainings.create.error',
    defaultMessage: 'Unable to submit this training request. Please try again.',
    description: 'Fallback when create requested training API fails',
  },
  statusError: {
    id: 'app.requestedTrainings.status.error',
    defaultMessage: 'Unable to update this training request. Please try again.',
    description: 'Fallback when requested training status PATCH fails',
  },
  listErrorTitle: {
    id: 'app.requestedTrainings.list.errorTitle',
    defaultMessage: 'Requested trainings unavailable',
    description: 'Toast title when list API fails',
  },
  filtersErrorTitle: {
    id: 'app.requestedTrainings.filters.errorTitle',
    defaultMessage: 'Filters unavailable',
    description: 'Toast title when filters API fails',
  },
  activitiesErrorTitle: {
    id: 'app.requestedTrainings.activities.errorTitle',
    defaultMessage: 'Activities unavailable',
    description: 'Toast title when activities API fails',
  },
  createErrorTitle: {
    id: 'app.requestedTrainings.create.errorTitle',
    defaultMessage: 'Request failed',
    description: 'Toast title when create API fails',
  },
  statusErrorTitle: {
    id: 'app.requestedTrainings.status.errorTitle',
    defaultMessage: 'Update failed',
    description: 'Toast title when status PATCH fails',
  },
  statusOpen: {
    id: 'app.requestedTrainings.status.open',
    defaultMessage: 'Open',
    description: 'Status label for open requests',
  },
  statusClosed: {
    id: 'app.requestedTrainings.status.closed',
    defaultMessage: 'Closed',
    description: 'Status label for closed requests',
  },
  toastClosedTitle: {
    id: 'app.requestedTrainings.toast.closed.title',
    defaultMessage: 'Request closed',
    description: 'Toast title when request closed',
  },
  toastReopenedTitle: {
    id: 'app.requestedTrainings.toast.reopened.title',
    defaultMessage: 'Request reopened',
    description: 'Toast title when request reopened',
  },
  showingCount: {
    id: 'app.requestedTrainings.pagination.showing',
    defaultMessage: 'Showing {count} of {total} requested trainings',
    description: 'Pagination summary for requested trainings table',
  },
});

export default messages;

