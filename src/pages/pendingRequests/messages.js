import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  searchPlaceholder: {
    id: 'app.pendingRequests.search.placeholder',
    defaultMessage: 'Search requests...',
    description: 'Placeholder for pending requests search',
  },
  filterPlaceholder: {
    id: 'app.pendingRequests.filter.placeholder',
    defaultMessage: 'All request types',
    description: 'Default label for request type filter',
  },
  tableRequest: {
    id: 'app.pendingRequests.table.request',
    defaultMessage: 'Request',
    description: 'Table header for request',
  },
  tableType: {
    id: 'app.pendingRequests.table.type',
    defaultMessage: 'Type',
    description: 'Table header for type',
  },
  tableStatus: {
    id: 'app.pendingRequests.table.status',
    defaultMessage: 'Status',
    description: 'Table header for status',
  },
  tableSubmitted: {
    id: 'app.pendingRequests.table.submitted',
    defaultMessage: 'Submitted',
    description: 'Table header for submitted',
  },
  tableActions: {
    id: 'app.pendingRequests.table.actions',
    defaultMessage: 'Actions',
    description: 'Table header for actions',
  },
  empty: {
    id: 'app.pendingRequests.empty',
    defaultMessage: 'No pending requests found.',
    description: 'Empty state message for pending requests',
  },
  viewRequest: {
    id: 'app.pendingRequests.actions.view',
    defaultMessage: 'View request',
    description: 'Accessible label for view request button',
  },
});

export default messages;

