/* eslint-disable react/prop-types */
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { ACTIVE_ROLE_DATA } from '../services/userRoleDataService';

const DEFAULT_NAVBAR_ACCESS = {
  accessCompetencyFramework: false,
  accessActivities: false,
  accessNrasManagement: false,
  accessCountries: false,
  accessTrainingProviders: false,
  accessPendingRequests: false,
  accessUsers: false,
  accessRoles: false,
  accessSettings: false,
  accessReports: false,
};

const DEFAULT_COMPONENT_ACCESS = {
  dashboard: {
    showUsersPerCountry: false,
    showTopRequestedActivities: false,
    showPendingRequests: false,
  },
  nrasManagement: {
    canOnboardNra: false,
    canEditNra: false,
    canDeleteNra: false,
  },
  countries: {
    canAddCountry: false,
    canDeleteCountry: false,
  },
  trainingProviders: {
    canAddTrainingProvider: false,
    canEditTrainingProvider: false,
    canDeleteTrainingProvider: false,
  },
  roles: {
    canAddRole: false,
    canViewRole: false,
    canEditRole: false,
    canDeleteRole: false,
  },
  pendingRequests: {
    canEditPendingRequest: false,
  },
  users: {
    canAddUser: false,
    canViewUserAbout: false,
    canEditUser: false,
    canDeleteUser: false,
    canViewRoleColumn: false,
    canViewCompetencyRoleColumn: false,
    canAssignTrainings: false,
    canRemoveAssignedTrainings: false,
    canViewRegulatoryPassport: false,
    userFormFields: {
      showRoleField: false,
      showManagerField: false,
      showCompetencyRoleField: false,
      showCountryField: false,
    },
  },
  competencyFramework: {
    showWhoTab: false,
    showSearnTab: false,
    showNraTab: false,
    canCreateFrameworkWhoTab: false,
    canCreateFrameworkSearnTab: false,
    canCreateFrameworkNraTab: false,
    canViewFrameworkWhoTab: false,
    canViewFrameworkSearnTab: false,
    canViewFrameworkNraTab: false,
    canEditFrameworkWhoTab: false,
    canEditFrameworkSearnTab: false,
    canEditFrameworkNraTab: false,
    canDeleteFrameworkWhoTab: false,
    canDeleteFrameworkSearnTab: false,
    canDeleteFrameworkNraTab: false,
    showSuggestionsTab: false,
  },
};

const UserRoleContext = createContext({
  userName: '',
  userProfileImage: '',
  role: null,
  navbarAccess: DEFAULT_NAVBAR_ACCESS,
  componentAccess: DEFAULT_COMPONENT_ACCESS,
  setUserRoleData: () => {},
  setRole: () => {},
  loadUserRole: async () => null,
});

const UserRoleProvider = ({ children }) => {
  const [userName, setUserName] = useState(ACTIVE_ROLE_DATA?.userInfo?.userName || '');
  const [userProfileImage, setUserProfileImage] = useState(ACTIVE_ROLE_DATA?.userInfo?.userProfileImage || '');
  const [role, setRoleState] = useState(ACTIVE_ROLE_DATA?.userInfo?.userRole || null);
  const [navbarAccess, setNavbarAccess] = useState(() => ({
    ...DEFAULT_NAVBAR_ACCESS,
    ...(ACTIVE_ROLE_DATA?.navbarAccess || {}),
  }));
  const [componentAccess, setComponentAccess] = useState(() => ({
    ...DEFAULT_COMPONENT_ACCESS,
    ...(ACTIVE_ROLE_DATA?.componentAccess || {}),
  }));

  const setUserRoleData = useCallback((roleData) => {
    if (!roleData) {
      return;
    }

    const nextUserName = roleData.userInfo?.userName;
    const nextUserProfileImage = roleData.userInfo?.userProfileImage;
    const nextRole = roleData.userInfo?.userRole;
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
      nrasManagement: {
        ...DEFAULT_COMPONENT_ACCESS.nrasManagement,
        ...(roleData.componentAccess?.nrasManagement || {}),
      },
      countries: {
        ...DEFAULT_COMPONENT_ACCESS.countries,
        ...(roleData.componentAccess?.countries || {}),
      },
      trainingProviders: {
        ...DEFAULT_COMPONENT_ACCESS.trainingProviders,
        ...(roleData.componentAccess?.trainingProviders || {}),
      },
      roles: {
        ...DEFAULT_COMPONENT_ACCESS.roles,
        ...(roleData.componentAccess?.roles || {}),
      },
      pendingRequests: {
        ...DEFAULT_COMPONENT_ACCESS.pendingRequests,
        ...(roleData.componentAccess?.pendingRequests || {}),
      },
      users: {
        ...DEFAULT_COMPONENT_ACCESS.users,
        ...(roleData.componentAccess?.users || {}),
      },
      competencyFramework: {
        ...DEFAULT_COMPONENT_ACCESS.competencyFramework,
        ...(roleData.componentAccess?.competencyFramework || {}),
      },
    };

    if (nextUserName) {
      setUserName(nextUserName);
    }
    if (typeof nextUserProfileImage === 'string') {
      setUserProfileImage(nextUserProfileImage);
    }
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

  const loadUserRole = useCallback(async () => {
    // Single active user only: ignore nextRole and always load ACTIVE_ROLE_DATA.
    const roleData = ACTIVE_ROLE_DATA;
    setUserRoleData(roleData);
    return roleData.userInfo?.userRole;
  }, [setUserRoleData]);

  useEffect(() => {
    loadUserRole();
  }, [loadUserRole]);

  const value = useMemo(() => ({
    userName,
    userProfileImage,
    role,
    navbarAccess,
    componentAccess,
    setUserRoleData,
    setRole,
    loadUserRole,
  }), [userName, userProfileImage, role, navbarAccess, componentAccess, setUserRoleData, setRole, loadUserRole]);

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
