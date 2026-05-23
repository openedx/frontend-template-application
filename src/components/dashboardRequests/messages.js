import { defineMessages } from '@edx/frontend-platform/i18n';

const dashboardRequestsMessages = defineMessages({
  topRequestedTitle: {
    id: 'app.dashboard.requests.topRequested.title',
    defaultMessage: 'Top requested activities',
    description: 'Title for top requested activities card',
  },
  topRequestedDescription: {
    id: 'app.dashboard.requests.topRequested.description',
    defaultMessage: 'Activities most requested across NRAs',
    description: 'Description for top requested activities card',
  },
  pendingRequestsTitle: {
    id: 'app.dashboard.requests.pending.title',
    defaultMessage: 'Pending requests',
    description: 'Title for pending requests card',
  },
  pendingRequestsDescription: {
    id: 'app.dashboard.requests.pending.description',
    defaultMessage: 'Items awaiting Secretariat action',
    description: 'Description for pending requests card',
  },
  pendingRequestsEmpty: {
    id: 'app.dashboard.requests.pending.empty',
    defaultMessage: 'No pending requests to display.',
    description: 'Empty state when pending requests list has no displayable rows',
  },
  topRequestedEmpty: {
    id: 'app.dashboard.requests.topRequested.empty',
    defaultMessage: 'No top requested activities to display.',
    description: 'Empty state when top requested activities list has no displayable rows',
  },
  requestsUnit: {
    id: 'app.dashboard.requests.unit',
    defaultMessage: 'requests',
    description: 'Unit label for request counts',
  },
});

export default dashboardRequestsMessages;
