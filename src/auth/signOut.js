import { getConfig } from '@edx/frontend-platform';

const buildLmsUrl = (baseUrl, path) => {
  try {
    return new URL(path, baseUrl).toString();
  } catch {
    return '';
  }
};

/**
 * Ends the Open edX session via LMS logout and redirects to the login page.
 */
export const signOutAndRedirectToLogin = () => {
  const config = getConfig();
  const loginUrl = config.LOGIN_URL || buildLmsUrl(config.LMS_BASE_URL || '', '/login') || '';
  const logoutUrl = config.LOGOUT_URL || buildLmsUrl(config.LMS_BASE_URL || '', '/logout') || '';

  if (!logoutUrl) {
    if (loginUrl) {
      window.location.replace(loginUrl);
    }
    return;
  }

  const separator = logoutUrl.includes('?') ? '&' : '?';
  const destination = loginUrl
    ? `${logoutUrl}${separator}redirect_to=${encodeURIComponent(loginUrl)}`
    : logoutUrl;

  window.location.replace(destination);
};
