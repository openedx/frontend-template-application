import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { normalizePickerOptionRows } from './competencyFrameworkUtils';

/**
 * @param {Array<object>} results
 */
export const mapDomainOptionsToMultiSelect = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows.map((row) => ({
    value: String(row.value ?? row.id),
    label: row.label,
    description: row.description ?? '',
  }));
};

/**
 * @param {object} data - GET /domains/ or POST create response wrapper
 */
export const unwrapDomainsResultsPayload = (data) => {
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
 * @param {Array<object>|undefined} competencyTypes
 */
export const mapFrameworkDomainsToFormRows = (competencyTypes) => {
  if (!Array.isArray(competencyTypes) || competencyTypes.length === 0) {
    return null;
  }

  return competencyTypes.map((row, index) => ({
    id: hasDisplayValue(row.id)
      ? `ct-${row.id}`
      : `ct-${index}-${Date.now()}`,
    competencyType: row.competency_type ?? '',
    domains: Array.isArray(row.domain_ids)
      ? row.domain_ids.map((domainId) => String(domainId))
      : [],
  }));
};

/**
 * @param {Array<{ competencyType: string, domains: string[] }>} competencyTypes
 */
export const buildDomainsSyncPayload = (competencyTypes) => ({
  competency_types: (competencyTypes ?? [])
    .filter(
      (row) => hasDisplayValue(row.competencyType?.trim())
        && Array.isArray(row.domains)
        && row.domains.length > 0,
    )
    .map((row) => ({
      competency_type: row.competencyType.trim(),
      domain_ids: row.domains
        .map((id) => Number.parseInt(String(id), 10))
        .filter((id) => !Number.isNaN(id)),
    })),
});

/**
 * @param {Array<{ competencyType?: string, domains?: string[] }>} competencyTypes
 */
export const hasDomainsSectionData = (competencyTypes) => {
  if (!Array.isArray(competencyTypes)) {
    return false;
  }

  return competencyTypes.some(
    (row) => hasDisplayValue(row.competencyType?.trim())
      && Array.isArray(row.domains)
      && row.domains.length > 0,
  );
};

/**
 * @param {object} data - POST sync response
 */
export const mapDomainsSyncResponseToFormRows = (data) => {
  const types = data?.competency_types;

  return mapFrameworkDomainsToFormRows(types);
};

/**
 * @param {{ domainId?: string, domainName: string, domainDescription?: string }} form
 */
export const buildCreateDomainPayload = ({ domainId, domainName, domainDescription }) => {
  const payload = {
    domain_name: domainName.trim(),
    domain_description: (domainDescription ?? '').trim(),
  };

  if (hasDisplayValue(domainId)) {
    payload.domain_id = domainId.trim();
  }

  return payload;
};

/**
 * @param {object} data - POST /options/domains/ response
 */
export const mapCreatedDomainToMultiSelectOption = (data) => {
  if (!data || !hasDisplayValue(data.id)) {
    return null;
  }

  const label = data.domain_name ?? data.name ?? '';

  if (!hasDisplayValue(label)) {
    return null;
  }

  return {
    value: String(data.id),
    label,
    description: data.domain_description ?? data.description ?? '',
  };
};
