import React from 'react';
import { AppProvider } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter, Navigate, Route, Routes,
  useLocation,
} from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import DashboardDemoPage from './pages/DashboardDemoPage';
import PlaceholderPage from './pages/PlaceholderPage';
import appMessages from './messages/appMessages';
import { UserRoleProvider } from './contexts/UserRoleContext';

const queryClient = new QueryClient();

const getHeaderMeta = (pathname, formatMessage) => {
  if (pathname.startsWith('/searn-administrator/users')) {
    return {
      title: formatMessage(appMessages.usersTitle),
      description: formatMessage(appMessages.usersDescription),
    };
  }

  if (pathname.startsWith('/searn-administrator/roles')) {
    return {
      title: formatMessage(appMessages.rolesTitle),
      description: formatMessage(appMessages.rolesDescription),
    };
  }

  if (pathname.startsWith('/searn-administrator/reports')) {
    return {
      title: formatMessage(appMessages.reportsTitle),
      description: formatMessage(appMessages.reportsDescription),
    };
  }

  if (pathname.startsWith('/searn-administrator/settings')) {
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
  const headerMeta = getHeaderMeta(location.pathname, formatMessage);

  return (
    <AdminLayout title={headerMeta.title} description={headerMeta.description}>
      <Routes>
        <Route path="/searn-administrator/dashboard" element={<DashboardDemoPage />} />
        <Route path="/searn-administrator/competency-frameworks" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/domains" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/sub-domains" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/competencies-management" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/activities-management" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/training-catalog" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/nras" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/training-providers" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/cb-modules" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/users" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/roles" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/reports/staff-trained" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/reports/training-offers" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/reports/competency-coverage" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/reports/staff-per-training" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/reports/trainee-satisfaction" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/reports/priority-feedback" element={<PlaceholderPage />} />
        <Route path="/searn-administrator/settings" element={<PlaceholderPage />} />
        <Route path="/:userType/dashboard" element={<DashboardDemoPage />} />
        <Route path="*" element={<Navigate to="/searn-administrator/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

const App = () => (
  <BrowserRouter>
    <AppProvider wrapWithRouter={false}>
      <UserRoleProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="*" element={<RoutedLayout />} />
          </Routes>
        </QueryClientProvider>
      </UserRoleProvider>
    </AppProvider>
  </BrowserRouter>
);

export default App;
