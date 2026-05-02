/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faBars,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import layoutMessages from './messages';

const TopHeader = ({
  title,
  collapsed,
  isMobile,
  onToggleSidebar,
}) => {
  const { formatMessage } = useIntl();
  let toggleIcon = faChevronLeft;
  if (isMobile) {
    toggleIcon = faBars;
  } else if (collapsed) {
    toggleIcon = faChevronRight;
  }

  return (
    <header className="admin-top-header">
      <div className="admin-top-header__content">
        <div className="admin-top-header__title-wrap">
          <button
            type="button"
            className="admin-top-header__sidebar-toggle"
            onClick={onToggleSidebar}
            aria-label={formatMessage(
              collapsed ? layoutMessages.sidebarExpand : layoutMessages.sidebarCollapse,
            )}
          >
            <FontAwesomeIcon icon={toggleIcon} />
          </button>
          <h1 className="admin-top-header__title">{title}</h1>
        </div>

        <div className="admin-top-header__actions">
          <div
            className="admin-top-header__avatar"
            aria-label={formatMessage(layoutMessages.userAvatarLabel)}
          >
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
