import { ADMIN_PATHS } from './adminPaths';

/**
 * Routes that do not require navbarAccess / loaded permissions.
 * Keep in sync with App.jsx route definitions (no withAccess guard).
 */

export const PUBLIC_ADMIN_ROUTE_PREFIXES = [
  ADMIN_PATHS.dashboard,
  ADMIN_PATHS.trainingCatalog,
  ADMIN_PATHS.requestedTrainings,
  ADMIN_PATHS.profile,
];

/**
 * @param {string} pathname
 */
export const isPublicAdminRoute = (pathname) => (
  PUBLIC_ADMIN_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix.replace(/\/$/, '')))
);
