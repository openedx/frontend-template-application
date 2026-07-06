/* eslint-disable react/prop-types */
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getStarFill } from '../../pages/searnTrainingCatalog/starUtils';
import './StarRating.scss';

const STAR_POSITIONS = [0, 1, 2, 3, 4];

/**
 * Read-only 5-star rating display supporting half fills.
 *
 * @param {{ value?: number, reviewCount?: number|null, showCount?: boolean }} props
 */
const StarRating = ({ value = 0, reviewCount = null, showCount = false }) => (
  <span className="explore-star-rating" aria-hidden>
    <span className="explore-star-rating__stars">
      {STAR_POSITIONS.map((position) => {
        const fill = getStarFill(value, position);

        if (fill >= 1) {
          return (
            <FontAwesomeIcon
              key={position}
              icon={faStar}
              className="explore-star-rating__star explore-star-rating__star--fill"
            />
          );
        }

        if (fill <= 0) {
          return (
            <FontAwesomeIcon
              key={position}
              icon={faStar}
              className="explore-star-rating__star"
            />
          );
        }

        return (
          <span key={position} className="explore-star-rating__star-wrap">
            <FontAwesomeIcon icon={faStar} className="explore-star-rating__star" />
            <span
              className="explore-star-rating__star-half"
              style={{ width: `${Math.round(fill * 100)}%` }}
            >
              <FontAwesomeIcon
                icon={faStar}
                className="explore-star-rating__star explore-star-rating__star--fill"
              />
            </span>
          </span>
        );
      })}
    </span>
    {showCount && reviewCount != null && (
      <span className="explore-star-rating__count">({reviewCount})</span>
    )}
  </span>
);

export default StarRating;
