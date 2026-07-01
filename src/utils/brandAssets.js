import { getConfig } from '@edx/frontend-platform';

import headerLogoFallback from '../assets/images/searn-logo.png';

/** Local header logo (same asset as frontend-app-public header fallback). */
export const HEADER_LOGO_FALLBACK = headerLogoFallback;

const normalizeConfigUrl = (url) => {
  if (typeof url !== 'string') {
    return '';
  }
  return url.trim();
};

/** Primary header logo from MFE config LOGO_URL, else local SEARN logo. */
export const resolveHeaderLogoSrc = () => {
  const { LOGO_URL: logoUrl } = getConfig();
  const configured = normalizeConfigUrl(logoUrl);
  return configured || HEADER_LOGO_FALLBACK;
};
