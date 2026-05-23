import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  submittedBy: {
    id: 'app.pendingRequests.detail.submittedBy',
    defaultMessage: 'Submitted by',
    description: 'Section title: submitted by',
  },
  description: {
    id: 'app.pendingRequests.detail.description',
    defaultMessage: 'Description',
    description: 'Section title: description',
  },
  approve: {
    id: 'app.pendingRequests.detail.actions.approve',
    defaultMessage: 'Approve',
    description: 'Approve button label',
  },
  reject: {
    id: 'app.pendingRequests.detail.actions.reject',
    defaultMessage: 'Reject',
    description: 'Reject button label',
  },
  close: {
    id: 'app.pendingRequests.detail.actions.close',
    defaultMessage: 'Close',
    description: 'Close button label',
  },
  toastApprovedTitle: {
    id: 'app.pendingRequests.detail.toast.approved.title',
    defaultMessage: 'Request approved',
    description: 'Toast title when request approved',
  },
  toastApprovedDescription: {
    id: 'app.pendingRequests.detail.toast.approved.description',
    defaultMessage: '{title} has been approved.',
    description: 'Toast description when request approved',
  },
  toastRejectedTitle: {
    id: 'app.pendingRequests.detail.toast.rejected.title',
    defaultMessage: 'Request rejected',
    description: 'Toast title when request rejected',
  },
  toastRejectedDescription: {
    id: 'app.pendingRequests.detail.toast.rejected.description',
    defaultMessage: '{title} has been rejected.',
    description: 'Toast description when request rejected',
  },
  toastClosedTitle: {
    id: 'app.pendingRequests.detail.toast.closed.title',
    defaultMessage: 'Request closed',
    description: 'Toast title when request closed',
  },
  toastClosedDescription: {
    id: 'app.pendingRequests.detail.toast.closed.description',
    defaultMessage: '{title} has been closed.',
    description: 'Toast description when request closed',
  },
});

export default messages;

