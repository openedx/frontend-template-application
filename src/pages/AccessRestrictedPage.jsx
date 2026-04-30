import { useIntl } from '@edx/frontend-platform/i18n';
import pageMessages from './messages';

const AccessRestrictedPage = () => {
  const { formatMessage } = useIntl();

  return (
    <section className="dashboard-panel">
      <p>{formatMessage(pageMessages.accessRestrictedMessage)}</p>
    </section>
  );
};

export default AccessRestrictedPage;
