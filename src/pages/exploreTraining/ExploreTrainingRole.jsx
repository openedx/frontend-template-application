import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faCalendarAlt,
  faChevronRight,
  faCheckCircle,
  faInbox,
  faLayerGroup,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState } from '../../components/emptyState';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import SearchInput from '../../components/searchInput/SearchInput';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import TabFilter from '../../components/tabFilter/TabFilter';
import StarRating from '../../components/exploreTraining/StarRating';
import MultiSelectPopover from '../../components/exploreTraining/MultiSelectPopover';
import RequestTrainingModal from '../../components/searnTrainingCatalog/RequestTrainingModal';
import { useToast } from '../../components/toast/ToastProvider';
import useExploreTrainingActivities from '../../hooks/exploreTraining/useExploreTrainingActivities';
import useExploreTrainingFilterOptions from '../../hooks/exploreTraining/useExploreTrainingFilterOptions';
import useExploreTrainingList from '../../hooks/exploreTraining/useExploreTrainingList';
import useExploreTrainingPreview from '../../hooks/exploreTraining/useExploreTrainingPreview';
import useExploreTrainingRoles from '../../hooks/exploreTraining/useExploreTrainingRoles';
import useRequestedTrainingMutations from '../../hooks/requestedTrainings/useRequestedTrainingMutations';
import { EXPLORE_FILTER_ALL } from '../../api/exploreTraining/exploreTrainingUtils';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import messages from './messages';
import './ExploreTraining.scss';

const ExploreTrainingRole = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { roleId } = useParams();

  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [productType, setProductType] = useState(EXPLORE_FILTER_ALL);
  const [domain, setDomain] = useState(EXPLORE_FILTER_ALL);
  const [subDomain, setSubDomain] = useState(EXPLORE_FILTER_ALL);
  const [objectives, setObjectives] = useState([]);
  const [profile, setProfile] = useState(EXPLORE_FILTER_ALL);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  const { roles } = useExploreTrainingRoles();
  const {
    productTypeOptions,
    domainOptions,
    subDomainOptions,
    objectiveOptions,
    isOptionsLoading,
  } = useExploreTrainingFilterOptions();
  const { createMutation } = useRequestedTrainingMutations();

  const objectivesParam = objectives.length > 0 ? objectives.join(',') : EXPLORE_FILTER_ALL;

  const {
    items: activities,
    isLoading: isActivitiesLoading,
    isError: isActivitiesError,
    errorMessage: activitiesError,
  } = useExploreTrainingActivities({
    role: roleId,
    search: searchQuery,
    productType,
    domain,
    subDomain,
    objective: objectivesParam,
    profile,
  });

  const selectedActivityId = selectedActivity?.id ?? null;

  const {
    items: trainings,
    isLoading: isTrainingsLoading,
    isError: isTrainingsError,
    errorMessage: trainingsError,
  } = useExploreTrainingList({ activityId: selectedActivityId });

  const {
    detail: previewDetail,
    isLoading: isPreviewLoading,
    isError: isPreviewError,
    errorMessage: previewError,
  } = useExploreTrainingPreview({ trainingId: selectedTraining?.id ?? null });

  const currentRole = useMemo(
    () => roles.find((role) => String(role.id) === String(roleId)) ?? null,
    [roles, roleId],
  );
  const roleLabel = currentRole?.label ?? '';

  const roleTabOptions = useMemo(
    () => roles.map((role) => ({ value: role.id, label: role.label })),
    [roles],
  );

  const profileOptions = useMemo(() => [
    { value: EXPLORE_FILTER_ALL, label: formatMessage(messages.allProfiles) },
    { value: 'meta', label: formatMessage(messages.profileMeta) },
    { value: 'core', label: formatMessage(messages.profileCore) },
  ], [formatMessage]);

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchText), 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    setSelectedActivity(null);
    setSelectedTraining(null);
  }, [roleId, searchQuery, productType, domain, subDomain, objectivesParam, profile]);

  useEffect(() => {
    if (!isActivitiesError) {
      return;
    }

    showToast({
      title: formatMessage(messages.loadErrorTitle),
      description: activitiesError || formatMessage(messages.activitiesLoadError),
    });
  }, [activitiesError, formatMessage, isActivitiesError, showToast]);

  const objectivesTriggerLabel = objectives.length > 0
    ? formatMessage(messages.objectivesSelected, { count: objectives.length })
    : formatMessage(messages.allObjectives);

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    setSelectedTraining(null);
  };

  const handleRequestTrainingSubmit = async ({ activityId, description }) => {
    const parsedActivityId = Number(activityId);
    if (!Number.isFinite(parsedActivityId)) {
      return;
    }

    try {
      const result = await createMutation.mutateAsync({
        activityId: parsedActivityId,
        description,
      });

      setRequestModalOpen(false);
      showToast({
        title: formatMessage(messages.requestTrainingSubmittedTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.requestTrainingSubmittedDescription),
      });
    } catch (error) {
      showToast({
        title: formatMessage(messages.requestTrainingErrorTitle),
        description: error?.message || formatMessage(messages.requestTrainingError),
      });
    }
  };

  const previewProvider = previewDetail?.provider || selectedTraining?.provider || '';

  const previewFields = previewDetail ? [
    { label: formatMessage(messages.previewMode), value: previewDetail.mode },
    { label: formatMessage(messages.previewDuration), value: previewDetail.duration },
    { label: formatMessage(messages.previewApproach), value: previewDetail.approach },
    { label: formatMessage(messages.previewEvaluation), value: previewDetail.evaluation },
  ].filter((field) => hasDisplayValue(field.value)) : [];

  return (
    <section className="explore-training-page explore-explorer">
      <div className="explore-explorer__toolbar">
        <div className="explore-explorer__search">
          <SearchInput
            value={searchText}
            placeholder={formatMessage(messages.searchPlaceholder)}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
        {roleTabOptions.length > 0 && (
          <TabFilter
            options={roleTabOptions}
            value={roleId}
            onChange={(value) => navigate(ADMIN_PATHS.exploreTrainingRole(value))}
            wrap
            ariaLabel={formatMessage(messages.heroBadge)}
          />
        )}
      </div>

      <div className="explore-explorer__card explore-explorer__product">
        <span className="explore-explorer__filter-label">
          {formatMessage(messages.productLabel)}
        </span>
        <TabFilter
          options={productTypeOptions}
          value={productType}
          onChange={setProductType}
          size="sm"
          wrap
          ariaLabel={formatMessage(messages.productLabel)}
        />
      </div>

      <div className="explore-explorer__card explore-explorer__filters">
        <div className="explore-explorer__filter">
          <span className="explore-explorer__filter-label">
            {formatMessage(messages.domainLabel)}
          </span>
          <SearchableDropdown
            value={domain}
            options={domainOptions}
            onChange={setDomain}
            triggerLabel={domainOptions.find((o) => o.value === domain)?.label
              || formatMessage(messages.allDomains)}
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
            disabled={isOptionsLoading}
          />
        </div>
        <div className="explore-explorer__filter">
          <span className="explore-explorer__filter-label">
            {formatMessage(messages.subDomainLabel)}
          </span>
          <SearchableDropdown
            value={subDomain}
            options={subDomainOptions}
            onChange={setSubDomain}
            triggerLabel={subDomainOptions.find((o) => o.value === subDomain)?.label
              || formatMessage(messages.allSubDomains)}
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
            disabled={isOptionsLoading}
          />
        </div>
        <div className="explore-explorer__filter">
          <span className="explore-explorer__filter-label">
            {formatMessage(messages.objectivesLabel)}
          </span>
          <MultiSelectPopover
            options={objectiveOptions}
            selectedValues={objectives}
            onChange={setObjectives}
            triggerLabel={objectivesTriggerLabel}
            disabled={isOptionsLoading}
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
          />
        </div>
        <div className="explore-explorer__filter">
          <span className="explore-explorer__filter-label">
            {formatMessage(messages.profileLabel)}
          </span>
          <SearchableDropdown
            value={profile}
            options={profileOptions}
            onChange={setProfile}
            triggerLabel={profileOptions.find((o) => o.value === profile)?.label
              || formatMessage(messages.allProfiles)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
          />
        </div>
      </div>

      <div className="explore-explorer__breadcrumb">
        <FontAwesomeIcon icon={faLayerGroup} aria-hidden />
        {hasDisplayValue(roleLabel) && (
          <button
            type="button"
            className={`explore-explorer__crumb ${!selectedActivity ? 'is-active' : ''}`}
            onClick={() => handleActivitySelect(null)}
          >
            {roleLabel}
          </button>
        )}
        {selectedActivity && hasDisplayValue(selectedActivity.title) && (
          <>
            <FontAwesomeIcon icon={faChevronRight} className="explore-explorer__crumb-sep" aria-hidden />
            <span className="explore-explorer__crumb is-active">{selectedActivity.title}</span>
          </>
        )}
      </div>

      <div className="explore-explorer__columns">
        {/* Activities */}
        <div className="explore-column">
          <div className="explore-column__head">
            <div>
              <div className="explore-column__eyebrow">
                {formatMessage(messages.activitiesColumnTitle)}
              </div>
              {hasDisplayValue(roleLabel) && (
                <div className="explore-column__title">{roleLabel}</div>
              )}
            </div>
            <span className="explore-column__badge">{activities.length}</span>
          </div>
          <div className="explore-column__body">
            {isActivitiesLoading && (
              <SkeletonScreen variant={SKELETON_VARIANTS.CARD_LIST} count={5} />
            )}
            {!isActivitiesLoading && isActivitiesError && (
              <EmptyState
                className="explore-column__empty"
                message={activitiesError || formatMessage(messages.activitiesLoadError)}
              />
            )}
            {!isActivitiesLoading && !isActivitiesError && activities.length === 0 && (
              <EmptyState
                className="explore-column__empty"
                message={formatMessage(messages.noActivities)}
              />
            )}
            {!isActivitiesLoading && !isActivitiesError && activities.map((activity) => {
              const isSelected = String(selectedActivityId) === String(activity.id);
              return (
                <button
                  key={activity.id}
                  type="button"
                  className={`explore-activity ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleActivitySelect(activity)}
                >
                  <span className="explore-activity__main">
                    {hasDisplayValue(activity.title) && (
                      <span className="explore-activity__title">{activity.title}</span>
                    )}
                    {activity.trainingCount != null && (
                      <span className="explore-activity__meta">
                        {formatMessage(messages.trainingsCount, { count: activity.trainingCount })}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trainings */}
        <div className="explore-column">
          <div className="explore-column__head">
            <div>
              <div className="explore-column__eyebrow">
                {formatMessage(messages.trainingsColumnTitle)}
              </div>
              <div className="explore-column__title explore-column__title--truncate">
                {selectedActivity && hasDisplayValue(selectedActivity.title)
                  ? selectedActivity.title
                  : formatMessage(messages.selectActivity)}
              </div>
            </div>
            <span className="explore-column__badge">{selectedActivity ? trainings.length : 0}</span>
          </div>
          <div className="explore-column__body">
            {!selectedActivity && (
              <div className="explore-column__hint">
                {formatMessage(messages.pickActivityHint)}
              </div>
            )}
            {selectedActivity && isTrainingsLoading && (
              <SkeletonScreen variant={SKELETON_VARIANTS.CARD_LIST} count={4} />
            )}
            {selectedActivity && !isTrainingsLoading && isTrainingsError && (
              <EmptyState
                className="explore-column__empty"
                message={trainingsError || formatMessage(messages.trainingsLoadError)}
              />
            )}
            {selectedActivity && !isTrainingsLoading && !isTrainingsError && trainings.length === 0 && (
              <div className="explore-column__empty-illustration">
                <span className="explore-column__empty-icon" aria-hidden>
                  <FontAwesomeIcon icon={faInbox} />
                </span>
                <span className="explore-column__empty-text">
                  {formatMessage(messages.noTrainings)}
                </span>
              </div>
            )}
            {selectedActivity && !isTrainingsLoading && !isTrainingsError && trainings.map((training) => {
              const isSelected = String(selectedTraining?.id) === String(training.id);
              return (
                <button
                  key={training.id}
                  type="button"
                  className={`explore-training-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedTraining(training)}
                >
                  {hasDisplayValue(training.title) && (
                    <span className="explore-training-card__title">{training.title}</span>
                  )}
                  {hasDisplayValue(training.provider) && (
                    <span className="explore-training-card__provider">{training.provider}</span>
                  )}
                  <span className="explore-training-card__meta">
                    {hasDisplayValue(training.mode) && (
                      <span className="explore-training-card__mode">
                        <FontAwesomeIcon icon={faCalendarAlt} aria-hidden />
                        {training.mode}
                      </span>
                    )}
                    <StarRating value={training.rating} reviewCount={training.reviewCount} showCount />
                  </span>
                </button>
              );
            })}
          </div>
          {selectedActivity && (
            <div className="explore-column__foot">
              <button
                type="button"
                className="explore-explorer__request-button"
                onClick={() => setRequestModalOpen(true)}
              >
                <FontAwesomeIcon icon={faPaperPlane} aria-hidden />
                {formatMessage(messages.requestTraining)}
              </button>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="explore-column">
          <div className="explore-column__head explore-column__head--stack">
            <div className="explore-column__eyebrow">
              {formatMessage(messages.previewColumnTitle)}
            </div>
            <div className="explore-column__title explore-column__title--truncate">
              {selectedTraining && hasDisplayValue(selectedTraining.title)
                ? selectedTraining.title
                : formatMessage(messages.selectTraining)}
            </div>
          </div>
          <div className="explore-column__body explore-column__body--pad">
            {!selectedTraining && (
              <div className="explore-column__hint">
                {formatMessage(messages.chooseTrainingHint)}
              </div>
            )}
            {selectedTraining && isPreviewLoading && (
              <SkeletonScreen variant={SKELETON_VARIANTS.DETAIL} />
            )}
            {selectedTraining && !isPreviewLoading && isPreviewError && (
              <EmptyState
                className="explore-column__empty"
                message={previewError || formatMessage(messages.trainingDetailLoadError)}
              />
            )}
            {selectedTraining && !isPreviewLoading && !isPreviewError && (
              <div className="explore-preview">
                <div className="explore-preview__header">
                  {hasDisplayValue(selectedTraining.title) && (
                    <h3 className="explore-preview__title">{selectedTraining.title}</h3>
                  )}
                  {hasDisplayValue(previewProvider) && (
                    <div className="explore-preview__provider">{previewProvider}</div>
                  )}
                  <div className="explore-preview__rating">
                    <StarRating
                      value={selectedTraining.rating}
                      reviewCount={selectedTraining.reviewCount}
                      showCount
                    />
                  </div>
                </div>

                {previewFields.length > 0 && (
                  <div className="explore-preview__grid">
                    {previewFields.map((field) => (
                      <div key={field.label} className="explore-preview__stat">
                        <div className="explore-preview__stat-label">{field.label}</div>
                        <div className="explore-preview__stat-value">{field.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {previewDetail && previewDetail.mappedCompetencies.length > 0 && (
                  <div className="explore-preview__competencies">
                    <div className="explore-preview__section-title">
                      {formatMessage(messages.competenciesTitle)}
                    </div>
                    <ul className="explore-preview__list">
                      {previewDetail.mappedCompetencies.map((competency) => (
                        <li key={competency} className="explore-preview__list-item">
                          <FontAwesomeIcon icon={faCheckCircle} aria-hidden />
                          <span>{competency}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <RequestTrainingModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        onSubmit={handleRequestTrainingSubmit}
        isSubmitting={createMutation.isPending}
      />
    </section>
  );
};

export default ExploreTrainingRole;
