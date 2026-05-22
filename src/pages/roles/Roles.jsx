/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import { EmptyState } from '../../components/emptyState';
import { TablePaginationFooter } from '../../components/dataTable';
import RoleCard from '../../components/roles/RoleCard';
import RoleFormModal from '../../components/roles/RoleFormModal';
import RoleViewModal from '../../components/roles/RoleViewModal';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import { buildPermissionLabelByValue, buildRoleWritePayload } from '../../api/roles/rolesUtils';
import useRoleDetail from '../../hooks/roles/useRoleDetail';
import useRoleMutations from '../../hooks/roles/useRoleMutations';
import useRolePermissions from '../../hooks/roles/useRolePermissions';
import useRolesList from '../../hooks/roles/useRolesList';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { buildPaginationShowingParams } from '../../utils/paginationUtils';
import messages from './messages';
import './Roles.scss';

const Roles = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { componentAccess } = useUserRole();
  const canAddRole = Boolean(componentAccess?.roles?.canAddRole ?? false);
  const canViewRole = Boolean(componentAccess?.roles?.canViewRole ?? false);
  const canEditRole = Boolean(componentAccess?.roles?.canEditRole ?? false);
  const canDeleteRole = Boolean(componentAccess?.roles?.canDeleteRole ?? false);

  const [page, setPage] = useState(1);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [deleteRole, setDeleteRole] = useState(null);
  const [formMode, setFormMode] = useState('add');
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const {
    items: roles,
    count: rolesCount,
    totalPages,
    isLoading: isListLoading,
    isError: isListError,
    errorMessage: listErrorMessage,
  } = useRolesList({ page });

  const isEditing = formOpen && formMode === 'edit' && selectedRoleId != null;

  const {
    detail: roleDetail,
    isLoading: isDetailLoading,
    isError: isDetailError,
    errorMessage: detailErrorMessage,
  } = useRoleDetail({
    roleId: selectedRoleId,
    enabled: (viewOpen || isEditing) && selectedRoleId != null,
  });

  const {
    options: permissionOptions,
    isLoading: isPermissionsLoading,
    isError: isPermissionsError,
    errorMessage: permissionsErrorMessage,
  } = useRolePermissions({
    enabled: (formOpen || viewOpen) && (canAddRole || canEditRole),
  });

  const { createMutation, updateMutation, deleteMutation } = useRoleMutations();

  const permissionLabelByValue = useMemo(
    () => buildPermissionLabelByValue(permissionOptions),
    [permissionOptions],
  );

  const closeForm = () => {
    setFormOpen(false);
    setSelectedRoleId(null);
    setFormMode('add');
  };

  const closeView = () => {
    setViewOpen(false);
    setSelectedRoleId(null);
  };

  const formLabels = {
    addHeading: formatMessage(messages.addRoleHeading),
    editHeading: formatMessage(messages.editRoleHeading),
    roleName: formatMessage(messages.roleNameLabel),
    roleNamePlaceholder: formatMessage(messages.roleNamePlaceholder),
    roleDescription: formatMessage(messages.roleDescriptionLabel),
    roleDescriptionPlaceholder: formatMessage(messages.roleDescriptionPlaceholder),
    permissions: formatMessage(messages.rolePermissionsLabel),
    cancel: formatMessage(messages.cancelButton),
    create: formatMessage(messages.createRoleButton),
    save: formatMessage(messages.saveRoleButton),
  };

  const viewLabels = {
    description: formatMessage(messages.viewDescriptionLabel),
    permissionsCount: ({ count }) => formatMessage(messages.viewPermissionsLabel, { count }),
    loading: formatMessage(messages.detailLoading),
    edit: formatMessage(messages.editMenuItem),
    delete: formatMessage(messages.deleteMenuItem),
  };

  useEffect(() => {
    if (!isListError) {
      return;
    }

    showToast({
      title: formatMessage(messages.listErrorTitle),
      description: listErrorMessage || formatMessage(messages.listLoadError),
    });
  }, [formatMessage, isListError, listErrorMessage, showToast]);

  useEffect(() => {
    if (!formOpen || !isPermissionsError) {
      return;
    }

    showToast({
      title: formatMessage(messages.permissionsErrorTitle),
      description: permissionsErrorMessage || formatMessage(messages.permissionsLoadError),
    });
  }, [formOpen, formatMessage, isPermissionsError, permissionsErrorMessage, showToast]);

  useEffect(() => {
    if (!((viewOpen || isEditing) && isDetailError)) {
      return;
    }

    showToast({
      title: formatMessage(messages.detailErrorTitle),
      description: detailErrorMessage || formatMessage(messages.detailLoadError),
    });
  }, [
    detailErrorMessage,
    formatMessage,
    isDetailError,
    isEditing,
    showToast,
    viewOpen,
  ]);

  useEffect(() => {
    if (viewOpen && isDetailError) {
      closeView();
    }
  }, [isDetailError, viewOpen]);

  useEffect(() => {
    if (isEditing && isDetailError) {
      closeForm();
    }
  }, [isDetailError, isEditing]);

  const openAddForm = () => {
    setSelectedRoleId(null);
    setFormMode('add');
    setFormOpen(true);
  };

  const openEditForm = (targetRole) => {
    setSelectedRoleId(targetRole?.id ?? null);
    setFormMode('edit');
    setViewOpen(false);
    setFormOpen(true);
  };

  const openView = (targetRole) => {
    setSelectedRoleId(targetRole?.id ?? null);
    setViewOpen(true);
  };

  const handleSave = async ({ name, description, permissions }) => {
    const payload = buildRoleWritePayload({ name, description, permissions });

    try {
      if (formMode === 'edit') {
        await updateMutation.mutateAsync({ roleId: selectedRoleId, payload });
        showToast({
          title: formatMessage(messages.toastRoleUpdatedTitle),
          description: formatMessage(messages.toastRoleUpdatedDescription, { name: name.trim() }),
        });
      } else {
        await createMutation.mutateAsync(payload);
        showToast({
          title: formatMessage(messages.toastRoleCreatedTitle),
          description: formatMessage(messages.toastRoleCreatedDescription, { name: name.trim() }),
        });
      }
      closeForm();
    } catch (error) {
      const fallback = formMode === 'edit'
        ? formatMessage(messages.updateError)
        : formatMessage(messages.createError);
      const title = formMode === 'edit'
        ? formatMessage(messages.updateErrorTitle)
        : formatMessage(messages.createErrorTitle);

      showToast({
        title,
        description: error?.message || fallback,
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteRole?.id) {
      return;
    }

    const roleName = hasDisplayValue(deleteRole.name) ? deleteRole.name : '';

    try {
      await deleteMutation.mutateAsync(deleteRole.id);
      setDeleteRole(null);
      showToast({
        title: formatMessage(messages.toastRoleDeletedTitle),
        description: formatMessage(messages.toastRoleDeletedDescription, { name: roleName }),
      });
    } catch (error) {
      showToast({
        title: formatMessage(messages.deleteErrorTitle),
        description: error?.message || formatMessage(messages.deleteError),
      });
    }
  };

  const formRole = formMode === 'edit' ? roleDetail : null;
  const viewRole = roleDetail;
  const configuredCount = rolesCount > 0 ? rolesCount : roles.length;

  return (
    <section className="roles-page">
      <div className="roles-page__top">
        <p className="roles-page__summary">
          {formatMessage(messages.rolesConfigured, { count: configuredCount })}
        </p>
        {canAddRole && (
          <button
            type="button"
            className="roles-page__add-button"
            onClick={openAddForm}
          >
            <FontAwesomeIcon icon={faPlus} />
            {formatMessage(messages.addRoleButton)}
          </button>
        )}
      </div>

      {isListLoading && (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.GRID_CARDS}
          ariaLabel={formatMessage(messages.listLoading)}
        />
      )}

      {!isListLoading && isListError && (
        <EmptyState
          fullSize
          message={listErrorMessage || formatMessage(messages.listLoadError)}
        />
      )}

      {!isListLoading && !isListError && roles.length === 0 && (
        <EmptyState fullSize message={formatMessage(messages.noRolesFound)} />
      )}

      {!isListLoading && !isListError && roles.length > 0 && (
        <div className="roles-page__grid">
          {roles.map(role => (
            <RoleCard
              key={role.id}
              role={role}
              menuButtonLabel={formatMessage(messages.menuButtonLabel)}
              viewLabel={formatMessage(messages.viewMenuItem)}
              editLabel={formatMessage(messages.editMenuItem)}
              deleteLabel={formatMessage(messages.deleteMenuItem)}
              canViewRole={canViewRole}
              canEditRole={canEditRole}
              canDeleteRole={canDeleteRole}
              onView={(targetRole) => {
                if (!canViewRole) return;
                openView(targetRole);
              }}
              onEdit={(targetRole) => {
                if (!canEditRole) return;
                openEditForm(targetRole);
              }}
              onDelete={(targetRole) => {
                if (!canDeleteRole) return;
                setDeleteRole(targetRole);
                setViewOpen(false);
              }}
            />
          ))}
        </div>
      )}

      {!isListLoading && !isListError && (
        <TablePaginationFooter
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          paginationLabel={formatMessage(messages.paginationLabel)}
          footerContent={formatMessage(
            messages.showingCount,
            buildPaginationShowingParams(roles, rolesCount),
          )}
        />
      )}

      {(canAddRole || canEditRole) && (
        <RoleFormModal
          isOpen={formOpen}
          mode={formMode}
          role={formRole}
          permissionOptions={permissionOptions}
          isLoadingDetail={isEditing && isDetailLoading}
          isPermissionsLoading={isPermissionsLoading}
          isSaving={createMutation.isPending || updateMutation.isPending}
          labels={formLabels}
          onClose={closeForm}
          onSave={handleSave}
        />
      )}

      {canViewRole && (
        <RoleViewModal
          isOpen={viewOpen}
          role={viewRole}
          isLoading={viewOpen && isDetailLoading}
          permissionLabelByValue={permissionLabelByValue}
          labels={viewLabels}
          canEditRole={canEditRole}
          canDeleteRole={canDeleteRole}
          onClose={closeView}
          onEdit={(targetRole) => openEditForm(targetRole)}
          onDelete={(targetRole) => {
            setDeleteRole(targetRole);
            closeView();
          }}
        />
      )}

      {canDeleteRole && (
        <ConfirmActionDialog
          isOpen={Boolean(deleteRole)}
          title={formatMessage(messages.deleteDialogTitle)}
          description={formatMessage(messages.deleteDialogDescription, {
            name: hasDisplayValue(deleteRole?.name) ? deleteRole.name : '',
          })}
          cancelLabel={formatMessage(messages.deleteDialogCancel)}
          confirmLabel={formatMessage(messages.deleteDialogConfirm)}
          onCancel={() => setDeleteRole(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </section>
  );
};

export default Roles;
