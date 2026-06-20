import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {object} row
 */
export const mapCertificateDetail = (row) => {
  if (!row || typeof row !== 'object') {
    return null;
  }

  return {
    id: row.id,
    training: row.training ?? '',
    provider: row.provider ?? '',
    completed: row.completed ?? '',
    certificateNumber: row.certificate_number ?? row.certificateNumber ?? '',
  };
};

/**
 * @param {Array<object>} results
 */
export const normalizeCertificateResults = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapCertificateDetail)
    .filter((row) => row && hasDisplayValue(row.id));
};
