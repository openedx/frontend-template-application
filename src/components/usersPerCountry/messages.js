import { defineMessages } from '@edx/frontend-platform/i18n';

const usersPerCountryMessages = defineMessages({
  title: {
    id: 'app.dashboard.usersPerCountry.title',
    defaultMessage: 'Users per country and organisation',
    description: 'Title for dashboard users per country component',
  },
  description: {
    id: 'app.dashboard.usersPerCountry.description',
    defaultMessage: 'Distribution of registered NRA users across the SEAR network',
    description: 'Description for dashboard users per country component',
  },
  empty: {
    id: 'app.usersPerCountry.empty',
    defaultMessage: 'No user distribution data available.',
    description: 'Empty state when chart has no displayable rows',
  },
  usersUnit: {
    id: 'app.dashboard.usersPerCountry.usersUnit',
    defaultMessage: 'users',
    description: 'Unit text used in users per country bars',
  },
});

export default usersPerCountryMessages;
