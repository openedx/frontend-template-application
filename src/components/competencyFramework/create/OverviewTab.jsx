/* eslint-disable react/prop-types */
import { hasOverviewSectionData } from '../../../api/competencyFramework/competencyFrameworkUtils';
import RichTextEditor from '../../richTextEditor/RichTextEditor';

const OverviewTab = ({
  labels,
  value,
  onChange,
  canEdit,
  onSave,
  isSaving = false,
  isPrefilling = false,
}) => {
  const isUpdateMode = hasOverviewSectionData(value);
  const submitLabel = isUpdateMode ? labels.update : labels.save;
  const savingLabel = isUpdateMode ? labels.updating : labels.saving;
  const isSaveDisabled = !canEdit || isSaving || isPrefilling;

  return (
    <div className="framework-builder__section-card framework-builder__section-card--form">
      <div className="framework-builder__field">
        <label className="framework-builder__label">{labels.competencyModel}</label>
        <RichTextEditor
          value={value}
          onChange={onChange}
          placeholder={labels.competencyModelPlaceholder}
          disabled={!canEdit || isPrefilling}
          labels={{
            editor: labels.editor,
            preview: labels.preview,
            bold: labels.bold,
            italic: labels.italic,
            underline: labels.underline,
            list: labels.list,
            heading3: labels.heading3,
          }}
        />
      </div>

      {canEdit && (
        <div className="framework-builder__actions">
          <button
            type="button"
            className="competency-framework-page__primary-button"
            disabled={isSaveDisabled}
            onClick={onSave}
          >
            {isSaving || isPrefilling ? savingLabel : submitLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;
