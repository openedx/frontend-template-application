/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import AppSidebar from './AppSidebar';
import TopHeader from './TopHeader';

const AdminLayout = ({
  title,
  children,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const updateMobileState = () => {
      const mobile = mediaQuery.matches;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileSidebarOpen(false);
      }
    };

    updateMobileState();
    mediaQuery.addEventListener('change', updateMobileState);

    return () => {
      mediaQuery.removeEventListener('change', updateMobileState);
    };
  }, []);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(prev => !prev);
      return;
    }

    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className={`admin-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <AppSidebar
        collapsed={isMobile ? false : sidebarCollapsed}
        isMobile={isMobile}
        mobileOpen={mobileSidebarOpen}
        onNavigate={() => {
          if (isMobile) {
            setMobileSidebarOpen(false);
          }
        }}
      />
      {isMobile && mobileSidebarOpen && (
        <button
          type="button"
          className="admin-sidebar__backdrop"
          aria-label="Close sidebar"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <div className="admin-main">
        <TopHeader
          title={title}
          collapsed={isMobile ? !mobileSidebarOpen : sidebarCollapsed}
          isMobile={isMobile}
          onToggleSidebar={handleToggleSidebar}
        />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
