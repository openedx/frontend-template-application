import { fetchCorePermissions } from '../api/corePermissions/corePermissionsApi';
import { pickActiveRoleFromPayload } from '../api/corePermissions/corePermissionsUtils';
import secretariatRolePayload from '../data/userRole/secretariat.json';
import trainingProviderRolePayload from '../data/userRole/training-provider.json';
import superUserRolePayload from '../data/userRole/super-user.json';

/**
 * Permissions plug-in — edit only the block below.
 *
 * ROLE_DATA_SOURCE
 *   'api'   → GET /api/v1/core-permissions/ (never falls back to local files)
 *   'local' → JSON from src/data/userRole/ (never calls the API)
 *
 * LOCAL_ROLE_DATA_KEY — which local file when source is 'local'
 *   'super-user' | 'secretariat' | 'training-provider'
 *
 * If the chosen source returns no row in `results` (or the API fails), the app
 * applies empty permissions: only pages/components that do not require permissions
 * stay available (see hasNavbarAccessForPath in App.jsx).
 */

// ─── Permissions plug-in (change here only) ───────────────────────────────────
/** @type {'api' | 'local'} */
export const ROLE_DATA_SOURCE = 'api';

/** @type {'super-user' | 'secretariat' | 'training-provider'} */
export const LOCAL_ROLE_DATA_KEY = 'super-user';
// ─────────────────────────────────────────────────────────────────────────────

/** Index inside `results` when multiple rows are returned. */
export const LOCAL_ROLE_RESULT_INDEX = 0;

const LOCAL_ROLE_PAYLOADS = {
  'super-user': superUserRolePayload,
  secretariat: secretariatRolePayload,
  'training-provider': trainingProviderRolePayload,
};

const getLocalRolePayload = () => LOCAL_ROLE_PAYLOADS[LOCAL_ROLE_DATA_KEY] ?? superUserRolePayload;

/**
 * @param {{ results?: Array<object> }} payload
 * @param {{ resultIndex?: number, userRole?: string|null }} [options]
 * @returns {object|null}
 */
export const resolveActiveRoleData = (payload, options) => (
  pickActiveRoleFromPayload(payload, {
    resultIndex: options?.resultIndex ?? LOCAL_ROLE_RESULT_INDEX,
    userRole: options?.userRole ?? null,
  })
);

/**
 * Synchronous role row for initial React state (local source with valid data only).
 * @returns {object|null}
 */
export const getInitialRoleData = () => {
  if (ROLE_DATA_SOURCE !== 'local') {
    return null;
  }

  return resolveActiveRoleData(getLocalRolePayload());
};

/**
 * Loads permissions from the configured source only (no cross-source fallback).
 *
 * @param {{ formatMessage?: Function, userRole?: string|null }} [params]
 * @returns {Promise<object|null>} Role row, or null → use empty / deny-all permissions
 */
export const fetchActiveRoleData = async ({ formatMessage, userRole = null } = {}) => {
  if (ROLE_DATA_SOURCE === 'local') {
    return resolveActiveRoleData(getLocalRolePayload(), { userRole });
  }

  if (!formatMessage) {
    return null;
  }

  const result = await fetchCorePermissions({ formatMessage });

  if (!result.ok) {
    return null;
  }

  return resolveActiveRoleData(result.data, { userRole });
};

export const ROLE_DATA_BY_SLUG = Object.fromEntries(
  Object.entries(LOCAL_ROLE_PAYLOADS).map(([slug, payload]) => [
    slug,
    resolveActiveRoleData(payload),
  ]),
);

export {
  secretariatRolePayload as secretariatRoleData,
  trainingProviderRolePayload as trainingProviderRoleData,
  superUserRolePayload as superUserRoleData,
};
