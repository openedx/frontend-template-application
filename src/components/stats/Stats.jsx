/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import {
  resolveStatIcon,
  resolveStatIconBackground,
  STATS_FALLBACK_ICON_BACKGROUND,
} from './statsIconUtils';
import './Stats.scss';

const Stats = ({ items = [] }) => (
  <div className="stats-grid">
    {items.map((item, index) => {
      const showValue = hasDisplayValue(item.value);
      const showLabel = hasDisplayValue(item.label);
      const cardKey = hasDisplayValue(item.id) ? item.id : `stat-${index}`;

      if (!showValue && !showLabel) {
        return null;
      }

      const { icon, isMissing } = resolveStatIcon(item.icon);
      const iconBackground = isMissing
        ? STATS_FALLBACK_ICON_BACKGROUND
        : resolveStatIconBackground(item.iconBackground);

      return (
        <article key={cardKey} className="stats-card">
          <div className="stats-card__icon-row">
            <div
              className={classNames(
                'stats-card__icon-wrap',
                isMissing && 'stats-card__icon-wrap--missing',
              )}
              style={{ backgroundColor: iconBackground }}
              title={isMissing ? 'Icon not available' : undefined}
            >
              <FontAwesomeIcon icon={icon} aria-hidden={!isMissing} />
            </div>
          </div>
          {showValue && (
            <p className="stats-card__value">{item.value}</p>
          )}
          {showLabel && (
            <p className="stats-card__label">{item.label}</p>
          )}
        </article>
      );
    })}
  </div>
);

export default Stats;
