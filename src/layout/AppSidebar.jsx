/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useState } from 'react';
import {
  faAward,
  faBookOpen,
  faBuilding,
  faChartLine,
  faChevronDown,
  faCog,
  faClipboardList,
  faFileAlt,
  faFlag,
  faGlobe,
  faInbox,
  faShieldAlt,
  faUserCircle,
  faWaveSquare,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation } from 'react-router-dom';
import { useUserRole } from '../contexts/UserRoleContext';
import { ADMIN_PATHS } from '../utils/adminPaths';
import { getNavigationItemsByRole } from './navigation';
import layoutMessages from './messages';

const AppSidebar = ({
  collapsed,
  isMobile,
  mobileOpen,
  onNavigate,
}) => {
  const { formatMessage } = useIntl();
  const location = useLocation();
  const { role, navbarAccess } = useUserRole();
  const isReportsActive = location.pathname.startsWith('/admin/reports');
  const [reportsOpen, setReportsOpen] = useState(isReportsActive);

  const iconMap = {
    dashboard: faChartLine,
    competencyFramework: faAward,
    activities: faWaveSquare,
    trainingCatalog: faBookOpen,
    nras: faGlobe,
    countries: faFlag,
    trainingProviders: faBuilding,
    pendingRequests: faInbox,
    requestedTrainings: faClipboardList,
    profile: faUserCircle,
    users: faUsers,
    roles: faShieldAlt,
    reports: faFileAlt,
    settings: faCog,
  };

  useEffect(() => {
    if (isReportsActive) {
      setReportsOpen(true);
    }
  }, [isReportsActive]);

  const visibleNavigationItems = getNavigationItemsByRole(role, navbarAccess);

  return (
    <aside className={`admin-sidebar ${collapsed ? 'is-collapsed' : ''} ${isMobile ? 'is-mobile' : ''} ${mobileOpen ? 'is-mobile-open' : ''}`}>
      <div className="admin-sidebar__top">
        <div className="admin-sidebar__brand">
          {!collapsed && (
            <span className="admin-sidebar__brand-text">
              {formatMessage(layoutMessages.sidebarBrand)}
            </span>
          )}
        </div>
      </div>

      <div className="admin-sidebar__nav-group">
        <div className="admin-sidebar__section-label">
          {!collapsed && formatMessage(layoutMessages.sidebarSectionManagement)}
        </div>

        <nav className="admin-sidebar__nav" aria-label={formatMessage(layoutMessages.sidebarSectionManagement)}>
          {visibleNavigationItems.map((item) => {
            const isParentActive = item.children
              ? item.children.some(child => location.pathname.startsWith(child.path))
              : location.pathname.startsWith(item.path);
            const navPath = item.key === 'dashboard'
              ? (role ? ADMIN_PATHS.dashboardRole(role) : item.path)
              : item.path;

            return (
              <div key={item.key} className="admin-sidebar__item-group">
                {!item.children && (
                  <NavLink
                    to={navPath}
                    className={({ isActive }) => `admin-sidebar__item ${isActive ? 'is-active' : ''}`}
                    onClick={onNavigate}
                  >
                    <span className="admin-sidebar__item-icon">
                      <FontAwesomeIcon icon={iconMap[item.iconKey]} />
                    </span>
                    {!collapsed && <span>{formatMessage(layoutMessages[item.labelKey])}</span>}
                  </NavLink>
                )}

                {item.children && (
                  <>
                    <button
                      type="button"
                      className={`admin-sidebar__item admin-sidebar__item-toggle is-parent ${isParentActive ? 'is-active' : ''}`}
                      onClick={() => setReportsOpen(prev => !prev)}
                    >
                      <span className="admin-sidebar__item-icon">
                        <FontAwesomeIcon icon={iconMap[item.iconKey]} />
                      </span>
                      {!collapsed && (
                        <>
                          <span className="admin-sidebar__item-text">
                            {formatMessage(layoutMessages[item.labelKey])}
                          </span>
                          <span className={`admin-sidebar__chevron ${reportsOpen ? 'is-open' : ''}`}>
                            <FontAwesomeIcon icon={faChevronDown} />
                          </span>
                        </>
                      )}
                    </button>
                    {!collapsed && reportsOpen && (
                      <div className="admin-sidebar__subnav is-open">
                        {item.children.map(child => (
                          <NavLink
                            key={child.key}
                            to={child.path}
                            className={({ isActive }) => `admin-sidebar__subitem ${isActive ? 'is-active' : ''}`}
                            onClick={onNavigate}
                          >
                            <span className="admin-sidebar__subitem-icon">
                              <FontAwesomeIcon icon={faFileAlt} />
                            </span>
                            {formatMessage(layoutMessages[child.labelKey])}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
