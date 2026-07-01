/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmptyState from '../emptyState/EmptyState';
import UserAvatar from '../users/UserAvatar';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import { normalizeRecentActivities } from './recentActivitiesUtils';
import './DashboardRecentActivities.scss';

const DashboardRecentActivities = ({ items = [], emptyMessage }) => {
  const { formatMessage } = useIntl();
  const displayItems = normalizeRecentActivities(items);

  return (
    <article className="dashboard-recent-activities">
      <div className="dashboard-recent-activities__header">
        <div className="dashboard-recent-activities__header-icon-wrap">
          <FontAwesomeIcon icon={faWaveSquare} className="dashboard-recent-activities__header-icon" aria-hidden />
        </div>
        <div>
          <h2 className="dashboard-recent-activities__title">{formatMessage(messages.title)}</h2>
          <p className="dashboard-recent-activities__subtitle">{formatMessage(messages.subtitle)}</p>
        </div>
      </div>

      {displayItems.length === 0 ? (
        <EmptyState
          message={emptyMessage || formatMessage(messages.empty)}
          className="dashboard-recent-activities__empty"
        />
      ) : (
        <div className="dashboard-recent-activities__list">
          {displayItems.map((item) => (
            <div key={item.id} className="dashboard-recent-activities__item">
              {(hasDisplayValue(item.userName) || hasDisplayValue(item.userProfileImage)) && (
                <UserAvatar
                  name={item.userName}
                  imageUrl={item.userProfileImage}
                  className="dashboard-recent-activities__avatar"
                  imageClassName="dashboard-recent-activities__avatar-img"
                />
              )}
              <div className="dashboard-recent-activities__content">
                {(hasDisplayValue(item.userName)
                  || hasDisplayValue(item.action)
                  || hasDisplayValue(item.target)) && (
                  <p className="dashboard-recent-activities__text">
                    {hasDisplayValue(item.userName) && (
                      <span className="dashboard-recent-activities__user">{item.userName}</span>
                    )}
                    {hasDisplayValue(item.action) && (
                      <>
                        {' '}
                        <span className="dashboard-recent-activities__action">{item.action}</span>
                      </>
                    )}
                    {hasDisplayValue(item.target) && (
                      <>
                        {' '}
                        <span className="dashboard-recent-activities__target">{item.target}</span>
                      </>
                    )}
                  </p>
                )}
                {hasDisplayValue(item.timeAgo) && (
                  <p className="dashboard-recent-activities__time">{item.timeAgo}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default DashboardRecentActivities;
