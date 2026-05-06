import userFormOptions from '../../mock/users/formOptions.json';

/**
 * @param {{ role: string, roleSub?: string }} user
 * @returns {string}
 */
export const getRoleDisplayLine = (user) => {
  if (!user?.roleSub) {
    return user.role;
  }
  const roleDef = userFormOptions.roleOptions.find(r => r.value === user.role);
  const subLabel = roleDef?.subOptions?.find(s => s.value === user.roleSub)?.label;
  return subLabel ? `${user.role} — ${subLabel}` : user.role;
};
