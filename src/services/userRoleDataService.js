import secretariatRoleData from '../data/userRole/secretariat.json';
import trainingProviderRoleData from '../data/userRole/training-provider.json';

const fetchUserRoleData = async () => (
  // Future API integration point:
  // replace this static selection with backend request.
  secretariatRoleData
);

export {
  fetchUserRoleData,
};
