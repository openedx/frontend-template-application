/* eslint-disable react/prop-types */
import Skeleton from '../Skeleton';

const SkeletonGridCards = ({ count = 6 }) => (
  <div className="skeleton-grid-cards">
    {Array.from({ length: count }, (_, index) => (
      <article key={`skeleton-grid-card-${index}`} className="skeleton-grid-card">
        <Skeleton width="2.5rem" height="2.5rem" rounded="md" />
        <Skeleton width="70%" height=".875rem" style={{ flex: 1 }} />
        <Skeleton width="2rem" height="2rem" rounded="md" />
      </article>
    ))}
  </div>
);

export default SkeletonGridCards;
