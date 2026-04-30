/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useState } from 'react';
import {
  faAward,
  faBookOpen,
  faBuilding,
  faChartLine,
  faChevronDown,
  faChevronLeft,
  faCog,
  faFileAlt,
  faGlobe,
  faLayerGroup,
  faNetworkWired,
  faSitemap,
  faShieldAlt,
  faWaveSquare,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation } from 'react-router-dom';
import { useUserRole } from '../contexts/UserRoleContext';
import { getNavigationItemsByRole } from '../mock/navigation';
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
    domains: faNetworkWired,
    subDomains: faSitemap,
    competencies: faAward,
    activities: faWaveSquare,
    trainingCatalog: faBookOpen,
    nras: faGlobe,
    trainingProviders: faBuilding,
    cbModules: faLayerGroup,
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

  const backLinkPath = '/dashboard';
  const visibleNavigationItems = getNavigationItemsByRole(role, navbarAccess);

  return (
    <aside className={`admin-sidebar ${collapsed ? 'is-collapsed' : ''} ${isMobile ? 'is-mobile' : ''} ${mobileOpen ? 'is-mobile-open' : ''}`}>
      <div className="admin-sidebar__top">
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__logo">
            {formatMessage(layoutMessages.sidebarLogoInitials)}
          </div>
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
              ? `/admin/dashboard/${role || 'secretariat'}`
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

      <div className="admin-sidebar__footer">
        <NavLink
          to={backLinkPath}
          className="admin-sidebar__back-link"
          onClick={onNavigate}
        >
          <span className="admin-sidebar__back-icon"><FontAwesomeIcon icon={faChevronLeft} /></span>
          {!collapsed && <span>{formatMessage(layoutMessages.sidebarBackToPlatform)}</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default AppSidebar;
