import { defineMessages } from '@edx/frontend-platform/i18n';

const countriesMessages = defineMessages({
  searnCountriesLoadError: {
    id: 'app.countries.searn.loadError',
    defaultMessage: 'Unable to load countries. Please try again.',
    description: 'Fallback when SEARN countries list API fails',
  },
  countriesCatalogLoadError: {
    id: 'app.countries.catalog.loadError',
    defaultMessage: 'Unable to load country catalog. Please try again.',
    description: 'Fallback when full countries catalog API fails',
  },
  countryUpdateError: {
    id: 'app.countries.update.error',
    defaultMessage: 'Unable to update country status. Please try again.',
    description: 'Fallback when updating country SEARN status fails',
  },
});

export default countriesMessages;
