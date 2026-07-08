import { fetchRegulatoryPassportWhiteLogo } from '../../api/users/usersApi';
import { HEADER_LOGO_FALLBACK } from '../brandAssets';
import blobToDataUrl from './blobToDataUrl';

/**
 * @param {{ formatMessage: Function }} params
 * @returns {Promise<string>}
 */
const fetchRegulatoryPassportPdfLogo = async ({ formatMessage }) => {
  const result = await fetchRegulatoryPassportWhiteLogo({ formatMessage });

  if (!result.ok || !(result.data instanceof Blob) || result.data.size === 0) {
    return HEADER_LOGO_FALLBACK;
  }

  try {
    const dataUrl = await blobToDataUrl(result.data);
    return dataUrl || HEADER_LOGO_FALLBACK;
  } catch {
    return HEADER_LOGO_FALLBACK;
  }
};

export default fetchRegulatoryPassportPdfLogo;
