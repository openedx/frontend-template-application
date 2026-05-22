/* eslint-disable react/prop-types */
import RoleOptionDropdownGroup, { ROLE_OPTION_ALL } from './RoleOptionDropdownGroup';

const UsersRoleFilter = ({
  roleFilter,
  providerFilter,
  roleOptions,
  allRolesLabel,
  allProvidersLabel,
  searchPlaceholder,
  noOptionsText,
  onRoleChange,
  onProviderChange,
}) => (
  <RoleOptionDropdownGroup
    className="users-role-filter"
    roleValue={roleFilter}
    subValue={providerFilter}
    roleOptions={roleOptions}
    includeAllRoleOption
    includeAllSubOption
    allRolesLabel={allRolesLabel}
    allSubLabel={allProvidersLabel}
    rolePlaceholder={allRolesLabel}
    subPlaceholder={allProvidersLabel}
    searchPlaceholder={searchPlaceholder}
    noOptionsText={noOptionsText}
    onRoleChange={onRoleChange}
    onSubChange={onProviderChange}
  />
);

export default UsersRoleFilter;
export { ROLE_OPTION_ALL as USERS_ROLE_FILTER_ALL };
