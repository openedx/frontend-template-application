import {
  faBookOpen,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import EmptyState from '../../components/emptyState/EmptyState';
import trainingsData from '../../mock/trainingCatalog/trainings.json';
import './SearnTrainingDetail.scss';

const badgeClassForMode = (mode) => {
  const lower = String(mode || '').toLowerCase();
  if (lower === 'virtual') { return 'training-detail__badge training-detail__badge--blue'; }
  if (lower === 'hybrid') { return 'training-detail__badge training-detail__badge--violet'; }
  return 'training-detail__badge';
};

const SearnTrainingDetail = () => {
  const { trainingId } = useParams();

  const training = useMemo(
    () => trainingsData.find(t => String(t.id) === String(trainingId)),
    [trainingId],
  );

  if (!training) {
    return (
      <section className="training-detail">
        <EmptyState fullSize className="training-detail__empty" message="No training found." />
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
            <h1 className="training-detail__title">{training.title}</h1>
            <p className="training-detail__desc">{training.description}</p>
            <div className="training-detail__badges">
              <span className={badgeClassForMode(training.mode)}>{training.mode}</span>
              <span className="training-detail__badge training-detail__badge--violet">{training.domain}</span>
              {training.subDomain && <span className="training-detail__badge">{training.subDomain}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="training-detail__stats">
        <div className="training-detail__stat-card">
          <div className="training-detail__stat-icon" style={{ background: 'rgb(59 130 246 / .08)', color: '#2563EB' }} aria-hidden>
            <FontAwesomeIcon icon={faBookOpen} />
          </div>
          <div>
            <p className="training-detail__stat-label">Provider</p>
            <p className="training-detail__stat-value">{training.provider}</p>
          </div>
        </div>
        <div className="training-detail__stat-card">
          <div className="training-detail__stat-icon" style={{ background: 'rgb(34 197 94 / .10)', color: '#16A34A' }} aria-hidden>
            <FontAwesomeIcon icon={faBookOpen} />
          </div>
          <div>
            <p className="training-detail__stat-label">Language</p>
            <p className="training-detail__stat-value">{training.language}</p>
          </div>
        </div>
        <div className="training-detail__stat-card">
          <div className="training-detail__stat-icon" style={{ background: 'rgb(245 158 11 / .12)', color: '#D97706' }} aria-hidden>
            <FontAwesomeIcon icon={faBookOpen} />
          </div>
          <div>
            <p className="training-detail__stat-label">Duration</p>
            <p className="training-detail__stat-value">{training.duration}</p>
          </div>
        </div>
        <div className="training-detail__stat-card">
          <div className="training-detail__stat-icon" style={{ background: 'rgb(16 185 129 / .10)', color: '#059669' }} aria-hidden>
            <FontAwesomeIcon icon={faBookOpen} />
          </div>
          <div>
            <p className="training-detail__stat-label">Cost</p>
            <p className="training-detail__stat-value">{training.cost}</p>
          </div>
        </div>
      </div>

      <div className="training-detail__grid">
        <div className="training-detail__panel">
          <div className="training-detail__panel-head">
            <FontAwesomeIcon icon={faBookOpen} style={{ color: '#2A3B8F' }} />
            Training Details
          </div>
          <div className="training-detail__panel-body">
            <div className="training-detail__kv">
              <span className="training-detail__kv-label">Approach</span>
              <span className="training-detail__pill">{training.approach}</span>
            </div>
            <div className="training-detail__kv">
              <span className="training-detail__kv-label">Mode</span>
              <span className={`training-detail__pill ${badgeClassForMode(training.mode)}`.replace('training-detail__badge', '').trim()}>
                {training.mode}
              </span>
            </div>
            <div className="training-detail__kv">
              <span className="training-detail__kv-label">Evaluation</span>
              <span className="training-detail__pill">{training.evaluation}</span>
            </div>
            <div className="training-detail__kv">
              <span className="training-detail__kv-label">Outcome</span>
              <span className="training-detail__pill">{training.outcome}</span>
            </div>
          </div>
        </div>

        <div className="training-detail__panel">
          <div className="training-detail__panel-head">
            <FontAwesomeIcon icon={faBookOpen} style={{ color: '#2A3B8F' }} />
            NRA Objectives
          </div>
          <div className="training-detail__panel-body">
            <div className="training-detail__badges">
              {(training.nraGoals || []).map(goal => (
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
            Mapped Competencies
            <span className="training-detail__pill" style={{ marginLeft: 'auto' }}>{(training.mappedCompetencies || []).length}</span>
          </div>
          <div className="training-detail__panel-body">
            <ul className="training-detail__list">
              {(training.mappedCompetencies || []).map(item => (
                <li key={item} className="training-detail__list-item">
                  <span aria-hidden style={{ color: '#10B981', marginTop: 2 }}>●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="training-detail__panel">
          <div className="training-detail__panel-head">
            <FontAwesomeIcon icon={faStar} style={{ color: '#2A3B8F' }} />
            Mapped Activities
            <span className="training-detail__pill" style={{ marginLeft: 'auto' }}>{(training.mappedActivities || []).length}</span>
          </div>
          <div className="training-detail__panel-body">
            <ul className="training-detail__list">
              {(training.mappedActivities || []).map(item => (
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

