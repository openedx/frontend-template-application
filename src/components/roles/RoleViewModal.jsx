/* eslint-disable react/prop-types */
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopupDialog from '../popupDialog/PopupDialog';

const RoleViewModal = ({
  isOpen,
  role,
  labels,
  canEditRole,
  canDeleteRole,
  onClose,
  onEdit,
  onDelete,
}) => (
  <PopupDialog
    isOpen={isOpen}
    title={role?.name || ''}
    onClose={onClose}
    contentClassName="roles-page__dialog-content"
  >
    {role && (
      <div className="roles-page__view-modal">
        <div className="roles-page__view-section">
          <p className="roles-page__view-label">{labels.description}</p>
          <p className="roles-page__view-text">{role.description}</p>
        </div>

        <div className="roles-page__view-section">
          <p className="roles-page__view-label">{labels.permissionsCount({ count: role.permissions.length })}</p>
          <div className="roles-page__permission-tags">
            {role.permissions.map(item => (
              <span className="roles-page__permission-tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>

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

export default RoleViewModal;
