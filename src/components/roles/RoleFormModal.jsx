/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import PopupDialog from '../popupDialog/PopupDialog';
import MultiSelectInput from '../multiSelectInput/MultiSelectInput';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

const RoleFormModal = ({
  isOpen,
  mode,
  role,
  permissionOptions,
  isLoadingDetail = false,
  isPermissionsLoading = false,
  isSaving = false,
  labels,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (mode === 'edit' && role) {
      setName(hasDisplayValue(role.name) ? role.name : '');
      setDescription(role.description ?? '');
      setPermissions(Array.isArray(role.permissions) ? role.permissions : []);
      return;
    }

    if (mode === 'add') {
      setName('');
      setDescription('');
      setPermissions([]);
    }
  }, [isOpen, mode, role]);

  const isSubmitDisabled = useMemo(() => (
    isLoadingDetail
    || isPermissionsLoading
    || isSaving
    || !name.trim()
    || permissions.length === 0
  ), [isLoadingDetail, isPermissionsLoading, isSaving, name, permissions.length]);

  const handleSubmit = async () => {
    await onSave({
      name,
      description,
      permissions,
    });
  };

  return (
    <PopupDialog
      isOpen={isOpen}
      title={mode === 'edit' ? labels.editHeading : labels.addHeading}
      onClose={onClose}
      contentClassName="roles-page__dialog-content roles-page__dialog-content--scroll"
    >
      <div className="roles-page__form">
        <div className="roles-page__field">
          <label className="roles-page__field-label" htmlFor="role-name-input">{labels.roleName}</label>
          <input
            id="role-name-input"
            className="roles-page__field-input"
            value={name}
            placeholder={labels.roleNamePlaceholder}
            disabled={isLoadingDetail || isSaving}
            onChange={event => setName(event.target.value)}
          />
        </div>

        <div className="roles-page__field">
          <label className="roles-page__field-label" htmlFor="role-description-input">{labels.roleDescription}</label>
          <textarea
            id="role-description-input"
            className="roles-page__field-input roles-page__field-input--textarea"
            value={description}
            placeholder={labels.roleDescriptionPlaceholder}
            rows={3}
            disabled={isLoadingDetail || isSaving}
            onChange={event => setDescription(event.target.value)}
          />
        </div>

        <div className="roles-page__field">
          <label className="roles-page__field-label">{labels.permissions}</label>
          <MultiSelectInput
            options={permissionOptions}
            selectedValues={permissions}
            disabled={isLoadingDetail || isPermissionsLoading || isSaving}
            onChange={setPermissions}
          />
        </div>

        <div className="roles-page__form-actions">
          <button type="button" className="roles-page__cancel-button" onClick={onClose} disabled={isSaving}>
            {labels.cancel}
          </button>
          <button
            type="button"
            className="roles-page__submit-button"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
          >
            {mode === 'edit' ? labels.save : labels.create}
          </button>
        </div>
      </div>
    </PopupDialog>
  );
};

export default RoleFormModal;
