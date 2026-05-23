/**
 * @param {{ results?: Array<object> }} payload
 * @param {{ resultIndex?: number, userRole?: string|null }} [options]
 * @returns {object|null}
 */
export const pickActiveRoleFromPayload = (payload, { resultIndex = 0, userRole = null } = {}) => {
  const results = payload?.results;

  if (!Array.isArray(results) || results.length === 0) {
    return null;
  }

  if (userRole) {
    const match = results.find((row) => row?.userInfo?.userRole === userRole);
    if (match) {
      return match;
    }
  }

  return results[resultIndex] ?? results[0] ?? null;
};
