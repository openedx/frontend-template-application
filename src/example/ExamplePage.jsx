import { useIntl } from '@edx/frontend-platform/i18n';
import { Container } from '@openedx/paragon';
import messages from './messages';

const ExamplePage = () => {
  const { formatMessage } = useIntl();

  return (
    <main>
      <Container className="py-5">
        <h1>{formatMessage(messages.heading)}</h1>
        <p>{formatMessage(messages.description)}</p>
      </Container>
    </main>
  );
};

export default ExamplePage;
