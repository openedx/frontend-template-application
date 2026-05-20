import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

/**
 * Shared authenticated HTTP client for all API modules.
 * Do not call getAuthenticatedHttpClient() from page components.
 */
export const getHttpClient = () => getAuthenticatedHttpClient();

/**
 * LMS / platform API origin (trailing slash stripped).
 */
export const getApiBaseUrl = () => {
  const baseUrl = getConfig().LMS_BASE_URL || '';
  return baseUrl.replace(/\/$/, '');
};
