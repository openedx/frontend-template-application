/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import SearchableDropdown from '../searchableDropdown/SearchableDropdown';
import {
  findRoleOptionByValue,
  formatRoleSubFieldLabel,
  roleOptionHasSubOptions,
} from '../../api/users/usersUtils';
import './RoleOptionDropdownGroup.scss';

export const ROLE_OPTION_ALL = 'all';

const RoleOptionDropdownGroup = ({
  roleValue,
  subValue,
  roleOptions = [],
  includeAllRoleOption = false,
  includeAllSubOption = false,
  allRolesLabel,
  allSubLabel,
  rolePlaceholder,
  subPlaceholder,
  searchPlaceholder,
  noOptionsText,
  disabled = false,
  className = '',
  onRoleChange,
  onSubChange,
}) => {
  const roleDropdownOptions = useMemo(() => {
    const rows = roleOptions.map(({ value, label }) => ({ value, label }));
    if (!includeAllRoleOption) {
      return rows;
    }
    return [{ value: ROLE_OPTION_ALL, label: allRolesLabel }, ...rows];
  }, [allRolesLabel, includeAllRoleOption, roleOptions]);

  const selectedRole = useMemo(
    () => findRoleOptionByValue(roleOptions, roleValue),
    [roleOptions, roleValue],
  );

  const showSubDropdown = useMemo(() => {
    if (includeAllRoleOption && roleValue === ROLE_OPTION_ALL) {
      return false;
    }
    return roleOptionHasSubOptions(selectedRole);
  }, [includeAllRoleOption, roleValue, selectedRole]);

  const subDropdownOptions = useMemo(() => {
    if (!showSubDropdown || !selectedRole) {
      return [];
    }
    const rows = selectedRole.subOptions ?? [];
    if (!includeAllSubOption) {
      return rows;
    }
    return [{ value: ROLE_OPTION_ALL, label: allSubLabel }, ...rows];
  }, [allSubLabel, includeAllSubOption, selectedRole, showSubDropdown]);

  const subFieldLabel = selectedRole?.subKey
    ? formatRoleSubFieldLabel(selectedRole.subKey)
    : subPlaceholder;

  return (
    <div
      className={[
        'role-option-dropdown-group',
        showSubDropdown ? 'role-option-dropdown-group--expanded' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="role-option-dropdown-group__field">
        <SearchableDropdown
          value={roleValue}
          options={roleDropdownOptions}
          onChange={onRoleChange}
          placeholder={includeAllRoleOption ? allRolesLabel : rolePlaceholder}
          searchPlaceholder={searchPlaceholder}
          noOptionsText={noOptionsText}
          disabled={disabled}
        />
      </div>

      {showSubDropdown && (
        <div className="role-option-dropdown-group__field">
          {!includeAllRoleOption && (
            <span className="role-option-dropdown-group__label">{subFieldLabel}</span>
          )}
          <SearchableDropdown
            value={subValue}
            options={subDropdownOptions}
            onChange={onSubChange}
            placeholder={subPlaceholder}
            searchPlaceholder={searchPlaceholder}
            noOptionsText={noOptionsText}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default RoleOptionDropdownGroup;
