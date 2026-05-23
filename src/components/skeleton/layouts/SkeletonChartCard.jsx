/* eslint-disable react/prop-types */
import Skeleton from '../Skeleton';

const SkeletonChartCard = () => (
  <article className="skeleton-chart-card">
    <header className="skeleton-card__header">
      <div style={{ flex: 1, minWidth: 0 }}>
        <Skeleton width="45%" height="1.125rem" style={{ marginBottom: '.5rem' }} />
        <Skeleton width="65%" height=".875rem" />
      </div>
    </header>
    <div className="skeleton-card__body">
      <Skeleton className="skeleton-chart-card__chart" height="360px" rounded="md" />
    </div>
  </article>
);

export default SkeletonChartCard;
