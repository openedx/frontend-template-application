/**
 * Whether an API field should be rendered in the UI.
 * Treats null, undefined, blank strings, and literal "null"/"undefined" as empty.
 * Numbers: only 0 is considered empty (use hasDisplayValue(0) === false).
 */
export const hasDisplayValue = (value) => {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'number') {
    return !Number.isNaN(value);
  }

  if (typeof value === 'boolean') {
    return true;
  }

  const normalized = String(value).trim().toLowerCase();
  return normalized !== ''
    && normalized !== 'null'
    && normalized !== 'undefined';
};
