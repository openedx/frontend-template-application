/* eslint-disable react/prop-types */
import SearchableDropdown from '../../searchableDropdown/SearchableDropdown';
import MultiSelectInput from '../../multiSelectInput/MultiSelectInput';
import RichTextEditor from '../../richTextEditor/RichTextEditor';

const GeneralInformationTab = ({
  labels,
  values,
  onChange,
  sourceFrameworkOptions,
  productTypeOptions,
  canEdit,
}) => {
  const isSaveDisabled = (
    !canEdit
    || !values.name.trim()
    || values.productTypes.length === 0
    || !values.description.trim()
    || !values.sourceFramework
  );

  return (
    <div className="framework-builder__section-card framework-builder__section-card--form">
    <div className="framework-builder__field">
      <label className="framework-builder__label" htmlFor="framework-name">
        {labels.name}
        <span className="framework-builder__required">*</span>
      </label>
      <input
        id="framework-name"
        className="framework-builder__input"
        placeholder={labels.namePlaceholder}
        value={values.name}
        onChange={event => onChange('name', event.target.value)}
        disabled={!canEdit}
      />
    </div>

    <div className="framework-builder__field">
      <label className="framework-builder__label">
        {labels.typeOfProduct}
        <span className="framework-builder__required">*</span>
      </label>
      <MultiSelectInput
        options={productTypeOptions}
        selectedValues={values.productTypes}
        onChange={next => onChange('productTypes', next)}
        disabled={!canEdit}
      />
    </div>

    <div className="framework-builder__field">
      <label className="framework-builder__label">
        {labels.description}
        <span className="framework-builder__required">*</span>
      </label>
      <RichTextEditor
        value={values.description}
        onChange={next => onChange('description', next)}
        placeholder={labels.descriptionPlaceholder}
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

    <div className="framework-builder__field">
      <label className="framework-builder__label">
        {labels.sourceFramework}
        <span className="framework-builder__required">*</span>
      </label>
      {canEdit ? (
        <SearchableDropdown
          value={values.sourceFramework}
          options={sourceFrameworkOptions}
          onChange={next => onChange('sourceFramework', next)}
          triggerLabel={values.sourceFramework || labels.sourceFrameworkPlaceholder}
          searchPlaceholder={labels.dropdownSearchPlaceholder}
          noOptionsText={labels.dropdownNoOptions}
        />
      ) : (
        <div className="framework-builder__input framework-builder__input--readonly">
          {values.sourceFramework || labels.sourceFrameworkPlaceholder}
        </div>
      )}
    </div>

    <div className="framework-builder__actions">
      <button
        type="button"
        className="competency-framework-page__primary-button"
        disabled={isSaveDisabled}
      >
        {labels.save}
      </button>
    </div>
  </div>
  );
};

export default GeneralInformationTab;
