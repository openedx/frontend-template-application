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
});

export default messages;

