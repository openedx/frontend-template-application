import { useIntl } from '@edx/frontend-platform/i18n';
import pageMessages from './messages';

const PlaceholderPage = () => {
  const { formatMessage } = useIntl();

  return (
    <section className="dashboard-panel">
      <h2>{formatMessage(pageMessages.placeholderHeading)}</h2>
      <p>{formatMessage(pageMessages.placeholderDescription)}</p>
    </section>
  );
};

export default PlaceholderPage;
