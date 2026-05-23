import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  headerHint: {
    id: 'app.profile.header.hint',
    defaultMessage: 'Click the camera icon on your photo to change it.',
    description: 'Hint text under profile summary',
  },
  uploadPhoto: {
    id: 'app.profile.actions.uploadPhoto',
    defaultMessage: 'Upload photo',
    description: 'Accessible label for upload photo button',
  },
  personalInfo: {
    id: 'app.profile.section.personalInfo',
    defaultMessage: 'Personal Information',
    description: 'Section title for personal information',
  },
  fullName: {
    id: 'app.profile.fields.fullName.label',
    defaultMessage: 'Full Name',
    description: 'Label for full name field',
  },
  fullNamePlaceholder: {
    id: 'app.profile.fields.fullName.placeholder',
    defaultMessage: 'Your full name',
    description: 'Placeholder for full name input',
  },
  location: {
    id: 'app.profile.fields.location.label',
    defaultMessage: 'Location / Country',
    description: 'Label for location field',
  },
  language: {
    id: 'app.profile.fields.language.label',
    defaultMessage: 'Language',
    description: 'Label for language field',
  },
  about: {
    id: 'app.profile.fields.about.label',
    defaultMessage: 'About',
    description: 'Label for about field',
  },
  aboutPlaceholder: {
    id: 'app.profile.fields.about.placeholder',
    defaultMessage: 'Tell others about your role, expertise, and interests...',
    description: 'Placeholder for about textarea',
  },
  aboutHelper: {
    id: 'app.profile.fields.about.helper',
    defaultMessage: 'Brief summary visible on your Regulatory Passport.',
    description: 'Helper text for about field',
  },
  cancel: {
    id: 'app.profile.actions.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label',
  },
  save: {
    id: 'app.profile.actions.save',
    defaultMessage: 'Save Changes',
    description: 'Save changes button label',
  },
  toastSavedTitle: {
    id: 'app.profile.toast.saved.title',
    defaultMessage: 'Profile updated',
    description: 'Toast title for profile save',
  },
  toastSavedDescription: {
    id: 'app.profile.toast.saved.description',
    defaultMessage: 'Your profile changes have been saved.',
    description: 'Toast description for profile save',
  },
  profileLoadError: {
    id: 'app.profile.load.error',
    defaultMessage: 'Unable to load your profile. Please try again.',
    description: 'Fallback when profile GET API fails',
  },
  languagesLoadError: {
    id: 'app.profile.languages.loadError',
    defaultMessage: 'Unable to load languages. Please try again.',
    description: 'Fallback when languages API fails',
  },
  profileSaveError: {
    id: 'app.profile.save.error',
    defaultMessage: 'Unable to save your profile. Please try again.',
    description: 'Fallback when profile PATCH API fails',
  },
  profileErrorTitle: {
    id: 'app.profile.error.title',
    defaultMessage: 'Profile unavailable',
    description: 'Toast title when profile load fails',
  },
  saveErrorTitle: {
    id: 'app.profile.save.errorTitle',
    defaultMessage: 'Save failed',
    description: 'Toast title when profile save fails',
  },
  countryPlaceholder: {
    id: 'app.profile.fields.country.placeholder',
    defaultMessage: 'Select country',
    description: 'Placeholder for country dropdown',
  },
  countrySearchPlaceholder: {
    id: 'app.profile.fields.country.search',
    defaultMessage: 'Search countries...',
    description: 'Search placeholder for country dropdown',
  },
  countryNoOptions: {
    id: 'app.profile.fields.country.empty',
    defaultMessage: 'No countries found.',
    description: 'Empty state for country dropdown',
  },
  languagePlaceholder: {
    id: 'app.profile.fields.language.placeholder',
    defaultMessage: 'Select language',
    description: 'Placeholder for language dropdown',
  },
  languageSearchPlaceholder: {
    id: 'app.profile.fields.language.search',
    defaultMessage: 'Search languages...',
    description: 'Search placeholder for language dropdown',
  },
  languageNoOptions: {
    id: 'app.profile.fields.language.empty',
    defaultMessage: 'No languages found.',
    description: 'Empty state for language dropdown',
  },
});

export default messages;

