import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {string|undefined} label
 * @param {string|undefined} value
 */
export const parseProficiencyOptionLabel = (label, value) => {
  if (hasDisplayValue(label)) {
    const match = String(label).match(/^(.+?)\s*\(([^)]+)\)\s*$/);

    if (match) {
      return { name: match[1].trim(), code: match[2].trim() };
    }

    return { name: String(label).trim(), code: '' };
  }

  if (hasDisplayValue(value)) {
    const match = String(value).match(/^level-(.+)$/i);

    return {
      name: '',
      code: match ? match[1].toUpperCase() : '',
    };
  }

  return { name: '', code: '' };
};

/**
 * @param {object} data
 */
export const unwrapProficiencyResultsPayload = (data) => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const { results } = data;

  if (Array.isArray(results)) {
    return results;
  }

  return null;
};

/**
 * @param {Array<{ id?: number|string, value?: string, label?: string }>|undefined} results
 */
export const mapFrameworkProficiencyLevelsToFormRows = (results) => {
  if (!Array.isArray(results) || results.length === 0) {
    return null;
  }

  return results.map((row, index) => {
    const { name, code } = parseProficiencyOptionLabel(row.label, row.value);

    return {
      id: hasDisplayValue(row.id)
        ? `pl-${row.id}`
        : `pl-${index}-${Date.now()}`,
      code,
      name,
    };
  });
};

/**
 * @param {Array<{ code?: string, name?: string }>} levels
 */
export const buildProficiencyLevelsSyncPayload = (levels) => ({
  levels: (levels ?? [])
    .filter(
      (row) => hasDisplayValue(row.code?.trim()) && hasDisplayValue(row.name?.trim()),
    )
    .map((row) => ({
      code: row.code.trim(),
      name: row.name.trim(),
    })),
});

/**
 * @param {Array<{ code?: string, name?: string }>} levels
 */
/**
 * @param {Array<{ value?: string, label?: string }>} results - GET proficiency-levels results
 */
export const mapProficiencyApiResultsToDropdownOptions = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .filter((row) => hasDisplayValue(row.value) && hasDisplayValue(row.label))
    .map((row) => ({
      value: String(row.value),
      label: row.label,
    }));
};

export const hasProficiencyLevelsSectionData = (levels) => {
  if (!Array.isArray(levels)) {
    return false;
  }

  return levels.some(
    (row) => hasDisplayValue(row.code?.trim()) && hasDisplayValue(row.name?.trim()),
  );
};
