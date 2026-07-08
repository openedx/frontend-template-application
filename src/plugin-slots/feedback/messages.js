import { defineMessages } from '@edx/frontend-platform/i18n';

const feedbackMessages = defineMessages({
  openFeedbackAria: {
    id: 'app.feedback.open.aria',
    defaultMessage: 'Open feedback form',
    description: 'ARIA label when the feedback panel is closed',
  },
  closeFeedbackAria: {
    id: 'app.feedback.close.aria',
    defaultMessage: 'Close feedback form',
    description: 'ARIA label when the feedback panel is open',
  },
  feedbackButton: {
    id: 'app.feedback.button',
    defaultMessage: 'Feedback',
    description: 'Vertical tab label when feedback form is closed',
  },
  closeButton: {
    id: 'app.feedback.close',
    defaultMessage: 'Close',
    description: 'Vertical tab label when feedback form is open',
  },
  question: {
    id: 'app.feedback.question',
    defaultMessage: "How's your experience?",
    description: 'Main feedback form question',
  },
  moodNotGood: {
    id: 'app.feedback.mood.notGood',
    defaultMessage: 'Not good',
    description: 'Mood rating label',
  },
  moodOkay: {
    id: 'app.feedback.mood.okay',
    defaultMessage: 'Okay',
    description: 'Mood rating label',
  },
  moodGood: {
    id: 'app.feedback.mood.good',
    defaultMessage: 'Good',
    description: 'Mood rating label',
  },
  moodLoveIt: {
    id: 'app.feedback.mood.loveIt',
    defaultMessage: 'Love it',
    description: 'Mood rating label',
  },
  feedbackForThisPage: {
    id: 'app.feedback.for.thisPage',
    defaultMessage: 'This page',
    description: 'Radio option for page-specific feedback',
  },
  feedbackForOverallPlatform: {
    id: 'app.feedback.for.overallPlatform',
    defaultMessage: 'Overall platform',
    description: 'Radio option for overall platform feedback',
  },
  commentsLabel: {
    id: 'app.feedback.comments.label',
    defaultMessage: 'Tell us more',
    description: 'Label above the comments textarea',
  },
  commentsPlaceholder: {
    id: 'app.feedback.comments.placeholder',
    defaultMessage: 'Please share your thoughts',
    description: 'Placeholder for the comments textarea',
  },
  submit: {
    id: 'app.feedback.submit',
    defaultMessage: 'Submit',
    description: 'Submit button label',
  },
  submitting: {
    id: 'app.feedback.submitting',
    defaultMessage: 'Submitting...',
    description: 'Submit button label while request is in progress',
  },
  successMessage: {
    id: 'app.feedback.success',
    defaultMessage: 'Thank you! Your feedback helps us make your experience even better.',
    description: 'Shown after feedback is submitted successfully',
  },
  errorMessage: {
    id: 'app.feedback.error',
    defaultMessage: 'Something went wrong. Please try again.',
    description: 'Shown when feedback submission fails',
  },
});

export default feedbackMessages;
