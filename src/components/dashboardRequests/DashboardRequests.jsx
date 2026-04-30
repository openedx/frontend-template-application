/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faChevronRight,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import messages from './messages';
import './DashboardRequests.scss';

const DashboardRequests = ({
  topRequestedItems = [],
  pendingItems = [],
  showTopRequested = false,
  showPendingRequests = false,
}) => {
  const { formatMessage } = useIntl();
  const showSection = showTopRequested || showPendingRequests;

  if (!showSection) {
    return null;
  }

  return (
    <section className="dashboard-requests-grid">
      {showTopRequested && (
        <article className="dashboard-requests-card">
          <div className="dashboard-requests-card__header">
            <div>
              <h2 className="dashboard-requests-card__title">{formatMessage(messages.topRequestedTitle)}</h2>
              <p className="dashboard-requests-card__description">{formatMessage(messages.topRequestedDescription)}</p>
            </div>
            <FontAwesomeIcon className="dashboard-requests-card__header-icon" icon={faExternalLinkAlt} />
          </div>

          <div className="dashboard-requests-card__list">
            {topRequestedItems.map(item => (
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
      )}

      {showPendingRequests && (
        <article className="dashboard-requests-card">
          <div className="dashboard-requests-card__header">
            <div>
              <h2 className="dashboard-requests-card__title">{formatMessage(messages.pendingRequestsTitle)}</h2>
              <p className="dashboard-requests-card__description">{formatMessage(messages.pendingRequestsDescription)}</p>
            </div>
            <FontAwesomeIcon className="dashboard-requests-card__header-icon" icon={faExternalLinkAlt} />
          </div>

          <div className="dashboard-requests-card__list">
            {pendingItems.map(item => (
              <div className="dashboard-requests-card__item" key={item.id}>
                <div className="pending-request__main">
                  <p className="pending-request__title">{item.title}</p>
                  <p className="pending-request__description">{item.description}</p>
                  <div className="pending-request__meta">
                    <span className={`pending-request__tag pending-request__tag--${item.tagVariant}`}>{item.tag}</span>
                    <span className="pending-request__time">{item.timeAgo}</span>
                  </div>
                </div>
                <FontAwesomeIcon className="pending-request__chevron" icon={faChevronRight} />
              </div>
            ))}
          </div>
        </article>
      )}
    </section>
  );
};

export default DashboardRequests;
