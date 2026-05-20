import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  searchPlaceholder: {
    id: 'app.countries.search.placeholder',
    defaultMessage: 'Search countries...',
    description: 'Placeholder for countries search input',
  },
  addCountry: {
    id: 'app.countries.actions.add',
    defaultMessage: 'Add New SEARN Country',
    description: 'Button label for adding a new SEARN country',
  },
  deleteCountry: {
    id: 'app.countries.actions.delete',
    defaultMessage: 'Delete country',
    description: 'Accessible label for delete icon button',
  },
  empty: {
    id: 'app.countries.empty',
    defaultMessage: 'No countries found.',
    description: 'Empty state when there are no countries to show',
  },
  modalTitleAdd: {
    id: 'app.countries.modal.title.add',
    defaultMessage: 'Add New SEARN Country',
    description: 'Modal title for adding a new SEARN country',
  },
  modalDescription: {
    id: 'app.countries.modal.description',
    defaultMessage: 'Add a new SEARN member country.',
    description: 'Modal description for add country',
  },
  modalLabelCountry: {
    id: 'app.countries.modal.field.country.label',
    defaultMessage: 'Country',
    description: 'Label for country field',
  },
  modalPlaceholderCountry: {
    id: 'app.countries.modal.field.country.placeholder',
    defaultMessage: 'Select a country',
    description: 'Placeholder for country dropdown',
  },
  modalCancel: {
    id: 'app.countries.modal.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label for country modal',
  },
  modalConfirmAdd: {
    id: 'app.countries.modal.confirm.add',
    defaultMessage: 'Add New SEARN Country',
    description: 'Confirm label for adding a country',
  },
  confirmDeleteTitle: {
    id: 'app.countries.confirmDelete.title',
    defaultMessage: 'Delete country',
    description: 'Title for delete confirmation dialog',
  },
  confirmDeleteDescription: {
    id: 'app.countries.confirmDelete.description',
    defaultMessage: 'Are you sure you want to delete {name}?',
    description: 'Description for delete confirmation dialog',
  },
  confirmDeleteCancel: {
    id: 'app.countries.confirmDelete.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel label for delete confirm dialog',
  },
  confirmDeleteConfirm: {
    id: 'app.countries.confirmDelete.confirm',
    defaultMessage: 'Delete',
    description: 'Confirm label for delete confirm dialog',
  },
  toastAddedTitle: {
    id: 'app.countries.toast.added.title',
    defaultMessage: 'Country added',
    description: 'Toast title when a country is added',
  },
  toastAddedDescription: {
    id: 'app.countries.toast.added.description',
    defaultMessage: '{name} has been added to SEARN.',
    description: 'Toast description when a country is added',
  },
  toastDeletedTitle: {
    id: 'app.countries.toast.deleted.title',
    defaultMessage: 'Country deleted',
    description: 'Toast title when a country is deleted',
  },
  toastDeletedDescription: {
    id: 'app.countries.toast.deleted.description',
    defaultMessage: '{name} has been removed from SEARN.',
    description: 'Toast description when a country is deleted',
  },
  listLoadError: {
    id: 'app.countries.list.loadError',
    defaultMessage: 'Unable to load countries. Please try again.',
    description: 'Fallback when countries list API fails',
  },
  listErrorTitle: {
    id: 'app.countries.list.error.title',
    defaultMessage: 'Failed to load countries',
    description: 'Toast title when countries list API fails',
  },
  listLoading: {
    id: 'app.countries.list.loading',
    defaultMessage: 'Loading countries',
    description: 'Aria label for countries page loading state',
  },
  catalogLoadError: {
    id: 'app.countries.catalog.loadError',
    defaultMessage: 'Unable to load country catalog. Please try again.',
    description: 'Fallback when country catalog API fails',
  },
  catalogErrorTitle: {
    id: 'app.countries.catalog.error.title',
    defaultMessage: 'Failed to load country catalog',
    description: 'Toast title when country catalog API fails',
  },
  updateError: {
    id: 'app.countries.update.error',
    defaultMessage: 'Unable to update country status. Please try again.',
    description: 'Fallback when country status update API fails',
  },
  addErrorTitle: {
    id: 'app.countries.add.error.title',
    defaultMessage: 'Add country failed',
    description: 'Toast title when adding country fails',
  },
  deleteErrorTitle: {
    id: 'app.countries.delete.error.title',
    defaultMessage: 'Delete country failed',
    description: 'Toast title when deleting country fails',
  },
});

export default messages;

