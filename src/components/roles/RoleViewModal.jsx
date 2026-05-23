/* eslint-disable react/prop-types */
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopupDialog from '../popupDialog/PopupDialog';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

const RoleViewModal = ({
  isOpen,
  role,
  isLoading = false,
  permissionLabelByValue = {},
  labels,
  canEditRole,
  canDeleteRole,
  onClose,
  onEdit,
  onDelete,
}) => {
  const permissionItems = Array.isArray(role?.permissions) ? role.permissions : [];

  return (
    <PopupDialog
      isOpen={isOpen}
      title={hasDisplayValue(role?.name) ? role.name : ''}
      onClose={onClose}
      contentClassName="roles-page__dialog-content"
    >
      {isLoading && (
        <p className="roles-page__view-text">{labels.loading}</p>
      )}

      {!isLoading && role && (
        <div className="roles-page__view-modal">
          {hasDisplayValue(role.description) && (
            <div className="roles-page__view-section">
              <p className="roles-page__view-label">{labels.description}</p>
              <p className="roles-page__view-text">{role.description}</p>
            </div>
          )}

          {permissionItems.length > 0 && (
            <div className="roles-page__view-section">
              <p className="roles-page__view-label">
                {labels.permissionsCount({ count: permissionItems.length })}
              </p>
              <div className="roles-page__permission-tags">
                {permissionItems.map((item) => {
                  const label = permissionLabelByValue[item] || item;
                  return (
                    <span className="roles-page__permission-tag" key={item}>
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <div className="roles-page__form-actions">
            {canDeleteRole && (
              <button type="button" className="roles-page__danger-outline-button" onClick={() => onDelete(role)}>
                <FontAwesomeIcon icon={faTrash} />
                {labels.delete}
              </button>
            )}
            {canEditRole && (
              <button type="button" className="roles-page__submit-button" onClick={() => onEdit(role)}>
                <FontAwesomeIcon icon={faPen} />
                {labels.edit}
              </button>
            )}
          </div>
        </div>
      )}
    </PopupDialog>
  );
};

export default RoleViewModal;
