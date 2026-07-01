/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faStar, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import PopupDialog from '../popupDialog/PopupDialog';
import SearchableDropdown from '../searchableDropdown/SearchableDropdown';
import { SkeletonScreen, SKELETON_VARIANTS } from '../skeleton';
import useMyTrainingDetail from '../../hooks/myTraining/useMyTrainingDetail';
import useMyTrainingStatusOptions from '../../hooks/myTraining/useMyTrainingStatusOptions';
import { MY_TRAINING_STATUS } from '../../api/myTraining/myTrainingUtils';
import messages from '../../pages/myTraining/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import './UpdateTrainingStatusModal.scss';

const UpdateTrainingStatusModal = ({
  trainingId,
  isOpen,
  onClose,
  onSave,
  isSaving = false,
}) => {
  const { formatMessage } = useIntl();
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState('');
  const [proofFile, setProofFile] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const {
    training,
    isLoading: isDetailLoading,
    isError: isDetailError,
    errorMessage: detailErrorMessage,
  } = useMyTrainingDetail({ trainingId, enabled: isOpen });

  const {
    statusOptions,
    isLoading: isStatusOptionsLoading,
    isError: isStatusOptionsError,
    errorMessage: statusOptionsErrorMessage,
  } = useMyTrainingStatusOptions({ enabled: isOpen });

  useEffect(() => {
    if (!isOpen || !training) {
      return;
    }

    setStatus(training.status || '');
    setProofFile(null);
    setRating(training.rating || 0);
    setHoverRating(0);
    setFeedback(training.feedback || '');
  }, [isOpen, training]);

  useEffect(() => {
    if (!isOpen) {
      setStatus('');
      setProofFile(null);
      setRating(0);
      setHoverRating(0);
      setFeedback('');
    }
  }, [isOpen]);

  if (!isOpen || !trainingId) {
    return null;
  }

  const isLoading = isDetailLoading || isStatusOptionsLoading;
  const isError = isDetailError || isStatusOptionsError;
  const errorMessage = detailErrorMessage || statusOptionsErrorMessage;
  const isCompleted = status === MY_TRAINING_STATUS.COMPLETED;
  const statusTrigger = statusOptions.find((option) => option.value === status)?.label
    || formatMessage(messages.modalStatusLabel);

  const proofButtonLabel = proofFile
    ? proofFile.name
    : hasDisplayValue(training?.proofFileName)
      ? formatMessage(messages.modalProofReplace, { fileName: training.proofFileName })
      : formatMessage(messages.modalProofChoose);

  const handleSave = () => {
    if (!training) {
      return;
    }

    onSave({
      trainingId: training.id,
      status,
      rating: isCompleted ? rating : null,
      feedback: isCompleted ? feedback.trim() : '',
      proofFile,
      proofFileName: proofFile ? proofFile.name : training.proofFileName,
    });
  };

  return (
    <PopupDialog
      isOpen={isOpen}
      title={formatMessage(messages.modalTitle)}
      onClose={onClose}
      contentClassName="update-training-status-modal"
    >
      {hasDisplayValue(training?.title) && (
        <p className="update-training-status-modal__subtitle">{training.title}</p>
      )}

      {isError && (
        <p className="update-training-status-modal__error" role="alert">
          {errorMessage}
        </p>
      )}

      {isLoading ? (
        <SkeletonScreen variant={SKELETON_VARIANTS.card} />
      ) : !isError && training && (
        <div className="update-training-status-modal__fields">
          <div className="update-training-status-modal__field">
            <label className="update-training-status-modal__label" htmlFor="my-training-status">
              {formatMessage(messages.modalStatusLabel)}
            </label>
            <SearchableDropdown
              value={status}
              options={statusOptions}
              onChange={setStatus}
              triggerLabel={statusTrigger}
              searchPlaceholder={formatMessage(messages.modalStatusLabel)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
          </div>

          {isCompleted && (
            <>
              <div className="update-training-status-modal__field">
                <label className="update-training-status-modal__label" htmlFor="my-training-proof">
                  {formatMessage(messages.modalProofLabel)}
                  <span className="update-training-status-modal__required">*</span>
                </label>
                <p className="update-training-status-modal__hint">
                  {formatMessage(messages.modalProofHint)}
                </p>
                <input
                  ref={fileInputRef}
                  id="my-training-proof"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  className="update-training-status-modal__file-input"
                  onChange={(event) => setProofFile(event.target.files?.[0] || null)}
                />
                <button
                  type="button"
                  className="update-training-status-modal__upload-button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FontAwesomeIcon icon={faUpload} aria-hidden />
                  {proofButtonLabel}
                </button>
              </div>

              <div className="update-training-status-modal__field">
                <label className="update-training-status-modal__label">
                  {formatMessage(messages.modalRatingLabel)}
                  <span className="update-training-status-modal__required">*</span>
                </label>
                <p className="update-training-status-modal__hint">
                  {formatMessage(messages.modalRatingHint)}
                </p>
                <div className="update-training-status-modal__stars">
                  {[1, 2, 3, 4, 5].map((value) => {
                    const active = (hoverRating || rating) >= value;

                    return (
                      <button
                        key={value}
                        type="button"
                        className="update-training-status-modal__star-button"
                        onClick={() => setRating(value === rating ? 0 : value)}
                        onMouseEnter={() => setHoverRating(value)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={formatMessage(
                          value === 1 ? messages.modalRatingStar : messages.modalRatingStars,
                          { count: value },
                        )}
                      >
                        <FontAwesomeIcon
                          icon={faStar}
                          className={active
                            ? 'update-training-status-modal__star update-training-status-modal__star--active'
                            : 'update-training-status-modal__star'}
                        />
                      </button>
                    );
                  })}
                  {rating > 0 && (
                    <span className="update-training-status-modal__rating-value">
                      {formatMessage(messages.modalRatingValue, { rating })}
                    </span>
                  )}
                </div>
              </div>

              <div className="update-training-status-modal__field">
                <label className="update-training-status-modal__label" htmlFor="my-training-feedback">
                  {formatMessage(messages.modalFeedbackLabel)}
                </label>
                <textarea
                  id="my-training-feedback"
                  className="update-training-status-modal__textarea"
                  rows={4}
                  value={feedback}
                  placeholder={formatMessage(messages.modalFeedbackPlaceholder)}
                  onChange={(event) => setFeedback(event.target.value)}
                />
              </div>
            </>
          )}
        </div>
      )}

      <div className="update-training-status-modal__footer">
        <button
          type="button"
          className="update-training-status-modal__outline-button"
          onClick={onClose}
        >
          {formatMessage(messages.modalCancel)}
        </button>
        <button
          type="button"
          className="update-training-status-modal__primary-button"
          disabled={isSaving || isLoading || isError || !hasDisplayValue(status)}
          onClick={handleSave}
        >
          {formatMessage(messages.modalSave)}
        </button>
      </div>
    </PopupDialog>
  );
};

export default UpdateTrainingStatusModal;
