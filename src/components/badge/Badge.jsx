/* eslint-disable react/prop-types */
import './Badge.scss';

const Badge = ({ children, className = '' }) => (
  <span className={['app-badge', className].filter(Boolean).join(' ')}>
    {children}
  </span>
);

export default Badge;

