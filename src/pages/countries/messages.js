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
  editCountry: {
    id: 'app.countries.actions.edit',
    defaultMessage: 'Edit country',
    description: 'Accessible label for edit icon button',
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
  modalTitleEdit: {
    id: 'app.countries.modal.title.edit',
    defaultMessage: 'Edit SEARN Country',
    description: 'Modal title for editing a SEARN country',
  },
  modalDescription: {
    id: 'app.countries.modal.description',
    defaultMessage: 'Add a new SEARN member country.',
    description: 'Modal description for add/edit country',
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
  modalConfirmEdit: {
    id: 'app.countries.modal.confirm.edit',
    defaultMessage: 'Save changes',
    description: 'Confirm label for editing a country',
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
  toastUpdatedTitle: {
    id: 'app.countries.toast.updated.title',
    defaultMessage: 'Country updated',
    description: 'Toast title when a country is updated',
  },
  toastUpdatedDescription: {
    id: 'app.countries.toast.updated.description',
    defaultMessage: '{name} has been updated.',
    description: 'Toast description when a country is updated',
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
});

export default messages;

