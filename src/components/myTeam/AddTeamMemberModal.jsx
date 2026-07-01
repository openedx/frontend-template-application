/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useMemo, useState } from 'react';
import PopupDialog from '../popupDialog/PopupDialog';
import SearchableDropdown from '../searchableDropdown/SearchableDropdown';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from '../../pages/myTeam/messages';
import './AddTeamMemberModal.scss';

const AddTeamMemberModal = ({
  isOpen,
  onClose,
  dropdownOptions = [],
  isCandidatesLoading = false,
  isSaving = false,
  onSubmit,
}) => {
  const { formatMessage } = useIntl();
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSelectedUserId('');
  }, [isOpen]);

  const selectedOption = useMemo(
    () => dropdownOptions.find((option) => option.value === selectedUserId) ?? null,
    [dropdownOptions, selectedUserId],
  );

  const isSubmitDisabled = !hasDisplayValue(selectedUserId)
    || isSaving
    || isCandidatesLoading;

  const handleSubmit = async () => {
    if (isSubmitDisabled) {
      return;
    }

    await onSubmit(selectedUserId);
  };

  return (
    <PopupDialog
      isOpen={isOpen}
      title={formatMessage(messages.addModalTitle)}
      onClose={onClose}
      contentClassName="add-team-member-modal__dialog"
    >
      <div className="add-team-member-modal">
        <p className="add-team-member-modal__description">
          {formatMessage(messages.addModalDescription)}
        </p>

        <div className="add-team-member-modal__field">
          <label className="add-team-member-modal__label">
            {formatMessage(messages.addModalUserLabel)}
          </label>
          <SearchableDropdown
            value={selectedUserId}
            options={dropdownOptions}
            onChange={setSelectedUserId}
            disabled={isSaving || isCandidatesLoading}
            placeholder={formatMessage(messages.addModalUserPlaceholder)}
            triggerLabel={
              selectedOption?.label || formatMessage(messages.addModalUserPlaceholder)
            }
            searchPlaceholder={formatMessage(messages.addModalUserSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
          />
        </div>

        <div className="add-team-member-modal__actions">
          <button
            type="button"
            className="add-team-member-modal__button add-team-member-modal__button--outline"
            onClick={onClose}
            disabled={isSaving}
          >
            {formatMessage(messages.addModalCancel)}
          </button>
          <button
            type="button"
            className="add-team-member-modal__button add-team-member-modal__button--primary"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            {formatMessage(messages.addModalSubmit)}
          </button>
        </div>
      </div>
    </PopupDialog>
  );
};

export default AddTeamMemberModal;
