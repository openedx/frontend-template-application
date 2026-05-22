/* eslint-disable react/prop-types */
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import { hasRolesSectionData } from '../../../api/competencyFramework/competencyFrameworkRolesUtils';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../skeleton';
import ConfirmActionDialog from '../../confirmActionDialog/ConfirmActionDialog';
import { useToast } from '../../toast/ToastProvider';

const createFrameworkRoleItem = () => ({
  id: `${Date.now()}-${Math.random()}`,
  name: '',
});

const RoleTab = ({
  labels,
  canEdit,
  roles,
  onChangeRoles,
  onSave,
  isSaving = false,
  isPrefilling = false,
}) => {
  const { showToast } = useToast();
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const canDelete = roles.length > 1;
  const hasInvalidRole = roles.some(item => !item.name.trim());
  const isUpdateMode = hasRolesSectionData(roles);
  const submitLabel = isUpdateMode ? labels.update : labels.save;
  const savingLabel = isUpdateMode ? labels.updating : labels.saving;
  const isSaveDisabled = !canEdit || isSaving || isPrefilling || hasInvalidRole;
  const pendingDeleteName = useMemo(
    () => roles.find(item => item.id === pendingDeleteId)?.name || '',
    [pendingDeleteId, roles],
  );

  const updateRole = (id, value) => {
    onChangeRoles(roles.map(item => (item.id === id ? { ...item, name: value } : item)));
  };

  const handleAddRole = () => {
    onChangeRoles([...roles, createFrameworkRoleItem()]);
  };

  const handleDeleteRole = (id) => {
    if (!canDelete) {
      showToast({
        title: labels.deleteFailedTitle,
        description: labels.deleteBlockedDescription,
      });
      return;
    }
    setPendingDeleteId(id);
  };

  const closeDeleteDialog = () => {
    if (!isDeleting) {
      setPendingDeleteId(null);
    }
  };

  const confirmDeleteRole = async () => {
    if (!pendingDeleteId || !canDelete) {
      return;
    }

    setIsDeleting(true);
    try {
      onChangeRoles(roles.filter(item => item.id !== pendingDeleteId));
      showToast({
        title: labels.deleteSuccessTitle,
        description: labels.deleteSuccessDescription,
      });
      setPendingDeleteId(null);
    } catch (error) {
      showToast({
        title: labels.deleteFailedTitle,
        description: labels.deleteFailedDescription,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPrefilling) {
    return <SkeletonScreen variant={SKELETON_VARIANTS.DETAIL} />;
  }

  return (
    <div className="framework-builder__section-card framework-builder__section-card--form">
      <div className="framework-builder__role-head">
        <div>
          <h3 className="framework-builder__section-title">{labels.title}</h3>
          <p className="framework-builder__section-description">{labels.description}</p>
        </div>
        <button
          type="button"
          className="competency-framework-page__outline-button"
          onClick={handleAddRole}
          disabled={!canEdit || hasInvalidRole}
        >
          <FontAwesomeIcon icon={faPlus} />
          {labels.addRole}
        </button>
      </div>

      <div className="framework-builder__role-list">
        {roles.map((item, index) => (
          <div key={item.id} className="framework-builder__role-row">
            <span className="framework-builder__role-index">{`${index + 1}.`}</span>
            <input
              className="framework-builder__input framework-builder__role-input"
              placeholder={labels.roleNamePlaceholder}
              value={item.name}
              onChange={event => updateRole(item.id, event.target.value)}
              disabled={!canEdit}
            />
            <button
              type="button"
              className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
              onClick={() => handleDeleteRole(item.id)}
              disabled={!canEdit || !canDelete || isDeleting}
              aria-label={labels.deleteRole}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>

      {canEdit && (
        <div className="framework-builder__actions">
          <button
            type="button"
            className="competency-framework-page__primary-button"
            disabled={isSaveDisabled}
            onClick={onSave}
          >
            {isSaving ? savingLabel : submitLabel}
          </button>
        </div>
      )}

      <ConfirmActionDialog
        isOpen={Boolean(pendingDeleteId)}
        title={labels.deleteDialogTitle}
        description={labels.deleteDialogDescription(pendingDeleteName)}
        cancelLabel={labels.deleteDialogCancel}
        confirmLabel={labels.deleteDialogConfirm}
        onCancel={closeDeleteDialog}
        onConfirm={confirmDeleteRole}
      />
    </div>
  );
};

export { createFrameworkRoleItem };
export default RoleTab;
