/**
 * @param {{ name?: string, passportId?: string }} detail
 */
const buildRegulatoryPassportPdfFilename = (detail) => {
  const raw = detail?.passportId || detail?.name || 'regulatory-passport';
  const sanitized = String(raw)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${sanitized || 'regulatory-passport'}.pdf`;
};

export default buildRegulatoryPassportPdfFilename;
