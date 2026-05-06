import { useIntl } from '@edx/frontend-platform/i18n';
import { Pagination } from '@openedx/paragon';
import { faBookOpen, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../components/emptyState/EmptyState';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { useUserRole } from '../../contexts/UserRoleContext';
import providersData from '../../mock/trainingCatalog/providers.json';
import trainingsData from '../../mock/trainingCatalog/trainings.json';
import messages from './messages';
import { getStarFill } from './starUtils';
import './TrainingCatalog.scss';

const TRAININGS_PER_PAGE = 8;

const TrainingCatalog = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { componentAccess } = useUserRole();

  const canShowTable = Boolean(componentAccess?.trainingCatalog?.showTable ?? true);
  const canSearchAndFilter = Boolean(componentAccess?.trainingCatalog?.canSearchAndFilter ?? true);
  const canViewTrainingDetail = Boolean(componentAccess?.trainingCatalog?.canViewTrainingDetail ?? true);
  const canViewProviderDetail = Boolean(componentAccess?.trainingCatalog?.canViewProviderDetail ?? true);
  const canViewFeedback = Boolean(componentAccess?.trainingCatalog?.canViewFeedback ?? true);

  const [searchText, setSearchText] = useState('');
  const [frameworkFilter, setFrameworkFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [subDomainFilter, setSubDomainFilter] = useState('all');
  const [activityFilter, setActivityFilter] = useState('all');
  const [nraGoalFilter, setNraGoalFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');
  const [page, setPage] = useState(1);

  const frameworkOptions = useMemo(() => {
    const unique = [...new Set(trainingsData.map(t => t.framework).filter(Boolean))].sort();
    return [
      { value: 'all', label: formatMessage(messages.allFrameworks) },
      ...unique.map(v => ({ value: v, label: v })),
    ];
  }, [formatMessage]);

  const roleOptions = useMemo(() => {
    const unique = [...new Set(trainingsData.map(t => t.role).filter(Boolean))].sort();
    return [{ value: 'all', label: formatMessage(messages.allRoles) }, ...unique.map(v => ({ value: v, label: v }))];
  }, [formatMessage]);

  const domainOptions = useMemo(() => {
    const unique = [...new Set(trainingsData.map(t => t.domain).filter(Boolean))].sort();
    return [{ value: 'all', label: formatMessage(messages.allDomains) }, ...unique.map(v => ({ value: v, label: v }))];
  }, [formatMessage]);

  const subDomainOptions = useMemo(() => {
    const unique = [...new Set(trainingsData.map(t => t.subDomain).filter(Boolean))].sort();
    return [
      { value: 'all', label: formatMessage(messages.allSubDomains) },
      ...unique.map(v => ({ value: v, label: v })),
    ];
  }, [formatMessage]);

  const activityOptions = useMemo(() => {
    const unique = [...new Set(trainingsData.map(t => t.activity).filter(Boolean))].sort();
    return [
      { value: 'all', label: formatMessage(messages.allActivities) },
      ...unique.map(v => ({ value: v, label: v })),
    ];
  }, [formatMessage]);

  const nraGoalOptions = useMemo(() => {
    const unique = [...new Set(trainingsData.flatMap(t => t.nraGoals || []).filter(Boolean))].sort();
    return [{ value: 'all', label: formatMessage(messages.allNraGoals) }, ...unique.map(v => ({ value: v, label: v }))];
  }, [formatMessage]);

  const providerOptions = useMemo(() => {
    const unique = [...new Set(trainingsData.map(t => t.provider).filter(Boolean))].sort();
    return [
      { value: 'all', label: formatMessage(messages.allProviders) },
      ...unique.map(v => ({ value: v, label: v })),
    ];
  }, [formatMessage]);

  const filteredTrainings = useMemo(() => {
    if (!canSearchAndFilter) {
      return trainingsData;
    }
    const query = searchText.trim().toLowerCase();

    return trainingsData.filter((t) => {
      if (frameworkFilter !== 'all' && t.framework !== frameworkFilter) { return false; }
      if (roleFilter !== 'all' && t.role !== roleFilter) { return false; }
      if (domainFilter !== 'all' && t.domain !== domainFilter) { return false; }
      if (subDomainFilter !== 'all' && (t.subDomain || '') !== subDomainFilter) { return false; }
      if (activityFilter !== 'all' && t.activity !== activityFilter) { return false; }
      if (nraGoalFilter !== 'all' && !(t.nraGoals || []).includes(nraGoalFilter)) { return false; }
      if (providerFilter !== 'all' && t.provider !== providerFilter) { return false; }
      if (!query) { return true; }

      const haystack = [
        t.title,
        t.description,
        t.mode,
        t.provider,
        t.framework,
        t.role,
        t.domain,
        t.subDomain,
        t.activity,
        ...(t.nraGoals || []),
      ].filter(Boolean).join(' ').toLowerCase();
      return haystack.includes(query);
    });
  }, [
    canSearchAndFilter,
    searchText,
    frameworkFilter,
    roleFilter,
    domainFilter,
    subDomainFilter,
    activityFilter,
    nraGoalFilter,
    providerFilter,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredTrainings.length / TRAININGS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * TRAININGS_PER_PAGE;
  const endIndex = startIndex + TRAININGS_PER_PAGE;
  const pageRows = filteredTrainings.slice(startIndex, endIndex);
  const rangeStart = filteredTrainings.length === 0 ? 0 : startIndex + 1;
  const rangeEnd = Math.min(endIndex, filteredTrainings.length);

  const getProviderSlug = (providerName) => (
    providersData.find(p => p.name === providerName)?.slug
    || trainingsData.find(t => t.provider === providerName)?.providerSlug
    || providerName.toLowerCase().replaceAll(' ', '-')
  );

  return (
    <section className="training-catalog-page">
      {canSearchAndFilter && (
        <div className="training-catalog-page__toolbar">
          <div className="training-catalog-page__filters-grid">
            <div className="training-catalog-page__search">
              <FontAwesomeIcon icon={faSearch} className="training-catalog-page__search-icon" />
              <input
                type="search"
                className="training-catalog-page__search-input"
                placeholder={formatMessage(messages.searchPlaceholder)}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setPage(1);
                }}
                aria-label={formatMessage(messages.searchPlaceholder)}
              />
            </div>

            <SearchableDropdown
              value={frameworkFilter}
              options={frameworkOptions}
              onChange={(v) => { setFrameworkFilter(v); setPage(1); }}
              triggerLabel={
                frameworkOptions.find(o => o.value === frameworkFilter)?.label
                || formatMessage(messages.allFrameworks)
              }
              searchPlaceholder="Search…"
              noOptionsText="No matches"
            />
            <SearchableDropdown
              value={roleFilter}
              options={roleOptions}
              onChange={(v) => { setRoleFilter(v); setPage(1); }}
              triggerLabel={roleOptions.find(o => o.value === roleFilter)?.label || formatMessage(messages.allRoles)}
              searchPlaceholder="Search…"
              noOptionsText="No matches"
            />
            <SearchableDropdown
              value={domainFilter}
              options={domainOptions}
              onChange={(v) => { setDomainFilter(v); setPage(1); }}
              triggerLabel={
                domainOptions.find(o => o.value === domainFilter)?.label
                || formatMessage(messages.allDomains)
              }
              searchPlaceholder="Search…"
              noOptionsText="No matches"
            />
            <SearchableDropdown
              value={subDomainFilter}
              options={subDomainOptions}
              onChange={(v) => { setSubDomainFilter(v); setPage(1); }}
              triggerLabel={
                subDomainOptions.find(o => o.value === subDomainFilter)?.label
                || formatMessage(messages.allSubDomains)
              }
              searchPlaceholder="Search…"
              noOptionsText="No matches"
            />
            <SearchableDropdown
              value={activityFilter}
              options={activityOptions}
              onChange={(v) => { setActivityFilter(v); setPage(1); }}
              triggerLabel={
                activityOptions.find(o => o.value === activityFilter)?.label
                || formatMessage(messages.allActivities)
              }
              searchPlaceholder="Search…"
              noOptionsText="No matches"
            />
            <SearchableDropdown
              value={nraGoalFilter}
              options={nraGoalOptions}
              onChange={(v) => { setNraGoalFilter(v); setPage(1); }}
              triggerLabel={
                nraGoalOptions.find(o => o.value === nraGoalFilter)?.label
                || formatMessage(messages.allNraGoals)
              }
              searchPlaceholder="Search…"
              noOptionsText="No matches"
            />
            <SearchableDropdown
              value={providerFilter}
              options={providerOptions}
              onChange={(v) => { setProviderFilter(v); setPage(1); }}
              triggerLabel={
                providerOptions.find(o => o.value === providerFilter)?.label
                || formatMessage(messages.allProviders)
              }
              searchPlaceholder="Search…"
              noOptionsText="No matches"
            />
          </div>
        </div>
      )}

      {!canShowTable && (
        <EmptyState fullSize className="training-catalog-page__empty" message={formatMessage(messages.noTrainingsFound)} />
      )}

      {canShowTable && filteredTrainings.length === 0 && (
        <EmptyState fullSize className="training-catalog-page__empty" message={formatMessage(messages.noTrainingsFound)} />
      )}

      {canShowTable && filteredTrainings.length > 0 && (
        <div className="training-catalog-page__card">
          <div className="training-catalog-page__table-wrap">
            <table className="training-catalog-page__table">
              <thead>
                <tr className="training-catalog-page__thead-row">
                  <th className="training-catalog-page__th">{formatMessage(messages.columnTraining)}</th>
                  <th className="training-catalog-page__th">{formatMessage(messages.columnMode)}</th>
                  <th className="training-catalog-page__th">{formatMessage(messages.columnProvider)}</th>
                  <th className="training-catalog-page__th">{formatMessage(messages.columnSatisfaction)}</th>
                  <th className="training-catalog-page__th">{formatMessage(messages.columnCost)}</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map(row => (
                  <tr
                    key={row.id}
                    className="training-catalog-page__row"
                    onClick={() => {
                      if (canViewTrainingDetail) {
                        navigate(`/admin/training-catalog/${row.id}`);
                      }
                    }}
                  >
                    <td className="training-catalog-page__td">
                      <div className="training-catalog-page__training-cell">
                        <span className="training-catalog-page__training-icon" aria-hidden>
                          <FontAwesomeIcon icon={faBookOpen} />
                        </span>
                        <div style={{ minWidth: 0 }}>
                          <p className="training-catalog-page__training-title">{row.title}</p>
                          <p className="training-catalog-page__training-desc">{row.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="training-catalog-page__td">
                      <span>{row.mode}</span>
                    </td>
                    <td className="training-catalog-page__td">
                      <button
                        type="button"
                        className="training-catalog-page__provider-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (canViewProviderDetail) {
                            navigate(`/admin/training-catalog/providers/${getProviderSlug(row.provider)}`);
                          }
                        }}
                        title={`View ${row.provider} profile`}
                      >
                        {row.provider}
                      </button>
                    </td>
                    <td className="training-catalog-page__td">
                      <button
                        type="button"
                        className="training-catalog-page__rating-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (canViewFeedback) {
                            navigate(`/admin/training-catalog/${row.id}/feedback`);
                          }
                        }}
                        title="View user feedback"
                      >
                        <span className="training-catalog-page__stars" aria-hidden>
                          {[1, 2, 3, 4, 5].map((position) => {
                            const idx = position - 1;
                            const fill = getStarFill(row.rating, idx);
                            if (fill >= 1) {
                              return (
                                <FontAwesomeIcon
                                  key={position}
                                  icon={faStar}
                                  className="training-catalog-page__star training-catalog-page__star--fill"
                                />
                              );
                            }
                            if (fill > 0) {
                              return (
                                <span key={position} className="training-catalog-page__star">
                                  <FontAwesomeIcon icon={faStar} style={{ opacity: 0.35 }} />
                                  <span className="training-catalog-page__star-half" style={{ width: `${Math.round(fill * 100)}%` }}>
                                    <FontAwesomeIcon icon={faStar} className="training-catalog-page__star training-catalog-page__star--fill" />
                                  </span>
                                </span>
                              );
                            }
                            return <FontAwesomeIcon key={position} icon={faStar} className="training-catalog-page__star" />;
                          })}
                        </span>
                        <span className="training-catalog-page__rating-value">{row.rating.toFixed(1)}</span>
                        <span className="training-catalog-page__rating-count">({row.reviewCount})</span>
                      </button>
                    </td>
                    <td className="training-catalog-page__td" style={{ fontWeight: 600 }}>
                      {row.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="training-catalog-page__footer">
            <div className="training-catalog-page__footer-left">
              {formatMessage(messages.showingRange, {
                start: rangeStart,
                end: rangeEnd,
                total: filteredTrainings.length,
              })}
            </div>
            <Pagination
              className="training-catalog-page__pagination"
              paginationLabel="Training catalog pagination"
              pageCount={totalPages}
              currentPage={safePage}
              onPageSelect={(selected) => setPage(selected)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default TrainingCatalog;
