/* eslint-disable react/prop-types */
import {
  hasGeneralInformationSectionData,
  hasRichTextContent,
} from '../../../api/competencyFramework/competencyFrameworkUtils';
import SearchableDropdown from '../../searchableDropdown/SearchableDropdown';
import MultiSelectInput from '../../multiSelectInput/MultiSelectInput';
import RichTextEditor from '../../richTextEditor/RichTextEditor';
import { hasDisplayValue } from '../../../utils/hasDisplayValue';

const GeneralInformationTab = ({
  labels,
  values,
  onChange,
  sourceFrameworkOptions,
  productTypeOptions,
  canEdit,
  onSave,
  isSaving = false,
  isPrefilling = false,
  optionsLoading = false,
  hasFrameworkId = false,
}) => {
  const sourceFrameworkLabel = sourceFrameworkOptions.find(
    (option) => String(option.value) === String(values.sourceFramework),
  )?.label;

  const isUpdateMode = hasFrameworkId && hasGeneralInformationSectionData({
    name: values.name,
    description: values.description,
    sourceFramework: values.sourceFramework,
    productTypes: values.productTypes,
  });
  const submitLabel = isUpdateMode ? labels.update : labels.save;
  const savingLabel = isUpdateMode ? labels.updating : labels.saving;

  const selectedProductTypes = Array.isArray(values.productTypes) ? values.productTypes : [];

  const isSaveDisabled = (
    !canEdit
    || isSaving
    || isPrefilling
    || optionsLoading
    || !hasDisplayValue(values.name?.trim())
    || selectedProductTypes.length === 0
    || !hasRichTextContent(values.description)
    || !hasDisplayValue(values.sourceFramework)
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
        selectedValues={Array.isArray(values.productTypes) ? values.productTypes : []}
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
          {sourceFrameworkLabel || labels.sourceFrameworkPlaceholder}
        </div>
      )}
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

export default GeneralInformationTab;
