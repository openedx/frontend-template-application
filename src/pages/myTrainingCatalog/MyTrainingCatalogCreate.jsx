import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState } from '../../components/emptyState';
import MultiSelectInput from '../../components/multiSelectInput/MultiSelectInput';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import { mapMyTrainingCatalogFormDetailToState } from '../../api/myTrainingCatalog/myTrainingCatalogUtils';
import useMyTrainingCatalogFormDetail from '../../hooks/myTrainingCatalog/useMyTrainingCatalogFormDetail';
import useMyTrainingCatalogFormOptions from '../../hooks/myTrainingCatalog/useMyTrainingCatalogFormOptions';
import useTrainingCatalogVariant from '../../hooks/myTrainingCatalog/useTrainingCatalogVariant';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import catalogMessages from '../searnTrainingCatalog/messages';
import messages from './messages';
import './MyTrainingCatalogCreate.scss';

const REGISTRATION_URL = 'url';
const REGISTRATION_EMAIL = 'email';

const MyTrainingCatalogCreate = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { trainingId } = useParams();
  const variant = useTrainingCatalogVariant();
  const isEditMode = hasDisplayValue(trainingId);

  const {
    languageOptions,
    modeOptions,
    approachOptions,
    evaluationOptions,
    outcomeOptions,
    productTypeOptions,
    nraObjectiveOptions,
    mappedCompetencyOptions,
    mappedActivityOptions,
    isLoading: isOptionsLoading,
  } = useMyTrainingCatalogFormOptions({ enabled: true });

  const {
    training,
    isLoading: isDetailLoading,
    isError: isDetailError,
    errorMessage: detailErrorMessage,
  } = useMyTrainingCatalogFormDetail({
    trainingId,
    enabled: isEditMode,
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState('');
  const [mode, setMode] = useState('');
  const [approach, setApproach] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [outcome, setOutcome] = useState('');
  const [productType, setProductType] = useState('');
  const [nraObjectives, setNraObjectives] = useState([]);
  const [mappedCompetencies, setMappedCompetencies] = useState([]);
  const [mappedActivities, setMappedActivities] = useState([]);
  const [registrationBy, setRegistrationBy] = useState(REGISTRATION_URL);
  const [registrationValue, setRegistrationValue] = useState('');
  const [isFormPrefilled, setIsFormPrefilled] = useState(false);

  const dropdownSearchPlaceholder = formatMessage(catalogMessages.dropdownSearchPlaceholder);
  const dropdownNoOptions = formatMessage(catalogMessages.dropdownNoOptions);
  const isLoading = isOptionsLoading || (isEditMode && isDetailLoading);
  const showLoadError = isEditMode && isDetailError;

  useEffect(() => {
    if (!isEditMode) {
      setIsFormPrefilled(false);
      return;
    }

    if (!training || isOptionsLoading || isFormPrefilled) {
      return;
    }

    const nextState = mapMyTrainingCatalogFormDetailToState(training, {
      languageOptions,
      modeOptions,
      approachOptions,
      evaluationOptions,
      outcomeOptions,
      productTypeOptions,
      nraObjectiveOptions,
      mappedCompetencyOptions,
      mappedActivityOptions,
    });

    if (!nextState) {
      return;
    }

    setName(nextState.name);
    setDescription(nextState.description);
    setLanguage(nextState.language);
    setDuration(nextState.duration);
    setCost(nextState.cost);
    setMode(nextState.mode);
    setApproach(nextState.approach);
    setEvaluation(nextState.evaluation);
    setOutcome(nextState.outcome);
    setProductType(nextState.productType);
    setNraObjectives(nextState.nraObjectives);
    setMappedCompetencies(nextState.mappedCompetencies);
    setMappedActivities(nextState.mappedActivities);
    setRegistrationBy(nextState.registrationBy === REGISTRATION_EMAIL
      ? REGISTRATION_EMAIL
      : REGISTRATION_URL);
    setRegistrationValue(nextState.registrationValue);
    setIsFormPrefilled(true);
  }, [
    approachOptions,
    evaluationOptions,
    isEditMode,
    isFormPrefilled,
    isOptionsLoading,
    languageOptions,
    mappedActivityOptions,
    mappedCompetencyOptions,
    modeOptions,
    nraObjectiveOptions,
    outcomeOptions,
    productTypeOptions,
    training,
  ]);

  useEffect(() => {
    if (!showLoadError) {
      return;
    }

    showToast({
      title: formatMessage(messages.formDetailLoadErrorTitle),
      description: detailErrorMessage || formatMessage(messages.formDetailLoadError),
    });
  }, [detailErrorMessage, formatMessage, showLoadError, showToast]);

  const handleSubmit = () => {
    if (!hasDisplayValue(name) || !hasDisplayValue(cost) || !hasDisplayValue(mode)
      || !hasDisplayValue(approach) || !hasDisplayValue(evaluation) || !hasDisplayValue(productType)
      || mappedActivities.length === 0) {
      showToast({
        title: formatMessage(messages.createValidationTitle),
        description: formatMessage(messages.createValidationDescription),
      });
      return;
    }

    showToast({
      title: formatMessage(isEditMode ? messages.updateSuccessTitle : messages.createSuccessTitle),
      description: formatMessage(isEditMode ? messages.updateSuccessDescription : messages.createSuccessDescription),
    });
    navigate(variant.paths.list);
  };

  if (isLoading) {
    return (
      <section className="my-training-create">
        <SkeletonScreen variant={SKELETON_VARIANTS.DETAIL} />
      </section>
    );
  }

  if (showLoadError) {
    return (
      <section className="my-training-create">
        <EmptyState
          fullSize
          message={detailErrorMessage || formatMessage(messages.formDetailNotFound)}
        />
      </section>
    );
  }

  return (
    <section className="my-training-create">
      {isEditMode && (
        <h1 className="my-training-create__page-title">
          {formatMessage(messages.editPageTitle)}
        </h1>
      )}

      <div className="my-training-create__grid">
        <div className="my-training-create__card">
          <h2 className="my-training-create__card-title">{formatMessage(messages.basicInformationTitle)}</h2>
          <div className="my-training-create__fields">
            <label className="my-training-create__label" htmlFor="my-training-name">
              {formatMessage(messages.fieldTrainingName)}
              <span className="my-training-create__required">*</span>
            </label>
            <input
              id="my-training-name"
              className="my-training-create__input"
              value={name}
              placeholder={formatMessage(messages.fieldTrainingNamePlaceholder)}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="my-training-create__label" htmlFor="my-training-description">
              {formatMessage(messages.fieldDescription)}
            </label>
            <textarea
              id="my-training-description"
              className="my-training-create__textarea"
              rows={4}
              value={description}
              placeholder={formatMessage(messages.fieldDescriptionPlaceholder)}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="my-training-create__row">
              <div className="my-training-create__field">
                <span className="my-training-create__label">{formatMessage(messages.fieldLanguage)}</span>
                <SearchableDropdown
                  value={language}
                  options={languageOptions}
                  onChange={setLanguage}
                  triggerLabel={
                    languageOptions.find((o) => o.value === language)?.label
                    || formatMessage(messages.selectLanguage)
                  }
                  searchPlaceholder={dropdownSearchPlaceholder}
                  noOptionsText={dropdownNoOptions}
                />
              </div>
              <div className="my-training-create__field">
                <label className="my-training-create__label" htmlFor="my-training-duration">
                  {formatMessage(messages.fieldDuration)}
                </label>
                <input
                  id="my-training-duration"
                  className="my-training-create__input"
                  value={duration}
                  placeholder={formatMessage(messages.fieldDurationPlaceholder)}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>

            <label className="my-training-create__label" htmlFor="my-training-cost">
              {formatMessage(messages.fieldCost)}
              <span className="my-training-create__required">*</span>
            </label>
            <input
              id="my-training-cost"
              className="my-training-create__input"
              value={cost}
              placeholder={formatMessage(messages.fieldCostPlaceholder)}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
        </div>

        <div className="my-training-create__card">
          <h2 className="my-training-create__card-title">{formatMessage(messages.trainingDetailsTitle)}</h2>
          <div className="my-training-create__fields">
            <span className="my-training-create__label">
              {formatMessage(messages.fieldMode)}
              <span className="my-training-create__required">*</span>
            </span>
            <SearchableDropdown
              value={mode}
              options={modeOptions}
              onChange={setMode}
              triggerLabel={modeOptions.find((o) => o.value === mode)?.label || formatMessage(messages.selectMode)}
              searchPlaceholder={dropdownSearchPlaceholder}
              noOptionsText={dropdownNoOptions}
            />

            <span className="my-training-create__label">
              {formatMessage(messages.fieldApproach)}
              <span className="my-training-create__required">*</span>
            </span>
            <SearchableDropdown
              value={approach}
              options={approachOptions}
              onChange={setApproach}
              triggerLabel={approachOptions.find((o) => o.value === approach)?.label || formatMessage(messages.selectApproach)}
              searchPlaceholder={dropdownSearchPlaceholder}
              noOptionsText={dropdownNoOptions}
            />

            <span className="my-training-create__label">
              {formatMessage(messages.fieldEvaluation)}
              <span className="my-training-create__required">*</span>
            </span>
            <SearchableDropdown
              value={evaluation}
              options={evaluationOptions}
              onChange={setEvaluation}
              triggerLabel={evaluationOptions.find((o) => o.value === evaluation)?.label || formatMessage(messages.selectEvaluation)}
              searchPlaceholder={dropdownSearchPlaceholder}
              noOptionsText={dropdownNoOptions}
            />

            <span className="my-training-create__label">{formatMessage(messages.fieldOutcome)}</span>
            <SearchableDropdown
              value={outcome}
              options={outcomeOptions}
              onChange={setOutcome}
              triggerLabel={outcomeOptions.find((o) => o.value === outcome)?.label || formatMessage(messages.selectOutcome)}
              searchPlaceholder={dropdownSearchPlaceholder}
              noOptionsText={dropdownNoOptions}
            />

            <span className="my-training-create__label">
              {formatMessage(messages.fieldProductType)}
              <span className="my-training-create__required">*</span>
            </span>
            <SearchableDropdown
              value={productType}
              options={productTypeOptions}
              onChange={setProductType}
              triggerLabel={productTypeOptions.find((o) => o.value === productType)?.label || formatMessage(messages.selectProductType)}
              searchPlaceholder={dropdownSearchPlaceholder}
              noOptionsText={dropdownNoOptions}
            />

            <span className="my-training-create__label">{formatMessage(messages.fieldNraObjectives)}</span>
            <MultiSelectInput
              options={nraObjectiveOptions}
              selectedValues={nraObjectives}
              onChange={setNraObjectives}
              searchPlaceholder={dropdownSearchPlaceholder}
            />

            <div className="my-training-create__registration">
              <span className="my-training-create__label">{formatMessage(messages.fieldRegistrationBy)}</span>
              <div className="my-training-create__radio-group">
                <label className="my-training-create__radio" htmlFor="reg-url">
                  <input
                    id="reg-url"
                    type="radio"
                    name="registrationBy"
                    value={REGISTRATION_URL}
                    checked={registrationBy === REGISTRATION_URL}
                    onChange={() => setRegistrationBy(REGISTRATION_URL)}
                  />
                  {formatMessage(messages.registrationUrl)}
                </label>
                <label className="my-training-create__radio" htmlFor="reg-email">
                  <input
                    id="reg-email"
                    type="radio"
                    name="registrationBy"
                    value={REGISTRATION_EMAIL}
                    checked={registrationBy === REGISTRATION_EMAIL}
                    onChange={() => setRegistrationBy(REGISTRATION_EMAIL)}
                  />
                  {formatMessage(messages.registrationEmail)}
                </label>
              </div>
              <input
                className="my-training-create__input"
                type={registrationBy === REGISTRATION_URL ? 'url' : 'email'}
                value={registrationValue}
                placeholder={
                  registrationBy === REGISTRATION_URL
                    ? formatMessage(messages.registrationUrlPlaceholder)
                    : formatMessage(messages.registrationEmailPlaceholder)
                }
                onChange={(e) => setRegistrationValue(e.target.value)}
              />
            </div>

            <span className="my-training-create__label">{formatMessage(messages.fieldMappedCompetencies)}</span>
            <MultiSelectInput
              options={mappedCompetencyOptions}
              selectedValues={mappedCompetencies}
              onChange={setMappedCompetencies}
              searchPlaceholder={dropdownSearchPlaceholder}
            />

            <span className="my-training-create__label">
              {formatMessage(messages.fieldMappedActivities)}
              <span className="my-training-create__required">*</span>
            </span>
            <MultiSelectInput
              options={mappedActivityOptions}
              selectedValues={mappedActivities}
              onChange={setMappedActivities}
              searchPlaceholder={dropdownSearchPlaceholder}
            />
          </div>
        </div>
      </div>

      <div className="my-training-create__footer">
        <button
          type="button"
          className="my-training-create__outline-button"
          onClick={() => navigate(variant.paths.list)}
        >
          {formatMessage(messages.cancel)}
        </button>
        <button
          type="button"
          className="my-training-create__primary-button"
          onClick={handleSubmit}
        >
          {formatMessage(isEditMode ? messages.submitEdit : messages.submitCreate)}
        </button>
      </div>
    </section>
  );
};

export default MyTrainingCatalogCreate;
