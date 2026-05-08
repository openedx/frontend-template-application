/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useMemo, useState } from 'react';
import PopupDialog from '../popupDialog/PopupDialog';
import CommaSeparatedInput from '../commaSeparatedInput/CommaSeparatedInput';
import SearchableDropdown from '../searchableDropdown/SearchableDropdown';
import { useToast } from '../toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import userFormOptions from '../../mock/users/formOptions.json';
import usersData from '../../mock/users/users.json';
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
  const { componentAccess } = useUserRole();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  const [roleSub, setRoleSub] = useState('');
  const [managerId, setManagerId] = useState('');
  const [competencyRole, setCompetencyRole] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFullName(initialValues.name || '');
      setEmail(initialValues.email || '');
      setCountry(initialValues.country || '');
      setRole(initialValues.role || '');
      setRoleSub(initialValues.roleSub || '');
      setManagerId(initialValues.managerId || '');
      setCompetencyRole(initialValues.competencyRole || '');
    }
  }, [initialValues, isOpen]);

  const { countryOptions, roleOptions } = userFormOptions;
  const managerOptions = useMemo(
    () => usersData.map(u => ({ value: u.id, label: `${u.name} (${u.email})` })),
    [],
  );

  const canShowRoleField = Boolean(componentAccess?.users?.userFormFields?.showRoleField ?? false);
  const canShowManagerField = Boolean(componentAccess?.users?.userFormFields?.showManagerField ?? false);
  const canShowCompetencyRoleField = Boolean(componentAccess?.users?.userFormFields?.showCompetencyRoleField ?? false);
  const canShowCountryField = Boolean(componentAccess?.users?.userFormFields?.showCountryField ?? false);

  const selectedRoleDef = useMemo(
    () => roleOptions.find(item => item.value === role),
    [role, roleOptions],
  );
  const subRoleOptions = selectedRoleDef?.subOptions || [];
  const needsSubRole = subRoleOptions.length > 0;

  const isSubmitDisabled = useMemo(() => {
    const base = !fullName.trim() || !email.trim();
    const roleInvalid = canShowRoleField && !role;
    const countryInvalid = canShowCountryField && !country;
    const subInvalid = needsSubRole && !roleSub;
    return base || roleInvalid || countryInvalid || subInvalid;
  }, [canShowCountryField, canShowRoleField, country, email, fullName, needsSubRole, role, roleSub]);

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

        {canShowCountryField && (
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
        )}

        {canShowRoleField && (
          <div className="add-user-modal__field">
            <label className="add-user-modal__label">{formatMessage(messages.addUserModalRole)}</label>
            <SearchableDropdown
              value={role}
              options={roleOptions.map(({ value, label }) => ({ value, label }))}
              onChange={(nextRole) => {
                setRole(nextRole);
                setRoleSub('');
              }}
              triggerLabel={role || formatMessage(messages.addUserModalRolePlaceholder)}
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
          </div>
        )}

        {canShowRoleField && needsSubRole && selectedRoleDef && (
          <div className="add-user-modal__field">
            <label className="add-user-modal__label">
              {selectedRoleDef.label}
            </label>
            <SearchableDropdown
              value={roleSub}
              options={subRoleOptions}
              onChange={setRoleSub}
              triggerLabel={
                subRoleOptions.find(o => o.value === roleSub)?.label
                || formatMessage(messages.addUserModalSubRolePlaceholder)
              }
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
          </div>
        )}

        {canShowManagerField && (
          <div className="add-user-modal__field">
            <label className="add-user-modal__label">Manager</label>
            <SearchableDropdown
              value={managerId}
              options={managerOptions}
              onChange={setManagerId}
              triggerLabel={managerOptions.find(o => o.value === managerId)?.label || 'Select manager'}
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
          </div>
        )}

        {canShowCompetencyRoleField && (
          <div className="add-user-modal__field">
            <label className="add-user-modal__label">Competency Role</label>
            <CommaSeparatedInput
              value={competencyRole}
              onChange={setCompetencyRole}
              placeholder="e.g. Reviewer, Inspector, Laboratory Analyst"
              helperText="Separate multiple roles with commas."
            />
          </div>
        )}

        <button
          type="button"
          className="add-user-modal__submit"
          disabled={isSubmitDisabled}
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
