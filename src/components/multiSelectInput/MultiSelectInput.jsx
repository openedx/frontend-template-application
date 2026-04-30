/* eslint-disable react/prop-types */
import './MultiSelectInput.scss';

const MultiSelectInput = ({
  options = [],
  selectedValues = [],
  onChange,
}) => (
  <div className="multi-select-input">
    {options.map(option => {
      const isSelected = selectedValues.includes(option.value);
      return (
        <label className="multi-select-input__option" key={option.value}>
          <button
            type="button"
            role="checkbox"
            aria-checked={isSelected}
            className={`multi-select-input__checkbox ${isSelected ? 'is-selected' : ''}`}
            onClick={() => {
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
);

export default MultiSelectInput;
