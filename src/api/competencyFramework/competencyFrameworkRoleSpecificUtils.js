import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {object} data
 */
export const unwrapRoleSpecificResultsPayload = (data) => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const { results } = data;

  if (results && typeof results === 'object' && !Array.isArray(results)) {
    return results;
  }

  return data;
};

/**
 * @param {Array<{ id?: number|string, text?: string }>|undefined} entries
 * @param {string} idPrefix
 */
const mapTextEntriesToForm = (entries, idPrefix) => {
  if (!Array.isArray(entries) || entries.length === 0) {
    return [{ id: `${idPrefix}-${Date.now()}-${Math.random()}`, entryId: null, text: '' }];
  }

  return entries.map((entry, index) => ({
    id: hasDisplayValue(entry.id)
      ? `${idPrefix}-${entry.id}`
      : `${idPrefix}-${index}-${Date.now()}`,
    // Server-assigned id, kept separate from the React `id` key so the sync payload can
    // reference it directly and the backend can update the row in place instead of
    // deleting and recreating it.
    entryId: hasDisplayValue(entry.id) ? entry.id : null,
    text: entry.text ?? '',
  }));
};

/**
 * @param {Array<object>|undefined} levels
 * @param {'competencies'|'activities'} itemsKey
 * @param {string} levelIdPrefix
 * @param {string} itemIdPrefix
 */
const mapLevelsToForm = (levels, itemsKey, levelIdPrefix, itemIdPrefix) => {
  if (!Array.isArray(levels) || levels.length === 0) {
    return [{
      id: `${levelIdPrefix}-${Date.now()}`,
      proficiencyLevel: '',
      [itemsKey]: [{ id: `${itemIdPrefix}-${Date.now()}-${Math.random()}`, text: '' }],
    }];
  }

  return levels.map((level, levelIndex) => ({
    id: hasDisplayValue(level.id)
      ? `${levelIdPrefix}-${level.id}`
      : `${levelIdPrefix}-${levelIndex}-${Date.now()}`,
    proficiencyLevel: level.proficiency_level ?? '',
    [itemsKey]: mapTextEntriesToForm(level[itemsKey], itemIdPrefix),
  }));
};

/**
 * @param {Array<object>|undefined} domains
 * @param {{ itemsKey: 'competencies'|'activities', flatKey: 'flat_competencies'|'flat_activities', flatFormKey: 'flatCompetencies'|'flatActivities' }} config
 */
const mapDomainsToForm = (domains, config) => {
  if (!Array.isArray(domains) || domains.length === 0) {
    return [{
      id: `rsc-dom-${Date.now()}`,
      domain: '',
      requireProficiency: false,
      requireSubDomain: false,
      subDomain: '',
      levels: mapLevelsToForm([], config.itemsKey, 'rsc-lvl', 'rsc-item'),
      [config.flatFormKey]: [{ id: `rsc-flat-${Date.now()}-${Math.random()}`, text: '' }],
    }];
  }

  return domains.map((domain, domainIndex) => ({
    id: hasDisplayValue(domain.id)
      ? `rsc-dom-${domain.id}`
      : `rsc-dom-${domainIndex}-${Date.now()}`,
    domain: hasDisplayValue(domain.domain_id) ? String(domain.domain_id) : '',
    requireProficiency: Boolean(domain.require_proficiency),
    requireSubDomain: Boolean(domain.require_sub_domain),
    subDomain: hasDisplayValue(domain.sub_domain_id) ? String(domain.sub_domain_id) : '',
    levels: mapLevelsToForm(domain.levels, config.itemsKey, 'rsc-lvl', 'rsc-item'),
    [config.flatFormKey]: mapTextEntriesToForm(domain[config.flatKey], 'rsc-flat'),
  }));
};

/**
 * @param {Array<{ role?: string, domains?: Array<object> }>|undefined} roles
 */
export const mapRoleCompetenciesToFormRoles = (roles) => {
  if (!Array.isArray(roles) || roles.length === 0) {
    return null;
  }

  return roles.map((roleRow, roleIndex) => ({
    id: hasDisplayValue(roleRow.id)
      ? `rsc-role-${roleRow.id}`
      : `rsc-role-${roleIndex}-${Date.now()}`,
    role: roleRow.role ?? '',
    domains: mapDomainsToForm(roleRow.domains, {
      itemsKey: 'competencies',
      flatKey: 'flat_competencies',
      flatFormKey: 'flatCompetencies',
    }),
  }));
};

/**
 * @param {Array<{ role?: string, domains?: Array<object> }>|undefined} roles
 */
export const mapRoleActivitiesToFormRoles = (roles) => {
  if (!Array.isArray(roles) || roles.length === 0) {
    return null;
  }

  return roles.map((roleRow, roleIndex) => ({
    id: hasDisplayValue(roleRow.id)
      ? `rsa-role-${roleRow.id}`
      : `rsa-role-${roleIndex}-${Date.now()}`,
    role: roleRow.role ?? '',
    domains: mapDomainsToForm(roleRow.domains, {
      itemsKey: 'activities',
      flatKey: 'flat_activities',
      flatFormKey: 'flatActivities',
    }),
  }));
};

/**
 * @param {string} domainValue
 */
const parseDomainId = (domainValue) => {
  const domainId = Number.parseInt(String(domainValue), 10);
  return Number.isNaN(domainId) ? domainValue : domainId;
};

/**
 * @param {string} subDomainValue
 * @param {boolean} requireSubDomain
 */
const parseSubDomainId = (subDomainValue, requireSubDomain) => {
  if (!requireSubDomain || !hasDisplayValue(subDomainValue)) {
    return null;
  }

  const subDomainId = Number.parseInt(String(subDomainValue), 10);
  return Number.isNaN(subDomainId) ? subDomainValue : subDomainId;
};

/**
 * @param {Array<{ entryId?: number|null, text?: string }>} entries
 */
const buildTextPayload = (entries) => (entries ?? [])
  .filter((entry) => hasDisplayValue(entry.text?.trim()))
  .map((entry) => (
    hasDisplayValue(entry.entryId)
      ? { id: entry.entryId, text: entry.text.trim() }
      : { text: entry.text.trim() }
  ));

/**
 * @param {object} domain
 * @param {{ levelItemsKey: 'competencies'|'activities', flatItemsKey: 'flat_competencies'|'flat_activities', flatFormKey: 'flatCompetencies'|'flatActivities', levelsFormKey: 'levels' }} config
 */
const buildDomainSyncEntry = (domain, config) => {
  const base = {
    domain_id: parseDomainId(domain.domain),
    require_proficiency: Boolean(domain.requireProficiency),
    require_sub_domain: Boolean(domain.requireSubDomain),
    sub_domain_id: parseSubDomainId(domain.subDomain, domain.requireSubDomain),
  };

  if (domain.requireProficiency) {
    const levels = (domain[config.levelsFormKey] ?? [])
      .filter((level) => hasDisplayValue(level.proficiencyLevel))
      .map((level) => ({
        proficiency_level: level.proficiencyLevel,
        [config.levelItemsKey]: buildTextPayload(level[config.levelItemsKey]),
      }))
      .filter((level) => level[config.levelItemsKey].length > 0);

    return { ...base, levels };
  }

  const flatItems = buildTextPayload(domain[config.flatFormKey]);

  return { ...base, [config.flatItemsKey]: flatItems };
};

/**
 * @param {Array<object>} roles
 * @param {{ levelItemsKey: 'competencies'|'activities', flatItemsKey: 'flat_competencies'|'flat_activities', flatFormKey: 'flatCompetencies'|'flatActivities', levelFormItemsKey: 'competencies'|'activities' }} config
 */
const buildRoleSpecificSyncPayload = (roles, config) => ({
  roles: (roles ?? [])
    .filter((roleRow) => hasDisplayValue(roleRow.role))
    .map((roleRow) => ({
      role: roleRow.role,
      domains: (roleRow.domains ?? [])
        .filter((domain) => hasDisplayValue(domain.domain))
        .map((domain) => buildDomainSyncEntry(domain, {
          levelItemsKey: config.levelItemsKey,
          flatItemsKey: config.flatItemsKey,
          flatFormKey: config.flatFormKey,
          levelsFormKey: 'levels',
          levelFormItemsKey: config.levelFormItemsKey,
        }))
        .filter((domain) => (
          domain.require_proficiency
            ? Array.isArray(domain.levels) && domain.levels.length > 0
            : Array.isArray(domain[config.flatItemsKey]) && domain[config.flatItemsKey].length > 0
        )),
    }))
    .filter((roleRow) => roleRow.domains.length > 0),
});

/**
 * @param {Array<object>} roles
 */
export const buildRoleCompetenciesSyncPayload = (roles) => buildRoleSpecificSyncPayload(roles, {
  levelItemsKey: 'competencies',
  flatItemsKey: 'flat_competencies',
  flatFormKey: 'flatCompetencies',
  levelFormItemsKey: 'competencies',
});

/**
 * @param {Array<object>} roles
 */
export const buildRoleActivitiesSyncPayload = (roles) => buildRoleSpecificSyncPayload(roles, {
  levelItemsKey: 'activities',
  flatItemsKey: 'flat_activities',
  flatFormKey: 'flatActivities',
  levelFormItemsKey: 'activities',
});

/**
 * @param {object} domain
 * @param {'competencies'|'activities'} itemsKey
 * @param {'flatCompetencies'|'flatActivities'} flatFormKey
 */
const domainHasSectionData = (domain, itemsKey, flatFormKey) => {
  if (!hasDisplayValue(domain.domain)) {
    return false;
  }

  if (domain.requireSubDomain && !hasDisplayValue(domain.subDomain)) {
    return false;
  }

  if (domain.requireProficiency) {
    return Array.isArray(domain.levels)
      && domain.levels.some(
        (level) => hasDisplayValue(level.proficiencyLevel)
          && Array.isArray(level[itemsKey])
          && level[itemsKey].some((entry) => hasDisplayValue(entry.text?.trim())),
      );
  }

  return Array.isArray(domain[flatFormKey])
    && domain[flatFormKey].some((entry) => hasDisplayValue(entry.text?.trim()));
};

/**
 * @param {Array<object>} roles
 * @param {'competencies'|'activities'} itemsKey
 * @param {'flatCompetencies'|'flatActivities'} flatFormKey
 */
const rolesHaveSectionData = (roles, itemsKey, flatFormKey) => {
  if (!Array.isArray(roles) || roles.length === 0) {
    return false;
  }

  return roles.some(
    (roleRow) => hasDisplayValue(roleRow.role)
      && Array.isArray(roleRow.domains)
      && roleRow.domains.some((domain) => domainHasSectionData(domain, itemsKey, flatFormKey)),
  );
};

/**
 * @param {Array<object>} roles
 */
export const hasRoleCompetenciesSectionData = (roles) => rolesHaveSectionData(
  roles,
  'competencies',
  'flatCompetencies',
);

/**
 * @param {Array<object>} roles
 */
export const hasRoleActivitiesSectionData = (roles) => rolesHaveSectionData(
  roles,
  'activities',
  'flatActivities',
);
