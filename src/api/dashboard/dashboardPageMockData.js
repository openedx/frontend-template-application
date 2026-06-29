import recentActivitiesMock from '../../mock/dashboard/recentActivities.json';
import popularTrainingsMock from '../../mock/dashboard/popularTrainings.json';
import quickActionsMock from '../../mock/dashboard/quickActions.json';
import recentTrainingCompletionsMock from '../../mock/dashboard/recentTrainingCompletions.json';
import { ADMIN_PATHS } from '../../utils/adminPaths';

/** @returns {Array<{ id: string, userName: string, userProfileImage: string, action: string, target: string, timeAgo: string }>} */
export const resolveDashboardRecentActivitiesMock = () => (
  Array.isArray(recentActivitiesMock?.results) ? recentActivitiesMock.results : []
);

/** @returns {Array<{ id: string, name: string, completedCount: number }>} */
export const resolveDashboardPopularTrainingsMock = () => (
  Array.isArray(popularTrainingsMock?.results) ? popularTrainingsMock.results : []
);

/** @returns {Array<{ id: string, label: string, description: string, href: string, icon: string, iconBackground: string }>} */
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
