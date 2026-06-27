/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import EmptyState from '../emptyState/EmptyState';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import {
  QUICK_ACTIONS_FALLBACK_ICON_BACKGROUND,
  resolveQuickActionIcon,
  resolveQuickActionIconBackground,
} from './quickActionsIconUtils';
import { normalizeQuickActions } from './quickActionsUtils';
import './DashboardQuickActions.scss';

const DashboardQuickActions = ({ items = [], emptyMessage }) => {
  const { formatMessage } = useIntl();
  const displayItems = normalizeQuickActions(items);

  return (
    <article className="dashboard-quick-actions">
      <div className="dashboard-quick-actions__header">
        <h2 className="dashboard-quick-actions__title">{formatMessage(messages.title)}</h2>
        <p className="dashboard-quick-actions__subtitle">{formatMessage(messages.subtitle)}</p>
      </div>

      {displayItems.length === 0 ? (
        <EmptyState
          message={emptyMessage || formatMessage(messages.empty)}
          className="dashboard-quick-actions__empty"
        />
      ) : (
        <div className="dashboard-quick-actions__list">
          {displayItems.map((item) => {
            const { icon, isMissing } = resolveQuickActionIcon(item.icon);
            const iconBackground = isMissing
              ? QUICK_ACTIONS_FALLBACK_ICON_BACKGROUND
              : resolveQuickActionIconBackground(item.iconBackground);
            const showLink = hasDisplayValue(item.href);

            const content = (
              <>
                <div
                  className={classNames(
                    'dashboard-quick-actions__icon-wrap',
                    isMissing && 'dashboard-quick-actions__icon-wrap--missing',
                  )}
                  style={{ backgroundColor: iconBackground }}
                >
                  <FontAwesomeIcon icon={icon} className="dashboard-quick-actions__icon" aria-hidden />
                </div>
                <div className="dashboard-quick-actions__main">
                  {hasDisplayValue(item.label) && (
                    <p className="dashboard-quick-actions__label">{item.label}</p>
                  )}
                  {hasDisplayValue(item.description) && (
                    <p className="dashboard-quick-actions__description">{item.description}</p>
                  )}
                </div>
                {showLink && (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="dashboard-quick-actions__chevron"
                    aria-hidden
                  />
                )}
              </>
            );

            if (!showLink) {
              return (
                <div key={item.id} className="dashboard-quick-actions__item">
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                to={item.href}
                className="dashboard-quick-actions__item dashboard-quick-actions__item--link"
              >
                {content}
              </Link>
            );
          })}
        </div>
      )}
    </article>
  );
};

export default DashboardQuickActions;
