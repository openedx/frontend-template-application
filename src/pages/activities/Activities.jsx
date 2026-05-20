import { useIntl } from '@edx/frontend-platform/i18n';
import { faChartLine, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import { DataTable } from '../../components/dataTable';
import EmptyState from '../../components/emptyState/EmptyState';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import activitiesData from '../../mock/activities/activities.json';
import messages from './messages';
import './Activities.scss';

const ACTIVITIES_PER_PAGE = 20;

const Activities = () => {
  const { formatMessage } = useIntl();
  const [searchText, setSearchText] = useState('');
  const [frameworkFilter, setFrameworkFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [subDomainFilter, setSubDomainFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [streamFilter, setStreamFilter] = useState('all');
  const [page, setPage] = useState(1);

  const emptyLabel = formatMessage(messages.emptyCell);

  const frameworkOptions = useMemo(() => {
    const unique = [...new Set(activitiesData.map(a => a.framework))].sort();
    return [
      { value: 'all', label: formatMessage(messages.allFrameworks) },
      ...unique.map(f => ({ value: f, label: f })),
    ];
  }, [formatMessage]);

  const roleOptions = useMemo(() => {
    const unique = [...new Set(
      activitiesData.map(a => a.targetRole).filter(Boolean),
    )].sort();
    return [
      { value: 'all', label: formatMessage(messages.allRoles) },
      ...unique.map(r => ({ value: r, label: r })),
    ];
  }, [formatMessage]);

  const domainOptions = useMemo(() => {
    const unique = [...new Set(activitiesData.map(a => a.domain))].sort();
    return [
      { value: 'all', label: formatMessage(messages.allDomains) },
      ...unique.map(d => ({ value: d, label: d })),
    ];
  }, [formatMessage]);

  const subDomainOptions = useMemo(() => {
    const unique = [...new Set(
      activitiesData.map(a => a.subDomain).filter(Boolean),
    )].sort();
    return [
      { value: 'all', label: formatMessage(messages.allSubDomains) },
      ...unique.map(s => ({ value: s, label: s })),
    ];
  }, [formatMessage]);

  const levelOptions = useMemo(() => {
    const unique = [...new Set(activitiesData.map(a => a.proficiencyLevel))].sort();
    return [
      { value: 'all', label: formatMessage(messages.allLevels) },
      ...unique.map(l => ({ value: l, label: l })),
    ];
  }, [formatMessage]);

  const streamOptions = useMemo(() => {
    const unique = [...new Set(activitiesData.map(a => a.stream))].sort();
    return [
      { value: 'all', label: formatMessage(messages.allStreams) },
      ...unique.map(s => ({ value: s, label: s })),
    ];
  }, [formatMessage]);

  const filteredActivities = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return activitiesData.filter((row) => {
      if (frameworkFilter !== 'all' && row.framework !== frameworkFilter) {
        return false;
      }
      if (roleFilter !== 'all' && row.targetRole !== roleFilter) {
        return false;
      }
      if (domainFilter !== 'all' && row.domain !== domainFilter) {
        return false;
      }
      if (subDomainFilter !== 'all') {
        if (!row.subDomain || row.subDomain !== subDomainFilter) {
          return false;
        }
      }
      if (levelFilter !== 'all' && row.proficiencyLevel !== levelFilter) {
        return false;
      }
      if (streamFilter !== 'all' && row.stream !== streamFilter) {
        return false;
      }
      if (!query) {
        return true;
      }
      const haystack = [
        row.title,
        row.description,
        row.domain,
        row.subDomain,
        row.targetRole,
        row.framework,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [
    searchText,
    frameworkFilter,
    roleFilter,
    domainFilter,
    subDomainFilter,
    levelFilter,
    streamFilter,
  ]);

  const shouldRenderToolbar = true;

  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / ACTIVITIES_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * ACTIVITIES_PER_PAGE;
  const endIndex = startIndex + ACTIVITIES_PER_PAGE;
  const pageRows = filteredActivities.slice(startIndex, endIndex);

  const rangeStart = filteredActivities.length === 0 ? 0 : startIndex + 1;
  const rangeEnd = Math.min(endIndex, filteredActivities.length);

  const columns = [
    ...([{
      key: 'activity',
      header: formatMessage(messages.columnActivity),
      renderCell: (row) => (
        <div className="activities-page__activity-cell">
          <span className="activities-page__activity-icon" aria-hidden>
            <FontAwesomeIcon icon={faChartLine} />
          </span>
          <div className="activities-page__activity-text">
            <p className="activities-page__activity-title">{row.title}</p>
            <p className="activities-page__activity-desc">{row.description}</p>
          </div>
        </div>
      ),
    }]),
    ...([{
      key: 'domain',
      header: formatMessage(messages.columnDomain),
      renderCell: row => <span className="activities-page__text">{row.domain}</span>,
    }]),
    ...([{
      key: 'subDomain',
      header: formatMessage(messages.columnSubDomain),
      renderCell: row => (
        <span className={row.subDomain ? 'activities-page__text' : 'activities-page__muted'}>
          {row.subDomain || emptyLabel}
        </span>
      ),
    }]),
    ...([{
      key: 'proficiencyLevel',
      header: formatMessage(messages.columnProficiency),
      renderCell: row => <span className="activities-page__text">{row.proficiencyLevel}</span>,
    }]),
    ...([{
      key: 'targetRole',
      header: formatMessage(messages.columnRole),
      renderCell: row => (
        <span className={row.targetRole ? 'activities-page__text' : 'activities-page__muted'}>
          {row.targetRole || emptyLabel}
        </span>
      ),
    }]),
  ];

  return (
    <section className="activities-page">
      {shouldRenderToolbar && (
        <div className="activities-page__toolbar">
          <div className="activities-page__search-row">
            <div className="activities-page__search">
              <FontAwesomeIcon icon={faSearch} className="activities-page__search-icon" />
              <input
                type="search"
                className="activities-page__search-input"
                placeholder={formatMessage(messages.searchPlaceholder)}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setPage(1);
                }}
                aria-label={formatMessage(messages.searchPlaceholder)}
              />
            </div>
          </div>

          <div className="activities-page__filters">
            <SearchableDropdown
              value={frameworkFilter}
              options={frameworkOptions}
              onChange={(v) => {
                setFrameworkFilter(v);
                setPage(1);
              }}
              triggerLabel={
                frameworkOptions.find(o => o.value === frameworkFilter)?.label
                || formatMessage(messages.allFrameworks)
              }
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
            <SearchableDropdown
              value={roleFilter}
              options={roleOptions}
              onChange={(v) => {
                setRoleFilter(v);
                setPage(1);
              }}
              triggerLabel={
                roleOptions.find(o => o.value === roleFilter)?.label
                || formatMessage(messages.allRoles)
              }
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
            <SearchableDropdown
              value={domainFilter}
              options={domainOptions}
              onChange={(v) => {
                setDomainFilter(v);
                setPage(1);
              }}
              triggerLabel={
                domainOptions.find(o => o.value === domainFilter)?.label
                || formatMessage(messages.allDomains)
              }
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
            <SearchableDropdown
              value={subDomainFilter}
              options={subDomainOptions}
              onChange={(v) => {
                setSubDomainFilter(v);
                setPage(1);
              }}
              triggerLabel={
                subDomainOptions.find(o => o.value === subDomainFilter)?.label
                || formatMessage(messages.allSubDomains)
              }
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
            <SearchableDropdown
              value={levelFilter}
              options={levelOptions}
              onChange={(v) => {
                setLevelFilter(v);
                setPage(1);
              }}
              triggerLabel={
                levelOptions.find(o => o.value === levelFilter)?.label
                || formatMessage(messages.allLevels)
              }
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
            <SearchableDropdown
              value={streamFilter}
              options={streamOptions}
              onChange={(v) => {
                setStreamFilter(v);
                setPage(1);
              }}
              triggerLabel={
                streamOptions.find(o => o.value === streamFilter)?.label
                || formatMessage(messages.allStreams)
              }
              searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
              noOptionsText={formatMessage(messages.dropdownNoOptions)}
            />
          </div>
        </div>
      )}

      {columns.length > 0 && filteredActivities.length === 0 && (
        <EmptyState
          fullSize
          className="activities-page__empty"
          message={formatMessage(messages.noActivitiesFound)}
        />
      )}

      {columns.length > 0 && filteredActivities.length > 0 && (
        <DataTable
          columns={columns}
          rows={pageRows}
          rowKey="id"
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          footerContent={formatMessage(messages.showingRange, {
            start: rangeStart,
            end: rangeEnd,
            total: filteredActivities.length,
          })}
          minWidth={960}
        />
      )}
    </section>
  );
};

export default Activities;
