/* eslint-disable react/prop-types */
import {
  faEnvelope,
  faMapMarkerAlt,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserHeroCard = ({
  user,
  detail,
  initials,
  roleLabel,
  statusLabel,
  canEditUser,
  canDeleteUser,
  editLabel,
  deleteLabel,
  onEditClick,
  onDeleteClick,
}) => (
  <div className="user-detail__hero">
    <div className="user-detail__hero-row">
      <div className="user-detail__identity">
        <div className="user-detail__avatar">{initials}</div>
        <div>
          <h2 className="user-detail__name">{user.name}</h2>
          <div className="user-detail__meta">
            <span className="user-detail__meta-item">
              <FontAwesomeIcon icon={faEnvelope} />
              {user.email}
            </span>
            <span className="user-detail__meta-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              {user.country}
            </span>
          </div>
          <div className="user-detail__hero-tags">
            <span className="user-detail__tag">{roleLabel}</span>
            <span className="user-detail__tag user-detail__tag--status">{statusLabel || detail.status}</span>
          </div>
        </div>
      </div>

      {(canEditUser || canDeleteUser) && (
        <div className="user-detail__hero-actions">
          {canEditUser && (
            <button type="button" className="user-detail__hero-btn user-detail__hero-btn--edit" onClick={onEditClick}>
              <FontAwesomeIcon icon={faPen} />
              {editLabel}
            </button>
          )}
          {canDeleteUser && (
            <button type="button" className="user-detail__hero-btn user-detail__hero-btn--delete" onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
              {deleteLabel}
            </button>
          )}
        </div>
      )}
    </div>
  </div>
);

export default UserHeroCard;
