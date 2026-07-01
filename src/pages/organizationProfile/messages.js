import { defineMessages } from '@edx/frontend-platform/i18n';

export default defineMessages({
  organizationInformationTitle: {
    id: 'app.organizationProfile.organizationInformation.title',
    defaultMessage: 'Organization Information',
    description: 'Card title for organization information section',
  },
  administratorsTitle: {
    id: 'app.organizationProfile.administrators.title',
    defaultMessage: 'Administrators',
    description: 'Card title for administrators section',
  },
  administratorsListLabel: {
    id: 'app.organizationProfile.administrators.listLabel',
    defaultMessage: 'List of Admins',
    description: 'Label above administrators list',
  },
  fieldLogo: {
    id: 'app.organizationProfile.field.logo',
    defaultMessage: 'Logo',
    description: 'Logo field label',
  },
  uploadLogo: {
    id: 'app.organizationProfile.uploadLogo',
    defaultMessage: 'Upload Logo',
    description: 'Upload logo button label',
  },
  logoHint: {
    id: 'app.organizationProfile.logoHint',
    defaultMessage: 'PNG, JPG up to 2MB',
    description: 'Logo upload hint text',
  },
  fieldOrganizationName: {
    id: 'app.organizationProfile.field.organizationName',
    defaultMessage: 'Organization Name',
    description: 'Organization name field label',
  },
  fieldOrganizationNamePlaceholder: {
    id: 'app.organizationProfile.field.organizationName.placeholder',
    defaultMessage: 'Organization name',
    description: 'Organization name field placeholder',
  },
  fieldWebsite: {
    id: 'app.organizationProfile.field.website',
    defaultMessage: 'Website',
    description: 'Website field label',
  },
  fieldWebsitePlaceholder: {
    id: 'app.organizationProfile.field.website.placeholder',
    defaultMessage: 'https://',
    description: 'Website field placeholder',
  },
  fieldContactEmail: {
    id: 'app.organizationProfile.field.contactEmail',
    defaultMessage: 'Contact Email',
    description: 'Contact email field label',
  },
  fieldContactEmailPlaceholder: {
    id: 'app.organizationProfile.field.contactEmail.placeholder',
    defaultMessage: 'contact@organization.org',
    description: 'Contact email field placeholder',
  },
  fieldCountry: {
    id: 'app.organizationProfile.field.country',
    defaultMessage: 'Country',
    description: 'Country field label',
  },
  fieldCountryPlaceholder: {
    id: 'app.organizationProfile.field.country.placeholder',
    defaultMessage: 'Country',
    description: 'Country field placeholder',
  },
  fieldOverview: {
    id: 'app.organizationProfile.field.overview',
    defaultMessage: 'Overview',
    description: 'Overview field label',
  },
  fieldOverviewPlaceholder: {
    id: 'app.organizationProfile.field.overview.placeholder',
    defaultMessage: 'Brief overview of your organization, its mission and focus.',
    description: 'Overview field placeholder',
  },
  saveChanges: {
    id: 'app.organizationProfile.saveChanges',
    defaultMessage: 'Save Changes',
    description: 'Save changes button label',
  },
  addAdmin: {
    id: 'app.organizationProfile.admin.add',
    defaultMessage: 'Add Admin',
    description: 'Add administrator button label',
  },
  adminNamePlaceholder: {
    id: 'app.organizationProfile.admin.name.placeholder',
    defaultMessage: 'Admin name',
    description: 'Administrator name input placeholder',
  },
  adminEmailPlaceholder: {
    id: 'app.organizationProfile.admin.email.placeholder',
    defaultMessage: 'Admin email',
    description: 'Administrator email input placeholder',
  },
  adminEditNamePlaceholder: {
    id: 'app.organizationProfile.admin.edit.name.placeholder',
    defaultMessage: 'Name',
    description: 'Administrator name placeholder while editing inline',
  },
  adminEditEmailPlaceholder: {
    id: 'app.organizationProfile.admin.edit.email.placeholder',
    defaultMessage: 'Email',
    description: 'Administrator email placeholder while editing inline',
  },
  saveEditAdmin: {
    id: 'app.organizationProfile.admin.saveEdit',
    defaultMessage: 'Save administrator changes',
    description: 'Accessible label for confirm inline admin edit',
  },
  cancelEditAdmin: {
    id: 'app.organizationProfile.admin.cancelEdit',
    defaultMessage: 'Cancel administrator edit',
    description: 'Accessible label for cancel inline admin edit',
  },
  editAdmin: {
    id: 'app.organizationProfile.admin.edit',
    defaultMessage: 'Edit administrator',
    description: 'Accessible label for edit administrator action',
  },
  deleteAdmin: {
    id: 'app.organizationProfile.admin.delete',
    defaultMessage: 'Delete administrator',
    description: 'Accessible label for delete administrator action',
  },
  deleteAdminDialogTitle: {
    id: 'app.organizationProfile.admin.deleteDialog.title',
    defaultMessage: 'Remove administrator',
    description: 'Delete administrator confirmation dialog title',
  },
  deleteAdminDialogDescription: {
    id: 'app.organizationProfile.admin.deleteDialog.description',
    defaultMessage: 'Are you sure you want to remove "{name}" from the administrators list?',
    description: 'Delete administrator confirmation dialog description',
  },
  cancel: {
    id: 'app.organizationProfile.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label',
  },
  delete: {
    id: 'app.organizationProfile.delete',
    defaultMessage: 'Delete',
    description: 'Delete confirm button label',
  },
  loadError: {
    id: 'app.organizationProfile.load.error',
    defaultMessage: 'Unable to load organization profile. Please try again.',
    description: 'Fallback when organization profile GET fails',
  },
  loadErrorTitle: {
    id: 'app.organizationProfile.load.errorTitle',
    defaultMessage: 'Organization profile unavailable',
    description: 'Toast title when organization profile GET fails',
  },
  saveError: {
    id: 'app.organizationProfile.save.error',
    defaultMessage: 'Unable to save organization profile. Please try again.',
    description: 'Fallback when organization profile PATCH fails',
  },
  saveErrorTitle: {
    id: 'app.organizationProfile.save.errorTitle',
    defaultMessage: 'Save failed',
    description: 'Toast title when organization profile PATCH fails',
  },
  validationTitle: {
    id: 'app.organizationProfile.validation.title',
    defaultMessage: 'Validation error',
    description: 'Toast title when organization profile validation fails',
  },
  validationOrganizationName: {
    id: 'app.organizationProfile.validation.organizationName',
    defaultMessage: 'Organization name is required.',
    description: 'Validation message when organization name is missing',
  },
  validationLogoSize: {
    id: 'app.organizationProfile.validation.logoSize',
    defaultMessage: 'Logo must be 2MB or smaller.',
    description: 'Validation message when logo file is too large',
  },
  validationAdminFields: {
    id: 'app.organizationProfile.validation.adminFields',
    defaultMessage: 'Administrator name and email are required.',
    description: 'Validation message when admin fields are incomplete',
  },
  toastSavedTitle: {
    id: 'app.organizationProfile.toast.saved.title',
    defaultMessage: 'Organization profile updated',
    description: 'Toast title when organization profile save succeeds',
  },
  toastSavedDescription: {
    id: 'app.organizationProfile.toast.saved.description',
    defaultMessage: 'Your changes have been saved.',
    description: 'Toast description when organization profile save succeeds',
  },
});
