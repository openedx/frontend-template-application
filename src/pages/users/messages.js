import { defineMessages } from '@edx/frontend-platform/i18n';

const usersPageMessages = defineMessages({
  searchPlaceholder: {
    id: 'app.users.search.placeholder',
    defaultMessage: 'Search users by name or email...',
    description: 'Placeholder for users search input',
  },
  downloadTemplate: {
    id: 'app.users.actions.downloadTemplate',
    defaultMessage: 'Download Template',
    description: 'Download users template button label',
  },
  importFromExcel: {
    id: 'app.users.actions.importFromExcel',
    defaultMessage: 'Import from Excel',
    description: 'Import users from excel button label',
  },
  importModalTitle: {
    id: 'app.users.import.modal.title',
    defaultMessage: 'Import Users from Excel',
    description: 'Title for import users modal',
  },
  importModalDescription: {
    id: 'app.users.import.modal.description',
    defaultMessage: 'Fill in user details in the file, then upload it here.',
    description: 'Description for import users modal',
  },
  importModalChooseFile: {
    id: 'app.users.import.modal.chooseFile',
    defaultMessage: 'Choose file (.xlsx, .csv)',
    description: 'Choose file label for import users modal',
  },
  importModalCancel: {
    id: 'app.users.import.modal.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label for import users modal',
  },
  importModalImport: {
    id: 'app.users.import.modal.import',
    defaultMessage: 'Import',
    description: 'Import button label for import users modal',
  },
  addUser: {
    id: 'app.users.actions.addUser',
    defaultMessage: 'Add User',
    description: 'Button label to add user',
  },
  allRoles: {
    id: 'app.users.filter.allRoles',
    defaultMessage: 'All Roles',
    description: 'Default users role filter label',
  },
  dropdownSearchPlaceholder: {
    id: 'app.users.filter.search.placeholder',
    defaultMessage: 'Type to filter options...',
    description: 'Search placeholder inside dropdown options',
  },
  dropdownNoOptions: {
    id: 'app.users.filter.noOptions',
    defaultMessage: 'No options found.',
    description: 'Empty state for dropdown options',
  },
  columnUser: { id: 'app.users.table.column.user', defaultMessage: 'User', description: 'Users table column' },
  columnRole: { id: 'app.users.table.column.role', defaultMessage: 'Role', description: 'Users table column' },
  columnCompetencyRole: {
    id: 'app.users.table.column.competencyRole',
    defaultMessage: 'Competency Role',
    description: 'Users table column',
  },
  columnActions: { id: 'app.users.table.column.actions', defaultMessage: 'Actions', description: 'Users table column' },
  viewAction: { id: 'app.users.row.action.view', defaultMessage: 'View user', description: 'View action label' },
  editAction: { id: 'app.users.row.action.edit', defaultMessage: 'Edit user', description: 'Edit action label' },
  deleteAction: { id: 'app.users.row.action.delete', defaultMessage: 'Delete user', description: 'Delete action label' },
  paginationPrev: { id: 'app.users.pagination.prev', defaultMessage: 'Previous', description: 'Pagination previous button' },
  paginationNext: { id: 'app.users.pagination.next', defaultMessage: 'Next', description: 'Pagination next button' },
  showingCount: {
    id: 'app.users.pagination.showing',
    defaultMessage: 'Showing {count} of {total} users',
    description: 'Showing count text for users table',
  },
  empty: {
    id: 'app.users.empty',
    defaultMessage: 'No data available.',
    description: 'Empty state message when no users match the current filters',
  },
  addUserModalTitle: {
    id: 'app.users.addUser.modal.title',
    defaultMessage: 'Add New User',
    description: 'Title for add user modal',
  },
  addUserModalFullName: {
    id: 'app.users.addUser.modal.fullName.label',
    defaultMessage: 'Full Name',
    description: 'Label for full name field in add user modal',
  },
  addUserModalFullNamePlaceholder: {
    id: 'app.users.addUser.modal.fullName.placeholder',
    defaultMessage: 'Enter full name',
    description: 'Placeholder for full name field in add user modal',
  },
  addUserModalEmail: {
    id: 'app.users.addUser.modal.email.label',
    defaultMessage: 'Email Address',
    description: 'Label for email field in add user modal',
  },
  addUserModalEmailPlaceholder: {
    id: 'app.users.addUser.modal.email.placeholder',
    defaultMessage: 'Enter email',
    description: 'Placeholder for email field in add user modal',
  },
  addUserModalCountry: {
    id: 'app.users.addUser.modal.country.label',
    defaultMessage: 'Country',
    description: 'Label for country field in add user modal',
  },
  addUserModalCountryPlaceholder: {
    id: 'app.users.addUser.modal.country.placeholder',
    defaultMessage: 'Select SEARN country',
    description: 'Placeholder for country dropdown in add user modal',
  },
  addUserModalRole: {
    id: 'app.users.addUser.modal.role.label',
    defaultMessage: 'Role',
    description: 'Label for role field in add user modal',
  },
  addUserModalRolePlaceholder: {
    id: 'app.users.addUser.modal.role.placeholder',
    defaultMessage: 'Select role',
    description: 'Placeholder for role dropdown in add user modal',
  },
  addUserModalSubRolePlaceholder: {
    id: 'app.users.addUser.modal.subRole.placeholder',
    defaultMessage: 'Select option',
    description: 'Placeholder for sub-role dropdown when the selected role has sub-options',
  },
  addUserModalCreateButton: {
    id: 'app.users.addUser.modal.create.button',
    defaultMessage: 'Create User',
    description: 'Create user button label in add user modal',
  },
  editUserModalTitle: {
    id: 'app.users.editUser.modal.title',
    defaultMessage: 'Edit User',
    description: 'Title for edit user modal',
  },
  editUserModalSaveButton: {
    id: 'app.users.editUser.modal.save.button',
    defaultMessage: 'Save Changes',
    description: 'Save button label in edit user modal',
  },
  deleteDialogTitle: {
    id: 'app.users.delete.dialog.title',
    defaultMessage: 'Delete user?',
    description: 'Title for delete confirmation dialog',
  },
  deleteDialogDescription: {
    id: 'app.users.delete.dialog.description',
    defaultMessage: 'This will permanently remove {name}. This action cannot be undone.',
    description: 'Description for delete confirmation dialog',
  },
  deleteDialogCancel: {
    id: 'app.users.delete.dialog.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label in delete dialog',
  },
  deleteDialogConfirm: {
    id: 'app.users.delete.dialog.confirm',
    defaultMessage: 'Delete',
    description: 'Confirm delete button label in delete dialog',
  },
  toastUserCreatedTitle: {
    id: 'app.users.toast.created.title',
    defaultMessage: 'User saved',
    description: 'Toast title when a user is created',
  },
  toastUserCreatedDescription: {
    id: 'app.users.toast.created.description',
    defaultMessage: '{name} has been created successfully.',
    description: 'Toast description when a user is created',
  },
  toastUserUpdatedTitle: {
    id: 'app.users.toast.updated.title',
    defaultMessage: 'User saved',
    description: 'Toast title when a user is updated',
  },
  toastUserUpdatedDescription: {
    id: 'app.users.toast.updated.description',
    defaultMessage: '{name} has been updated successfully.',
    description: 'Toast description when a user is updated',
  },
  toastUserDeletedTitle: {
    id: 'app.users.toast.deleted.title',
    defaultMessage: 'User deleted',
    description: 'Toast title when a user is deleted',
  },
  toastUserDeletedDescription: {
    id: 'app.users.toast.deleted.description',
    defaultMessage: '{name} has been removed.',
    description: 'Toast description when a user is deleted',
  },
});

export default usersPageMessages;
