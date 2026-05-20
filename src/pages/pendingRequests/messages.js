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
  filtersLoadError: {
    id: 'app.pendingRequests.filters.loadError',
    defaultMessage: 'Unable to load request type filters. Please try again.',
    description: 'Fallback when pending request filters API fails',
  },
  listLoadError: {
    id: 'app.pendingRequests.list.loadError',
    defaultMessage: 'Unable to load pending requests. Please try again.',
    description: 'Fallback when pending requests list API fails',
  },
  listErrorTitle: {
    id: 'app.pendingRequests.list.errorTitle',
    defaultMessage: 'Pending requests unavailable',
    description: 'Toast title when pending requests list API fails',
  },
  filtersErrorTitle: {
    id: 'app.pendingRequests.filters.errorTitle',
    defaultMessage: 'Filters unavailable',
    description: 'Toast title when pending request filters API fails',
  },
  detailLoadError: {
    id: 'app.pendingRequests.detail.loadError',
    defaultMessage: 'Unable to load this request. Please try again.',
    description: 'Fallback when pending request detail API fails',
  },
  detailErrorTitle: {
    id: 'app.pendingRequests.detail.errorTitle',
    defaultMessage: 'Request unavailable',
    description: 'Toast title when pending request detail API fails',
  },
  actionErrorTitle: {
    id: 'app.pendingRequests.action.errorTitle',
    defaultMessage: 'Update failed',
    description: 'Toast title when pending request action PATCH fails',
  },
  actionError: {
    id: 'app.pendingRequests.action.error',
    defaultMessage: 'Unable to update this request. Please try again.',
    description: 'Fallback when pending request action PATCH fails',
  },
  notFound: {
    id: 'app.pendingRequests.detail.notFound',
    defaultMessage: 'Request not found.',
    description: 'Empty state when pending request detail is missing',
  },
  statusPending: {
    id: 'app.pendingRequests.status.pending',
    defaultMessage: 'Pending',
    description: 'Status label for pending requests',
  },
  statusApproved: {
    id: 'app.pendingRequests.status.approved',
    defaultMessage: 'Approved',
    description: 'Status label for approved requests',
  },
  statusRejected: {
    id: 'app.pendingRequests.status.rejected',
    defaultMessage: 'Rejected',
    description: 'Status label for rejected requests',
  },
  statusClosed: {
    id: 'app.pendingRequests.status.closed',
    defaultMessage: 'Closed',
    description: 'Status label for closed requests',
  },
});

export default messages;

