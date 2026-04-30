/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import {
  faEllipsisH,
  faEye,
  faPen,
  faShieldAlt,
  faTrash,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RoleCard = ({
  role,
  menuButtonLabel,
  viewLabel,
  editLabel,
  deleteLabel,
  canViewRole,
  canEditRole,
  canDeleteRole,
  onView,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <article className="roles-page__card" key={role.id} onClick={() => canViewRole && onView(role)}>
      <div className="roles-page__card-head">
        <div className="roles-page__icon-wrap" style={{ backgroundColor: role.iconBackground }}>
          <FontAwesomeIcon icon={faShieldAlt} />
        </div>

        <div className="roles-page__menu-wrap" ref={wrapperRef}>
          <button
            type="button"
            className="roles-page__menu-button"
            aria-label={menuButtonLabel}
            onClick={(event) => {
              event.stopPropagation();
              setMenuOpen(prev => !prev);
            }}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>

          {menuOpen && (
            <div className="roles-page__menu" role="menu">
              {canViewRole && (
                <button
                  type="button"
                  className="roles-page__menu-item"
                  onClick={(event) => {
                    event.stopPropagation();
                    setMenuOpen(false);
                    onView(role);
                  }}
                >
                  <FontAwesomeIcon icon={faEye} />
                  <span>{viewLabel}</span>
                </button>
              )}
              {canEditRole && (
                <button
                  type="button"
                  className="roles-page__menu-item"
                  onClick={(event) => {
                    event.stopPropagation();
                    setMenuOpen(false);
                    onEdit(role);
                  }}
                >
                  <FontAwesomeIcon icon={faPen} />
                  <span>{editLabel}</span>
                </button>
              )}
              {canDeleteRole && (
                <button
                  type="button"
                  className="roles-page__menu-item roles-page__menu-item--danger"
                  onClick={(event) => {
                    event.stopPropagation();
                    setMenuOpen(false);
                    onDelete(role);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span>{deleteLabel}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <h3 className="roles-page__name">{role.name}</h3>
      <p className="roles-page__description">{role.description}</p>

      <div className="roles-page__meta">
        <div className="roles-page__meta-item">
          <FontAwesomeIcon icon={faUsers} />
          <span>{role.userCount}</span>
        </div>
        <div className="roles-page__meta-item">
          <FontAwesomeIcon icon={faShieldAlt} />
          <span>{role.permissionCount}</span>
        </div>
      </div>
    </article>
  );
};

export default RoleCard;
