import { defineMessages } from '@edx/frontend-platform/i18n';

/**
 * MFE-wide fallbacks when executeApiRequest has no API `message`/`detail`
 * and the caller omitted fallbackMessage (should be rare).
 */
const apiMessages = defineMessages({
  genericRequestError: {
    id: 'app.api.genericRequestError',
    defaultMessage: 'Something went wrong. Please try again.',
    description: 'Generic fallback when an API error response has no message or detail',
  },
});

export default apiMessages;
