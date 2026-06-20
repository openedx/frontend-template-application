import { defineMessages } from '@edx/frontend-platform/i18n';

const detailMessages = defineMessages({
  backToUsers: { id: 'app.users.detail.back', defaultMessage: 'Back to Users', description: 'Back button on user detail' },
  statusActiveDefault: {
    id: 'app.users.detail.statusActiveDefault',
    defaultMessage: 'Active',
    description: 'Default user status label when API omits status',
  },
  edit: { id: 'app.users.detail.edit', defaultMessage: 'Edit', description: 'Edit user button label' },
  delete: { id: 'app.users.detail.delete', defaultMessage: 'Delete', description: 'Delete user button label' },
  createdAt: { id: 'app.users.detail.createdAt', defaultMessage: 'Created at', description: 'Created at label' },
  updatedAt: { id: 'app.users.detail.updatedAt', defaultMessage: 'Updated at', description: 'Updated at label' },
  lastLogin: { id: 'app.users.detail.lastLogin', defaultMessage: 'Last login', description: 'Last login label' },
  trainingsCompleted: { id: 'app.users.detail.trainingsCompleted', defaultMessage: 'Trainings completed', description: 'Trainings completed label' },
  completedTrainings: { id: 'app.users.detail.completedTrainings', defaultMessage: 'Completed Trainings', description: 'Completed trainings section title' },
  trainingStatus: { id: 'app.users.detail.trainingStatus', defaultMessage: 'Training Status', description: 'Training status section title' },
  competenciesTitle: { id: 'app.users.detail.competencies', defaultMessage: 'Mapped Competencies ({value})', description: 'Mapped competencies section title' },
  proficiency: { id: 'app.users.detail.proficiency', defaultMessage: 'Proficiency: {value}', description: 'Competency proficiency badge' },
  competencyCompleted: { id: 'app.users.detail.competencyCompleted', defaultMessage: 'Completed', description: 'Completed competency status' },
  competencyPending: { id: 'app.users.detail.competencyPending', defaultMessage: 'Not completed', description: 'Pending competency status' },
  passportTitle: { id: 'app.users.detail.passportTitle', defaultMessage: 'Regulatory Passport', description: 'Passport CTA title' },
  passportDescription: {
    id: 'app.users.detail.passportDescription',
    defaultMessage: "View this user's digital regulatory training and competency record",
    description: 'Passport CTA description on user about page',
  },
  passportButton: { id: 'app.users.detail.passportButton', defaultMessage: 'View Regulatory Passport', description: 'Passport CTA button' },
  assignedTrainingsTitle: {
    id: 'app.users.detail.assignedTrainingsTitle',
    defaultMessage: 'Assigned Trainings ({count})',
    description: 'Assigned trainings section title',
  },
  assignTraining: {
    id: 'app.users.detail.assignTraining',
    defaultMessage: 'Assign Training',
    description: 'Assign training button label',
  },
  removeAssignedTraining: {
    id: 'app.users.detail.removeAssignedTraining',
    defaultMessage: 'Remove assigned training',
    description: 'Remove assigned training icon label',
  },
  assignModalTitle: {
    id: 'app.users.detail.assignModalTitle',
    defaultMessage: 'Assign Trainings to {name}',
    description: 'Assign trainings modal title',
  },
  assignModalDescription: {
    id: 'app.users.detail.assignModalDescription',
    defaultMessage: 'Search and select one or more trainings to assign.',
    description: 'Assign trainings modal description',
  },
  assignModalSearchPlaceholder: {
    id: 'app.users.detail.assignModalSearchPlaceholder',
    defaultMessage: 'Search trainings...',
    description: 'Assign trainings modal search placeholder',
  },
  cancel: { id: 'app.common.cancel', defaultMessage: 'Cancel', description: 'Cancel button label' },
  assign: { id: 'app.users.detail.assign', defaultMessage: 'Assign', description: 'Assign button label' },
  toastAssignedTitle: {
    id: 'app.users.detail.toastAssignedTitle',
    defaultMessage: 'Trainings assigned',
    description: 'Toast title when trainings are assigned',
  },
  toastAssignedDescription: {
    id: 'app.users.detail.toastAssignedDescription',
    defaultMessage: 'Trainings were assigned successfully.',
    description: 'Toast description when trainings are assigned',
  },
  removeAssignedDialogTitle: {
    id: 'app.users.detail.removeAssignedDialogTitle',
    defaultMessage: 'Remove assigned training?',
    description: 'Confirm dialog title for removing assigned training',
  },
  removeAssignedDialogDescription: {
    id: 'app.users.detail.removeAssignedDialogDescription',
    defaultMessage: 'This will remove {title} from assigned trainings.',
    description: 'Confirm dialog description for removing assigned training',
  },
  removeAssignedConfirm: {
    id: 'app.users.detail.removeAssignedConfirm',
    defaultMessage: 'Remove',
    description: 'Confirm label for removing assigned training',
  },
  toastRemovedAssignedTitle: {
    id: 'app.users.detail.toastRemovedAssignedTitle',
    defaultMessage: 'Training removed',
    description: 'Toast title when assigned training removed',
  },
  toastRemovedAssignedDescription: {
    id: 'app.users.detail.toastRemovedAssignedDescription',
    defaultMessage: 'Assigned training was removed.',
    description: 'Toast description when assigned training removed',
  },
});

export default detailMessages;
