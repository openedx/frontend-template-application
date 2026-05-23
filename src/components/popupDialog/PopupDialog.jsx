/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import commonMessages from '../../messages/commonMessages';
import './PopupDialog.scss';

const PopupDialog = ({
  isOpen,
  title,
  onClose,
  contentClassName = '',
  children,
}) => {
  const { formatMessage } = useIntl();

  if (!isOpen) {
    return null;
  }

  const closeDialogLabel = formatMessage(commonMessages.closeDialog);

  return (
    <div className="popup-dialog" role="dialog" aria-modal="true">
      <button type="button" className="popup-dialog__backdrop" aria-label={closeDialogLabel} onClick={onClose} />
      <div className={`popup-dialog__content ${contentClassName}`}>
        <div className="popup-dialog__header">
          <h2 className="popup-dialog__title">{title}</h2>
        </div>
        <button type="button" className="popup-dialog__close" aria-label={closeDialogLabel} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupDialog;
