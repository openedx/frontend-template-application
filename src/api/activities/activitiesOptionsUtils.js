import {
  OPTIONS_DOMAINS,
  OPTIONS_FRAMEWORK_ROLES,
  OPTIONS_PROFICIENCY_LEVELS,
  OPTIONS_SUB_DOMAINS,
  optionsFrameworkDomains,
  optionsFrameworkProficiencyLevels,
  optionsFrameworkRoles,
  optionsFrameworkSubDomains,
} from '../endpoints';
import {
  ACTIVITY_FRAMEWORK_FILTER_ALL,
  ACTIVITY_FRAMEWORK_FILTER_NONE,
} from './activitiesConstants';

/**
 * @typedef {'roles' | 'domains' | 'subDomains' | 'proficiencyLevels'} ActivityFilterOptionSegment
 */

/**
 * Resolves options API path from competency framework filter state.
 * @param {ActivityFilterOptionSegment} segment
 * @param {string} frameworkFilter `''` (none), `'all'`, or framework UUID
 */
export const resolveActivityFilterOptionsPath = (segment, frameworkFilter) => {
  const slugBySegment = {
    roles: 'roles',
    domains: 'domains',
    subDomains: 'sub-domains',
    proficiencyLevels: 'proficiency-levels',
  };

  const globalPathBySegment = {
    roles: OPTIONS_FRAMEWORK_ROLES,
    domains: OPTIONS_DOMAINS,
    subDomains: OPTIONS_SUB_DOMAINS,
    proficiencyLevels: OPTIONS_PROFICIENCY_LEVELS,
  };

  const frameworkPathBySegment = {
    roles: optionsFrameworkRoles,
    domains: optionsFrameworkDomains,
    subDomains: optionsFrameworkSubDomains,
    proficiencyLevels: optionsFrameworkProficiencyLevels,
  };

  if (!frameworkFilter || frameworkFilter === ACTIVITY_FRAMEWORK_FILTER_NONE) {
    return globalPathBySegment[segment];
  }

  const slug = slugBySegment[segment];

  if (frameworkFilter === ACTIVITY_FRAMEWORK_FILTER_ALL) {
    return `/api/v1/options/framework/all/${slug}/`;
  }

  return frameworkPathBySegment[segment](frameworkFilter);
};
