import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {{ role?: string, competencyRole?: string }} user
 * @returns {string}
 */
export const getRoleDisplayLine = (user) => {
  if (hasDisplayValue(user?.role)) {
    return user.role;
  }

  if (hasDisplayValue(user?.competencyRole)) {
    return user.competencyRole;
  }

  return '';
};
