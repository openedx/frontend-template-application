import { executeApiRequest } from '../apiRequest';
import { COUNTRIES } from '../endpoints';
import { getApiBaseUrl, getHttpClient } from '../httpClient';
import countriesMessages from './countriesMessages';

/**
 * Countries list for SEARN/non-SEARN views and search.
 * @param {{ formatMessage: Function, isSearnCountry?: boolean, search?: string }} params
 */
export const fetchCountries = ({
  formatMessage,
  isSearnCountry,
  search,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${COUNTRIES}`;
    const params = {};

    if (typeof isSearnCountry === 'boolean') {
      params.is_searn_country = isSearnCountry;
    }

    const trimmedSearch = search?.trim();
    if (trimmedSearch) {
      params.search = trimmedSearch;
    }

    return httpClient.get(url, {
      params,
    });
  },
  formatMessage,
  fallbackMessage: typeof isSearnCountry === 'boolean'
    ? countriesMessages.searnCountriesLoadError
    : countriesMessages.countriesCatalogLoadError,
});

/**
 * Mark or unmark a country as SEARN member.
 * @param {{ formatMessage: Function, countryId: string|number, isSearnCountry: boolean }} params
 */
export const patchCountrySearnStatus = ({
  formatMessage,
  countryId,
  isSearnCountry,
}) => executeApiRequest({
  request: () => {
    const httpClient = getHttpClient();
    const url = `${getApiBaseUrl()}${COUNTRIES}${countryId}/`;
    return httpClient.patch(url, {
      is_searn_country: isSearnCountry,
    });
  },
  formatMessage,
  fallbackMessage: countriesMessages.countryUpdateError,
});
