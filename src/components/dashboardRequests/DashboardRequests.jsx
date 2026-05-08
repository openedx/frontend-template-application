/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import pageMessages from '../../pages/messages';
import messages from './messages';
import './DashboardRequests.scss';

const TopRequestedActivitiesCard = ({ items = [] }) => {
  const { formatMessage } = useIntl();

  return (
    <article className="dashboard-requests-card">
      <div className="dashboard-requests-card__header">
        <div>
          <h2 className="dashboard-requests-card__title">{formatMessage(messages.topRequestedTitle)}</h2>
        </div>
      </div>

      <div className="dashboard-requests-card__list">
        {items.map(item => (
          <div className="dashboard-requests-card__item" key={item.id}>
            <div className="top-activity__rank">{item.rank}</div>
            <div className="top-activity__main">
              <p className="top-activity__title">{item.title}</p>
              <p className="top-activity__subtitle">{item.subtitle}</p>
            </div>
            <div className="top-activity__meta">
              <p className="top-activity__count">{item.requestCount}</p>
              <p className="top-activity__unit">{formatMessage(messages.requestsUnit)}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

const PendingRequestsCard = ({ items = [] }) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { navbarAccess } = useUserRole();

  return (
    <article className="dashboard-requests-card">
      <div className="dashboard-requests-card__header">
        <div>
          <h2 className="dashboard-requests-card__title">{formatMessage(messages.pendingRequestsTitle)}</h2>
        </div>
      </div>

      <div className="dashboard-requests-card__list">
        {items.map(item => (
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
              navigate(`/admin/pending-requests/${item.id}`);
            }}
          >
            <div className="pending-request__main">
              <p className="pending-request__title">{item.title}</p>
              <p className="pending-request__description">{item.description}</p>
              <div className="pending-request__meta">
                <span className={`pending-request__tag pending-request__tag--${item.tagVariant}`}>{item.tag}</span>
                <span className="pending-request__time">{item.timeAgo}</span>
              </div>
            </div>
            <FontAwesomeIcon className="pending-request__chevron" icon={faChevronRight} />
          </button>
        ))}
      </div>
    </article>
  );
};

export {
  TopRequestedActivitiesCard,
  PendingRequestsCard,
};
