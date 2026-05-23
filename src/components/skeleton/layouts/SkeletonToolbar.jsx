/* eslint-disable react/prop-types */
import Skeleton from '../Skeleton';

const SkeletonToolbar = ({
  showSearch = true,
  showFilter = false,
  showPrimaryButton = false,
  searchWidth = '18rem',
}) => (
  <div className="skeleton-toolbar">
    <div className="skeleton-toolbar__left">
      {showSearch && (
        <Skeleton
          height="2.75rem"
          style={{ width: '100%', maxWidth: searchWidth }}
        />
      )}
      {showFilter && (
        <Skeleton
          height="2.75rem"
          style={{ width: '12rem', maxWidth: '100%' }}
        />
      )}
    </div>
    {showPrimaryButton && (
      <Skeleton height="2.75rem" style={{ width: '100%', maxWidth: '12rem' }} />
    )}
  </div>
);

export default SkeletonToolbar;
