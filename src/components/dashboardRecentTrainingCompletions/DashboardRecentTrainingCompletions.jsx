/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faExternalLinkAlt, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import EmptyState from '../emptyState/EmptyState';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import {
  buildCompletionSubtitle,
  hasProofAvailable,
  normalizeRecentTrainingCompletions,
} from './recentTrainingCompletionsUtils';
import './DashboardRecentTrainingCompletions.scss';

const DashboardRecentTrainingCompletions = ({
  items = [],
  viewAllHref = null,
  emptyMessage,
}) => {
  const { formatMessage } = useIntl();
  const displayItems = normalizeRecentTrainingCompletions(items);

  return (
    <article className="dashboard-recent-training-completions">
      <div className="dashboard-recent-training-completions__header">
        <h2 className="dashboard-recent-training-completions__title">
          {formatMessage(messages.title)}
        </h2>
      </div>

      {displayItems.length === 0 ? (
        <EmptyState
          message={emptyMessage || formatMessage(messages.empty)}
          className="dashboard-recent-training-completions__empty"
        />
      ) : (
        <div className="dashboard-recent-training-completions__list">
          {displayItems.map((item) => (
            <div key={item.id} className="dashboard-recent-training-completions__item">
              <div className="dashboard-recent-training-completions__main">
                {hasDisplayValue(item.title) && (
                  <p className="dashboard-recent-training-completions__title-text">
                    {item.title}
                  </p>
                )}
                {(() => {
                  const subtitle = buildCompletionSubtitle(item, formatMessage, messages);
                  return hasDisplayValue(subtitle) ? (
                    <p className="dashboard-recent-training-completions__meta">{subtitle}</p>
                  ) : null;
                })()}
              </div>
              {hasProofAvailable(item.hasProof) && (
                <span className="dashboard-recent-training-completions__proof-badge">
                  <FontAwesomeIcon
                    icon={faFileSignature}
                    className="dashboard-recent-training-completions__proof-icon"
                    aria-hidden
                  />
                  {formatMessage(messages.proofBadge)}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {hasDisplayValue(viewAllHref) && (
        <div className="dashboard-recent-training-completions__footer">
          <Link to={viewAllHref} className="dashboard-recent-training-completions__view-all">
            {formatMessage(messages.viewAll)}
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              className="dashboard-recent-training-completions__view-all-icon"
              aria-hidden
            />
          </Link>
        </div>
      )}
    </article>
  );
};

export default DashboardRecentTrainingCompletions;
