/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import EmptyState from '../emptyState/EmptyState';
import Badge from '../badge/Badge';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import pageMessages from '../../pages/messages';
import messages from './messages';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import { normalizePendingRequests } from './pendingRequestsUtils';
import {
  hasValidRank,
  hasValidRequestCount,
  normalizeTopRequestedActivities,
} from './topRequestedActivitiesUtils';
import './DashboardRequests.scss';

const TopRequestedActivitiesCard = ({ items = [], emptyMessage }) => {
  const { formatMessage } = useIntl();
  const displayItems = normalizeTopRequestedActivities(items);

  return (
    <article className="dashboard-requests-card">
      <div className="dashboard-requests-card__header">
        <div>
          <h2 className="dashboard-requests-card__title">{formatMessage(messages.topRequestedTitle)}</h2>
        </div>
      </div>

      {displayItems.length === 0 ? (
        <EmptyState
          message={emptyMessage || formatMessage(messages.topRequestedEmpty)}
          className="dashboard-requests-card__empty"
        />
      ) : (
        <div className="dashboard-requests-card__list">
          {displayItems.map((item, index) => {
            const rowKey = hasDisplayValue(item.id) ? item.id : `top-activity-${index}`;

            return (
              <div className="dashboard-requests-card__item" key={rowKey}>
                {hasValidRank(item.rank) && (
                  <div className="top-activity__rank">{item.rank}</div>
                )}
                <div className="top-activity__main">
                  {hasDisplayValue(item.title) && (
                    <p className="top-activity__title">{item.title}</p>
                  )}
                  {hasDisplayValue(item.subtitle) && (
                    <p className="top-activity__subtitle">{item.subtitle}</p>
                  )}
                </div>
                {hasValidRequestCount(item.requestCount) && (
                  <div className="top-activity__meta">
                    <p className="top-activity__count">{item.requestCount}</p>
                    <p className="top-activity__unit">{formatMessage(messages.requestsUnit)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
};

const PendingRequestsCard = ({ items = [], emptyMessage }) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { navbarAccess } = useUserRole();
  const displayItems = normalizePendingRequests(items);

  return (
    <article className="dashboard-requests-card">
      <div className="dashboard-requests-card__header">
        <div>
          <h2 className="dashboard-requests-card__title">{formatMessage(messages.pendingRequestsTitle)}</h2>
        </div>
      </div>

      {displayItems.length === 0 ? (
        <EmptyState
          message={emptyMessage || formatMessage(messages.pendingRequestsEmpty)}
          className="dashboard-requests-card__empty"
        />
      ) : (
        <div className="dashboard-requests-card__list">
          {displayItems.map(item => (
            <button
              key={item.id}
              type="button"
              className="dashboard-requests-card__item dashboard-requests-card__item--clickable"
              onClick={() => {
                if (!navbarAccess?.accessPendingRequests) {
                  showToast({
                    title: 'Access restricted',
                    description: formatMessage(pageMessages.accessRestrictedMessage),
                  });
                  return;
                }
                navigate(ADMIN_PATHS.pendingRequestDetail(item.id));
              }}
            >
              <div className="pending-request__main">
                {hasDisplayValue(item.title) && (
                  <p className="pending-request__title">{item.title}</p>
                )}
                {hasDisplayValue(item.description) && (
                  <p className="pending-request__description">{item.description}</p>
                )}
                {(hasDisplayValue(item.tag) || hasDisplayValue(item.timeAgo)) && (
                  <div className="pending-request__meta">
                    {hasDisplayValue(item.tag) && <Badge>{item.tag}</Badge>}
                    {hasDisplayValue(item.timeAgo) && (
                      <span className="pending-request__time">{item.timeAgo}</span>
                    )}
                  </div>
                )}
              </div>
              <FontAwesomeIcon className="pending-request__chevron" icon={faChevronRight} />
            </button>
          ))}
        </div>
      )}
    </article>
  );
};

export {
  TopRequestedActivitiesCard,
  PendingRequestsCard,
};
