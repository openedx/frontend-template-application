/* eslint-disable react/prop-types */
import Skeleton from '../Skeleton';

const SkeletonCard = ({
  hasHeader = true,
  bodyLines = 3,
  className = '',
}) => (
  <article className={`skeleton-card ${className}`.trim()}>
    {hasHeader && (
      <header className="skeleton-card__header">
        <Skeleton width="40%" height="1.125rem" />
        <Skeleton width="4rem" height=".875rem" />
      </header>
    )}
    <div className="skeleton-card__body">
      {Array.from({ length: bodyLines }, (_, index) => (
        <Skeleton
          key={`skeleton-card-line-${index}`}
          width={`${90 - index * 12}%`}
          height=".875rem"
        />
      ))}
    </div>
  </article>
);

export default SkeletonCard;
