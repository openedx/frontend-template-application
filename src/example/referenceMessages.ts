import { defineMessages } from '@edx/frontend-platform/i18n';

const referenceMessages = defineMessages({
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

export default referenceMessages;
