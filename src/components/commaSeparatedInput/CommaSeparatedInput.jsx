/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import './CommaSeparatedInput.scss';

const parseCommaSeparated = (value) => value
  .split(',')
  .map(item => item.trim())
  .filter(Boolean);

const CommaSeparatedInput = ({
  value = '',
  onChange,
  placeholder = '',
  helperText = '',
  disabled = false,
}) => {
  const items = useMemo(() => parseCommaSeparated(value), [value]);

  return (
    <div className={`comma-separated-input ${disabled ? 'is-disabled' : ''}`}>
      <input
        type="text"
        className="comma-separated-input__field"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      />
      {helperText && (
        <p className="comma-separated-input__helper">{helperText}</p>
      )}
      {items.length > 0 && (
        <div className="comma-separated-input__chips" aria-hidden="true">
          {items.map(item => (
            <span key={item} className="comma-separated-input__chip">{item}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommaSeparatedInput;

