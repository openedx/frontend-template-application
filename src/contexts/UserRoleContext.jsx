/* eslint-disable react/prop-types */
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { fetchUserRoleData } from '../services/userRoleDataService';

const DEFAULT_NAVBAR_ACCESS = {
  accessDashboard: false,
  accessCompetencyFramework: false,
  accessActivities: false,
  accessTrainingCatalog: false,
  accessNras: false,
  accessCountries: false,
  accessTrainingProviders: false,
  accessPendingRequests: false,
  accessProfile: false,
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
    canDownloadUsersTemplate: false,
    canImportUsers: false,
    canAddUser: false,
    canViewUserDetail: false,
    canEditUser: false,
    canDeleteUser: false,
    canViewUserColumn: false,
    canViewRoleColumn: false,
    canViewCountryColumn: false,
    canViewJoinedColumn: false,
    canViewActionsColumn: false,
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
  activities: {
    showTable: false,
    canSearchAndFilter: false,
    canViewActivityColumn: false,
    canViewDomainColumn: false,
    canViewSubDomainColumn: false,
    canViewProficiencyColumn: false,
    canViewRoleColumn: false,
  },
  trainingCatalog: {
    showTable: false,
    canSearchAndFilter: false,
    canViewTrainingDetail: false,
    canViewProviderDetail: false,
    canViewFeedback: false,
  },
  countries: {
    showCards: false,
    canSearch: false,
    canAddCountry: false,
    canEditCountry: false,
    canDeleteCountry: false,
  },
  nras: {
    showTable: false,
    canSearch: false,
    canOnboardNra: false,
    canEditNra: false,
    canDeleteNra: false,
  },
  trainingProviders: {
    showTable: false,
    canSearch: false,
    canAddProvider: false,
    canEditProvider: false,
    canDeleteProvider: false,
  },
  profile: {
    canEdit: false,
    canUploadPhoto: false,
  },
  settings: {
    canEdit: false,
    canUploadLogo: false,
  },
  pendingRequests: {
    showTable: false,
    canSearch: false,
    canFilterByType: false,
    canViewRequestDetail: false,
  },
  requestedTrainings: {
    showTable: false,
    canSearch: false,
    canFilterByStatus: false,
    canRequestTraining: false,
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
      activities: {
        ...DEFAULT_COMPONENT_ACCESS.activities,
        ...(roleData.componentAccess?.activities || {}),
      },
      trainingCatalog: {
        ...DEFAULT_COMPONENT_ACCESS.trainingCatalog,
        ...(roleData.componentAccess?.trainingCatalog || {}),
      },
      countries: {
        ...DEFAULT_COMPONENT_ACCESS.countries,
        ...(roleData.componentAccess?.countries || {}),
      },
      nras: {
        ...DEFAULT_COMPONENT_ACCESS.nras,
        ...(roleData.componentAccess?.nras || {}),
      },
      trainingProviders: {
        ...DEFAULT_COMPONENT_ACCESS.trainingProviders,
        ...(roleData.componentAccess?.trainingProviders || {}),
      },
      profile: {
        ...DEFAULT_COMPONENT_ACCESS.profile,
        ...(roleData.componentAccess?.profile || {}),
      },
      settings: {
        ...DEFAULT_COMPONENT_ACCESS.settings,
        ...(roleData.componentAccess?.settings || {}),
      },
      pendingRequests: {
        ...DEFAULT_COMPONENT_ACCESS.pendingRequests,
        ...(roleData.componentAccess?.pendingRequests || {}),
      },
      requestedTrainings: {
        ...DEFAULT_COMPONENT_ACCESS.requestedTrainings,
        ...(roleData.componentAccess?.requestedTrainings || {}),
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
