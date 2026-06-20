import { defineMessages } from '@edx/frontend-platform/i18n';

const certificateMessages = defineMessages({
  backToPassport: {
    id: 'app.certificates.detail.backToPassport',
    defaultMessage: 'Back to Regulatory Passport',
    description: 'Back button on certificate detail page',
  },
  title: {
    id: 'app.certificates.detail.title',
    defaultMessage: 'Training Certificate',
    description: 'Certificate detail page title',
  },
  trainingLabel: {
    id: 'app.certificates.detail.trainingLabel',
    defaultMessage: 'Training',
    description: 'Training label on certificate page',
  },
  providerLabel: {
    id: 'app.certificates.detail.providerLabel',
    defaultMessage: 'Provider',
    description: 'Provider label on certificate page',
  },
  completedLabel: {
    id: 'app.certificates.detail.completedLabel',
    defaultMessage: 'Completed',
    description: 'Completed date label on certificate page',
  },
  certificateNumberLabel: {
    id: 'app.certificates.detail.certificateNumberLabel',
    defaultMessage: 'Certificate number',
    description: 'Certificate number label on certificate page',
  },
});

export default certificateMessages;
