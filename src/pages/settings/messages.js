import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  generalTitle: {
    id: 'app.settings.general.title',
    defaultMessage: 'General Settings',
    description: 'Title for general settings card',
  },
  orgTitle: {
    id: 'app.settings.org.title',
    defaultMessage: 'Organisation',
    description: 'Title for organisation card',
  },
  platformName: {
    id: 'app.settings.fields.platformName.label',
    defaultMessage: 'Platform Name',
    description: 'Label for platform name',
  },
  supportEmail: {
    id: 'app.settings.fields.supportEmail.label',
    defaultMessage: 'Support Email',
    description: 'Label for support email',
  },
  organisationName: {
    id: 'app.settings.fields.organisationName.label',
    defaultMessage: 'Organisation Name',
    description: 'Label for organisation name',
  },
  organisationNamePlaceholder: {
    id: 'app.settings.fields.organisationName.placeholder',
    defaultMessage: 'Enter organisation name',
    description: 'Placeholder for organisation name',
  },
  organisationLogo: {
    id: 'app.settings.fields.organisationLogo.label',
    defaultMessage: 'Organisation Logo',
    description: 'Label for organisation logo upload',
  },
  uploadLogo: {
    id: 'app.settings.actions.uploadLogo',
    defaultMessage: 'Upload Logo',
    description: 'Button label for upload logo',
  },
  uploadHint: {
    id: 'app.settings.logo.hint',
    defaultMessage: 'PNG, JPG or SVG. Max 2MB.',
    description: 'Hint under upload logo button',
  },
  save: {
    id: 'app.settings.actions.save',
    defaultMessage: 'Save Changes',
    description: 'Save changes button label',
  },
  toastSavedTitle: {
    id: 'app.settings.toast.saved.title',
    defaultMessage: 'Settings saved',
    description: 'Toast title after saving settings',
  },
  toastSavedDescription: {
    id: 'app.settings.toast.saved.description',
    defaultMessage: 'Your settings have been updated.',
    description: 'Toast description after saving settings',
  },
  loadError: {
    id: 'app.settings.load.error',
    defaultMessage: 'Unable to load organization settings. Please try again.',
    description: 'Fallback when organization details GET fails',
  },
  saveError: {
    id: 'app.settings.save.error',
    defaultMessage: 'Unable to save organization settings. Please try again.',
    description: 'Fallback when organization details PATCH fails',
  },
  loadErrorTitle: {
    id: 'app.settings.load.errorTitle',
    defaultMessage: 'Settings unavailable',
    description: 'Toast title when organization details load fails',
  },
  saveErrorTitle: {
    id: 'app.settings.save.errorTitle',
    defaultMessage: 'Save failed',
    description: 'Toast title when organization details save fails',
  },
});

export default messages;

