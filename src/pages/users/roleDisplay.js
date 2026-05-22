import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {{ role?: string }} user
 * @returns {string}
 */
export const getRoleDisplayLine = (user) => (hasDisplayValue(user?.role) ? user.role : '');
