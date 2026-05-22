import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  searchPlaceholder: {
    id: 'app.trainingProviders.search.placeholder',
    defaultMessage: 'Search providers...',
    description: 'Placeholder for providers search input',
  },
  addProvider: {
    id: 'app.trainingProviders.actions.add',
    defaultMessage: 'Add Training Provider',
    description: 'Button label for adding a training provider',
  },
  tableProvider: {
    id: 'app.trainingProviders.table.provider',
    defaultMessage: 'Provider',
    description: 'Table column header for provider',
  },
  tableAdmins: {
    id: 'app.trainingProviders.table.admins',
    defaultMessage: 'Admins',
    description: 'Table column header for admin count',
  },
  tableCourses: {
    id: 'app.trainingProviders.table.courses',
    defaultMessage: 'Courses',
    description: 'Table column header for courses count',
  },
  tableActions: {
    id: 'app.trainingProviders.table.actions',
    defaultMessage: 'Actions',
    description: 'Table column header for actions',
  },
  empty: {
    id: 'app.trainingProviders.empty',
    defaultMessage: 'No training providers found.',
    description: 'Empty state message for providers page',
  },
  edit: {
    id: 'app.trainingProviders.actions.edit',
    defaultMessage: 'Edit provider',
    description: 'Accessible label for edit provider',
  },
  delete: {
    id: 'app.trainingProviders.actions.delete',
    defaultMessage: 'Delete provider',
    description: 'Accessible label for delete provider',
  },
  modalTitleAdd: {
    id: 'app.trainingProviders.modal.title.add',
    defaultMessage: 'Add Training Provider',
    description: 'Modal title for add provider',
  },
  modalTitleEdit: {
    id: 'app.trainingProviders.modal.title.edit',
    defaultMessage: 'Edit Training Provider',
    description: 'Modal title for edit provider',
  },
  modalDescription: {
    id: 'app.trainingProviders.modal.description',
    defaultMessage: 'Enter details to onboard a new training provider.',
    description: 'Modal description',
  },
  orgNameLabel: {
    id: 'app.trainingProviders.fields.orgName.label',
    defaultMessage: 'Organization Name',
    description: 'Label for organization name field',
  },
  orgNamePlaceholder: {
    id: 'app.trainingProviders.fields.orgName.placeholder',
    defaultMessage: 'e.g. WHO Training Center',
    description: 'Placeholder for organization name',
  },
  emailLabel: {
    id: 'app.trainingProviders.fields.email.label',
    defaultMessage: 'Email',
    description: 'Label for training provider email field',
  },
  emailPlaceholder: {
    id: 'app.trainingProviders.fields.email.placeholder',
    defaultMessage: 'provider@example.org',
    description: 'Placeholder for training provider email field',
  },
  countryLabel: {
    id: 'app.trainingProviders.fields.country.label',
    defaultMessage: 'Country',
    description: 'Label for country field',
  },
  countryPlaceholder: {
    id: 'app.trainingProviders.fields.country.placeholder',
    defaultMessage: 'Select country',
    description: 'Placeholder for country dropdown',
  },
  adminsLabel: {
    id: 'app.trainingProviders.section.admins',
    defaultMessage: 'Training Provider Admins',
    description: 'Label for admins section',
  },
  adminNamePlaceholder: {
    id: 'app.trainingProviders.admins.name.placeholder',
    defaultMessage: 'Admin name',
    description: 'Placeholder for admin name',
  },
  adminEmailPlaceholder: {
    id: 'app.trainingProviders.admins.email.placeholder',
    defaultMessage: 'Admin email',
    description: 'Placeholder for admin email',
  },
  addAdmin: {
    id: 'app.trainingProviders.admins.add',
    defaultMessage: 'Add Admin',
    description: 'Button label for adding an admin',
  },
  cancel: {
    id: 'app.trainingProviders.modal.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label',
  },
  confirmAdd: {
    id: 'app.trainingProviders.modal.confirm.add',
    defaultMessage: 'Add Provider',
    description: 'Confirm button label for add provider',
  },
  confirmSave: {
    id: 'app.trainingProviders.modal.confirm.save',
    defaultMessage: 'Save changes',
    description: 'Confirm button label for save changes',
  },
  toastAddedTitle: {
    id: 'app.trainingProviders.toast.added.title',
    defaultMessage: 'Provider added',
    description: 'Toast title after adding provider',
  },
  toastAddedDescription: {
    id: 'app.trainingProviders.toast.added.description',
    defaultMessage: '{name} has been added.',
    description: 'Toast description after adding provider',
  },
  toastUpdatedTitle: {
    id: 'app.trainingProviders.toast.updated.title',
    defaultMessage: 'Provider updated',
    description: 'Toast title after updating provider',
  },
  toastUpdatedDescription: {
    id: 'app.trainingProviders.toast.updated.description',
    defaultMessage: '{name} has been updated.',
    description: 'Toast description after updating provider',
  },
  toastDeletedTitle: {
    id: 'app.trainingProviders.toast.deleted.title',
    defaultMessage: 'Provider deleted',
    description: 'Toast title after deleting provider',
  },
  toastDeletedDescription: {
    id: 'app.trainingProviders.toast.deleted.description',
    defaultMessage: '{name} has been deleted.',
    description: 'Toast description after deleting provider',
  },
  confirmDeleteTitle: {
    id: 'app.trainingProviders.confirmDelete.title',
    defaultMessage: 'Delete provider',
    description: 'Delete confirm title',
  },
  confirmDeleteDescription: {
    id: 'app.trainingProviders.confirmDelete.description',
    defaultMessage: 'Are you sure you want to delete {name}?',
    description: 'Delete confirm description',
  },
  confirmDeleteCancel: {
    id: 'app.trainingProviders.confirmDelete.cancel',
    defaultMessage: 'Cancel',
    description: 'Delete confirm cancel label',
  },
  confirmDeleteConfirm: {
    id: 'app.trainingProviders.confirmDelete.confirm',
    defaultMessage: 'Delete',
    description: 'Delete confirm confirm label',
  },
  confirmDeleteAdminTitle: {
    id: 'app.trainingProviders.confirmDeleteAdmin.title',
    defaultMessage: 'Delete admin',
    description: 'Delete confirm title for admin removal',
  },
  confirmDeleteAdminDescription: {
    id: 'app.trainingProviders.confirmDeleteAdmin.description',
    defaultMessage: 'Are you sure you want to delete {name}?',
    description: 'Delete confirm description for admin removal',
  },
  toastAdminDeletedTitle: {
    id: 'app.trainingProviders.toast.adminDeleted.title',
    defaultMessage: 'Admin deleted',
    description: 'Toast title after deleting an admin',
  },
  toastAdminDeletedDescription: {
    id: 'app.trainingProviders.toast.adminDeleted.description',
    defaultMessage: '{name} has been removed.',
    description: 'Toast description after deleting an admin',
  },
  listLoadError: {
    id: 'app.trainingProviders.list.loadError',
    defaultMessage: 'Unable to load training providers. Please try again.',
    description: 'Fallback when training providers list API fails',
  },
  listErrorTitle: {
    id: 'app.trainingProviders.list.errorToast.title',
    defaultMessage: 'Failed to load training providers',
    description: 'Toast title when training providers list API fails',
  },
  listLoading: {
    id: 'app.trainingProviders.list.loading',
    defaultMessage: 'Loading training providers',
    description: 'Aria label for training providers list skeleton',
  },
  detailLoadError: {
    id: 'app.trainingProviders.detail.loadError',
    defaultMessage: 'Unable to load training provider details. Please try again.',
    description: 'Fallback when training provider detail API fails',
  },
  detailErrorTitle: {
    id: 'app.trainingProviders.detail.errorToast.title',
    defaultMessage: 'Failed to load training provider',
    description: 'Toast title when training provider detail API fails',
  },
  detailLoading: {
    id: 'app.trainingProviders.detail.loading',
    defaultMessage: 'Loading training provider details',
    description: 'Aria label while training provider detail loads',
  },
  createError: {
    id: 'app.trainingProviders.create.error',
    defaultMessage: 'Unable to add training provider. Please try again.',
    description: 'Fallback when create training provider API fails',
  },
  createErrorTitle: {
    id: 'app.trainingProviders.create.errorToast.title',
    defaultMessage: 'Add provider failed',
    description: 'Toast title when create training provider fails',
  },
  updateError: {
    id: 'app.trainingProviders.update.error',
    defaultMessage: 'Unable to update training provider. Please try again.',
    description: 'Fallback when update training provider API fails',
  },
  updateErrorTitle: {
    id: 'app.trainingProviders.update.errorToast.title',
    defaultMessage: 'Update provider failed',
    description: 'Toast title when update training provider fails',
  },
  deleteError: {
    id: 'app.trainingProviders.delete.error',
    defaultMessage: 'Unable to delete training provider. Please try again.',
    description: 'Fallback when delete training provider API fails',
  },
  deleteErrorTitle: {
    id: 'app.trainingProviders.delete.errorToast.title',
    defaultMessage: 'Delete provider failed',
    description: 'Toast title when delete training provider fails',
  },
  countriesErrorTitle: {
    id: 'app.trainingProviders.countries.errorToast.title',
    defaultMessage: 'Failed to load countries',
    description: 'Toast title when countries list API fails in provider modal',
  },
  showingCount: {
    id: 'app.trainingProviders.pagination.showing',
    defaultMessage: 'Showing {count} of {total} training providers',
    description: 'Pagination summary for training providers table',
  },
});

export default messages;

