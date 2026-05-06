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
import CompetencyFramework from './pages/competencyFramework/CompetencyFramework';
import Activities from './pages/activities/Activities';
import TrainingCatalog from './pages/trainingCatalog/TrainingCatalog';
import TrainingDetail from './pages/trainingCatalog/TrainingDetail';
import TrainingFeedback from './pages/trainingCatalog/TrainingFeedback';
import Provider from './pages/trainingCatalog/Provider';
import ProviderCatalog from './pages/trainingCatalog/ProviderCatalog';
import Countries from './pages/countries/Countries';
import Nras from './pages/nras/Nras';
import TrainingProviders from './pages/trainingProviders/TrainingProviders';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';
import PendingRequests from './pages/pendingRequests/PendingRequests';
import PendingRequestDetail from './pages/pendingRequests/PendingRequestDetail';
import RequestedTrainings from './pages/requestedTrainings/RequestedTrainings';
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
    };
  }

  if (pathname.startsWith('/admin/competency-frameworks')) {
    return {
      title: formatMessage(appMessages.competencyFrameworkTitle),
    };
  }

  if (pathname.startsWith('/admin/roles')) {
    return {
      title: formatMessage(appMessages.rolesTitle),
    };
  }

  if (pathname.startsWith('/admin/reports')) {
    return {
      title: formatMessage(appMessages.reportsTitle),
    };
  }

  if (pathname.startsWith('/admin/settings')) {
    return {
      title: formatMessage(appMessages.settingsTitle),
    };
  }

  if (pathname.startsWith('/admin/nras')) {
    return {
      title: formatMessage(appMessages.nrasTitle),
    };
  }

  if (pathname.startsWith('/admin/training-providers')) {
    return {
      title: formatMessage(appMessages.trainingProvidersTitle),
    };
  }

  if (pathname.startsWith('/admin/countries')) {
    return {
      title: formatMessage(appMessages.countriesTitle),
    };
  }

  if (pathname.startsWith('/admin/pending-requests')) {
    return {
      title: formatMessage(appMessages.pendingRequestsTitle),
    };
  }

  if (pathname.startsWith('/admin/requested-trainings')) {
    return {
      title: formatMessage(appMessages.requestedTrainingsTitle),
    };
  }

  if (pathname.startsWith('/admin/profile')) {
    return {
      title: formatMessage(appMessages.profileTitle),
    };
  }

  if (pathname.startsWith('/admin/activities-management')) {
    return {
      title: formatMessage(appMessages.activitiesTitle),
    };
  }

  if (pathname.startsWith('/admin/training-catalog')) {
    return {
      title: formatMessage(appMessages.trainingCatalogTitle),
    };
  }

  return {
    title: formatMessage(appMessages.dashboardTitle),
  };
};

const RoutedLayout = () => {
  const { formatMessage } = useIntl();
  const location = useLocation();
  const { navbarAccess } = useUserRole();
  const headerMeta = getHeaderMeta(location.pathname, formatMessage);
  const withAccess = (hasAccess, component) => (hasAccess ? component : <AccessRestrictedPage />);

  return (
    <AdminLayout title={headerMeta.title}>
      <Routes>
        <Route path="/admin/dashboard/secretariat" element={withAccess(navbarAccess.accessDashboard, <Dashboard />)} />
        <Route path="/admin/dashboard/training-provider" element={withAccess(navbarAccess.accessDashboard, <Dashboard />)} />
        <Route path="/admin/competency-frameworks" element={withAccess(navbarAccess.accessCompetencyFramework, <CompetencyFramework />)} />
        <Route path="/admin/competency-frameworks/new" element={withAccess(navbarAccess.accessCompetencyFramework, <CompetencyFramework />)} />
        <Route path="/admin/activities-management" element={withAccess(navbarAccess.accessActivities, <Activities />)} />
        <Route path="/admin/training-catalog" element={withAccess(navbarAccess.accessTrainingCatalog, <TrainingCatalog />)} />
        <Route path="/admin/training-catalog/:trainingId" element={withAccess(navbarAccess.accessTrainingCatalog, <TrainingDetail />)} />
        <Route path="/admin/training-catalog/:trainingId/feedback" element={withAccess(navbarAccess.accessTrainingCatalog, <TrainingFeedback />)} />
        <Route path="/admin/training-catalog/providers/:providerSlug" element={withAccess(navbarAccess.accessTrainingCatalog, <Provider />)} />
        <Route path="/admin/training-catalog/providers/:providerSlug/catalog" element={withAccess(navbarAccess.accessTrainingCatalog, <ProviderCatalog />)} />
        <Route path="/admin/nras" element={withAccess(navbarAccess.accessNras, <Nras />)} />
        <Route path="/admin/countries" element={withAccess(navbarAccess.accessCountries, <Countries />)} />
        <Route path="/admin/training-providers" element={withAccess(navbarAccess.accessTrainingProviders, <TrainingProviders />)} />
        <Route path="/admin/pending-requests" element={withAccess(navbarAccess.accessPendingRequests, <PendingRequests />)} />
        <Route path="/admin/pending-requests/:requestId" element={withAccess(navbarAccess.accessPendingRequests, <PendingRequestDetail />)} />
        <Route path="/admin/requested-trainings" element={withAccess(navbarAccess.accessPendingRequests, <RequestedTrainings />)} />
        <Route path="/admin/profile" element={withAccess(navbarAccess.accessProfile, <Profile />)} />
        <Route path="/admin/users" element={withAccess(navbarAccess.accessUsers, <Users />)} />
        <Route path="/admin/users/:userId" element={withAccess(navbarAccess.accessUsers, <UserDetailPage />)} />
        <Route path="/admin/roles" element={withAccess(navbarAccess.accessRoles, <Roles />)} />
        <Route path="/admin/reports/staff-trained" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/training-offers" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/competency-coverage" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/staff-per-training" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/trainee-satisfaction" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/priority-feedback" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/settings" element={withAccess(navbarAccess.accessSettings, <Settings />)} />
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
