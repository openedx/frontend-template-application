/* eslint-disable react/prop-types */
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resolveDropdownDisplayContent } from '../../utils/dropdownUtils';
import './SearchableDropdown.scss';

const SearchableDropdown = ({
  value,
  options = [],
  onChange,
  triggerLabel,
  placeholder,
  searchPlaceholder,
  noOptionsText,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openUpward, setOpenUpward] = useState(false);
  const [menuMaxHeight, setMenuMaxHeight] = useState(null);
  const wrapperRef = useRef(null);
  const menuRef = useRef(null);

  const displayContent = useMemo(
    () => resolveDropdownDisplayContent({
      options,
      value,
      triggerLabel,
      placeholder,
    }),
    [options, placeholder, triggerLabel, value],
  );

  useEffect(() => {
    const onClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) {
      return options;
    }

    return options.filter(option => option.label.toLowerCase().startsWith(trimmed));
  }, [options, searchTerm]);
  const shouldShowSearch = options.length > 5;

  const updateMenuPlacement = useCallback(() => {
    if (!open || !wrapperRef.current || !menuRef.current) {
      return;
    }

    const spacing = 12;
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const menuHeight = menuRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - wrapperRect.bottom;
    const spaceAbove = wrapperRect.top;
    const shouldOpenUp = spaceBelow < menuHeight + spacing && spaceAbove > spaceBelow;
    const availableHeight = shouldOpenUp ? spaceAbove - spacing : spaceBelow - spacing;

    setOpenUpward(shouldOpenUp);
    setMenuMaxHeight(Math.max(120, Math.floor(availableHeight)));
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    updateMenuPlacement();
    const handleViewportChange = () => updateMenuPlacement();
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);
    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange, true);
    };
  }, [open, updateMenuPlacement]);

  return (
    <div className={`searchable-dropdown ${disabled ? 'is-disabled' : ''}`} ref={wrapperRef}>
      <button
        type="button"
        className="searchable-dropdown__trigger"
        onClick={() => {
          if (!disabled) {
            setOpen(prev => !prev);
          }
        }}
        aria-expanded={open}
        disabled={disabled}
      >
        <span className="searchable-dropdown__trigger-label">{displayContent}</span>
        <FontAwesomeIcon className="searchable-dropdown__icon" icon={faChevronDown} />
      </button>

      {open && !disabled && (
        <div
          className={`searchable-dropdown__menu ${openUpward ? 'is-open-upward' : ''}`}
          ref={menuRef}
          style={menuMaxHeight ? { maxHeight: `${menuMaxHeight}px` } : undefined}
        >
          {shouldShowSearch && (
            <input
              type="text"
              className="searchable-dropdown__search"
              value={searchTerm}
              placeholder={searchPlaceholder}
              onChange={event => setSearchTerm(event.target.value)}
            />
          )}

          <div className="searchable-dropdown__options">
            {filteredOptions.length > 0 ? filteredOptions.map(option => (
              <button
                key={option.value}
                type="button"
                className={`searchable-dropdown__option ${String(value) === String(option.value) ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  setSearchTerm('');
                }}
              >
                {option.label}
              </button>
            )) : (
              <p className="searchable-dropdown__empty">{noOptionsText}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
