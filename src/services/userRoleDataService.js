import secretariatRoleData from '../data/userRole/secretariat.json';
import trainingProviderRoleData from '../data/userRole/training-provider.json';
import superUserRoleData from '../data/userRole/super-user.json';

/**
 * Keep this file "dumb": only import + export role data.
 *
 * To change the default active user, switch `ACTIVE_ROLE_DATA`.
 */

export const ACTIVE_ROLE_DATA = superUserRoleData;

export const ROLE_DATA_BY_SLUG = {
  'super-user': superUserRoleData,
  secretariat: secretariatRoleData,
  'training-provider': trainingProviderRoleData,
};

export {
  secretariatRoleData,
  trainingProviderRoleData,
  superUserRoleData,
};
