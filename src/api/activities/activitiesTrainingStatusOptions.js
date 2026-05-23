import activitiesMessages from '../../pages/activities/messages';

/** Local training-status filter options (not from API). */
export const ACTIVITY_TRAINING_STATUS_OPTION_DEFS = [
  {
    id: 'all',
    value: 'all',
    message: activitiesMessages.trainingStatusAll,
  },
  {
    id: 'training-available',
    value: 'training-available',
    message: activitiesMessages.trainingStatusAvailable,
  },
  {
    id: 'training-not-available',
    value: 'training-not-available',
    message: activitiesMessages.trainingStatusNotAvailable,
  },
];

/**
 * @param {import('@edx/frontend-platform/i18n').IntlShape['formatMessage']} formatMessage
 */
export const buildActivityTrainingStatusDropdownOptions = (formatMessage) => (
  ACTIVITY_TRAINING_STATUS_OPTION_DEFS.map(({ value, message }) => ({
    value,
    label: formatMessage(message),
  }))
);
