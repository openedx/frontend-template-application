import { executeApiRequest } from '../apiRequest';
import {
  optionsCompetencyFrameworkCompetencyTypes,
  optionsFrameworkDomains,
  optionsFrameworkRoles,
} from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import competencyFrameworkMessages from '../../pages/competencyFramework/messages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { mapDomainOptionsToMultiSelect } from './competencyFrameworkDomainsUtils';
import { normalizePickerOptionRows } from './competencyFrameworkUtils';

/**
 * @param {{ formatMessage: Function, frameworkUuid: string }} params
 */
export const fetchFrameworkCompetencyTypeOptions = ({ formatMessage, frameworkUuid }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${optionsCompetencyFrameworkCompetencyTypes(frameworkUuid)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.competencyTypeOptionsLoadError,
});

/**
 * @param {{ formatMessage: Function, frameworkUuid: string }} params
 */
export const fetchFrameworkLinkedDomainOptions = ({ formatMessage, frameworkUuid }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${optionsFrameworkDomains(frameworkUuid)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.frameworkDomainOptionsLoadError,
});

/**
 * @param {Array<object>} results
 */
export const mapCompetencyTypeOptionsToDropdown = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows
    .filter((row) => hasDisplayValue(row.value))
    .map((row) => ({
      value: String(row.value),
      label: row.label,
    }));
};

/**
 * @param {Array<object>} results
 */
export const mapFrameworkLinkedDomainOptionsToDropdown = (results) => mapDomainOptionsToMultiSelect(results);

/**
 * @param {{ formatMessage: Function, frameworkUuid: string }} params
 */
export const fetchFrameworkRoleOptions = ({ formatMessage, frameworkUuid }) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${optionsFrameworkRoles(frameworkUuid)}`;
    return httpClient.get(url);
  },
  formatMessage,
  fallbackMessage: competencyFrameworkMessages.frameworkRoleOptionsLoadError,
});

/**
 * @param {Array<object>} results
 */
export const mapFrameworkRoleOptionsToDropdown = (results) => {
  const rows = normalizePickerOptionRows(results);

  return rows
    .filter((row) => hasDisplayValue(row.value) && hasDisplayValue(row.label))
    .map((row) => ({
      value: String(row.value),
      label: row.label,
    }));
};
