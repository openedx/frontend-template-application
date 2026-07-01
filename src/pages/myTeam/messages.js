import { defineMessages } from '@edx/frontend-platform/i18n';

export default defineMessages({
  pageTitle: {
    id: 'app.myTeam.page.title',
    defaultMessage: 'My Team',
    description: 'My Team page heading',
  },
  pageSubtitle: {
    id: 'app.myTeam.page.subtitle',
    defaultMessage: 'Manage members of your team.',
    description: 'My Team page subtitle',
  },
  addTeamMember: {
    id: 'app.myTeam.addTeamMember',
    defaultMessage: 'Add Team Member',
    description: 'Add team member button label',
  },
  columnName: {
    id: 'app.myTeam.table.column.name',
    defaultMessage: 'Name',
    description: 'Name column header',
  },
  columnEmail: {
    id: 'app.myTeam.table.column.email',
    defaultMessage: 'Email',
    description: 'Email column header',
  },
  columnAction: {
    id: 'app.myTeam.table.column.action',
    defaultMessage: 'Action',
    description: 'Action column header',
  },
  empty: {
    id: 'app.myTeam.empty',
    defaultMessage: 'No team members yet. Click "Add Team Member" to get started.',
    description: 'Empty state when team has no members',
  },
  listLoadError: {
    id: 'app.myTeam.list.loadError',
    defaultMessage: 'Unable to load your team members.',
    description: 'Fallback when team list API fails',
  },
  listLoadErrorTitle: {
    id: 'app.myTeam.list.loadErrorTitle',
    defaultMessage: 'Team list unavailable',
    description: 'Toast title when team list API fails',
  },
  candidatesLoadError: {
    id: 'app.myTeam.candidates.loadError',
    defaultMessage: 'Unable to load users for your team.',
    description: 'Fallback when candidate users API fails',
  },
  addModalTitle: {
    id: 'app.myTeam.addModal.title',
    defaultMessage: 'Add Team Member',
    description: 'Add team member modal title',
  },
  addModalDescription: {
    id: 'app.myTeam.addModal.description',
    defaultMessage: 'Select a user to add to your team.',
    description: 'Add team member modal description',
  },
  addModalUserLabel: {
    id: 'app.myTeam.addModal.userLabel',
    defaultMessage: 'User',
    description: 'User picker label in add team member modal',
  },
  addModalUserPlaceholder: {
    id: 'app.myTeam.addModal.userPlaceholder',
    defaultMessage: 'Select a user...',
    description: 'User picker placeholder in add team member modal',
  },
  addModalUserSearchPlaceholder: {
    id: 'app.myTeam.addModal.userSearchPlaceholder',
    defaultMessage: 'Search by name, email or role...',
    description: 'User picker search placeholder',
  },
  addModalCancel: {
    id: 'app.myTeam.addModal.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button in add team member modal',
  },
  addModalSubmit: {
    id: 'app.myTeam.addModal.submit',
    defaultMessage: 'Add to Team',
    description: 'Submit button in add team member modal',
  },
  addModalConflictWarning: {
    id: 'app.myTeam.addModal.conflictWarning',
    defaultMessage: 'This user is already a member of another team (owner: {owner}). They cannot be added.',
    description: 'Warning when selected user belongs to another team',
  },
  addModalInOtherTeamSuffix: {
    id: 'app.myTeam.addModal.inOtherTeamSuffix',
    defaultMessage: 'in another team',
    description: 'Suffix shown in user picker for users assigned to another team',
  },
  addMemberSuccess: {
    id: 'app.myTeam.addMember.success',
    defaultMessage: 'Team member added.',
    description: 'Success message after adding a team member',
  },
  addMemberSuccessTitle: {
    id: 'app.myTeam.addMember.successTitle',
    defaultMessage: 'Team member added',
    description: 'Toast title after adding a team member',
  },
  addMemberError: {
    id: 'app.myTeam.addMember.error',
    defaultMessage: 'Unable to add team member.',
    description: 'Fallback when add team member API fails',
  },
  addMemberErrorTitle: {
    id: 'app.myTeam.addMember.errorTitle',
    defaultMessage: 'Add team member failed',
    description: 'Toast title when add team member fails',
  },
  addMemberNotFoundError: {
    id: 'app.myTeam.addMember.notFoundError',
    defaultMessage: 'Selected user was not found.',
    description: 'Error when selected user is missing from candidates',
  },
  addMemberConflictError: {
    id: 'app.myTeam.addMember.conflictError',
    defaultMessage: 'This user is already a member of another team (owner: {owner}).',
    description: 'Error when user belongs to another team',
  },
  addMemberAlreadyOnTeamError: {
    id: 'app.myTeam.addMember.alreadyOnTeamError',
    defaultMessage: 'This user is already on your team.',
    description: 'Error when user is already a team member',
  },
  removeMember: {
    id: 'app.myTeam.removeMember',
    defaultMessage: 'Remove team member',
    description: 'Accessible label for remove team member icon button',
  },
  removeDialogTitle: {
    id: 'app.myTeam.removeDialog.title',
    defaultMessage: 'Remove team member?',
    description: 'Confirm dialog title for removing a team member',
  },
  removeDialogDescription: {
    id: 'app.myTeam.removeDialog.description',
    defaultMessage: 'Are you sure you want to remove {name} from your team? This action can be undone by adding them back.',
    description: 'Confirm dialog description for removing a team member',
  },
  removeDialogConfirm: {
    id: 'app.myTeam.removeDialog.confirm',
    defaultMessage: 'Remove',
    description: 'Confirm button for remove team member dialog',
  },
  removeMemberSuccess: {
    id: 'app.myTeam.removeMember.success',
    defaultMessage: 'Team member removed.',
    description: 'Success message after removing a team member',
  },
  removeMemberSuccessTitle: {
    id: 'app.myTeam.removeMember.successTitle',
    defaultMessage: 'Team member removed',
    description: 'Toast title after removing a team member',
  },
  removeMemberError: {
    id: 'app.myTeam.removeMember.error',
    defaultMessage: 'Unable to remove team member.',
    description: 'Fallback when remove team member API fails',
  },
  removeMemberErrorTitle: {
    id: 'app.myTeam.removeMember.errorTitle',
    defaultMessage: 'Remove team member failed',
    description: 'Toast title when remove team member fails',
  },
  removeMemberNotFoundError: {
    id: 'app.myTeam.removeMember.notFoundError',
    defaultMessage: 'Team member was not found.',
    description: 'Error when removing a missing team member',
  },
  dropdownNoOptions: {
    id: 'app.myTeam.dropdown.noOptions',
    defaultMessage: 'No users found.',
    description: 'Empty state for user picker dropdown',
  },
  showingCount: {
    id: 'app.myTeam.pagination.showing',
    defaultMessage: 'Showing {count} of {total} team members',
    description: 'Pagination summary for My Team table',
  },
  paginationLabel: {
    id: 'app.myTeam.pagination.label',
    defaultMessage: 'My Team pagination',
    description: 'Accessible label for My Team table pagination',
  },
});
