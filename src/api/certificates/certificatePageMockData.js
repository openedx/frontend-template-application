import certificatesMock from '../../mock/certificates/certificates.json';
import { mapCertificateDetail, normalizeCertificateResults } from './certificateUtils';

const certificateCatalog = normalizeCertificateResults(certificatesMock.results);

/**
 * @param {string|number} certificateId
 */
export const resolveCertificateDetailMock = (certificateId) => {
  if (certificateId == null || certificateId === '') {
    return null;
  }

  const row = certificateCatalog.find((item) => String(item.id) === String(certificateId));
  return row ?? mapCertificateDetail(
    certificatesMock.results?.find((item) => String(item.id) === String(certificateId)),
  );
};
