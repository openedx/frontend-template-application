import {
  DASHBOARD_NRA_ADMIN_RECENT_ACTIVITY,
  DASHBOARD_NRA_MANAGER_QUICK_ACTIONS,
  DASHBOARD_NRA_MANAGER_RECENT_ACTIVITY,
  DASHBOARD_NRA_STAFF_COMPLETED_TRAININGS,
  DASHBOARD_NRA_STAFF_RECENT_ACTIVITY,
  DASHBOARD_QUICK_ACTIONS,
  DASHBOARD_RECENT_TRAINING_COMPLETIONS,
} from '../endpoints';

/**
 * @param {string|null|undefined} userRole
 * @returns {string}
 */
export const resolveDashboardRecentActivityEndpoint = (userRole) => {
  if (userRole === 'nra-staff') {
    return DASHBOARD_NRA_STAFF_RECENT_ACTIVITY;
  }

  if (userRole === 'nra-manager') {
    return DASHBOARD_NRA_MANAGER_RECENT_ACTIVITY;
  }

  return DASHBOARD_NRA_ADMIN_RECENT_ACTIVITY;
};

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
export const resolveDashboardCompletedTrainingsEndpoint = (userRole) => (
  userRole === 'nra-staff'
    ? DASHBOARD_NRA_STAFF_COMPLETED_TRAININGS
    : DASHBOARD_RECENT_TRAINING_COMPLETIONS
);

/**
 * @param {string|null|undefined} userRole
 * @returns {string}
 */
export const resolveDashboardRecentActivityScope = (userRole) => {
  if (userRole === 'nra-staff') {
    return 'nra-staff';
  }

  if (userRole === 'nra-manager') {
    return 'nra-manager';
  }

  return 'nra-admin';
};

/**
 * @param {string|null|undefined} userRole
 * @returns {string}
 */
export const resolveDashboardQuickActionsScope = (userRole) => (
  userRole === 'nra-manager' ? 'nra-manager' : 'default'
);

/**
 * @param {string|null|undefined} userRole
 * @returns {string}
 */
export const resolveDashboardCompletedTrainingsScope = (userRole) => (
  userRole === 'nra-staff' ? 'nra-staff' : 'default'
);
