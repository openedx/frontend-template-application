import { isValidElement } from 'react';
import { hasDisplayValue } from './hasDisplayValue';

/**
 * Resolve the text (or node) shown on a dropdown trigger from the current value.
 */
export const resolveDropdownDisplayContent = ({
  options = [],
  value,
  triggerLabel,
  placeholder,
}) => {
  const selected = options.find(
    (option) => String(option.value) === String(value),
  );

  if (selected?.label) {
    return selected.label;
  }

  if (isValidElement(triggerLabel)) {
    return triggerLabel;
  }

  if (
    hasDisplayValue(triggerLabel)
    && String(triggerLabel) !== String(value)
  ) {
    return triggerLabel;
  }

  if (hasDisplayValue(placeholder)) {
    return placeholder;
  }

  return '';
};
