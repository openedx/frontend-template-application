import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faBookOpen, faCircle, faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EmptyState } from '../../components/emptyState';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import useMyTrainingCatalogDetail from '../../hooks/myTrainingCatalog/useMyTrainingCatalogDetail';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import catalogMessages from '../searnTrainingCatalog/messages';
import messages from './messages';
import '../searnTrainingCatalog/SearnTrainingDetail.scss';

const badgeClassForMode = (mode) => {
  const lower = String(mode || '').toLowerCase();
  if (lower === 'virtual') { return 'training-detail__badge training-detail__badge--blue'; }
  if (lower === 'hybrid') { return 'training-detail__badge training-detail__badge--violet'; }
  return 'training-detail__badge';
};

const MyTrainingCatalogDetail = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { trainingId } = useParams();

  const {
    training,
    isLoading,
    isError,
    errorMessage,
  } = useMyTrainingCatalogDetail({ trainingId });

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
    const displayMessage = errorMessage === 'NOT_FOUND'
      ? formatMessage(messages.detailNotFound)
      : (errorMessage || formatMessage(messages.detailNotFound));

    return (
      <section className="training-detail">
        <EmptyState
          fullSize
          className="training-detail__empty"
          message={displayMessage}
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
              <p className="training-detail__stat-label">{formatMessage(catalogMessages.detailStatProvider)}</p>
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
              <p className="training-detail__stat-label">{formatMessage(catalogMessages.detailStatLanguage)}</p>
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
              <p className="training-detail__stat-label">{formatMessage(catalogMessages.detailStatDuration)}</p>
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
              <p className="training-detail__stat-label">{formatMessage(catalogMessages.detailStatCost)}</p>
              <p className="training-detail__stat-value">{training.cost}</p>
            </div>
          </div>
        )}
      </div>

      <div className="training-detail__grid">
        <div className="training-detail__panel">
          <div className="training-detail__panel-head">
            <FontAwesomeIcon icon={faBookOpen} style={{ color: '#2A3B8F' }} aria-hidden />
            {formatMessage(catalogMessages.detailSectionTrainingDetails)}
          </div>
          <div className="training-detail__panel-body">
            {hasDisplayValue(training.approach) && (
              <div className="training-detail__kv">
                <span className="training-detail__kv-label">{formatMessage(catalogMessages.detailFieldApproach)}</span>
                <span className="training-detail__pill">{training.approach}</span>
              </div>
            )}
            {hasDisplayValue(training.mode) && (
              <div className="training-detail__kv">
                <span className="training-detail__kv-label">{formatMessage(catalogMessages.detailFieldMode)}</span>
                <span className={`training-detail__pill ${badgeClassForMode(training.mode)}`.replace('training-detail__badge', '').trim()}>
                  {training.mode}
                </span>
              </div>
            )}
            {hasDisplayValue(training.evaluation) && (
              <div className="training-detail__kv">
                <span className="training-detail__kv-label">{formatMessage(catalogMessages.detailFieldEvaluation)}</span>
                <span className="training-detail__pill">{training.evaluation}</span>
              </div>
            )}
            {hasDisplayValue(training.outcome) && (
              <div className="training-detail__kv">
                <span className="training-detail__kv-label">{formatMessage(catalogMessages.detailFieldOutcome)}</span>
                <span className="training-detail__pill">{training.outcome}</span>
              </div>
            )}
          </div>
        </div>

        <div className="training-detail__panel">
          <div className="training-detail__panel-head">
            <FontAwesomeIcon icon={faBookOpen} style={{ color: '#2A3B8F' }} aria-hidden />
            {formatMessage(catalogMessages.detailSectionNraObjectives)}
          </div>
          <div className="training-detail__panel-body">
            <div className="training-detail__badges">
              {training.nraGoals.filter(hasDisplayValue).map((goal) => (
                <span key={goal} className="training-detail__badge training-detail__badge--blue">{goal}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="training-detail__grid">
        <div className="training-detail__panel">
          <div className="training-detail__panel-head">
            <FontAwesomeIcon icon={faStar} style={{ color: '#2A3B8F' }} aria-hidden />
            {formatMessage(catalogMessages.detailSectionMappedCompetencies)}
            <span className="training-detail__pill" style={{ marginLeft: 'auto' }}>{training.mappedCompetencies.length}</span>
          </div>
          <div className="training-detail__panel-body">
            <ul className="training-detail__list">
              {training.mappedCompetencies.map((item) => (
                hasDisplayValue(item) && (
                  <li key={item} className="training-detail__list-item">
                    <FontAwesomeIcon icon={faCircle} style={{ color: '#10B981', fontSize: '.5rem', marginTop: '.35rem' }} aria-hidden />
                    <span>{item}</span>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>

        <div className="training-detail__panel">
          <div className="training-detail__panel-head">
            <FontAwesomeIcon icon={faStar} style={{ color: '#2A3B8F' }} aria-hidden />
            {formatMessage(catalogMessages.detailSectionMappedActivities)}
            <span className="training-detail__pill" style={{ marginLeft: 'auto' }}>{training.mappedActivities.length}</span>
          </div>
          <div className="training-detail__panel-body">
            <ul className="training-detail__list">
              {training.mappedActivities.filter(hasDisplayValue).map((item) => (
                <li key={item} className="training-detail__list-item">
                  <FontAwesomeIcon icon={faCircle} style={{ color: '#2A3B8F', fontSize: '.5rem', marginTop: '.35rem' }} aria-hidden />
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

export default MyTrainingCatalogDetail;
