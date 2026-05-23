/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import PopupDialog from '../popupDialog/PopupDialog';
import './AddNewDomainModal.scss';

const INITIAL_FORM = {
  domainId: '',
  domainName: '',
  domainDescription: '',
};

const AddNewDomainModal = ({
  isOpen,
  onClose,
  labels,
  onSubmit,
  onAdd,
  isSubmitting = false,
}) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const isSubmitDisabled = useMemo(
    () => isSubmitting || !form.domainId.trim() || !form.domainName.trim(),
    [form.domainId, form.domainName, isSubmitting],
  );

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    setForm(INITIAL_FORM);
    onClose();
  };

  const handleAdd = async () => {
    if (isSubmitDisabled) {
      return;
    }

    const formValues = {
      domainId: form.domainId.trim(),
      domainName: form.domainName.trim(),
      domainDescription: form.domainDescription.trim(),
    };

    try {
      if (onSubmit) {
        await onSubmit(formValues);
      } else if (onAdd) {
        onAdd({
          value: formValues.domainId,
          label: formValues.domainName,
          description: formValues.domainDescription,
        });
      } else {
        return;
      }

      setForm(INITIAL_FORM);
      onClose();
    } catch {
      // Parent shows error toast; keep modal open for retry.
    }
  };

  return (
    <PopupDialog
      isOpen={isOpen}
      onClose={handleClose}
      title={labels.title}
      contentClassName="add-new-domain-modal"
    >
      <div className="add-new-domain-modal__body">
        <div className="add-new-domain-modal__field">
          <label className="framework-builder__label" htmlFor="add-new-domain-id">
            {labels.domainId}
            <span className="framework-builder__required">*</span>
          </label>
          <input
            id="add-new-domain-id"
            className="framework-builder__input"
            placeholder={labels.domainIdPlaceholder}
            value={form.domainId}
            onChange={event => setForm(prev => ({ ...prev, domainId: event.target.value }))}
            disabled={isSubmitting}
          />
        </div>

        <div className="add-new-domain-modal__field">
          <label className="framework-builder__label" htmlFor="add-new-domain-name">
            {labels.domainName}
            <span className="framework-builder__required">*</span>
          </label>
          <input
            id="add-new-domain-name"
            className="framework-builder__input"
            placeholder={labels.domainNamePlaceholder}
            value={form.domainName}
            onChange={event => setForm(prev => ({ ...prev, domainName: event.target.value }))}
            disabled={isSubmitting}
          />
        </div>

        <div className="add-new-domain-modal__field">
          <label className="framework-builder__label" htmlFor="add-new-domain-description">
            {labels.domainDescription}
          </label>
          <textarea
            id="add-new-domain-description"
            className="add-new-domain-modal__textarea"
            placeholder={labels.domainDescriptionPlaceholder}
            value={form.domainDescription}
            onChange={event => setForm(prev => ({ ...prev, domainDescription: event.target.value }))}
            rows={3}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="add-new-domain-modal__actions">
        <button
          type="button"
          className="competency-framework-page__outline-button"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          {labels.cancel}
        </button>
        <button
          type="button"
          className="competency-framework-page__primary-button"
          onClick={handleAdd}
          disabled={isSubmitDisabled}
        >
          {isSubmitting ? labels.submitting : labels.confirm}
        </button>
      </div>
    </PopupDialog>
  );
};

export default AddNewDomainModal;
