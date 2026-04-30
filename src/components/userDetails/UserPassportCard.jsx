/* eslint-disable react/prop-types */
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserPassportCard = ({
  title,
  description,
  buttonLabel,
}) => (
  <div className="user-detail__passport">
    <div>
      <h3 className="user-detail__passport-title">{title}</h3>
      <p className="user-detail__passport-description">{description}</p>
    </div>
    <button type="button" className="user-detail__passport-btn">
      {buttonLabel}
      <FontAwesomeIcon icon={faFileAlt} />
    </button>
  </div>
);

export default UserPassportCard;
