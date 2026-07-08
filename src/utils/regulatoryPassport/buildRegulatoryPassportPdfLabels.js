import regulatoryPassportMessages from '../../pages/users/regulatoryPassportMessages';

/**
 * @param {Function} formatMessage
 */
const buildRegulatoryPassportPdfLabels = (formatMessage) => ({
  passportIdLabel: formatMessage(regulatoryPassportMessages.passportIdLabel),
  aboutTitle: formatMessage(regulatoryPassportMessages.aboutTitle),
  competencyRoleLabel: formatMessage(regulatoryPassportMessages.competencyRoleLabel),
  domainCoverageTitle: formatMessage(regulatoryPassportMessages.domainCoverageTitle),
  completedTrainingTitle: formatMessage(regulatoryPassportMessages.completedTrainingTitle),
  completedTrainingsEmpty: formatMessage(regulatoryPassportMessages.completedTrainingsEmpty),
  tableTraining: formatMessage(regulatoryPassportMessages.tableTraining),
  tableProvider: formatMessage(regulatoryPassportMessages.tableProvider),
  tableCompleted: formatMessage(regulatoryPassportMessages.tableCompleted),
  tableActivities: formatMessage(regulatoryPassportMessages.tableActivities),
  tableRemoteType: formatMessage(regulatoryPassportMessages.tableRemoteType),
  tableCertificate: formatMessage(regulatoryPassportMessages.tableCertificate),
  certificateView: formatMessage(regulatoryPassportMessages.certificateView),
  domainCoverageEmpty: formatMessage(regulatoryPassportMessages.domainCoverageEmpty),
});

export default buildRegulatoryPassportPdfLabels;
