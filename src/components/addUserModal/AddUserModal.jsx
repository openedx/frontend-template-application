/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useState } from 'react';
import PopupDialog from '../popupDialog/PopupDialog';
import SearchableDropdown from '../searchableDropdown/SearchableDropdown';
import { useToast } from '../toast/ToastProvider';
import messages from '../../pages/users/messages';
import './AddUserModal.scss';

const AddUserModal = ({
  isOpen,
  onClose,
  mode = 'add',
  initialValues = {},
}) => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFullName(initialValues.name || '');
      setEmail(initialValues.email || '');
      setCountry(initialValues.country || '');
      setRole(initialValues.role || '');
    }
  }, [initialValues, isOpen]);

  const countryOptions = [
    { value: 'India', label: 'India' },
    { value: 'Indonesia', label: 'Indonesia' },
    { value: 'Bangladesh', label: 'Bangladesh' },
    { value: 'Thailand', label: 'Thailand' },
    { value: 'Sri Lanka', label: 'Sri Lanka' },
    { value: 'Nepal', label: 'Nepal' },
    { value: 'Myanmar', label: 'Myanmar' },
    { value: 'Maldives', label: 'Maldives' },
    { value: 'Bhutan', label: 'Bhutan' },
  ];

  const roleOptions = [
    { value: 'SEARN Secretariat', label: 'SEARN Secretariat' },
    { value: 'NRA Admin', label: 'NRA Admin' },
    { value: 'Training Provider', label: 'Training Provider' },
    { value: 'IT Support', label: 'IT Support' },
    { value: 'Country Focal Point', label: 'Country Focal Point' },
    { value: 'Regulatory Assessor', label: 'Regulatory Assessor' },
  ];

  return (
    <PopupDialog
      isOpen={isOpen}
      title={formatMessage(mode === 'edit' ? messages.editUserModalTitle : messages.addUserModalTitle)}
      onClose={onClose}
    >
      <div className="add-user-modal__body">
        <div className="add-user-modal__field">
          <label className="add-user-modal__label" htmlFor="add-user-full-name">
            {formatMessage(messages.addUserModalFullName)}
          </label>
          <input
            id="add-user-full-name"
            className="add-user-modal__input"
            value={fullName}
            placeholder={formatMessage(messages.addUserModalFullNamePlaceholder)}
            onChange={event => setFullName(event.target.value)}
          />
        </div>

        <div className="add-user-modal__field">
          <label className="add-user-modal__label" htmlFor="add-user-email">
            {formatMessage(messages.addUserModalEmail)}
          </label>
          <input
            id="add-user-email"
            type="email"
            className="add-user-modal__input"
            value={email}
            placeholder={formatMessage(messages.addUserModalEmailPlaceholder)}
            onChange={event => setEmail(event.target.value)}
          />
        </div>

        <div className="add-user-modal__field">
          <label className="add-user-modal__label">{formatMessage(messages.addUserModalCountry)}</label>
          <SearchableDropdown
            value={country}
            options={countryOptions}
            onChange={setCountry}
            triggerLabel={country || formatMessage(messages.addUserModalCountryPlaceholder)}
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
          />
        </div>

        <div className="add-user-modal__field">
          <label className="add-user-modal__label">{formatMessage(messages.addUserModalRole)}</label>
          <SearchableDropdown
            value={role}
            options={roleOptions}
            onChange={setRole}
            triggerLabel={role || formatMessage(messages.addUserModalRolePlaceholder)}
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
          />
        </div>

        <button
          type="button"
          className="add-user-modal__submit"
          onClick={() => {
            const name = fullName || 'User';
            const isEdit = mode === 'edit';
            showToast({
              title: formatMessage(isEdit ? messages.toastUserUpdatedTitle : messages.toastUserCreatedTitle),
              description: formatMessage(
                isEdit ? messages.toastUserUpdatedDescription : messages.toastUserCreatedDescription,
                { name },
              ),
            });
            onClose();
          }}
        >
          {formatMessage(mode === 'edit' ? messages.editUserModalSaveButton : messages.addUserModalCreateButton)}
        </button>
      </div>
    </PopupDialog>
  );
};

export default AddUserModal;
