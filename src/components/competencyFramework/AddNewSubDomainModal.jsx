/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import PopupDialog from '../popupDialog/PopupDialog';
import SearchableDropdown from '../searchableDropdown/SearchableDropdown';
import './AddNewSubDomainModal.scss';

const INITIAL_FORM = {
  parentDomain: '',
  subDomainId: '',
  subDomainName: '',
  subDomainDescription: '',
};

const AddNewSubDomainModal = ({
  isOpen,
  onClose,
  labels,
  onAdd,
  parentDomainOptions,
  defaultParentDomain,
}) => {
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => {
    if (isOpen) {
      setForm({
        ...INITIAL_FORM,
        parentDomain: defaultParentDomain || '',
      });
    }
  }, [isOpen, defaultParentDomain]);
  const selectedParentDomain = useMemo(
    () => parentDomainOptions.find(item => item.value === form.parentDomain),
    [form.parentDomain, parentDomainOptions],
  );
  const isSubmitDisabled = useMemo(
    () => !form.parentDomain || !form.subDomainId.trim() || !form.subDomainName.trim(),
    [form.parentDomain, form.subDomainId, form.subDomainName],
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
      parentDomain: form.parentDomain,
      value: form.subDomainId.trim(),
      label: form.subDomainName.trim(),
      description: form.subDomainDescription.trim(),
    });
    setForm(INITIAL_FORM);
    onClose();
  };

  return (
    <PopupDialog
      isOpen={isOpen}
      onClose={handleClose}
      title={labels.title}
      contentClassName="add-new-sub-domain-modal"
    >
      <div className="add-new-sub-domain-modal__body">
        <div className="add-new-sub-domain-modal__field">
          <label className="framework-builder__label">
            {labels.parentDomain}
            <span className="framework-builder__required">*</span>
          </label>
          <SearchableDropdown
            value={form.parentDomain}
            options={parentDomainOptions}
            onChange={next => setForm(prev => ({ ...prev, parentDomain: next }))}
            triggerLabel={selectedParentDomain?.label || labels.parentDomainPlaceholder}
            searchPlaceholder={labels.dropdownSearchPlaceholder}
            noOptionsText={labels.dropdownNoOptions}
          />
        </div>

        <div className="add-new-sub-domain-modal__field">
          <label className="framework-builder__label" htmlFor="add-new-sub-domain-id">
            {labels.subDomainId}
            <span className="framework-builder__required">*</span>
          </label>
          <input
            id="add-new-sub-domain-id"
            className="framework-builder__input"
            placeholder={labels.subDomainIdPlaceholder}
            value={form.subDomainId}
            onChange={event => setForm(prev => ({ ...prev, subDomainId: event.target.value }))}
          />
        </div>

        <div className="add-new-sub-domain-modal__field">
          <label className="framework-builder__label" htmlFor="add-new-sub-domain-name">
            {labels.subDomainName}
            <span className="framework-builder__required">*</span>
          </label>
          <input
            id="add-new-sub-domain-name"
            className="framework-builder__input"
            placeholder={labels.subDomainNamePlaceholder}
            value={form.subDomainName}
            onChange={event => setForm(prev => ({ ...prev, subDomainName: event.target.value }))}
          />
        </div>

        <div className="add-new-sub-domain-modal__field">
          <label className="framework-builder__label" htmlFor="add-new-sub-domain-description">
            {labels.subDomainDescription}
          </label>
          <textarea
            id="add-new-sub-domain-description"
            className="add-new-sub-domain-modal__textarea"
            placeholder={labels.subDomainDescriptionPlaceholder}
            value={form.subDomainDescription}
            onChange={event => setForm(prev => ({ ...prev, subDomainDescription: event.target.value }))}
            rows={3}
          />
        </div>
      </div>

      <div className="add-new-sub-domain-modal__actions">
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

export default AddNewSubDomainModal;
