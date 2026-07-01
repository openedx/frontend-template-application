/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faBookOpen, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmptyState from '../emptyState/EmptyState';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import {
  hasValidCompletedCount,
  normalizePopularTrainings,
} from './popularTrainingsUtils';
import './DashboardPopularTrainings.scss';

const DashboardPopularTrainings = ({ items = [], emptyMessage }) => {
  const { formatMessage } = useIntl();
  const displayItems = normalizePopularTrainings(items);

  return (
    <article className="dashboard-popular-trainings">
      <div className="dashboard-popular-trainings__header">
        <div className="dashboard-popular-trainings__header-icon-wrap">
          <FontAwesomeIcon icon={faChartLine} className="dashboard-popular-trainings__header-icon" aria-hidden />
        </div>
        <div>
          <h2 className="dashboard-popular-trainings__title">{formatMessage(messages.title)}</h2>
          <p className="dashboard-popular-trainings__subtitle">{formatMessage(messages.subtitle)}</p>
        </div>
      </div>

      {displayItems.length === 0 ? (
        <EmptyState
          message={emptyMessage || formatMessage(messages.empty)}
          className="dashboard-popular-trainings__empty"
        />
      ) : (
        <div className="dashboard-popular-trainings__list">
          {displayItems.map((item) => (
            <div key={item.id} className="dashboard-popular-trainings__item">
              <div className="dashboard-popular-trainings__main">
                <div className="dashboard-popular-trainings__icon-wrap" aria-hidden>
                  <FontAwesomeIcon icon={faBookOpen} className="dashboard-popular-trainings__icon" />
                </div>
                {hasDisplayValue(item.name) && (
                  <p className="dashboard-popular-trainings__name">{item.name}</p>
                )}
              </div>
              {hasValidCompletedCount(item.completedCount) && (
                <span className="dashboard-popular-trainings__badge">
                  {formatMessage(messages.completedBadge, { count: item.completedCount })}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default DashboardPopularTrainings;
