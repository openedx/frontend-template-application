import { defineMessages } from '@edx/frontend-platform/i18n';

const dashboardPageMessages = defineMessages({
  noAccessTitle: {
    id: 'app.dashboard.secretariat.noAccess.title',
    defaultMessage: 'Dashboard access restricted',
    description: 'Title shown when user has no dashboard access permission',
  },
  noAccessDescription: {
    id: 'app.dashboard.secretariat.noAccess.description',
    defaultMessage: 'You do not have permission to view this dashboard.',
    description: 'Description shown when user has no dashboard access permission',
  },
});

export default dashboardPageMessages;
