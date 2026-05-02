/* eslint-disable react/prop-types */
import RichTextEditor from '../../richTextEditor/RichTextEditor';

const OverviewTab = ({
  labels,
  value,
  onChange,
  canEdit,
}) => (
  <div className="framework-builder__section-card framework-builder__section-card--form">
    <div className="framework-builder__field">
      <label className="framework-builder__label">{labels.competencyModel}</label>
      <RichTextEditor
        value={value}
        onChange={onChange}
        placeholder={labels.competencyModelPlaceholder}
        disabled={!canEdit}
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

    <div className="framework-builder__actions">
      <button
        type="button"
        className="competency-framework-page__primary-button"
        disabled={!canEdit}
      >
        {labels.save}
      </button>
    </div>
  </div>
);

export default OverviewTab;
