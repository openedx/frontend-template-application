/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import RoleCard from '../../components/roles/RoleCard';
import RoleFormModal from '../../components/roles/RoleFormModal';
import RoleViewModal from '../../components/roles/RoleViewModal';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import rolesData from '../../mock/roles/roles.json';
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
  const [roles, setRoles] = useState(rolesData);
  const [activeRole, setActiveRole] = useState(null);
  const [deleteRole, setDeleteRole] = useState(null);
  const [formMode, setFormMode] = useState('add');
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const permissionOptions = useMemo(() => {
    const all = rolesData.flatMap(role => role.permissions);
    const unique = Array.from(new Set(all));
    return unique.map(item => ({ value: item, label: item }));
  }, []);

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
    edit: formatMessage(messages.editMenuItem),
    delete: formatMessage(messages.deleteMenuItem),
  };

  return (
    <section className="roles-page">
      <div className="roles-page__top">
        <p className="roles-page__summary">
          {formatMessage(messages.rolesConfigured, { count: roles.length })}
        </p>
        {canAddRole && (
          <button
            type="button"
            className="roles-page__add-button"
            onClick={() => {
              setActiveRole(null);
              setFormMode('add');
              setFormOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            {formatMessage(messages.addRoleButton)}
          </button>
        )}
      </div>

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
              setActiveRole(targetRole);
              setViewOpen(true);
            }}
            onEdit={(targetRole) => {
              if (!canEditRole) return;
              setActiveRole(targetRole);
              setFormMode('edit');
              setViewOpen(false);
              setFormOpen(true);
            }}
            onDelete={(targetRole) => {
              if (!canDeleteRole) return;
              setDeleteRole(targetRole);
              setViewOpen(false);
            }}
          />
        ))}
      </div>

      {(canAddRole || canEditRole) && (
        <RoleFormModal
          isOpen={formOpen}
          mode={formMode}
          role={activeRole}
          permissionOptions={permissionOptions}
          labels={formLabels}
          onClose={() => setFormOpen(false)}
          onSave={(nextRole) => {
            if (formMode === 'edit') {
              setRoles(prev => prev.map(item => (item.id === nextRole.id ? nextRole : item)));
              showToast({
                title: formatMessage(messages.toastRoleUpdatedTitle),
                description: formatMessage(messages.toastRoleUpdatedDescription, { name: nextRole.name }),
              });
            } else {
              setRoles(prev => [{ ...nextRole, iconBackground: '#2A3B8F' }, ...prev]);
              showToast({
                title: formatMessage(messages.toastRoleCreatedTitle),
                description: formatMessage(messages.toastRoleCreatedDescription, { name: nextRole.name }),
              });
            }
            setFormOpen(false);
          }}
        />
      )}

      {canViewRole && (
        <RoleViewModal
          isOpen={viewOpen}
          role={activeRole}
          labels={viewLabels}
          canEditRole={canEditRole}
          canDeleteRole={canDeleteRole}
          onClose={() => setViewOpen(false)}
          onEdit={(targetRole) => {
            setActiveRole(targetRole);
            setFormMode('edit');
            setViewOpen(false);
            setFormOpen(true);
          }}
          onDelete={(targetRole) => {
            setDeleteRole(targetRole);
            setViewOpen(false);
          }}
        />
      )}

      {canDeleteRole && (
        <ConfirmActionDialog
          isOpen={Boolean(deleteRole)}
          title={formatMessage(messages.deleteDialogTitle)}
          description={formatMessage(messages.deleteDialogDescription, { name: deleteRole?.name || '' })}
          cancelLabel={formatMessage(messages.deleteDialogCancel)}
          confirmLabel={formatMessage(messages.deleteDialogConfirm)}
          onCancel={() => setDeleteRole(null)}
          onConfirm={() => {
            const roleName = deleteRole?.name || '';
            setRoles(prev => prev.filter(item => item.id !== deleteRole?.id));
            setDeleteRole(null);
            showToast({
              title: formatMessage(messages.toastRoleDeletedTitle),
              description: formatMessage(messages.toastRoleDeletedDescription, { name: roleName }),
            });
          }}
        />
      )}
    </section>
  );
};

export default Roles;
