/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import PopupDialog from '../popupDialog/PopupDialog';
import MultiSelectInput from '../multiSelectInput/MultiSelectInput';

const RoleFormModal = ({
  isOpen,
  mode,
  role,
  permissionOptions,
  labels,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setName(role?.name || '');
      setDescription(role?.description || '');
      setPermissions(role?.permissions || []);
    }
  }, [isOpen, role]);
  const isSubmitDisabled = useMemo(() => (
    !name.trim() || !description.trim() || permissions.length === 0
  ), [description, name, permissions.length]);

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
            onChange={event => setDescription(event.target.value)}
          />
        </div>

        <div className="roles-page__field">
          <label className="roles-page__field-label">{labels.permissions}</label>
          <MultiSelectInput
            options={permissionOptions}
            selectedValues={permissions}
            onChange={setPermissions}
          />
        </div>

        <div className="roles-page__form-actions">
          <button type="button" className="roles-page__cancel-button" onClick={onClose}>
            {labels.cancel}
          </button>
          <button
            type="button"
            className="roles-page__submit-button"
            disabled={isSubmitDisabled}
            onClick={() => onSave({
              id: role?.id || `role-${Date.now()}`,
              name,
              description,
              permissions,
              userCount: role?.userCount || 0,
              permissionCount: permissions.length,
            })}
          >
            {mode === 'edit' ? labels.save : labels.create}
          </button>
        </div>
      </div>
    </PopupDialog>
  );
};

export default RoleFormModal;
