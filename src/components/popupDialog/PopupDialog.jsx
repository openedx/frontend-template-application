/* eslint-disable react/prop-types */
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PopupDialog.scss';

const PopupDialog = ({
  isOpen,
  title,
  onClose,
  contentClassName = '',
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-dialog" role="dialog" aria-modal="true">
      <button type="button" className="popup-dialog__backdrop" aria-label="Close dialog" onClick={onClose} />
      <div className={`popup-dialog__content ${contentClassName}`}>
        <div className="popup-dialog__header">
          <h2 className="popup-dialog__title">{title}</h2>
        </div>
        <button type="button" className="popup-dialog__close" aria-label="Close dialog" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupDialog;
