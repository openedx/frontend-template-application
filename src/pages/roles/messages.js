import { defineMessages } from '@edx/frontend-platform/i18n';

const rolesMessages = defineMessages({
  rolesConfigured: {
    id: 'app.roles.summary.configured',
    defaultMessage: '{count} roles configured',
    description: 'Summary text that shows number of configured roles',
  },
  addRoleButton: {
    id: 'app.roles.action.addRole',
    defaultMessage: 'Add New Role',
    description: 'Label for add new role button',
  },
  menuButtonLabel: {
    id: 'app.roles.card.action.more',
    defaultMessage: 'Role actions',
    description: 'Accessible label for role card menu button',
  },
  viewMenuItem: {
    id: 'app.roles.card.menu.view',
    defaultMessage: 'View',
    description: 'Menu action to view role',
  },
  editMenuItem: {
    id: 'app.roles.card.menu.edit',
    defaultMessage: 'Edit',
    description: 'Menu action to edit role',
  },
  deleteMenuItem: {
    id: 'app.roles.card.menu.delete',
    defaultMessage: 'Delete',
    description: 'Menu action to delete role',
  },
  viewDescriptionLabel: {
    id: 'app.roles.view.description.label',
    defaultMessage: 'Description',
    description: 'Label for role description in view modal',
  },
  viewPermissionsLabel: {
    id: 'app.roles.view.permissions.label',
    defaultMessage: 'Permissions ({count})',
    description: 'Label for permission count in view modal',
  },
  addRoleHeading: {
    id: 'app.roles.form.add.heading',
    defaultMessage: 'Add New Role',
    description: 'Heading for add role modal',
  },
  editRoleHeading: {
    id: 'app.roles.form.edit.heading',
    defaultMessage: 'Edit Role',
    description: 'Heading for edit role modal',
  },
  roleNameLabel: {
    id: 'app.roles.form.name.label',
    defaultMessage: 'Role Name',
    description: 'Label for role name input',
  },
  roleNamePlaceholder: {
    id: 'app.roles.form.name.placeholder',
    defaultMessage: 'e.g. NRA Reviewer',
    description: 'Placeholder for role name input',
  },
  roleDescriptionLabel: {
    id: 'app.roles.form.description.label',
    defaultMessage: 'Role Description',
    description: 'Label for role description input',
  },
  roleDescriptionPlaceholder: {
    id: 'app.roles.form.description.placeholder',
    defaultMessage: "Brief description of this role's responsibilities",
    description: 'Placeholder for role description input',
  },
  rolePermissionsLabel: {
    id: 'app.roles.form.permissions.label',
    defaultMessage: 'Permissions',
    description: 'Label for role permissions field',
  },
  cancelButton: {
    id: 'app.roles.form.cancel.button',
    defaultMessage: 'Cancel',
    description: 'Cancel button label in role modal',
  },
  createRoleButton: {
    id: 'app.roles.form.create.button',
    defaultMessage: 'Create Role',
    description: 'Create button label in add role modal',
  },
  saveRoleButton: {
    id: 'app.roles.form.save.button',
    defaultMessage: 'Save Changes',
    description: 'Save button label in edit role modal',
  },
  deleteDialogTitle: {
    id: 'app.roles.delete.dialog.title',
    defaultMessage: 'Delete role?',
    description: 'Title for role delete dialog',
  },
  deleteDialogDescription: {
    id: 'app.roles.delete.dialog.description',
    defaultMessage: 'This will permanently remove {name}. This action cannot be undone.',
    description: 'Description for role delete dialog',
  },
  deleteDialogCancel: {
    id: 'app.roles.delete.dialog.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label in role delete dialog',
  },
  deleteDialogConfirm: {
    id: 'app.roles.delete.dialog.confirm',
    defaultMessage: 'Delete',
    description: 'Confirm button label in role delete dialog',
  },
  toastRoleCreatedTitle: {
    id: 'app.roles.toast.created.title',
    defaultMessage: 'Role saved',
    description: 'Toast title when role is created',
  },
  toastRoleCreatedDescription: {
    id: 'app.roles.toast.created.description',
    defaultMessage: '{name} has been created successfully.',
    description: 'Toast message when role is created',
  },
  toastRoleUpdatedTitle: {
    id: 'app.roles.toast.updated.title',
    defaultMessage: 'Role saved',
    description: 'Toast title when role is updated',
  },
  toastRoleUpdatedDescription: {
    id: 'app.roles.toast.updated.description',
    defaultMessage: '{name} has been updated successfully.',
    description: 'Toast message when role is updated',
  },
  toastRoleDeletedTitle: {
    id: 'app.roles.toast.deleted.title',
    defaultMessage: 'Role deleted',
    description: 'Toast title when role is deleted',
  },
  toastRoleDeletedDescription: {
    id: 'app.roles.toast.deleted.description',
    defaultMessage: '{name} has been removed.',
    description: 'Toast message when role is deleted',
  },
  listLoadError: {
    id: 'app.roles.list.loadError',
    defaultMessage: 'Unable to load roles. Please try again.',
    description: 'Fallback when roles list API fails',
  },
  listErrorTitle: {
    id: 'app.roles.list.errorToast.title',
    defaultMessage: 'Failed to load roles',
    description: 'Toast title when roles list API fails',
  },
  listLoading: {
    id: 'app.roles.list.loading',
    defaultMessage: 'Loading roles',
    description: 'Aria label for roles grid skeleton',
  },
  noRolesFound: {
    id: 'app.roles.list.empty',
    defaultMessage: 'No roles found.',
    description: 'Empty state when roles list has no results',
  },
  detailLoadError: {
    id: 'app.roles.detail.loadError',
    defaultMessage: 'Unable to load role details. Please try again.',
    description: 'Fallback when role detail API fails',
  },
  detailErrorTitle: {
    id: 'app.roles.detail.errorToast.title',
    defaultMessage: 'Failed to load role',
    description: 'Toast title when role detail API fails',
  },
  detailLoading: {
    id: 'app.roles.detail.loading',
    defaultMessage: 'Loading role details…',
    description: 'Text shown in view modal while role detail loads',
  },
  permissionsLoadError: {
    id: 'app.roles.permissions.loadError',
    defaultMessage: 'Unable to load permissions. Please try again.',
    description: 'Fallback when permissions API fails',
  },
  permissionsErrorTitle: {
    id: 'app.roles.permissions.errorToast.title',
    defaultMessage: 'Failed to load permissions',
    description: 'Toast title when permissions API fails',
  },
  createError: {
    id: 'app.roles.create.error',
    defaultMessage: 'Unable to create role. Please try again.',
    description: 'Fallback when create role API fails',
  },
  createErrorTitle: {
    id: 'app.roles.create.errorToast.title',
    defaultMessage: 'Failed to create role',
    description: 'Toast title when create role API fails',
  },
  updateError: {
    id: 'app.roles.update.error',
    defaultMessage: 'Unable to update role. Please try again.',
    description: 'Fallback when update role API fails',
  },
  updateErrorTitle: {
    id: 'app.roles.update.errorToast.title',
    defaultMessage: 'Failed to update role',
    description: 'Toast title when update role API fails',
  },
  deleteError: {
    id: 'app.roles.delete.error',
    defaultMessage: 'Unable to delete role. Please try again.',
    description: 'Fallback when delete role API fails',
  },
  deleteErrorTitle: {
    id: 'app.roles.delete.errorToast.title',
    defaultMessage: 'Failed to delete role',
    description: 'Toast title when delete role API fails',
  },
  paginationLabel: {
    id: 'app.roles.pagination.label',
    defaultMessage: 'Roles pagination',
    description: 'Accessible label for roles list pagination',
  },
  showingCount: {
    id: 'app.roles.pagination.showing',
    defaultMessage: 'Showing {count} of {total} roles',
    description: 'Pagination summary for roles list',
  },
});

export default rolesMessages;
