import { normalizePickerOptionRows } from '../competencyFramework/competencyFrameworkUtils';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {object} row
 */
export const mapMyTeamMemberRow = (row) => ({
  id: row?.id != null ? String(row.id) : '',
  name: row?.name ?? '',
  email: row?.email ?? '',
});

/**
 * @param {{ name?: string, email?: string, role?: string }} fields
 */
export const buildMyTeamCandidateLabel = ({ name, email, role }) => {
  const roleSuffix = hasDisplayValue(role) ? ` (${role})` : '';

  return `${name} — ${email}${roleSuffix}`;
};

/**
 * @param {object} user
 */
export const mapUserToMyTeamCandidateOption = (user) => {
  const name = user?.name ?? '';
  const email = user?.email ?? '';
  const role = user?.role ?? '';

  return {
    id: user?.id != null ? `candidate-${user.id}` : '',
    value: user?.id != null ? String(user.id) : '',
    label: buildMyTeamCandidateLabel({ name, email, role }),
  };
};

/**
 * @param {object} row
 */
export const mapMyTeamCandidateRow = (row) => {
  if (hasDisplayValue(row?.label) && hasDisplayValue(row?.value)) {
    return {
      id: row?.id != null ? String(row.id) : '',
      value: String(row.value),
      label: row.label,
    };
  }

  return mapUserToMyTeamCandidateOption(row);
};

/**
 * Derives member display fields from candidate option label ("Name — email (Role)").
 * @param {string} label
 */
export const parseMyTeamCandidateLabel = (label) => {
  if (!hasDisplayValue(label)) {
    return { name: '', email: '' };
  }

  const [namePart, remainder = ''] = label.split(' — ');
  const email = remainder.split(' (')[0]?.trim() ?? '';

  return {
    name: namePart?.trim() ?? '',
    email,
  };
};

/**
 * @param {Array<object>|undefined} results
 */
export const mapMyTeamCandidateOptionsToDropdown = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows
    .filter((row) => hasDisplayValue(row.value))
    .map((row) => ({
      value: String(row.value),
      label: row.label,
      optionId: String(row.id),
    }));
};

/**
 * @param {Array<object>} results
 */
export const normalizeMyTeamMemberResults = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapMyTeamMemberRow)
    .filter((row) => hasDisplayValue(row.id));
};

/**
 * @param {Array<object>} results
 */
export const normalizeMyTeamCandidateResults = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapMyTeamCandidateRow)
    .filter((row) => hasDisplayValue(row.id) && hasDisplayValue(row.value) && hasDisplayValue(row.label));
};
