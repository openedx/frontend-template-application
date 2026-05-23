import { hasDisplayValue } from './hasDisplayValue';

/**
 * @param {string} name
 * @returns {string}
 */
export const getUserInitials = (name) => {
  if (!hasDisplayValue(name)) {
    return '';
  }

  return name.split(' ')
    .slice(0, 2)
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};
