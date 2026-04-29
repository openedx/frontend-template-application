import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Container } from '@openedx/paragon';
import messages from './referenceMessages';

const MessageIdReferencePage = () => {
  const { formatMessage } = useIntl();

  return (
    <main>
      <Container className="py-5">
        <h2>{formatMessage(messages.heading)}</h2>
        <p>{formatMessage(messages.paragraph)}</p>
        <div className="d-flex gap-2">
          <Button variant="primary">
            {formatMessage(messages.primaryButton)}
          </Button>
          <Button variant="outline-primary">
            {formatMessage(messages.secondaryButton)}
          </Button>
        </div>
      </Container>
    </main>
  );
};

export default MessageIdReferencePage;
