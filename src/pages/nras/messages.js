import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  searchPlaceholder: {
    id: 'app.nras.search.placeholder',
    defaultMessage: 'Search NRAs...',
    description: 'Placeholder for NRA search input',
  },
  onboardButton: {
    id: 'app.nras.actions.onboard',
    defaultMessage: 'Onboard NRA',
    description: 'Label for onboarding NRA button',
  },
  tableName: {
    id: 'app.nras.table.name',
    defaultMessage: 'Name',
    description: 'Table column header: name',
  },
  tableAdmins: {
    id: 'app.nras.table.admins',
    defaultMessage: 'Admins',
    description: 'Table column header: admins count',
  },
  tableActions: {
    id: 'app.nras.table.actions',
    defaultMessage: 'Actions',
    description: 'Table column header: row actions',
  },
  empty: {
    id: 'app.nras.empty',
    defaultMessage: 'No NRAs found.',
    description: 'Empty state message for NRA list',
  },
  edit: {
    id: 'app.nras.actions.edit',
    defaultMessage: 'Edit NRA',
    description: 'Accessible label for edit action',
  },
  delete: {
    id: 'app.nras.actions.delete',
    defaultMessage: 'Delete NRA',
    description: 'Accessible label for delete action',
  },
  modalTitleAdd: {
    id: 'app.nras.modal.title.add',
    defaultMessage: 'Onboard New NRA',
    description: 'Modal title for onboarding NRA',
  },
  modalTitleEdit: {
    id: 'app.nras.modal.title.edit',
    defaultMessage: 'Edit NRA',
    description: 'Modal title for editing NRA',
  },
  modalDescription: {
    id: 'app.nras.modal.description',
    defaultMessage: 'Enter details to onboard a new National Regulatory Authority.',
    description: 'Modal description',
  },
  fieldNameLabel: {
    id: 'app.nras.fields.name.label',
    defaultMessage: 'Name',
    description: 'Label for NRA name field',
  },
  fieldNamePlaceholder: {
    id: 'app.nras.fields.name.placeholder',
    defaultMessage: 'NRA name',
    description: 'Placeholder for NRA name input',
  },
  fieldCountryLabel: {
    id: 'app.nras.fields.country.label',
    defaultMessage: 'Country',
    description: 'Label for NRA country field',
  },
  fieldCountryPlaceholder: {
    id: 'app.nras.fields.country.placeholder',
    defaultMessage: 'Select SEARN country',
    description: 'Placeholder for country dropdown',
  },
  sectionAdmins: {
    id: 'app.nras.section.admins',
    defaultMessage: 'NRA Admins',
    description: 'Label for NRA admins section',
  },
  adminNamePlaceholder: {
    id: 'app.nras.admins.name.placeholder',
    defaultMessage: 'Admin name',
    description: 'Placeholder for admin name input',
  },
  adminEmailPlaceholder: {
    id: 'app.nras.admins.email.placeholder',
    defaultMessage: 'Admin email',
    description: 'Placeholder for admin email input',
  },
  addAdmin: {
    id: 'app.nras.admins.add',
    defaultMessage: 'Add Admin',
    description: 'Button label for adding an admin',
  },
  cancel: {
    id: 'app.nras.modal.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label',
  },
  onboard: {
    id: 'app.nras.modal.confirm',
    defaultMessage: 'Onboard',
    description: 'Confirm button label for onboarding',
  },
  save: {
    id: 'app.nras.modal.save',
    defaultMessage: 'Save changes',
    description: 'Confirm button label for editing',
  },
  toastOnboardedTitle: {
    id: 'app.nras.toast.onboarded.title',
    defaultMessage: 'NRA onboarded',
    description: 'Toast title after onboarding',
  },
  toastOnboardedDescription: {
    id: 'app.nras.toast.onboarded.description',
    defaultMessage: '{name} has been onboarded.',
    description: 'Toast description after onboarding',
  },
  toastUpdatedTitle: {
    id: 'app.nras.toast.updated.title',
    defaultMessage: 'NRA updated',
    description: 'Toast title after update',
  },
  toastUpdatedDescription: {
    id: 'app.nras.toast.updated.description',
    defaultMessage: '{name} has been updated.',
    description: 'Toast description after update',
  },
  toastDeletedTitle: {
    id: 'app.nras.toast.deleted.title',
    defaultMessage: 'NRA deleted',
    description: 'Toast title after delete',
  },
  toastDeletedDescription: {
    id: 'app.nras.toast.deleted.description',
    defaultMessage: '{name} has been deleted.',
    description: 'Toast description after delete',
  },
  confirmDeleteTitle: {
    id: 'app.nras.confirmDelete.title',
    defaultMessage: 'Delete NRA',
    description: 'Delete confirm title',
  },
  confirmDeleteDescription: {
    id: 'app.nras.confirmDelete.description',
    defaultMessage: 'Are you sure you want to delete {name}?',
    description: 'Delete confirm description',
  },
  confirmDeleteCancel: {
    id: 'app.nras.confirmDelete.cancel',
    defaultMessage: 'Cancel',
    description: 'Delete confirm cancel label',
  },
  confirmDeleteConfirm: {
    id: 'app.nras.confirmDelete.confirm',
    defaultMessage: 'Delete',
    description: 'Delete confirm confirm label',
  },
  confirmDeleteAdminTitle: {
    id: 'app.nras.confirmDeleteAdmin.title',
    defaultMessage: 'Delete admin',
    description: 'Delete confirm title for NRA admin removal',
  },
  confirmDeleteAdminDescription: {
    id: 'app.nras.confirmDeleteAdmin.description',
    defaultMessage: 'Are you sure you want to delete {name}?',
    description: 'Delete confirm description for NRA admin removal',
  },
  toastAdminDeletedTitle: {
    id: 'app.nras.toast.adminDeleted.title',
    defaultMessage: 'Admin deleted',
    description: 'Toast title after deleting an NRA admin',
  },
  toastAdminDeletedDescription: {
    id: 'app.nras.toast.adminDeleted.description',
    defaultMessage: '{name} has been removed.',
    description: 'Toast description after deleting an NRA admin',
  },
});

export default messages;

