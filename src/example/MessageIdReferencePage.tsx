import { useIntl, defineMessages } from '@edx/frontend-platform/i18n';
import { Button, Container } from '@openedx/paragon';

const messages = defineMessages({
  heading: {
    id: 'app.reference.page.heading.text',
    defaultMessage: 'Message ID Reference',
    description: 'Heading for the i18n reference page',
  },
  paragraph: {
    id: 'app.reference.page.paragraph.text',
    defaultMessage: 'Use message IDs for all user-facing text in this application.',
    description: 'Body copy for the i18n reference page',
  },
  primaryButton: {
    id: 'app.reference.page.primaryButton.label',
    defaultMessage: 'Primary Action',
    description: 'Primary action button label on the reference page',
  },
  secondaryButton: {
    id: 'app.reference.page.secondaryButton.label',
    defaultMessage: 'Secondary Action',
    description: 'Secondary action button label on the reference page',
  },
});

const MessageIdReferencePage = () => {
  const intl = useIntl();

  return (
    <main>
      <Container className="py-5">
        <h2>{intl.formatMessage(messages.heading)}</h2>
        <p>{intl.formatMessage(messages.paragraph)}</p>
        <div className="d-flex gap-2">
          <Button variant="primary">
            {intl.formatMessage(messages.primaryButton)}
          </Button>
          <Button variant="outline-primary">
            {intl.formatMessage(messages.secondaryButton)}
          </Button>
        </div>
      </Container>
    </main>
  );
};

export default MessageIdReferencePage;
