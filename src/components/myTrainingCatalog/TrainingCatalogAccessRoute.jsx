/* eslint-disable react/prop-types */
import AccessRestrictedPage from '../../pages/AccessRestrictedPage';
import { useUserRole } from '../../contexts/UserRoleContext';

const TrainingCatalogAccessRoute = ({
  variant,
  requireCreatePermission = false,
  requireEditPermission = false,
  children,
}) => {
  const { navbarAccess, componentAccess } = useUserRole();
  const hasNavbarAccess = Boolean(navbarAccess?.[variant.navbarAccessKey]);
  const componentPermissions = componentAccess?.[variant.componentAccessKey] ?? {};
  const hasCreatePermission = !requireCreatePermission || Boolean(componentPermissions.canCreateTraining);
  const hasEditPermission = !requireEditPermission || Boolean(componentPermissions.canEditTraining);
  const hasAccess = hasNavbarAccess && hasCreatePermission && hasEditPermission;

  return hasAccess ? children : <AccessRestrictedPage />;
};

export default TrainingCatalogAccessRoute;
