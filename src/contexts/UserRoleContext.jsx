/* eslint-disable react/prop-types */
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { fetchUserRoleData } from '../services/userRoleDataService';

const DEFAULT_NAVBAR_ACCESS = {
  accessDashboard: false,
  accessCompetencyFramework: false,
  accessDomains: false,
  accessSubDomains: false,
  accessCompetencies: false,
  accessActivities: false,
  accessTrainingCatalog: false,
  accessNras: false,
  accessTrainingProviders: false,
  accessCbModules: false,
  accessUsers: false,
  accessRoles: false,
  accessSettings: false,
  accessReports: false,
};

const DEFAULT_COMPONENT_ACCESS = {
  dashboard: {
    showStats: false,
    showUsersPerCountry: false,
    showRequestsSection: false,
    showTopRequestedActivities: false,
    showPendingRequests: false,
  },
  users: {
    showTable: false,
    canSearchAndFilter: false,
    canAddUser: false,
    canViewUserDetail: false,
    canEditUser: false,
    canDeleteUser: false,
  },
  competencyFramework: {
    canDownloadTemplate: false,
    canImportFramework: false,
    canCreateFramework: false,
    showWhoTab: false,
    showSearnTab: false,
    showNraTab: false,
    canViewFrameworkWhoTab: false,
    canViewFrameworkSearnTab: false,
    canViewFrameworkNraTab: false,
    canEditFrameworkWhoTab: false,
    canEditFrameworkSearnTab: false,
    canEditFrameworkNraTab: false,
    canDeleteFrameworkWhoTab: false,
    canDeleteFrameworkSearnTab: false,
    canDeleteFrameworkNraTab: false,
    canEditFrameworkPage: false,
    showBuilderGeneralTab: false,
    showBuilderIntroductionTab: false,
    showBuilderOverviewTab: false,
    showBuilderDomainsTab: false,
    showBuilderSubDomainsTab: false,
    showBuilderRoleTab: false,
    showBuilderProficiencyLevelTab: false,
    showBuilderOrgCompetenciesTab: false,
    showBuilderRoleCompetenciesTab: false,
    showBuilderActivitiesTab: false,
  },
  roles: {
    canAddRole: false,
    canViewRole: false,
    canEditRole: false,
    canDeleteRole: false,
  },
};

const UserRoleContext = createContext({
  role: null,
  navbarAccess: DEFAULT_NAVBAR_ACCESS,
  componentAccess: DEFAULT_COMPONENT_ACCESS,
  setUserRoleData: () => {},
  setRole: () => {},
  loadUserRole: async () => null,
});

const UserRoleProvider = ({ children }) => {
  const [role, setRoleState] = useState(null);
  const [navbarAccess, setNavbarAccess] = useState(DEFAULT_NAVBAR_ACCESS);
  const [componentAccess, setComponentAccess] = useState(DEFAULT_COMPONENT_ACCESS);

  const setUserRoleData = useCallback((roleData) => {
    if (!roleData) {
      return;
    }

    const nextRole = roleData.userRole;
    const nextNavbarAccess = {
      ...DEFAULT_NAVBAR_ACCESS,
      ...(roleData.navbarAccess || {}),
    };
    const nextComponentAccess = {
      ...DEFAULT_COMPONENT_ACCESS,
      ...(roleData.componentAccess || {}),
      dashboard: {
        ...DEFAULT_COMPONENT_ACCESS.dashboard,
        ...(roleData.componentAccess?.dashboard || {}),
      },
      users: {
        ...DEFAULT_COMPONENT_ACCESS.users,
        ...(roleData.componentAccess?.users || {}),
      },
      competencyFramework: {
        ...DEFAULT_COMPONENT_ACCESS.competencyFramework,
        ...(roleData.componentAccess?.competencyFramework || {}),
      },
      roles: {
        ...DEFAULT_COMPONENT_ACCESS.roles,
        ...(roleData.componentAccess?.roles || {}),
      },
    };

    if (nextRole) {
      setRoleState(nextRole);
    }
    setNavbarAccess(nextNavbarAccess);
    setComponentAccess(nextComponentAccess);
  }, []);

  const setRole = useCallback((nextRole) => {
    if (nextRole) {
      setRoleState(nextRole);
    }
  }, []);

  const loadUserRole = useCallback(async (nextRole) => {
    const roleData = await fetchUserRoleData(nextRole);
    setUserRoleData(roleData);
    return roleData.userRole;
  }, [setUserRoleData]);

  useEffect(() => {
    loadUserRole();
  }, [loadUserRole]);

  const value = useMemo(() => ({
    role,
    navbarAccess,
    componentAccess,
    setUserRoleData,
    setRole,
    loadUserRole,
  }), [role, navbarAccess, componentAccess, setUserRoleData, setRole, loadUserRole]);

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};

const useUserRole = () => useContext(UserRoleContext);

export {
  DEFAULT_COMPONENT_ACCESS,
  DEFAULT_NAVBAR_ACCESS,
  UserRoleProvider,
  useUserRole,
};
