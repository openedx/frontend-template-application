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
});

export default messages;

