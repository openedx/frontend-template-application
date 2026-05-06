import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faArrowLeft, faBookOpen, faStar, faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../../components/emptyState/EmptyState';
import feedbackData from '../../mock/trainingCatalog/feedback.json';
import trainingsData from '../../mock/trainingCatalog/trainings.json';
import messages from './messages';
import { getStarFill } from './starUtils';
import './TrainingFeedback.scss';

const TrainingFeedback = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { trainingId } = useParams();

  const training = useMemo(
    () => trainingsData.find(t => String(t.id) === String(trainingId)),
    [trainingId],
  );

  const feedback = feedbackData?.[trainingId] || null;

  if (!training || !feedback) {
    return (
      <section className="training-feedback">
        <button type="button" className="training-feedback__back" onClick={() => navigate('/admin/training-catalog')}>
          <FontAwesomeIcon icon={faArrowLeft} />
          {formatMessage(messages.backToCatalog)}
        </button>
        <EmptyState fullSize className="training-feedback__empty" message="No feedback found." />
      </section>
    );
  }

  const total = feedback.reviewCount || 0;
  const dist = feedback.distribution || {};
  const maxStars = 5;

  return (
    <section className="training-feedback">
      <button type="button" className="training-feedback__back" onClick={() => navigate('/admin/training-catalog')}>
        <FontAwesomeIcon icon={faArrowLeft} />
        {formatMessage(messages.backToCatalog)}
      </button>

      <div className="training-feedback__hero">
        <div className="training-feedback__hero-row">
          <div className="training-feedback__hero-icon" aria-hidden>
            <FontAwesomeIcon icon={faBookOpen} size="lg" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 className="training-feedback__title">{training.title}</h1>
            <p className="training-feedback__desc">{training.description}</p>
          </div>
          <span className="training-feedback__badge">{formatMessage(messages.userFeedback)}</span>
        </div>
      </div>

      <div className="training-feedback__grid">
        <div className="training-feedback__card">
          <div className="training-feedback__card-head">
            <FontAwesomeIcon icon={faStar} style={{ color: '#F59E0B' }} />
            Overall Rating
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
              <FontAwesomeIcon icon={faUsers} />
              Based on {total} anonymous reviews
            </p>
          </div>
        </div>

        <div className="training-feedback__card" style={{ gridColumn: 'span 2' }}>
          <div className="training-feedback__card-head">Rating Distribution</div>
          <div className="training-feedback__card-body">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = Number(dist[String(stars)] || 0);
              const pct = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={stars} className="training-feedback__dist-row">
                  <span style={{
                    width: 40, display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}
                  >
                    {stars} <FontAwesomeIcon icon={faStar} style={{ color: '#F59E0B' }} />
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
          <FontAwesomeIcon icon={faStar} style={{ color: '#2A3B8F' }} />
          User Feedback
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
            {(feedback.reviews || []).map(r => (
              <div key={r.id} className="training-feedback__review">
                <div className="training-feedback__review-head">
                  <div>
                    <p className="training-feedback__review-author">{r.author}</p>
                    <p className="training-feedback__review-date">{r.date}</p>
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
                <p className="training-feedback__comment">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingFeedback;
