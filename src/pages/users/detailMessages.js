import { defineMessages } from '@edx/frontend-platform/i18n';

const detailMessages = defineMessages({
  backToUsers: { id: 'app.users.detail.back', defaultMessage: 'Back to Users', description: 'Back button on user detail' },
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
  passportButton: { id: 'app.users.detail.passportButton', defaultMessage: 'View Regulatory Passport', description: 'Passport CTA button' },
});

export default detailMessages;
