/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import commonMessages from '../../messages/commonMessages';
import './ConfirmActionDialog.scss';

const ConfirmActionDialog = ({
  isOpen,
  title,
  description,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) => {
  const { formatMessage } = useIntl();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirm-action-dialog" role="alertdialog" aria-modal="true">
      <button
        type="button"
        className="confirm-action-dialog__backdrop"
        aria-label={formatMessage(commonMessages.closeDialog)}
        onClick={onCancel}
      />
      <div className="confirm-action-dialog__content">
        <div className="confirm-action-dialog__header">
          <h2 className="confirm-action-dialog__title">{title}</h2>
          <p className="confirm-action-dialog__description">{description}</p>
        </div>
        <div className="confirm-action-dialog__actions">
          <button type="button" className="confirm-action-dialog__button" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="confirm-action-dialog__button confirm-action-dialog__button--confirm" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionDialog;
