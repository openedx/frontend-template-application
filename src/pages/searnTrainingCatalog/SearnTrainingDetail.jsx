import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faBookOpen,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EmptyState } from '../../components/emptyState';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import useSearnTrainingCatalogDetail from '../../hooks/searnTrainingCatalog/useSearnTrainingCatalogDetail';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import './SearnTrainingDetail.scss';

const badgeClassForMode = (mode) => {
  const lower = String(mode || '').toLowerCase();
  if (lower === 'virtual') { return 'training-detail__badge training-detail__badge--blue'; }
  if (lower === 'hybrid') { return 'training-detail__badge training-detail__badge--violet'; }
  return 'training-detail__badge';
};

const SearnTrainingDetail = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { trainingId } = useParams();

  const {
    training,
    isLoading,
    isError,
    errorMessage,
  } = useSearnTrainingCatalogDetail({ trainingId });

  useEffect(() => {
    if (!isError) {
      return;
    }

    showToast({
      title: formatMessage(messages.detailLoadErrorTitle),
      description: errorMessage || formatMessage(messages.detailLoadError),
    });
  }, [errorMessage, formatMessage, isError, showToast]);

  if (isLoading) {
    return (
      <section className="training-detail">
        <SkeletonScreen variant={SKELETON_VARIANTS.DETAIL} />
      </section>
    );
  }

  if (isError || !training) {
    return (
      <section className="training-detail">
        <EmptyState
          fullSize
          className="training-detail__empty"
          message={errorMessage || formatMessage(messages.detailNotFound)}
        />
      </section>
    );
  }

  return (
    <section className="training-detail">
      <div className="training-detail__hero">
        <div className="training-detail__hero-row">
          <div className="training-detail__hero-icon" aria-hidden>
            <FontAwesomeIcon icon={faBookOpen} size="lg" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {hasDisplayValue(training.title) && (
              <h1 className="training-detail__title">{training.title}</h1>
            )}
            {hasDisplayValue(training.description) && (
              <p className="training-detail__desc">{training.description}</p>
            )}
            <div className="training-detail__badges">
              {hasDisplayValue(training.mode) && (
                <span className={badgeClassForMode(training.mode)}>{training.mode}</span>
              )}
              {hasDisplayValue(training.domain) && (
                <span className="training-detail__badge training-detail__badge--violet">{training.domain}</span>
              )}
              {hasDisplayValue(training.subDomain) && (
                <span className="training-detail__badge">{training.subDomain}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="training-detail__stats">
        {hasDisplayValue(training.provider) && (
          <div className="training-detail__stat-card">
            <div className="training-detail__stat-icon" style={{ background: 'rgb(59 130 246 / .08)', color: '#2563EB' }} aria-hidden>
              <FontAwesomeIcon icon={faBookOpen} />
            </div>
            <div>
              <p className="training-detail__stat-label">{formatMessage(messages.detailStatProvider)}</p>
              <p className="training-detail__stat-value">{training.provider}</p>
            </div>
          </div>
        )}
        {hasDisplayValue(training.language) && (
          <div className="training-detail__stat-card">
            <div className="training-detail__stat-icon" style={{ background: 'rgb(34 197 94 / .10)', color: '#16A34A' }} aria-hidden>
              <FontAwesomeIcon icon={faBookOpen} />
            </div>
            <div>
              <p className="training-detail__stat-label">{formatMessage(messages.detailStatLanguage)}</p>
              <p className="training-detail__stat-value">{training.language}</p>
            </div>
          </div>
        )}
        {hasDisplayValue(training.duration) && (
          <div className="training-detail__stat-card">
            <div className="training-detail__stat-icon" style={{ background: 'rgb(245 158 11 / .12)', color: '#D97706' }} aria-hidden>
              <FontAwesomeIcon icon={faBookOpen} />
            </div>
            <div>
              <p className="training-detail__stat-label">{formatMessage(messages.detailStatDuration)}</p>
              <p className="training-detail__stat-value">{training.duration}</p>
            </div>
          </div>
        )}
        {hasDisplayValue(training.cost) && (
          <div className="training-detail__stat-card">
            <div className="training-detail__stat-icon" style={{ background: 'rgb(16 185 129 / .10)', color: '#059669' }} aria-hidden>
              <FontAwesomeIcon icon={faBookOpen} />
            </div>
            <div>
              <p className="training-detail__stat-label">{formatMessage(messages.detailStatCost)}</p>
              <p className="training-detail__stat-value">{training.cost}</p>
            </div>
          </div>
        )}
      </div>

      <div className="training-detail__grid">
        <div className="training-detail__panel">
          <div className="training-detail__panel-head">
            <FontAwesomeIcon icon={faBookOpen} style={{ color: '#2A3B8F' }} />
            {formatMessage(messages.detailSectionTrainingDetails)}
          </div>
          <div className="training-detail__panel-body">
            {hasDisplayValue(training.approach) && (
              <div className="training-detail__kv">
                <span className="training-detail__kv-label">{formatMessage(messages.detailFieldApproach)}</span>
                <span className="training-detail__pill">{training.approach}</span>
              </div>
            )}
            {hasDisplayValue(training.mode) && (
              <div className="training-detail__kv">
                <span className="training-detail__kv-label">{formatMessage(messages.detailFieldMode)}</span>
                <span className={`training-detail__pill ${badgeClassForMode(training.mode)}`.replace('training-detail__badge', '').trim()}>
                  {training.mode}
                </span>
              </div>
            )}
            {hasDisplayValue(training.evaluation) && (
              <div className="training-detail__kv">
                <span className="training-detail__kv-label">{formatMessage(messages.detailFieldEvaluation)}</span>
                <span className="training-detail__pill">{training.evaluation}</span>
              </div>
            )}
            {hasDisplayValue(training.outcome) && (
              <div className="training-detail__kv">
                <span className="training-detail__kv-label">{formatMessage(messages.detailFieldOutcome)}</span>
                <span className="training-detail__pill">{training.outcome}</span>
              </div>
            )}
          </div>
        </div>

        <div className="training-detail__panel">
          <div className="training-detail__panel-head">
            <FontAwesomeIcon icon={faBookOpen} style={{ color: '#2A3B8F' }} />
            {formatMessage(messages.detailSectionNraObjectives)}
          </div>
          <div className="training-detail__panel-body">
            <div className="training-detail__badges">
              {training.nraGoals.filter(hasDisplayValue).map(goal => (
                <span key={goal} className="training-detail__badge training-detail__badge--blue">{goal}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="training-detail__grid">
        <div className="training-detail__panel">
          <div className="training-detail__panel-head">
            <FontAwesomeIcon icon={faStar} style={{ color: '#2A3B8F' }} />
            {formatMessage(messages.detailSectionMappedCompetencies)}
            <span className="training-detail__pill" style={{ marginLeft: 'auto' }}>{training.mappedCompetencies.length}</span>
          </div>
          <div className="training-detail__panel-body">
            <ul className="training-detail__list">
              {training.mappedCompetencies.map(item => (
                hasDisplayValue(item) && (
                  <li key={item} className="training-detail__list-item">
                    <span aria-hidden style={{ color: '#10B981', marginTop: 2 }}>●</span>
                    <span>{item}</span>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>

        <div className="training-detail__panel">
          <div className="training-detail__panel-head">
            <FontAwesomeIcon icon={faStar} style={{ color: '#2A3B8F' }} />
            {formatMessage(messages.detailSectionMappedActivities)}
            <span className="training-detail__pill" style={{ marginLeft: 'auto' }}>{training.mappedActivities.length}</span>
          </div>
          <div className="training-detail__panel-body">
            <ul className="training-detail__list">
              {training.mappedActivities.filter(hasDisplayValue).map(item => (
                <li key={item} className="training-detail__list-item">
                  <span aria-hidden style={{ color: '#2A3B8F', marginTop: 2 }}>●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearnTrainingDetail;
