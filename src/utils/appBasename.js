import { getConfig } from '@edx/frontend-platform';

const FALLBACK_BASENAME = '/';

/**
 * Normalize a PUBLIC_PATH / basename for React Router v6.
 * Basename should omit a trailing slash except for root `/`.
 *
 * @param {string|undefined|null} publicPath
 * @returns {string}
 */
export const normalizeRouterBasename = (publicPath) => {
  if (typeof publicPath !== 'string' || !publicPath.trim()) {
    return FALLBACK_BASENAME;
  }

  let path = publicPath.trim();

  // Absolute URL (rare) → keep pathname only.
  if (/^https?:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname || FALLBACK_BASENAME;
    } catch {
      return FALLBACK_BASENAME;
    }
  }

  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  if (path === '/') {
    return FALLBACK_BASENAME;
  }

  return path.replace(/\/+$/, '') || FALLBACK_BASENAME;
};

/**
 * Resolve the MFE router basename from frontend-platform config (`PUBLIC_PATH`).
 * Example: PUBLIC_PATH=/searn-lms/ → basename=/searn-lms
 *
 * Keep `ADMIN_PATHS` app-relative (`/admin/...`). `BrowserRouter` basename mounts
 * them under the MFE path so URLs become `/searn-lms/admin/...`.
 *
 * @returns {string}
 */
export const getAppBasename = () => {
  try {
    return normalizeRouterBasename(getConfig()?.PUBLIC_PATH);
  } catch {
    return FALLBACK_BASENAME;
  }
};

export default getAppBasename;
