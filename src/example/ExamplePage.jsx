import { useIntl } from '@edx/frontend-platform/i18n';
import { Container } from '@openedx/paragon';
import messages from './messages';

const ExamplePage = () => {
  const intl = useIntl();

  return (
    <main>
      <Container className="py-5">
        <h1>{intl.formatMessage(messages.heading)}</h1>
        <p>{intl.formatMessage(messages.description)}</p>
      </Container>
    </main>
  );
};

export default ExamplePage;
