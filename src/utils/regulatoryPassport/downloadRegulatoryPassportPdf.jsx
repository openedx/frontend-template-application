import { pdf } from '@react-pdf/renderer';
import RegulatoryPassportPdfDocument from '../../components/users/regulatoryPassport/RegulatoryPassportPdfDocument';
import { hasDisplayValue } from '../hasDisplayValue';
import buildRegulatoryPassportPdfFilename from './buildRegulatoryPassportPdfFilename';
import buildRegulatoryPassportPdfLabels from './buildRegulatoryPassportPdfLabels';
import fetchAllRegulatoryPassportCompletedTrainings from './fetchAllRegulatoryPassportCompletedTrainings';
import fetchRegulatoryPassportPdfLogo from './fetchRegulatoryPassportPdfLogo';
import loadImageDataUrl from './loadImageDataUrl';

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
    fetchRegulatoryPassportPdfLogo({ formatMessage }),
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
