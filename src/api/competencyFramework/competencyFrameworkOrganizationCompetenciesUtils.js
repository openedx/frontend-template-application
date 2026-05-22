import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * @param {object} data
 */
export const unwrapOrganizationCompetenciesResultsPayload = (data) => {
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
 * @param {Array<object>|undefined} items
 */
export const mapOrganizationCompetenciesToFormItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return items.map((item, typeIndex) => ({
    id: hasDisplayValue(item.id)
      ? `org-ct-${item.id}`
      : `org-ct-${typeIndex}-${Date.now()}`,
    competencyType: item.competency_type ?? '',
    domains: Array.isArray(item.domains)
      ? item.domains.map((domain, domainIndex) => ({
        id: hasDisplayValue(domain.id)
          ? `org-dom-${domain.id}`
          : `org-dom-${domainIndex}-${Date.now()}`,
        domain: hasDisplayValue(domain.domain_id) ? String(domain.domain_id) : '',
        levels: Array.isArray(domain.levels)
          ? domain.levels.map((level, levelIndex) => ({
            id: hasDisplayValue(level.id)
              ? `org-lvl-${level.id}`
              : `org-lvl-${levelIndex}-${Date.now()}`,
            proficiencyLevel: level.proficiency_level ?? '',
            competencies: Array.isArray(level.competencies) && level.competencies.length > 0
              ? level.competencies.map((comp, compIndex) => ({
                id: hasDisplayValue(comp.id)
                  ? `org-comp-${comp.id}`
                  : `org-comp-${compIndex}-${Date.now()}`,
                text: comp.text ?? '',
              }))
              : [{ id: `org-comp-${Date.now()}-${Math.random()}`, text: '' }],
          }))
          : [],
      }))
      : [],
  }));
};

/**
 * @param {Array<object>} items
 */
export const buildOrganizationCompetenciesSyncPayload = (items) => ({
  items: (items ?? [])
    .filter((type) => hasDisplayValue(type.competencyType))
    .map((type) => ({
      competency_type: type.competencyType,
      domains: (type.domains ?? [])
        .filter((domain) => hasDisplayValue(domain.domain))
        .map((domain) => {
          const domainId = Number.parseInt(String(domain.domain), 10);

          return {
            domain_id: Number.isNaN(domainId) ? domain.domain : domainId,
            levels: (domain.levels ?? [])
              .filter((level) => hasDisplayValue(level.proficiencyLevel))
              .map((level) => ({
                proficiency_level: level.proficiencyLevel,
                competencies: (level.competencies ?? [])
                  .filter((comp) => hasDisplayValue(comp.text?.trim()))
                  .map((comp) => ({
                    text: comp.text.trim(),
                  })),
              }))
              .filter((level) => level.competencies.length > 0),
          };
        })
        .filter((domain) => domain.levels.length > 0),
    }))
    .filter((type) => type.domains.length > 0),
});

/**
 * @param {Array<object>} items
 */
export const hasOrganizationCompetenciesSectionData = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return false;
  }

  return items.some(
    (type) => hasDisplayValue(type.competencyType)
      && Array.isArray(type.domains)
      && type.domains.some(
        (domain) => hasDisplayValue(domain.domain)
          && Array.isArray(domain.levels)
          && domain.levels.some(
            (level) => hasDisplayValue(level.proficiencyLevel)
              && Array.isArray(level.competencies)
              && level.competencies.some((comp) => hasDisplayValue(comp.text?.trim())),
          ),
      ),
  );
};
