import React from 'react';
import { AppProvider } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter, Navigate, Route, Routes,
  useLocation,
} from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import UserDetailPage from './pages/users/UserDetailPage';
import Roles from './pages/roles/Roles';
import AccessRestrictedPage from './pages/AccessRestrictedPage';
import PlaceholderPage from './pages/PlaceholderPage';
import appMessages from './messages/appMessages';
import { ToastProvider } from './components/toast/ToastProvider';
import { UserRoleProvider, useUserRole } from './contexts/UserRoleContext';

const queryClient = new QueryClient();

const getHeaderMeta = (pathname, formatMessage) => {
  if (pathname.startsWith('/admin/users')) {
    return {
      title: formatMessage(appMessages.usersTitle),
      description: formatMessage(appMessages.usersDescription),
    };
  }

  if (pathname.startsWith('/admin/roles')) {
    return {
      title: formatMessage(appMessages.rolesTitle),
      description: formatMessage(appMessages.rolesDescription),
    };
  }

  if (pathname.startsWith('/admin/reports')) {
    return {
      title: formatMessage(appMessages.reportsTitle),
      description: formatMessage(appMessages.reportsDescription),
    };
  }

  if (pathname.startsWith('/admin/settings')) {
    return {
      title: formatMessage(appMessages.settingsTitle),
      description: formatMessage(appMessages.settingsDescription),
    };
  }

  return {
    title: formatMessage(appMessages.dashboardTitle),
    description: formatMessage(appMessages.dashboardDescription),
  };
};

const RoutedLayout = () => {
  const { formatMessage } = useIntl();
  const location = useLocation();
  const { navbarAccess } = useUserRole();
  const headerMeta = getHeaderMeta(location.pathname, formatMessage);
  const withAccess = (hasAccess, component) => (hasAccess ? component : <AccessRestrictedPage />);

  return (
    <AdminLayout title={headerMeta.title} description={headerMeta.description}>
      <Routes>
        <Route path="/admin/dashboard/secretariat" element={withAccess(navbarAccess.accessDashboard, <Dashboard />)} />
        <Route path="/admin/dashboard/training-provider" element={withAccess(navbarAccess.accessDashboard, <Dashboard />)} />
        <Route path="/admin/competency-frameworks" element={withAccess(navbarAccess.accessCompetencyFramework, <PlaceholderPage />)} />
        <Route path="/admin/domains" element={withAccess(navbarAccess.accessDomains, <PlaceholderPage />)} />
        <Route path="/admin/sub-domains" element={withAccess(navbarAccess.accessSubDomains, <PlaceholderPage />)} />
        <Route path="/admin/competencies-management" element={withAccess(navbarAccess.accessCompetencies, <PlaceholderPage />)} />
        <Route path="/admin/activities-management" element={withAccess(navbarAccess.accessActivities, <PlaceholderPage />)} />
        <Route path="/admin/training-catalog" element={withAccess(navbarAccess.accessTrainingCatalog, <PlaceholderPage />)} />
        <Route path="/admin/nras" element={withAccess(navbarAccess.accessNras, <PlaceholderPage />)} />
        <Route path="/admin/training-providers" element={withAccess(navbarAccess.accessTrainingProviders, <PlaceholderPage />)} />
        <Route path="/admin/cb-modules" element={withAccess(navbarAccess.accessCbModules, <PlaceholderPage />)} />
        <Route path="/admin/users" element={withAccess(navbarAccess.accessUsers, <Users />)} />
        <Route path="/admin/users/:userId" element={withAccess(navbarAccess.accessUsers, <UserDetailPage />)} />
        <Route path="/admin/roles" element={withAccess(navbarAccess.accessRoles, <Roles />)} />
        <Route path="/admin/reports/staff-trained" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/training-offers" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/competency-coverage" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/staff-per-training" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/trainee-satisfaction" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/priority-feedback" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/settings" element={withAccess(navbarAccess.accessSettings, <PlaceholderPage />)} />
        <Route path="/admin/dashboard/:role" element={withAccess(navbarAccess.accessDashboard, <Dashboard />)} />
        <Route path="*" element={<Navigate to="/admin/dashboard/secretariat" replace />} />
      </Routes>
    </AdminLayout>
  );
};

const App = () => (
  <BrowserRouter>
    <AppProvider wrapWithRouter={false}>
      <UserRoleProvider>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="*" element={<RoutedLayout />} />
            </Routes>
          </QueryClientProvider>
        </ToastProvider>
      </UserRoleProvider>
    </AppProvider>
  </BrowserRouter>
);

export default App;
