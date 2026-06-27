import { defineMessages } from '@edx/frontend-platform/i18n';

export default defineMessages({
  title: {
    id: 'app.dashboard.popularTrainings.title',
    defaultMessage: 'Popular Trainings',
    description: 'Title for popular trainings card on the dashboard',
  },
  subtitle: {
    id: 'app.dashboard.popularTrainings.subtitle',
    defaultMessage: 'Most completed trainings',
    description: 'Subtitle for popular trainings card on the dashboard',
  },
  completedBadge: {
    id: 'app.dashboard.popularTrainings.completedBadge',
    defaultMessage: '{count} completed',
    description: 'Badge showing how many learners completed a training',
  },
  empty: {
    id: 'app.dashboard.popularTrainings.empty',
    defaultMessage: 'No popular trainings to show.',
    description: 'Empty state when popular trainings list has no rows',
  },
});
