/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MultiSelectInput from '../multiSelectInput/MultiSelectInput';
import './MultiSelectPopover.scss';

/**
 * Popover trigger wrapping the shared MultiSelectInput checkbox list.
 *
 * @param {{
 *   options: Array<{ value: string, label: string }>,
 *   selectedValues: string[],
 *   onChange: (values: string[]) => void,
 *   triggerLabel: string,
 *   disabled?: boolean,
 *   searchPlaceholder?: string,
 *   removeAllLabel?: string,
 * }} props
 */
const MultiSelectPopover = ({
  options = [],
  selectedValues = [],
  onChange,
  triggerLabel,
  disabled = false,
  searchPlaceholder,
  removeAllLabel,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="multi-select-popover" ref={wrapperRef}>
      <button
        type="button"
        className="multi-select-popover__trigger"
        onClick={() => !disabled && setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        disabled={disabled}
      >
        <span className="multi-select-popover__trigger-label">{triggerLabel}</span>
        <FontAwesomeIcon className="multi-select-popover__icon" icon={faChevronDown} />
      </button>

      {open && !disabled && (
        <div className="multi-select-popover__panel">
          <MultiSelectInput
            options={options}
            selectedValues={selectedValues}
            onChange={onChange}
            searchPlaceholder={searchPlaceholder}
            removeAllLabel={removeAllLabel}
          />
        </div>
      )}
    </div>
  );
};

export default MultiSelectPopover;
