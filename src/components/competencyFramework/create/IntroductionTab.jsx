/* eslint-disable react/prop-types */
import { hasIntroductionSectionData } from '../../../api/competencyFramework/competencyFrameworkUtils';
import RichTextEditor from '../../richTextEditor/RichTextEditor';

const IntroductionTab = ({
  labels,
  values,
  onChange,
  canEdit,
  onSave,
  isSaving = false,
  isPrefilling = false,
}) => {
  const isUpdateMode = hasIntroductionSectionData({
    background: values.background,
    objectives: values.objectives,
  });
  const submitLabel = isUpdateMode ? labels.update : labels.save;
  const savingLabel = isUpdateMode ? labels.updating : labels.saving;
  const isSaveDisabled = !canEdit || isSaving || isPrefilling;

  return (
    <div className="framework-builder__section-card framework-builder__section-card--form">
      <div className="framework-builder__field">
        <label className="framework-builder__label">{labels.background}</label>
        <RichTextEditor
          value={values.background}
          onChange={next => onChange('introductionBackground', next)}
          placeholder={labels.backgroundPlaceholder}
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

      <div className="framework-builder__field">
        <label className="framework-builder__label">{labels.objectives}</label>
        <RichTextEditor
          value={values.objectives}
          onChange={next => onChange('introductionObjectives', next)}
          placeholder={labels.objectivesPlaceholder}
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

export default IntroductionTab;
