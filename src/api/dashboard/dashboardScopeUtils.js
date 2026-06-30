import {
  DASHBOARD_NRA_ADMIN_RECENT_ACTIVITY,
  DASHBOARD_NRA_MANAGER_QUICK_ACTIONS,
  DASHBOARD_NRA_MANAGER_RECENT_ACTIVITY,
  DASHBOARD_QUICK_ACTIONS,
} from '../endpoints';

/**
 * @param {string|null|undefined} userRole
 * @returns {string}
 */
export const resolveDashboardRecentActivityEndpoint = (userRole) => (
  userRole === 'nra-manager'
    ? DASHBOARD_NRA_MANAGER_RECENT_ACTIVITY
    : DASHBOARD_NRA_ADMIN_RECENT_ACTIVITY
);

/**
 * @param {string|null|undefined} userRole
 * @returns {string}
 */
export const resolveDashboardQuickActionsEndpoint = (userRole) => (
  userRole === 'nra-manager'
    ? DASHBOARD_NRA_MANAGER_QUICK_ACTIONS
    : DASHBOARD_QUICK_ACTIONS
);

/**
 * @param {string|null|undefined} userRole
 * @returns {string}
 */
export const resolveDashboardRecentActivityScope = (userRole) => (
  userRole === 'nra-manager' ? 'nra-manager' : 'nra-admin'
);

/**
 * @param {string|null|undefined} userRole
 * @returns {string}
 */
export const resolveDashboardQuickActionsScope = (userRole) => (
  userRole === 'nra-manager' ? 'nra-manager' : 'default'
);
