/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { SkeletonAdminShell } from '../components/skeleton';
import layoutMessages from '../layout/messages';
import {
  fetchActiveRoleData,
  getInitialRoleData,
  ROLE_DATA_SOURCE,
} from '../services/userRoleDataService';

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

const mergeComponentAccess = (roleData) => ({
  ...DEFAULT_COMPONENT_ACCESS,
  ...(roleData?.componentAccess || {}),
  dashboard: {
    ...DEFAULT_COMPONENT_ACCESS.dashboard,
    ...(roleData?.componentAccess?.dashboard || {}),
  },
  nrasManagement: {
    ...DEFAULT_COMPONENT_ACCESS.nrasManagement,
    ...(roleData?.componentAccess?.nrasManagement || {}),
  },
  countries: {
    ...DEFAULT_COMPONENT_ACCESS.countries,
    ...(roleData?.componentAccess?.countries || {}),
  },
  trainingProviders: {
    ...DEFAULT_COMPONENT_ACCESS.trainingProviders,
    ...(roleData?.componentAccess?.trainingProviders || {}),
  },
  roles: {
    ...DEFAULT_COMPONENT_ACCESS.roles,
    ...(roleData?.componentAccess?.roles || {}),
  },
  pendingRequests: {
    ...DEFAULT_COMPONENT_ACCESS.pendingRequests,
    ...(roleData?.componentAccess?.pendingRequests || {}),
  },
  users: {
    ...DEFAULT_COMPONENT_ACCESS.users,
    ...(roleData?.componentAccess?.users || {}),
    userFormFields: {
      ...DEFAULT_COMPONENT_ACCESS.users.userFormFields,
      ...(roleData?.componentAccess?.users?.userFormFields || {}),
    },
  },
  competencyFramework: {
    ...DEFAULT_COMPONENT_ACCESS.competencyFramework,
    ...(roleData?.componentAccess?.competencyFramework || {}),
  },
});

const buildStateFromRoleData = (roleData) => {
  if (!roleData) {
    return {
      userName: '',
      userProfileImage: '',
      role: null,
      navbarAccess: { ...DEFAULT_NAVBAR_ACCESS },
      componentAccess: mergeComponentAccess(null),
      hasRolePermissions: false,
    };
  }

  return {
    userName: roleData.userInfo?.userName || '',
    userProfileImage: roleData.userInfo?.userProfileImage || '',
    role: roleData.userInfo?.userRole || null,
    navbarAccess: {
      ...DEFAULT_NAVBAR_ACCESS,
      ...(roleData.navbarAccess || {}),
    },
    componentAccess: mergeComponentAccess(roleData),
    hasRolePermissions: true,
  };
};

const initialRoleData = getInitialRoleData();
const initialState = buildStateFromRoleData(initialRoleData);

const UserRoleContext = createContext({
  userName: '',
  userProfileImage: '',
  role: null,
  navbarAccess: DEFAULT_NAVBAR_ACCESS,
  componentAccess: DEFAULT_COMPONENT_ACCESS,
  isRoleLoading: ROLE_DATA_SOURCE === 'api',
  hasRolePermissions: false,
  setUserRoleData: () => {},
  setRole: () => {},
  loadUserRole: async () => null,
});

const UserRoleProvider = ({ children }) => {
  const { formatMessage } = useIntl();
  const [userName, setUserName] = useState(initialState.userName);
  const [userProfileImage, setUserProfileImage] = useState(initialState.userProfileImage);
  const [role, setRoleState] = useState(initialState.role);
  const [navbarAccess, setNavbarAccess] = useState(initialState.navbarAccess);
  const [componentAccess, setComponentAccess] = useState(initialState.componentAccess);
  const [isRoleLoading, setIsRoleLoading] = useState(ROLE_DATA_SOURCE === 'api');
  const [hasRolePermissions, setHasRolePermissions] = useState(initialState.hasRolePermissions);

  const applyRoleState = useCallback((nextState) => {
    setUserName(nextState.userName);
    setUserProfileImage(nextState.userProfileImage);
    setRoleState(nextState.role);
    setNavbarAccess(nextState.navbarAccess);
    setComponentAccess(nextState.componentAccess);
    setHasRolePermissions(nextState.hasRolePermissions);
  }, []);

  const setUserRoleData = useCallback((roleData) => {
    applyRoleState(buildStateFromRoleData(roleData));
  }, [applyRoleState]);

  const applyEmptyRolePermissions = useCallback(() => {
    applyRoleState(buildStateFromRoleData(null));
  }, [applyRoleState]);

  const setRole = useCallback((nextRole) => {
    if (nextRole) {
      setRoleState(nextRole);
    }
  }, []);

  const loadUserRole = useCallback(async () => {
    setIsRoleLoading(true);

    try {
      const roleData = await fetchActiveRoleData({ formatMessage });

      if (roleData) {
        setUserRoleData(roleData);
        return roleData.userInfo?.userRole ?? null;
      }

      applyEmptyRolePermissions();
      return null;
    } finally {
      setIsRoleLoading(false);
    }
  }, [applyEmptyRolePermissions, formatMessage, setUserRoleData]);

  useEffect(() => {
    loadUserRole();
  }, [loadUserRole]);

  const value = useMemo(() => ({
    userName,
    userProfileImage,
    role,
    navbarAccess,
    componentAccess,
    isRoleLoading,
    hasRolePermissions,
    setUserRoleData,
    setRole,
    loadUserRole,
  }), [
    userName,
    userProfileImage,
    role,
    navbarAccess,
    componentAccess,
    isRoleLoading,
    hasRolePermissions,
    setUserRoleData,
    setRole,
    loadUserRole,
  ]);

  if (isRoleLoading) {
    return (
      <SkeletonAdminShell
        ariaLabel={formatMessage(layoutMessages.permissionsLoading)}
      />
    );
  }

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
