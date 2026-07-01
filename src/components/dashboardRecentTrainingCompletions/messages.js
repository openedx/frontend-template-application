import { defineMessages } from '@edx/frontend-platform/i18n';

export default defineMessages({
  title: {
    id: 'app.dashboard.recentTrainingCompletions.title',
    defaultMessage: 'Recent Training Completions',
    description: 'Title for recent training completions card on the dashboard',
  },
  completedOn: {
    id: 'app.dashboard.recentTrainingCompletions.completedOn',
    defaultMessage: 'Completed {date}',
    description: 'Completion date label for a training completion row',
  },
  proofBadge: {
    id: 'app.dashboard.recentTrainingCompletions.proofBadge',
    defaultMessage: 'Proof',
    description: 'Badge label when completion proof is available',
  },
  viewAll: {
    id: 'app.dashboard.recentTrainingCompletions.viewAll',
    defaultMessage: 'View all trainings',
    description: 'Footer link to view all trainings',
  },
  empty: {
    id: 'app.dashboard.recentTrainingCompletions.empty',
    defaultMessage: 'No recent training completions to show.',
    description: 'Empty state when recent training completions list has no rows',
  },
});
