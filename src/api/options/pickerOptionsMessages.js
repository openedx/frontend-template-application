import { defineMessages } from '@edx/frontend-platform/i18n';

const pickerOptionsMessages = defineMessages({
  requestedTrainingStatusFiltersLoadError: {
    id: 'app.pickerOptions.requestedTrainingStatusFilters.loadError',
    defaultMessage: 'Unable to load status filters. Please try again.',
    description: 'Fallback when requested training status filters API fails',
  },
  requestedTrainingActivitiesLoadError: {
    id: 'app.pickerOptions.requestedTrainingActivities.loadError',
    defaultMessage: 'Unable to load activities. Please try again.',
    description: 'Fallback when requested training activities picker API fails',
  },
});

export default pickerOptionsMessages;
