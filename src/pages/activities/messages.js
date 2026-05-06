import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  searchPlaceholder: {
    id: 'app.activities.search.placeholder',
    defaultMessage: 'Search activities...',
    description: 'Placeholder for activities search input',
  },
  allFrameworks: {
    id: 'app.activities.filter.allFrameworks',
    defaultMessage: 'All Competency Frameworks',
    description: 'Framework filter all option label',
  },
  allRoles: {
    id: 'app.activities.filter.allRoles',
    defaultMessage: 'All Roles',
    description: 'Role filter all option label',
  },
  allDomains: {
    id: 'app.activities.filter.allDomains',
    defaultMessage: 'All Domains',
    description: 'Domain filter all option label',
  },
  allSubDomains: {
    id: 'app.activities.filter.allSubDomains',
    defaultMessage: 'All Sub-Domains',
    description: 'Sub-domain filter all option label',
  },
  allLevels: {
    id: 'app.activities.filter.allLevels',
    defaultMessage: 'All Levels',
    description: 'Proficiency level filter all option label',
  },
  allStreams: {
    id: 'app.activities.filter.allStreams',
    defaultMessage: 'All',
    description: 'Activity stream / group filter all option label',
  },
  columnActivity: {
    id: 'app.activities.column.activity',
    defaultMessage: 'Activity',
    description: 'Table column header for activity',
  },
  columnDomain: {
    id: 'app.activities.column.domain',
    defaultMessage: 'Domain',
    description: 'Table column header for domain',
  },
  columnSubDomain: {
    id: 'app.activities.column.subDomain',
    defaultMessage: 'Sub-Domain',
    description: 'Table column header for sub-domain',
  },
  columnProficiency: {
    id: 'app.activities.column.proficiency',
    defaultMessage: 'Proficiency Level',
    description: 'Table column header for proficiency level',
  },
  columnRole: {
    id: 'app.activities.column.role',
    defaultMessage: 'Role',
    description: 'Table column header for target role',
  },
  emptyCell: {
    id: 'app.activities.cell.empty',
    defaultMessage: '—',
    description: 'Em dash when cell has no value',
  },
  showingRange: {
    id: 'app.activities.pagination.showingRange',
    defaultMessage: 'Showing {start}–{end} of {total}',
    description: 'Pagination summary for activities table',
  },
  dropdownSearchPlaceholder: {
    id: 'app.activities.dropdown.search',
    defaultMessage: 'Search…',
    description: 'Search placeholder inside filter dropdown',
  },
  dropdownNoOptions: {
    id: 'app.activities.dropdown.noOptions',
    defaultMessage: 'No matches',
    description: 'Empty state when filter search has no results',
  },
  noActivitiesFound: {
    id: 'app.activities.empty.noActivitiesFound',
    defaultMessage: 'No activities found.',
    description: 'Empty state message when no activities are available to show',
  },
});

export default messages;
