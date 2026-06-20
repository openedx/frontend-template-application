import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faBookOpen, faStar, faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EmptyState } from '../../components/emptyState';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import useMyTrainingCatalogFeedback from '../../hooks/myTrainingCatalog/useMyTrainingCatalogFeedback';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import catalogMessages from '../searnTrainingCatalog/messages';
import { getStarFill } from '../searnTrainingCatalog/starUtils';
import messages from './messages';
import '../searnTrainingCatalog/SearnTrainingFeedback.scss';

const MyTrainingCatalogFeedback = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { trainingId } = useParams();

  const {
    data,
    isLoading,
    isError,
    errorMessage,
  } = useMyTrainingCatalogFeedback({ trainingId });

  useEffect(() => {
    if (!isError) {
      return;
    }

    showToast({
      title: formatMessage(messages.feedbackLoadErrorTitle),
      description: errorMessage || formatMessage(messages.feedbackLoadError),
    });
  }, [errorMessage, formatMessage, isError, showToast]);

  if (isLoading) {
    return (
      <section className="training-feedback">
        <SkeletonScreen variant={SKELETON_VARIANTS.DETAIL} />
      </section>
    );
  }

  if (isError || !data) {
    const displayMessage = errorMessage === 'NOT_FOUND'
      ? formatMessage(messages.feedbackNotFound)
      : (errorMessage || formatMessage(messages.feedbackNotFound));

    return (
      <section className="training-feedback">
        <EmptyState
          fullSize
          className="training-feedback__empty"
          message={displayMessage}
        />
      </section>
    );
  }

  const { training, feedback } = data;
  const total = feedback.reviewCount || 0;
  const dist = feedback.distribution || {};
  const maxStars = 5;

  return (
    <section className="training-feedback">
      <div className="training-feedback__hero">
        <div className="training-feedback__hero-row">
          <div className="training-feedback__hero-icon" aria-hidden>
            <FontAwesomeIcon icon={faBookOpen} size="lg" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {hasDisplayValue(training.title) && (
              <h1 className="training-feedback__title">{training.title}</h1>
            )}
            {hasDisplayValue(training.description) && (
              <p className="training-feedback__desc">{training.description}</p>
            )}
          </div>
          <span className="training-feedback__badge">{formatMessage(catalogMessages.userFeedback)}</span>
        </div>
      </div>

      <div className="training-feedback__grid">
        <div className="training-feedback__card">
          <div className="training-feedback__card-head">
            <FontAwesomeIcon icon={faStar} style={{ color: '#F59E0B' }} aria-hidden />
            {formatMessage(catalogMessages.overallRating)}
          </div>
          <div className="training-feedback__card-body training-feedback__overall">
            <div className="training-feedback__overall-score">{Number(feedback.overallRating || 0).toFixed(1)}</div>
            <div aria-hidden>
              {[1, 2, 3, 4, 5].slice(0, maxStars).map((position) => {
                const idx = position - 1;
                const fill = getStarFill(feedback.overallRating, idx);
                if (fill >= 1) {
                  return <FontAwesomeIcon key={position} icon={faStar} style={{ color: '#F59E0B' }} />;
                }
                if (fill > 0) {
                  return (
                    <span
                      key={position}
                      style={{
                        position: 'relative', display: 'inline-block', width: 20, height: 20,
                      }}
                    >
                      <FontAwesomeIcon icon={faStar} style={{ opacity: 0.35 }} />
                      <span style={{
                        position: 'absolute', inset: 0, overflow: 'hidden', width: `${Math.round(fill * 100)}%`,
                      }}
                      >
                        <FontAwesomeIcon icon={faStar} style={{ color: '#F59E0B' }} />
                      </span>
                    </span>
                  );
                }
                return <FontAwesomeIcon key={position} icon={faStar} style={{ opacity: 0.35 }} />;
              })}
            </div>
            <p
              style={{
                marginTop: '.75rem',
                fontSize: '.75rem',
                color: '#6B7280',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.375rem',
              }}
            >
              <FontAwesomeIcon icon={faUsers} aria-hidden />
              {formatMessage(catalogMessages.basedOnReviews, { count: total })}
            </p>
          </div>
        </div>

        <div className="training-feedback__card" style={{ gridColumn: 'span 2' }}>
          <div className="training-feedback__card-head">{formatMessage(catalogMessages.ratingDistribution)}</div>
          <div className="training-feedback__card-body">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = Number(dist[String(stars)] || 0);
              const pct = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={stars} className="training-feedback__dist-row">
                  <span style={{
                    width: 40, display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}
                  >
                    {stars} <FontAwesomeIcon icon={faStar} style={{ color: '#F59E0B' }} aria-hidden />
                  </span>
                  <div className="training-feedback__bar" aria-hidden>
                    <div className="training-feedback__bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span style={{ width: 40, textAlign: 'right', fontSize: '.75rem' }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="training-feedback__card">
        <div className="training-feedback__card-head">
          <FontAwesomeIcon icon={faStar} style={{ color: '#2A3B8F' }} aria-hidden />
          {formatMessage(catalogMessages.userFeedbackSection)}
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '.75rem',
              fontWeight: 800,
              padding: '.125rem .5rem',
              borderRadius: 9999,
              background: 'rgb(107 114 128 / .12)',
            }}
          >
            {total}
          </span>
        </div>
        <div className="training-feedback__card-body">
          <div className="training-feedback__reviews">
            {(feedback.reviews || []).map((r) => (
              <div key={r.id} className="training-feedback__review">
                <div className="training-feedback__review-head">
                  <div>
                    {hasDisplayValue(r.author) && (
                      <p className="training-feedback__review-author">{r.author}</p>
                    )}
                    {hasDisplayValue(r.date) && (
                      <p className="training-feedback__review-date">{r.date}</p>
                    )}
                  </div>
                  <div aria-hidden>
                    {[1, 2, 3, 4, 5].map((position) => (
                      <FontAwesomeIcon
                        key={position}
                        icon={faStar}
                        style={{ color: position <= r.rating ? '#F59E0B' : 'rgb(107 114 128 / .35)' }}
                      />
                    ))}
                  </div>
                </div>
                {hasDisplayValue(r.comment) && (
                  <p className="training-feedback__comment">{r.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyTrainingCatalogFeedback;
