import quickActionsMock from '../../mock/dashboard/quickActions.json';
import recentTrainingCompletionsMock from '../../mock/dashboard/recentTrainingCompletions.json';
import { ADMIN_PATHS } from '../../utils/adminPaths';

/** @returns {Array<object>} */
export const resolveDashboardQuickActionsMock = () => (
  Array.isArray(quickActionsMock?.results) ? quickActionsMock.results : []
);

/** @returns {{ items: Array<object>, viewAllHref: string|null }} */
export const resolveDashboardRecentTrainingCompletionsMock = () => ({
  items: Array.isArray(recentTrainingCompletionsMock?.results)
    ? recentTrainingCompletionsMock.results
    : [],
  // `viewAllHref` is intentionally not driven by mock/API payload.
  // It should always route to the My Trainings page.
  viewAllHref: ADMIN_PATHS.myTraining,
});
