import { getConfig } from '@edx/frontend-platform';

const hasCookie = (cookieName) => (
  document.cookie
    .split(';')
    .some(cookie => cookie.trim().startsWith(`${cookieName}=`))
);

const buildLoginUrl = (loginUrl, nextUrl) => {
  const separator = loginUrl.includes('?') ? '&' : '?';
  return `${loginUrl}${separator}next=${encodeURIComponent(nextUrl)}`;
};

const buildLmsLoginUrl = (lmsBaseUrl) => {
  try {
    return new URL('/login', lmsBaseUrl).toString();
  } catch {
    return '';
  }
};

export default function redirectToLoginIfUnauthenticated() {
  const config = getConfig();
  const tokenCookieName = config.ACCESS_TOKEN_COOKIE_NAME;
  const userInfoCookieName = config.USER_INFO_COOKIE_NAME;
  const loginUrl = config.LOGIN_URL || buildLmsLoginUrl(config.LMS_BASE_URL || '') || '';
  const redirectUrl = buildLoginUrl(loginUrl, window.location.href);

  if (!loginUrl) {
    return false;
  }

  const hasTokenCookie = tokenCookieName ? hasCookie(tokenCookieName) : false;
  const hasUserInfoCookie = userInfoCookieName ? hasCookie(userInfoCookieName) : false;

  if (hasTokenCookie || hasUserInfoCookie) {
    return false;
  }

  window.location.replace(redirectUrl);
  return true;
}
