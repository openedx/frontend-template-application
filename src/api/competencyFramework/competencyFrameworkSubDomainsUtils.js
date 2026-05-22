import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { normalizePickerOptionRows } from './competencyFrameworkUtils';

/**
 * @param {Array<object>} results
 */
export const mapSubDomainOptionsToMultiSelect = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows.map((row) => ({
    value: String(row.value ?? row.id),
    label: row.label,
    description: row.description ?? '',
    parentDomain: row.parent_domain_id != null
      ? String(row.parent_domain_id)
      : (row.parentDomain != null ? String(row.parentDomain) : ''),
  }));
};

/**
 * @param {object} data - GET /sub-domains/ or POST create response wrapper
 */
export const unwrapSubDomainsResultsPayload = (data) => {
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
export const mapFrameworkSubDomainsToFormRows = (competencyTypes) => {
  if (!Array.isArray(competencyTypes) || competencyTypes.length === 0) {
    return null;
  }

  return competencyTypes.map((row, index) => ({
    id: hasDisplayValue(row.id)
      ? `ct-${row.id}`
      : `ct-${index}-${Date.now()}`,
    competencyType: row.competency_type ?? '',
    subDomains: Array.isArray(row.sub_domain_ids)
      ? row.sub_domain_ids.map((subDomainId) => String(subDomainId))
      : [],
  }));
};

/**
 * @param {Array<{ competencyType: string, subDomains: string[] }>} competencyTypes
 */
export const buildSubDomainsSyncPayload = (competencyTypes) => ({
  competency_types: (competencyTypes ?? [])
    .filter(
      (row) => hasDisplayValue(row.competencyType?.trim())
        && Array.isArray(row.subDomains)
        && row.subDomains.length > 0,
    )
    .map((row) => ({
      competency_type: row.competencyType.trim(),
      sub_domain_ids: row.subDomains
        .map((id) => Number.parseInt(String(id), 10))
        .filter((id) => !Number.isNaN(id)),
    })),
});

/**
 * @param {Array<{ competencyType?: string, subDomains?: string[] }>} competencyTypes
 */
export const hasSubDomainsSectionData = (competencyTypes) => {
  if (!Array.isArray(competencyTypes)) {
    return false;
  }

  return competencyTypes.some(
    (row) => hasDisplayValue(row.competencyType?.trim())
      && Array.isArray(row.subDomains)
      && row.subDomains.length > 0,
  );
};

/**
 * @param {object} data - POST sync response
 */
export const mapSubDomainsSyncResponseToFormRows = (data) => {
  const types = data?.competency_types;

  return mapFrameworkSubDomainsToFormRows(types);
};

/**
 * @param {{ parentDomainId: string, subDomainName: string, subDomainDescription?: string }} form
 */
export const buildCreateSubDomainPayload = ({ parentDomainId, subDomainName, subDomainDescription }) => {
  const parentId = Number.parseInt(String(parentDomainId), 10);

  return {
    parent_domain_id: Number.isNaN(parentId) ? parentDomainId : parentId,
    sub_domain_name: subDomainName.trim(),
    sub_domain_description: (subDomainDescription ?? '').trim(),
  };
};

/**
 * @param {object} data - POST /options/sub-domains/ response
 */
export const mapCreatedSubDomainToMultiSelectOption = (data) => {
  if (!data || !hasDisplayValue(data.id)) {
    return null;
  }

  const label = data.sub_domain_name ?? data.name ?? '';

  if (!hasDisplayValue(label)) {
    return null;
  }

  return {
    value: String(data.id),
    label,
    description: data.sub_domain_description ?? data.description ?? '',
  };
};
