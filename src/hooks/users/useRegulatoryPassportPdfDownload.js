import { useIntl } from '@edx/frontend-platform/i18n';
import { useCallback, useState } from 'react';
import { useToast } from '../../components/toast/ToastProvider';
import regulatoryPassportMessages from '../../pages/users/regulatoryPassportMessages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import downloadRegulatoryPassportPdf from '../../utils/regulatoryPassport/downloadRegulatoryPassportPdf';

/**
 * @returns {{
 *   downloadPassport: (params: {
 *     detail: object,
 *     profileImageUrl?: string,
 *     domainCoverage?: Array<object>,
 *     userId?: string|number|null,
 *   }) => Promise<void>,
 *   isExporting: boolean,
 * }}
 */
const useRegulatoryPassportPdfDownload = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const downloadPassport = useCallback(async ({
    detail,
    profileImageUrl = '',
    domainCoverage = [],
    userId = null,
  }) => {
    if (!detail) {
      return;
    }

    setIsExporting(true);

    try {
      await downloadRegulatoryPassportPdf({
        formatMessage,
        detail,
        profileImageUrl,
        domainCoverage,
        userId,
      });

      showToast({
        title: formatMessage(regulatoryPassportMessages.exportDownloadSuccessTitle),
        description: formatMessage(regulatoryPassportMessages.exportDownloadSuccessDescription),
      });
    } catch (error) {
      showToast({
        title: formatMessage(regulatoryPassportMessages.exportDownloadErrorTitle),
        description: hasDisplayValue(error?.message)
          ? error.message
          : formatMessage(regulatoryPassportMessages.exportDownloadError),
      });
    } finally {
      setIsExporting(false);
    }
  }, [formatMessage, showToast]);

  return {
    downloadPassport,
    isExporting,
  };
};

export default useRegulatoryPassportPdfDownload;
