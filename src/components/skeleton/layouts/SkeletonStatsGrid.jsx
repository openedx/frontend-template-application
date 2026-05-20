/* eslint-disable react/prop-types */
import Skeleton from '../Skeleton';

const SkeletonStatsGrid = ({ count = 4 }) => (
  <div className="skeleton-stats-grid">
    {Array.from({ length: count }, (_, index) => (
      <article key={`skeleton-stat-${index}`} className="skeleton-stats-card">
        <Skeleton width="3rem" height="3rem" rounded="lg" style={{ marginBottom: '1rem' }} />
        <Skeleton width="55%" height="1.875rem" style={{ marginBottom: '.5rem' }} />
        <Skeleton width="75%" height=".875rem" />
      </article>
    ))}
  </div>
);

export default SkeletonStatsGrid;
