/* eslint-disable react/prop-types */
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import './EmptyState.scss';

/**
 * Reusable empty / no-data message block for lists, tables, and sections.
 */
const EmptyState = ({
  message,
  fullSize = false,
  className = '',
}) => {
  if (!hasDisplayValue(message)) {
    return null;
  }

  return (
    <div className={`app-empty-state ${fullSize ? 'is-full-size' : ''} ${className}`.trim()}>
      <p className="app-empty-state__message">{message}</p>
    </div>
  );
};

export default EmptyState;
