/* eslint-disable react/prop-types */
import Skeleton from '../Skeleton';

const SkeletonCardList = ({ rows = 4, hasHeader = true }) => (
  <article className="skeleton-card-list">
    {hasHeader && (
      <header className="skeleton-card__header">
        <Skeleton width="45%" height="1.125rem" />
      </header>
    )}
    <ul className="skeleton-card-list__list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {Array.from({ length: rows }, (_, index) => (
        <li key={`skeleton-list-item-${index}`} className="skeleton-card-list__item">
          <Skeleton width="2.5rem" height="2.5rem" circle />
          <div className="skeleton-card-list__item-body">
            <Skeleton width="70%" height=".875rem" />
            <Skeleton width="90%" height=".75rem" />
          </div>
          <Skeleton width="4rem" height="1.25rem" rounded="md" />
        </li>
      ))}
    </ul>
  </article>
);

export default SkeletonCardList;
