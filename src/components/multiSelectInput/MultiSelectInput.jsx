/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MultiSelectInput.scss';

const MultiSelectInput = ({
  options = [],
  selectedValues: selectedValuesProp = [],
  onChange,
  disabled = false,
}) => {
  const selectedValues = Array.isArray(selectedValuesProp) ? selectedValuesProp : [];
  const [searchTerm, setSearchTerm] = useState('');
  const shouldShowSearch = options.length > 5;
  const filteredOptions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return options;
    }

    return options.filter(option => option.label.toLowerCase().startsWith(query));
  }, [options, searchTerm]);
  const selectedOptions = useMemo(
    () => options.filter(option => selectedValues.includes(option.value)),
    [options, selectedValues],
  );

  return (
    <div className={`multi-select-input ${disabled ? 'is-disabled' : ''}`}>
      {shouldShowSearch && (
        <input
          type="text"
          className="multi-select-input__search"
          value={searchTerm}
          placeholder="Type to filter options..."
          onChange={event => setSearchTerm(event.target.value)}
          disabled={disabled}
        />
      )}

      <div className="multi-select-input__options">
        {filteredOptions.map(option => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <label className="multi-select-input__option" key={option.value}>
              <button
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                className={`multi-select-input__checkbox ${isSelected ? 'is-selected' : ''}`}
                disabled={disabled}
                onClick={() => {
                  if (disabled) {
                    return;
                  }
                  if (isSelected) {
                    onChange(selectedValues.filter(item => item !== option.value));
                  } else {
                    onChange([...selectedValues, option.value]);
                  }
                }}
              />
              <span className="multi-select-input__label">{option.label}</span>
            </label>
          );
        })}
      </div>

      {selectedOptions.length > 0 && (
        <div className="multi-select-input__badges">
          <button
            type="button"
            className="multi-select-input__clear-all"
            disabled={disabled}
            onClick={() => onChange([])}
          >
            Remove all
          </button>
          {selectedOptions.map(option => (
            <span className="multi-select-input__badge" key={option.value}>
              <span>{option.label}</span>
              <button
                type="button"
                className="multi-select-input__badge-remove"
                aria-label={`Remove ${option.label}`}
                disabled={disabled}
                onClick={() => onChange(selectedValues.filter(item => item !== option.value))}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectInput;
