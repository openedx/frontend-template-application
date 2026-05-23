/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Skeleton from '../Skeleton';
import SkeletonScreen, { SKELETON_VARIANTS } from '../SkeletonScreen';

const SIDEBAR_NAV_PLACEHOLDER_COUNT = 10;

const SkeletonAdminShell = ({
  ariaLabel = 'Loading application',
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const updateMobileState = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateMobileState();
    mediaQuery.addEventListener('change', updateMobileState);

    return () => {
      mediaQuery.removeEventListener('change', updateMobileState);
    };
  }, []);

  return (
    <div
      className="admin-shell skeleton-admin-shell"
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <aside
        className={`admin-sidebar skeleton-admin-shell__sidebar ${isMobile ? 'is-mobile is-mobile-open' : ''}`}
        aria-hidden="true"
      >
        <div className="admin-sidebar__top skeleton-admin-shell__sidebar-top">
          <div className="admin-sidebar__brand">
            <Skeleton className="skeleton-admin-shell__brand-text" width={120} height={16} rounded="md" />
          </div>
        </div>

        <div className="admin-sidebar__nav-group skeleton-admin-shell__nav-group">
          <Skeleton className="skeleton-admin-shell__section-label" width={96} height={14} rounded="md" />
          <nav className="admin-sidebar__nav skeleton-admin-shell__nav" aria-hidden="true">
            {Array.from({ length: SIDEBAR_NAV_PLACEHOLDER_COUNT }).map((_, index) => (
              <div key={`skeleton-nav-${index}`} className="skeleton-admin-shell__nav-item">
                <Skeleton width={16} height={16} rounded="md" />
                <Skeleton className="skeleton-admin-shell__nav-label" height={14} rounded="md" />
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <div className="admin-main skeleton-admin-shell__main">
        <header className="admin-top-header skeleton-admin-shell__header" aria-hidden="true">
          <div className="admin-top-header__content">
            <div className="admin-top-header__title-wrap">
              <Skeleton width={28} height={28} rounded="md" />
              <Skeleton className="skeleton-admin-shell__header-title" width={180} height={20} rounded="md" />
            </div>
            <div className="admin-top-header__actions skeleton-admin-shell__header-actions">
              <Skeleton circle width={32} height={32} />
              <Skeleton width={12} height={12} rounded="md" />
            </div>
          </div>
        </header>

        <main className="admin-content skeleton-admin-shell__content">
          <SkeletonScreen
            variant={SKELETON_VARIANTS.DASHBOARD}
            ariaLabel={ariaLabel}
            className="skeleton-admin-shell__page"
          />
        </main>
      </div>
    </div>
  );
};

export default SkeletonAdminShell;
