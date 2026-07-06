/* eslint-disable react/prop-types */
import './TabFilter.scss';

/**
 * Reusable pill-style tab filter.
 *
 * @param {{
 *   options: Array<{ value: string, label: string }>,
 *   value: string,
 *   onChange: (value: string) => void,
 *   wrap?: boolean,
 *   size?: 'md' | 'sm',
 *   ariaLabel?: string,
 * }} props
 */
const TabFilter = ({
  options = [],
  value,
  onChange,
  wrap = false,
  size = 'md',
  ariaLabel,
}) => {
  if (!Array.isArray(options) || options.length === 0) {
    return null;
  }

  return (
    <div
      className={`tab-filter tab-filter--${size} ${wrap ? 'tab-filter--wrap' : ''}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isActive = String(value) === String(option.value);
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`tab-filter__tab ${isActive ? 'is-active' : ''}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabFilter;
