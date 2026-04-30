/* eslint-disable react/prop-types */
import {
  faClock,
  faExclamationTriangle,
  faGlobe,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Stats.scss';

const iconMap = {
  faUsers,
  faExclamationTriangle,
  faGlobe,
  faClock,
};

const Stats = ({ items = [] }) => (
  <div className="stats-grid">
    {items.map(item => (
      <article key={item.id} className="stats-card">
        <div className="stats-card__icon-row">
          <div
            className="stats-card__icon-wrap"
            style={{ backgroundColor: item.iconBackground }}
          >
            <FontAwesomeIcon icon={iconMap[item.icon]} />
          </div>
        </div>
        <p className="stats-card__value">{item.value}</p>
        <p className="stats-card__label">{item.label}</p>
      </article>
    ))}
  </div>
);

export default Stats;
