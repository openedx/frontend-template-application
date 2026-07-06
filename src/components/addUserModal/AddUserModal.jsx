/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useMemo, useState } from 'react';
import PopupDialog from '../popupDialog/PopupDialog';
import CommaSeparatedInput from '../commaSeparatedInput/CommaSeparatedInput';
import SearchableDropdown from '../searchableDropdown/SearchableDropdown';
import {
  findRoleOptionByValue,
  formatRoleSubFieldLabel,
  roleOptionHasSubOptions,
} from '../../api/users/usersUtils';
import {
  getManagerLabelByValue,
  resolveManagerDropdownValue,
  formatCompetencyRoleForInput,
} from '../../api/profile/profileUtils';
import { useUserRole } from '../../contexts/UserRoleContext';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from '../../pages/users/messages';
import './AddUserModal.scss';

const AddUserModal = ({
  isOpen,
  onClose,
  mode = 'add',
  userDetail = null,
  isLoadingDetail = false,
  isSaving = false,
  roleOptionRows = [],
  countryOptions = [],
  isCountriesLoading = false,
  managerOptions = [],
  isManagersLoading = false,
  onSave,
}) => {
  const { formatMessage } = useIntl();
  const { componentAccess } = useUserRole();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  const [roleSub, setRoleSub] = useState('');
  const [managerId, setManagerId] = useState('');
  const [competencyRole, setCompetencyRole] = useState('');
  const [managerInitializedFor, setManagerInitializedFor] = useState(null);

  const managerInitKey = mode === 'edit' ? userDetail?.id ?? null : 'add';

  useEffect(() => {
    if (!isOpen) {
      setManagerInitializedFor(null);
      return;
    }

    if (mode === 'edit' && userDetail) {
      setFullName(userDetail.name || '');
      setEmail(userDetail.email || '');
      setCountry(userDetail.country || '');
      setRole(userDetail.role || '');
      setRoleSub(userDetail.roleSub || userDetail.provider || '');
      setCompetencyRole(formatCompetencyRoleForInput(userDetail.competencyRole));
      return;
    }

    if (mode === 'add') {
      setFullName('');
      setEmail('');
      setCountry('');
      setRole('');
      setRoleSub('');
      setManagerId('');
      setCompetencyRole('');
    }
  }, [isOpen, mode, userDetail]);

  useEffect(() => {
    if (!isOpen || managerOptions.length === 0 || managerInitializedFor === managerInitKey) {
      return;
    }

    if (mode === 'edit' && userDetail) {
      setManagerId(resolveManagerDropdownValue(userDetail.manager, managerOptions));
      setManagerInitializedFor(managerInitKey);
      return;
    }

    if (mode === 'add') {
      setManagerId(resolveManagerDropdownValue('', managerOptions));
      setManagerInitializedFor(managerInitKey);
    }
  }, [isOpen, mode, userDetail, managerOptions, managerInitializedFor, managerInitKey]);

  const canShowRoleField = Boolean(componentAccess?.users?.userFormFields?.showRoleField ?? false);
  const canShowManagerField = Boolean(componentAccess?.users?.userFormFields?.showManagerField ?? false);
  const canShowCompetencyRoleField = Boolean(componentAccess?.users?.userFormFields?.showCompetencyRoleField ?? false);
  const canShowCountryField = Boolean(componentAccess?.users?.userFormFields?.showCountryField ?? false);

  const roleDropdownOptions = useMemo(
    () => roleOptionRows.map(({ value, label }) => ({ value, label })),
    [roleOptionRows],
  );

  const selectedRoleDef = useMemo(
    () => findRoleOptionByValue(roleOptionRows, role),
    [role, roleOptionRows],
  );

  const needsSubRole = roleOptionHasSubOptions(selectedRoleDef);

  const subRoleOptions = selectedRoleDef?.subOptions ?? [];

  const subRoleFieldLabel = selectedRoleDef?.subKey
    ? formatRoleSubFieldLabel(selectedRoleDef.subKey)
    : formatMessage(messages.addUserModalSubRolePlaceholder);

  const isSubmitDisabled = useMemo(() => {
    const base = isLoadingDetail || isSaving || !fullName.trim() || !email.trim();
    const roleInvalid = canShowRoleField && !role;
    const countryInvalid = canShowCountryField && !country;
    const subInvalid = needsSubRole && !roleSub;
    return base || roleInvalid || countryInvalid || subInvalid;
  }, [
    canShowCountryField,
    canShowRoleField,
    country,
    email,
    fullName,
    isLoadingDetail,
    isSaving,
    needsSubRole,
    role,
    roleSub,
  ]);

  const handleSubmit = async () => {
    await onSave({
      name: fullName,
      email,
      country,
      role,
      provider: needsSubRole ? roleSub : '',
      manager: managerId,
      managerOptions,
      competencyRole,
      fieldPermissions: {
        showCountryField: canShowCountryField,
        showRoleField: canShowRoleField,
        showManagerField: canShowManagerField,
        showCompetencyRoleField: canShowCompetencyRoleField,
      },
    });
  };

  const managerLabel = getManagerLabelByValue(managerId, managerOptions);
  const managerTrigger = managerLabel || formatMessage(messages.addUserModalManagerPlaceholder);

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
            disabled={isLoadingDetail || isSaving}
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
            disabled={isLoadingDetail || isSaving}
            onChange={event => setEmail(event.target.value)}
          />
        </div>

        {canShowRoleField && (
          <div className="add-user-modal__field">
            <label className="add-user-modal__label">{formatMessage(messages.addUserModalRole)}</label>
            <SearchableDropdown
              value={role}
              options={roleDropdownOptions}
              onChange={(nextRole) => {
                setRole(nextRole);
                setRoleSub('');
              }}
              disabled={isLoadingDetail || isSaving}
              placeholder={formatMessage(messages.addUserModalRolePlaceholder)}
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
          </div>
        )}

        {canShowRoleField && needsSubRole && (
          <div className="add-user-modal__field">
            <label className="add-user-modal__label">{subRoleFieldLabel}</label>
            <SearchableDropdown
              value={roleSub}
              options={subRoleOptions}
              onChange={setRoleSub}
              disabled={isLoadingDetail || isSaving}
              placeholder={formatMessage(messages.addUserModalSubRolePlaceholder)}
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
          </div>
        )}

        {canShowCountryField && (
          <div className="add-user-modal__field">
            <label className="add-user-modal__label">{formatMessage(messages.addUserModalCountry)}</label>
            <SearchableDropdown
              value={country}
              options={countryOptions}
              onChange={setCountry}
              disabled={isLoadingDetail || isSaving || isCountriesLoading}
              placeholder={formatMessage(messages.addUserModalCountryPlaceholder)}
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
          </div>
        )}

        {canShowManagerField && (
          <div className="add-user-modal__field">
            <label className="add-user-modal__label">{formatMessage(messages.addUserModalManager)}</label>
            <SearchableDropdown
              value={managerId}
              options={managerOptions}
              onChange={setManagerId}
              disabled={isLoadingDetail || isSaving || isManagersLoading}
              triggerLabel={managerTrigger}
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
          </div>
        )}

        {canShowCompetencyRoleField && (
          <div className="add-user-modal__field">
            <label className="add-user-modal__label">{formatMessage(messages.addUserModalCompetencyRole)}</label>
            <CommaSeparatedInput
              value={competencyRole}
              onChange={setCompetencyRole}
              disabled={isLoadingDetail || isSaving}
              placeholder={formatMessage(messages.addUserModalCompetencyRolePlaceholder)}
              helperText={formatMessage(messages.addUserModalCompetencyRoleHelper)}
            />
          </div>
        )}

        <button
          type="button"
          className="add-user-modal__submit"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          {formatMessage(mode === 'edit' ? messages.editUserModalSaveButton : messages.addUserModalCreateButton)}
        </button>
      </div>
    </PopupDialog>
  );
};

export default AddUserModal;
