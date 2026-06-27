import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {Array<{
 *   id?: string,
 *   userName?: string,
 *   userProfileImage?: string,
 *   user_profile_image?: string,
 *   action?: string,
 *   target?: string,
 *   timeAgo?: string,
 * }>} items
 */
export const normalizeRecentActivities = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((row) => {
      if (!row || !hasDisplayValue(row.id)) {
        return false;
      }

      return hasDisplayValue(row.userName)
        || hasDisplayValue(row.userProfileImage)
        || hasDisplayValue(row.user_profile_image)
        || hasDisplayValue(row.action)
        || hasDisplayValue(row.target)
        || hasDisplayValue(row.timeAgo);
    })
    .map((row) => ({
      id: row.id,
      userName: row.userName,
      userProfileImage: row.userProfileImage ?? row.user_profile_image ?? '',
      action: row.action,
      target: row.target,
      timeAgo: row.timeAgo,
    }));
};
