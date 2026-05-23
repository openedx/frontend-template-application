import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {Array<object>} results
 */
export const normalizePendingRequestFilters = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results.filter(
    (row) => hasDisplayValue(row.id) && hasDisplayValue(row.value) && hasDisplayValue(row.label),
  );
};

/**
 * @param {object} row
 */
export const mapPendingRequestListRow = (row) => ({
  id: row?.id,
  title: row?.title,
  subtitle: row?.subtitle,
  type: row?.type,
  status: row?.status,
  submittedRelative: row?.submitted_relative ?? row?.submittedRelative,
});

/**
 * Maps a pending-requests list row to the dashboard card shape.
 * @param {object} row
 */
export const mapPendingRequestToDashboardCard = (row) => ({
  id: row?.id,
  title: row?.title,
  description: row?.subtitle ?? row?.description,
  tag: row?.type ?? row?.tag,
  timeAgo: row?.submitted_relative ?? row?.submittedRelative ?? row?.time_ago ?? row?.timeAgo,
});

/**
 * @param {Array<object>} results
 */
export const normalizePendingRequestList = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapPendingRequestListRow)
    .filter((row) => hasDisplayValue(row.id));
};

/**
 * @param {object} payload
 */
export const mapPendingRequestDetail = (payload) => {
  const data = payload?.results ?? payload;

  if (!data || typeof data !== 'object') {
    return null;
  }

  const submittedBy = data.submitted_by;

  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    type: data.type,
    status: data.status,
    submittedAt: data.submitted_at,
    submittedRelative: data.submitted_relative,
    submittedBy: submittedBy && typeof submittedBy === 'object' ? {
      name: submittedBy.name,
      email: submittedBy.email,
    } : null,
    description: data.description,
  };
};