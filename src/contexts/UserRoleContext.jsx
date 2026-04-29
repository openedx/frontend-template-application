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

const UserRoleContext = createContext({
  role: null,
  navbarAccess: DEFAULT_NAVBAR_ACCESS,
  setUserRoleData: () => {},
  setRole: () => {},
  loadUserRole: async () => null,
});

const UserRoleProvider = ({ children }) => {
  const [role, setRoleState] = useState(null);
  const [navbarAccess, setNavbarAccess] = useState(DEFAULT_NAVBAR_ACCESS);

  const setUserRoleData = useCallback((roleData) => {
    if (!roleData) {
      return;
    }

    const nextRole = roleData.userRole;
    const nextNavbarAccess = {
      ...DEFAULT_NAVBAR_ACCESS,
      ...(roleData.navbarAccess || {}),
    };

    if (nextRole) {
      setRoleState(nextRole);
    }
    setNavbarAccess(nextNavbarAccess);
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
    setUserRoleData,
    setRole,
    loadUserRole,
  }), [role, navbarAccess, setUserRoleData, setRole, loadUserRole]);

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};

const useUserRole = () => useContext(UserRoleContext);

export {
  DEFAULT_NAVBAR_ACCESS,
  UserRoleProvider,
  useUserRole,
};
