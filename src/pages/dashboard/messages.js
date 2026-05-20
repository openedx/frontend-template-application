import { defineMessages } from '@edx/frontend-platform/i18n';

export default defineMessages({
  statsLoadError: {
    id: 'app.dashboard.stats.loadError',
    defaultMessage: 'Unable to load dashboard statistics.',
    description: 'Fallback when dashboard stats API fails without a detail message',
  },
  statsLoading: {
    id: 'app.dashboard.stats.loading',
    defaultMessage: 'Loading statistics…',
    description: 'Loading state for dashboard stats',
  },
  usersPerCountryLoadError: {
    id: 'app.dashboard.usersPerCountry.loadError',
    defaultMessage: 'Unable to load users per country data.',
    description: 'Fallback when users-per-country API fails without a detail message',
  },
  usersPerCountryLoading: {
    id: 'app.dashboard.usersPerCountry.loading',
    defaultMessage: 'Loading users per country…',
    description: 'Loading state for users per country chart',
  },
  topRequestedActivitiesLoadError: {
    id: 'app.dashboard.topRequestedActivities.loadError',
    defaultMessage: 'Unable to load top requested activities.',
    description: 'Fallback when top-requested-activities API fails without a detail message',
  },
  topRequestedActivitiesLoading: {
    id: 'app.dashboard.topRequestedActivities.loading',
    defaultMessage: 'Loading top requested activities…',
    description: 'Loading state for top requested activities card',
  },
  pendingRequestsLoadError: {
    id: 'app.dashboard.pendingRequests.loadError',
    defaultMessage: 'Unable to load pending requests.',
    description: 'Fallback when pending-requests API fails without a detail message',
  },
  pendingRequestsLoading: {
    id: 'app.dashboard.pendingRequests.loading',
    defaultMessage: 'Loading pending requests…',
    description: 'Loading state for pending requests card',
  },
});
