/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import PopupDialog from '../popupDialog/PopupDialog';
import SearchableDropdown from '../searchableDropdown/SearchableDropdown';
import { SkeletonScreen, SKELETON_VARIANTS } from '../skeleton';
import useRequestTrainingActivities from '../../hooks/searnTrainingCatalog/useRequestTrainingActivities';
import messages from '../../pages/searnTrainingCatalog/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import './RequestTrainingModal.scss';

const RequestTrainingModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const { formatMessage } = useIntl();
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [description, setDescription] = useState('');

  const {
    dropdownOptions,
    isLoading,
    isError,
    errorMessage,
  } = useRequestTrainingActivities({ enabled: isOpen });

  useEffect(() => {
    if (!isOpen) {
      setSelectedActivityId('');
      setDescription('');
    }
  }, [isOpen]);

  const activityTrigger = selectedActivityId
    ? dropdownOptions.find((option) => option.value === selectedActivityId)?.label
    : (
      <span className="request-training-modal__placeholder">
        {formatMessage(messages.requestTrainingActivityPlaceholder)}
      </span>
    );

  const canSubmit = hasDisplayValue(selectedActivityId)
    && hasDisplayValue(description.trim())
    && !isSubmitting
    && !isLoading
    && !isError;

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    onSubmit({
      activityId: selectedActivityId,
      description: description.trim(),
    });
  };

  return (
    <PopupDialog
      isOpen={isOpen}
      title={formatMessage(messages.requestTrainingModalTitle)}
      onClose={onClose}
      contentClassName="request-training-modal"
    >
      <p className="request-training-modal__description">
        {formatMessage(messages.requestTrainingModalDescription)}
      </p>

      {isError && (
        <p className="request-training-modal__error" role="alert">
          {errorMessage || formatMessage(messages.activityOptionsLoadError)}
        </p>
      )}

      {isLoading ? (
        <SkeletonScreen variant={SKELETON_VARIANTS.card} />
      ) : !isError && (
        <>
          <div className="request-training-modal__field">
            <label className="request-training-modal__label" htmlFor="searn-request-training-activity">
              {formatMessage(messages.requestTrainingActivityLabel)}
              <span className="request-training-modal__required">*</span>
            </label>
            <SearchableDropdown
              value={selectedActivityId}
              options={dropdownOptions}
              onChange={setSelectedActivityId}
              triggerLabel={activityTrigger}
              searchPlaceholder={formatMessage(messages.requestTrainingActivityPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
          </div>

          <div className="request-training-modal__field">
            <label className="request-training-modal__label" htmlFor="searn-request-training-description">
              {formatMessage(messages.requestTrainingDescriptionLabel)}
              <span className="request-training-modal__required">*</span>
            </label>
            <textarea
              id="searn-request-training-description"
              className="request-training-modal__textarea"
              rows={5}
              value={description}
              placeholder={formatMessage(messages.requestTrainingDescriptionPlaceholder)}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="request-training-modal__footer">
        <button
          type="button"
          className="request-training-modal__outline-button"
          onClick={onClose}
        >
          {formatMessage(messages.requestTrainingCancel)}
        </button>
        <button
          type="button"
          className="request-training-modal__primary-button"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          <FontAwesomeIcon icon={faPaperPlane} aria-hidden />
          {formatMessage(messages.requestTrainingSubmit)}
        </button>
      </div>
    </PopupDialog>
  );
};

export default RequestTrainingModal;
