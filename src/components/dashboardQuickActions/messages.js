import { defineMessages } from '@edx/frontend-platform/i18n';

export default defineMessages({
  title: {
    id: 'app.dashboard.quickActions.title',
    defaultMessage: 'Quick Actions',
    description: 'Title for quick actions card on the dashboard',
  },
  subtitle: {
    id: 'app.dashboard.quickActions.subtitle',
    defaultMessage: 'Shortcuts to common tasks',
    description: 'Subtitle for quick actions card on the dashboard',
  },
  empty: {
    id: 'app.dashboard.quickActions.empty',
    defaultMessage: 'No quick actions available.',
    description: 'Empty state when quick actions list has no rows',
  },
});
