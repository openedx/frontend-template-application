import { defineMessages } from '@edx/frontend-platform/i18n';

export default defineMessages({
  title: {
    id: 'app.dashboard.recentActivities.title',
    defaultMessage: 'Recent Activities',
    description: 'Title for recent activities card on the dashboard',
  },
  subtitle: {
    id: 'app.dashboard.recentActivities.subtitle',
    defaultMessage: 'Latest actions across the platform',
    description: 'Subtitle for recent activities card on the dashboard',
  },
  empty: {
    id: 'app.dashboard.recentActivities.empty',
    defaultMessage: 'No recent activities to show.',
    description: 'Empty state when recent activities list has no rows',
  },
});
