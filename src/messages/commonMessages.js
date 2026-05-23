import { defineMessages } from '@edx/frontend-platform/i18n';

const commonMessages = defineMessages({
  loading: {
    id: 'app.common.loading',
    defaultMessage: 'Loading',
    description: 'Accessible label for generic loading states',
  },
  close: {
    id: 'app.common.close',
    defaultMessage: 'Close',
    description: 'Accessible label for generic close buttons',
  },
  closeDialog: {
    id: 'app.common.closeDialog',
    defaultMessage: 'Close dialog',
    description: 'Accessible label for closing modal or dialog overlays',
  },
  multiSelectFilterPlaceholder: {
    id: 'app.common.multiSelect.filterPlaceholder',
    defaultMessage: 'Type to filter options...',
    description: 'Search placeholder in multi-select option list',
  },
  multiSelectRemoveAll: {
    id: 'app.common.multiSelect.removeAll',
    defaultMessage: 'Remove all',
    description: 'Button label to clear all multi-select selections',
  },
  multiSelectRemoveOption: {
    id: 'app.common.multiSelect.removeOption',
    defaultMessage: 'Remove {label}',
    description: 'Accessible label for removing one multi-select badge',
  },
  tablePagination: {
    id: 'app.common.pagination.table',
    defaultMessage: 'Table pagination',
    description: 'Accessible label for generic table pagination controls',
  },
  adminSaveAriaLabel: {
    id: 'app.common.admin.saveAriaLabel',
    defaultMessage: 'Save admin',
    description: 'Accessible label for save admin inline action',
  },
  adminCancelEditAriaLabel: {
    id: 'app.common.admin.cancelEditAriaLabel',
    defaultMessage: 'Cancel edit',
    description: 'Accessible label for cancel admin inline edit',
  },
  adminEditAriaLabel: {
    id: 'app.common.admin.editAriaLabel',
    defaultMessage: 'Edit admin',
    description: 'Accessible label for edit admin action',
  },
  adminDeleteAriaLabel: {
    id: 'app.common.admin.deleteAriaLabel',
    defaultMessage: 'Delete admin',
    description: 'Accessible label for delete admin action',
  },
});

export default commonMessages;
