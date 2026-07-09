/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faChevronDown, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserAvatar from '../components/users/UserAvatar';
import { signOutAndRedirectToLogin } from '../auth/signOut';
import { useUserRole } from '../contexts/UserRoleContext';
import { ADMIN_PATHS } from '../utils/adminPaths';
import { hasDisplayValue } from '../utils/hasDisplayValue';
import layoutMessages from './messages';
import './UserProfileMenu.scss';

const PROFILE_PATH = ADMIN_PATHS.profile;

const UserProfileMenu = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const { userName, userProfileImage } = useUserRole();
  const isProfileActive = location.pathname.startsWith(PROFILE_PATH);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, open]);

  const handleProfileClick = () => {
    closeMenu();
    navigate(PROFILE_PATH);
  };

  const handleSignOutClick = () => {
    closeMenu();
    signOutAndRedirectToLogin();
  };

  return (
    <div className="user-profile-menu" ref={menuRef}>
      <button
        type="button"
        className="user-profile-menu__trigger"
        aria-label={formatMessage(layoutMessages.userMenuLabel)}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((previous) => !previous)}
      >
        <UserAvatar
          variant="header"
          name={userName}
          imageUrl={userProfileImage}
          imgProps={{ referrerPolicy: 'no-referrer' }}
        />
        {hasDisplayValue(userName) && (
          <span className="user-profile-menu__name">{userName}</span>
        )}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`user-profile-menu__chevron ${open ? 'is-open' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          className="user-profile-menu__dropdown"
          role="menu"
          aria-orientation="vertical"
        >
          <button
            type="button"
            className={`user-profile-menu__item user-profile-menu__item--nav ${isProfileActive ? 'is-active' : ''}`}
            role="menuitem"
            onClick={handleProfileClick}
          >
            <FontAwesomeIcon icon={faUserCircle} className="user-profile-menu__item-icon" />
            <span>{formatMessage(layoutMessages.profileMenuProfile)}</span>
          </button>

          <div className="user-profile-menu__separator" role="separator" />

          <button
            type="button"
            className="user-profile-menu__item user-profile-menu__item--danger"
            role="menuitem"
            onClick={handleSignOutClick}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="user-profile-menu__item-icon" />
            <span>{formatMessage(layoutMessages.profileMenuSignOut)}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
