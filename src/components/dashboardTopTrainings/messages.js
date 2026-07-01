import { defineMessages } from '@edx/frontend-platform/i18n';

export default defineMessages({
  title: {
    id: 'app.dashboard.topTrainings.title',
    defaultMessage: 'Our Top Trainings',
    description: 'Title for top trainings table on the dashboard',
  },
  columnTraining: {
    id: 'app.dashboard.topTrainings.column.training',
    defaultMessage: 'Training',
    description: 'Training column header in top trainings table',
  },
  columnLearners: {
    id: 'app.dashboard.topTrainings.column.learners',
    defaultMessage: 'Learners',
    description: 'Learners column header in top trainings table',
  },
  columnRating: {
    id: 'app.dashboard.topTrainings.column.rating',
    defaultMessage: 'Rating',
    description: 'Rating column header in top trainings table',
  },
  empty: {
    id: 'app.dashboard.topTrainings.empty',
    defaultMessage: 'No top trainings to display.',
    description: 'Empty state when top trainings list has no displayable rows',
  },
  ratingUnavailable: {
    id: 'app.dashboard.topTrainings.ratingUnavailable',
    defaultMessage: '-',
    description: 'Placeholder when a training has no rating',
  },
});
