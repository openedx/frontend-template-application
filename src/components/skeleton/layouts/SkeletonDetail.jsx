/* eslint-disable react/prop-types */
import Skeleton from '../Skeleton';

const SkeletonDetail = ({ actionCount = 3 }) => (
  <div className="skeleton-detail">
    <Skeleton className="skeleton-detail__back" width="8rem" height="1.25rem" />
    <article className="skeleton-detail__card">
      <header className="skeleton-card__header" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Skeleton width="60%" height="1.5rem" />
        <Skeleton width="40%" height=".875rem" style={{ marginTop: '.5rem' }} />
        <div className="skeleton-detail__meta">
          <Skeleton width="6rem" height="1.5rem" rounded="md" />
          <Skeleton width="5rem" height="1.5rem" rounded="md" />
          <Skeleton width="7rem" height="1rem" />
        </div>
      </header>
      <div className="skeleton-card__body">
        <Skeleton width="30%" height=".875rem" />
        <Skeleton width="50%" height=".875rem" />
        <Skeleton width="100%" height="4rem" style={{ marginTop: '.5rem' }} />
        <div className="skeleton-detail__actions">
          {Array.from({ length: actionCount }, (_, index) => (
            <Skeleton
              key={`skeleton-detail-action-${index}`}
              width="8rem"
              height="2.5rem"
              rounded="md"
            />
          ))}
        </div>
      </div>
    </article>
  </div>
);

export default SkeletonDetail;
