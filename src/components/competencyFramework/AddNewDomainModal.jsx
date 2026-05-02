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
  onAdd,
}) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const isSubmitDisabled = useMemo(
    () => !form.domainId.trim() || !form.domainName.trim(),
    [form.domainId, form.domainName],
  );

  const handleClose = () => {
    setForm(INITIAL_FORM);
    onClose();
  };

  const handleAdd = () => {
    if (isSubmitDisabled) {
      return;
    }

    onAdd({
      value: form.domainId.trim(),
      label: form.domainName.trim(),
      description: form.domainDescription.trim(),
    });
    setForm(INITIAL_FORM);
    onClose();
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
          />
        </div>
      </div>

      <div className="add-new-domain-modal__actions">
        <button
          type="button"
          className="competency-framework-page__outline-button"
          onClick={handleClose}
        >
          {labels.cancel}
        </button>
        <button
          type="button"
          className="competency-framework-page__primary-button"
          onClick={handleAdd}
          disabled={isSubmitDisabled}
        >
          {labels.confirm}
        </button>
      </div>
    </PopupDialog>
  );
};

export default AddNewDomainModal;
