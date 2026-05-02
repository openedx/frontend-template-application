/* eslint-disable react/prop-types */
import './EmptyState.scss';

const EmptyState = ({
  message,
  fullSize = false,
  className = '',
}) => (
  <div className={`app-empty-state ${fullSize ? 'is-full-size' : ''} ${className}`.trim()}>
    <p className="app-empty-state__message">{message}</p>
  </div>
);

export default EmptyState;
