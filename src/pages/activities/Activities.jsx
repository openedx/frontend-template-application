/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faChartLine, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import { DataTable } from '../../components/dataTable';
import EmptyState from '../../components/emptyState/EmptyState';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import {
  ACTIVITY_FILTER_ALL,
  ACTIVITY_FRAMEWORK_FILTER_ALL,
  ACTIVITY_FRAMEWORK_FILTER_NONE,
} from '../../api/activities/activitiesConstants';
import { buildActivityTrainingStatusDropdownOptions } from '../../api/activities/activitiesTrainingStatusOptions';
import useActivitiesList from '../../hooks/activities/useActivitiesList';
import useActivityCompetencyFrameworkOptions from '../../hooks/activities/useActivityCompetencyFrameworkOptions';
import useActivityFilterOptions from '../../hooks/activities/useActivityFilterOptions';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { buildPaginationShowingParams } from '../../utils/paginationUtils';
import messages from './messages';
import './Activities.scss';

const Activities = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();

  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [frameworkFilter, setFrameworkFilter] = useState(ACTIVITY_FRAMEWORK_FILTER_NONE);
  const [roleFilter, setRoleFilter] = useState(ACTIVITY_FILTER_ALL);
  const [domainFilter, setDomainFilter] = useState(ACTIVITY_FILTER_ALL);
  const [subDomainFilter, setSubDomainFilter] = useState(ACTIVITY_FILTER_ALL);
  const [levelFilter, setLevelFilter] = useState(ACTIVITY_FILTER_ALL);
  const [trainingStatusFilter, setTrainingStatusFilter] = useState(ACTIVITY_FILTER_ALL);
  const [page, setPage] = useState(1);

  const emptyLabel = formatMessage(messages.emptyCell);

  const trainingStatusOptions = useMemo(
    () => buildActivityTrainingStatusDropdownOptions(formatMessage),
    [formatMessage],
  );

  const {
    dropdownOptions: frameworkApiOptions,
    isLoading: isFrameworkOptionsLoading,
    isError: isFrameworkOptionsError,
    errorMessage: frameworkOptionsErrorMessage,
  } = useActivityCompetencyFrameworkOptions();

  const frameworkOptions = useMemo(() => [
    {
      value: ACTIVITY_FRAMEWORK_FILTER_NONE,
      label: formatMessage(messages.selectFramework),
    },
    {
      value: ACTIVITY_FRAMEWORK_FILTER_ALL,
      label: formatMessage(messages.allFrameworks),
    },
    ...frameworkApiOptions,
  ], [formatMessage, frameworkApiOptions]);

  const {
    roleOptions,
    domainOptions,
    subDomainOptions,
    proficiencyOptions,
    isLoading: isFilterOptionsLoading,
    isError: isFilterOptionsError,
    errorMessage: filterOptionsErrorMessage,
  } = useActivityFilterOptions({ frameworkFilter });

  const {
    items,
    count,
    totalPages,
    isLoading: isListLoading,
    isError: isListError,
    errorMessage: listErrorMessage,
  } = useActivitiesList({
    page,
    search: searchQuery,
    competencyFramework: frameworkFilter,
    role: roleFilter,
    domain: domainFilter,
    subDomain: subDomainFilter,
    proficiencyLevel: levelFilter,
    trainingStatus: trainingStatusFilter,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchText.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    setPage(1);
  }, [
    searchQuery,
    frameworkFilter,
    roleFilter,
    domainFilter,
    subDomainFilter,
    levelFilter,
    trainingStatusFilter,
  ]);

  useEffect(() => {
    setRoleFilter(ACTIVITY_FILTER_ALL);
    setDomainFilter(ACTIVITY_FILTER_ALL);
    setSubDomainFilter(ACTIVITY_FILTER_ALL);
    setLevelFilter(ACTIVITY_FILTER_ALL);
  }, [frameworkFilter]);

  useEffect(() => {
    if (!isListError) {
      return;
    }

    showToast({
      title: formatMessage(messages.listErrorTitle),
      description: listErrorMessage || formatMessage(messages.listLoadError),
    });
  }, [formatMessage, isListError, listErrorMessage, showToast]);

  useEffect(() => {
    if (!isFrameworkOptionsError) {
      return;
    }

    showToast({
      title: formatMessage(messages.frameworkOptionsErrorTitle),
      description: frameworkOptionsErrorMessage || formatMessage(messages.frameworkOptionsLoadError),
    });
  }, [
    formatMessage,
    frameworkOptionsErrorMessage,
    isFrameworkOptionsError,
    showToast,
  ]);

  useEffect(() => {
    if (!isFilterOptionsError) {
      return;
    }

    showToast({
      title: formatMessage(messages.filterOptionsErrorTitle),
      description: filterOptionsErrorMessage || formatMessage(messages.filterOptionsLoadError),
    });
  }, [filterOptionsErrorMessage, formatMessage, isFilterOptionsError, showToast]);

  const isInitialLoading = isListLoading && items.length === 0;
  const filtersDisabled = isFrameworkOptionsLoading || isFilterOptionsLoading;

  const getTriggerLabel = (options, value, fallbackMessage) => (
    options.find((option) => String(option.value) === String(value))?.label
    ?? formatMessage(fallbackMessage)
  );

  const columns = [
    {
      key: 'activity',
      header: formatMessage(messages.columnActivity),
      renderCell: (row) => (
        <div className="activities-page__activity-cell">
          <span className="activities-page__activity-icon" aria-hidden>
            <FontAwesomeIcon icon={faChartLine} />
          </span>
          <div className="activities-page__activity-text">
            {hasDisplayValue(row.title) && (
              <p className="activities-page__activity-title">{row.title}</p>
            )}
            {hasDisplayValue(row.description) && (
              <p className="activities-page__activity-desc">{row.description}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'domain',
      header: formatMessage(messages.columnDomain),
      renderCell: (row) => (
        hasDisplayValue(row.domain)
          ? <span className="activities-page__text">{row.domain}</span>
          : <span className="activities-page__muted">{emptyLabel}</span>
      ),
    },
    {
      key: 'subDomain',
      header: formatMessage(messages.columnSubDomain),
      renderCell: (row) => (
        <span className={hasDisplayValue(row.subDomain) ? 'activities-page__text' : 'activities-page__muted'}>
          {hasDisplayValue(row.subDomain) ? row.subDomain : emptyLabel}
        </span>
      ),
    },
    {
      key: 'proficiencyLevel',
      header: formatMessage(messages.columnProficiency),
      renderCell: (row) => (
        hasDisplayValue(row.proficiencyLevel)
          ? <span className="activities-page__text">{row.proficiencyLevel}</span>
          : <span className="activities-page__muted">{emptyLabel}</span>
      ),
    },
    {
      key: 'targetRole',
      header: formatMessage(messages.columnRole),
      renderCell: (row) => (
        <span className={hasDisplayValue(row.targetRole) ? 'activities-page__text' : 'activities-page__muted'}>
          {hasDisplayValue(row.targetRole) ? row.targetRole : emptyLabel}
        </span>
      ),
    },
  ];

  const showEmptyState = !isInitialLoading && !isListError && items.length === 0;
  const showErrorState = !isInitialLoading && isListError;
  const showTable = !isInitialLoading && !isListError && items.length > 0;

  return (
    <section className="activities-page">
      <div className="activities-page__toolbar">
        <div className="activities-page__search-row">
          <div className="activities-page__search">
            <FontAwesomeIcon icon={faSearch} className="activities-page__search-icon" />
            <input
              type="search"
              className="activities-page__search-input"
              placeholder={formatMessage(messages.searchPlaceholder)}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              aria-label={formatMessage(messages.searchPlaceholder)}
            />
          </div>
        </div>

        <div className="activities-page__filters">
          <SearchableDropdown
            value={frameworkFilter}
            options={frameworkOptions}
            disabled={filtersDisabled}
            onChange={setFrameworkFilter}
            triggerLabel={getTriggerLabel(
              frameworkOptions,
              frameworkFilter,
              messages.selectFramework,
            )}
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
          />
          <SearchableDropdown
            value={roleFilter}
            options={roleOptions}
            disabled={filtersDisabled}
            onChange={setRoleFilter}
            triggerLabel={getTriggerLabel(roleOptions, roleFilter, messages.allRoles)}
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
          />
          <SearchableDropdown
            value={domainFilter}
            options={domainOptions}
            disabled={filtersDisabled}
            onChange={setDomainFilter}
            triggerLabel={getTriggerLabel(domainOptions, domainFilter, messages.allDomains)}
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
          />
          <SearchableDropdown
            value={subDomainFilter}
            options={subDomainOptions}
            disabled={filtersDisabled}
            onChange={setSubDomainFilter}
            triggerLabel={getTriggerLabel(subDomainOptions, subDomainFilter, messages.allSubDomains)}
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
          />
          <SearchableDropdown
            value={levelFilter}
            options={proficiencyOptions}
            disabled={filtersDisabled}
            onChange={setLevelFilter}
            triggerLabel={getTriggerLabel(proficiencyOptions, levelFilter, messages.allLevels)}
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
          />
          <SearchableDropdown
            value={trainingStatusFilter}
            options={trainingStatusOptions}
            onChange={setTrainingStatusFilter}
            triggerLabel={getTriggerLabel(
              trainingStatusOptions,
              trainingStatusFilter,
              messages.trainingStatusAll,
            )}
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
          />
        </div>
      </div>

      {isInitialLoading && (
        <SkeletonScreen variant={SKELETON_VARIANTS.TOOLBAR_TABLE} />
      )}

      {showErrorState && (
        <EmptyState
          fullSize
          className="activities-page__empty"
          message={listErrorMessage || formatMessage(messages.listLoadError)}
        />
      )}

      {showEmptyState && (
        <EmptyState
          fullSize
          className="activities-page__empty"
          message={formatMessage(messages.noActivitiesFound)}
        />
      )}

      {showTable && (
        <DataTable
          columns={columns}
          rows={items}
          rowKey="id"
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          footerContent={formatMessage(
            messages.showingCount,
            buildPaginationShowingParams(items, count),
          )}
          minWidth={960}
        />
      )}
    </section>
  );
};

export default Activities;
