import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {{
 *   builderMode: string,
 *   frameworkUuid: string|null,
 *   tabHasSavedOnce: boolean,
 *   isDirty: boolean,
 *   isValid: boolean,
 * }} params
 */
export const getBuilderTabSubmitState = ({
  builderMode,
  frameworkUuid,
  tabHasSavedOnce,
  isValid,
}) => {
  const isEditMode = builderMode === 'edit';
  const isUpdateMode = isEditMode || tabHasSavedOnce;
  const hasFramework = hasDisplayValue(frameworkUuid);
  const isSubmitEnabled = hasFramework && isValid;

  return {
    isUpdateMode,
    isSubmitEnabled,
  };
};

/**
 * @param {unknown} left
 * @param {unknown} right
 */
export const isSnapshotDirty = (left, right) => (
  JSON.stringify(left) !== JSON.stringify(right)
);
