/* eslint-disable react/prop-types */
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchInput.scss';

const SearchInput = ({
  value,
  placeholder,
  onChange,
}) => (
  <div className="search-input">
    <FontAwesomeIcon icon={faSearch} className="search-input__icon" />
    <input
      type="text"
      className="search-input__field"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default SearchInput;
