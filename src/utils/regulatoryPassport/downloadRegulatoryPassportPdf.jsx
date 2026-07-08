import { pdf } from '@react-pdf/renderer';
import RegulatoryPassportPdfDocument from '../../components/users/regulatoryPassport/RegulatoryPassportPdfDocument';
import { HEADER_LOGO_FALLBACK, resolveWhiteLogoSrc } from '../brandAssets';
import { hasDisplayValue } from '../hasDisplayValue';
import buildRegulatoryPassportPdfFilename from './buildRegulatoryPassportPdfFilename';
import buildRegulatoryPassportPdfLabels from './buildRegulatoryPassportPdfLabels';
import fetchAllRegulatoryPassportCompletedTrainings from './fetchAllRegulatoryPassportCompletedTrainings';
import loadImageDataUrl from './loadImageDataUrl';

const resolvePdfLogoSrc = async () => {
  const configured = resolveWhiteLogoSrc();

  if (typeof configured === 'string' && /^https?:\/\//i.test(configured)) {
    const dataUrl = await loadImageDataUrl(configured);
    return dataUrl || HEADER_LOGO_FALLBACK;
  }

  return configured || HEADER_LOGO_FALLBACK;
};

/**
 * @param {{
 *   formatMessage: Function,
 *   detail: object,
 *   profileImageUrl?: string,
 *   domainCoverage?: Array<object>,
 *   userId?: string|number|null,
 * }} params
 */
const downloadRegulatoryPassportPdf = async ({
  formatMessage,
  detail,
  profileImageUrl = '',
  domainCoverage = [],
  userId = null,
}) => {
  const [logoSrc, profileImageSrc, completedTrainings] = await Promise.all([
    resolvePdfLogoSrc(),
    hasDisplayValue(profileImageUrl) ? loadImageDataUrl(profileImageUrl) : Promise.resolve(null),
    fetchAllRegulatoryPassportCompletedTrainings({ formatMessage, userId }),
  ]);

  const labels = buildRegulatoryPassportPdfLabels(formatMessage);
  const blob = await pdf(
    <RegulatoryPassportPdfDocument
      detail={detail}
      labels={labels}
      logoSrc={logoSrc}
      profileImageSrc={profileImageSrc}
      domainCoverage={domainCoverage}
      completedTrainings={completedTrainings}
    />,
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = buildRegulatoryPassportPdfFilename(detail);
  link.click();
  URL.revokeObjectURL(url);
};

export default downloadRegulatoryPassportPdf;
