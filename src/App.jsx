/* eslint-disable react/prop-types */
import React from 'react';
import { AppProvider } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter, Navigate, Route, Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/dashboard/Dashboard';
import CompetencyFramework from './pages/competencyFramework/CompetencyFramework';
import Activities from './pages/activities/Activities';
import SearnTrainingCatalog from './pages/searnTrainingCatalog/SearnTrainingCatalog';
import SearnTrainingDetail from './pages/searnTrainingCatalog/SearnTrainingDetail';
import SearnTrainingFeedback from './pages/searnTrainingCatalog/SearnTrainingFeedback';
import SearnTrainingProvider from './pages/searnTrainingCatalog/SearnTrainingProvider';
import SearnTrainingProviderCatalog from './pages/searnTrainingCatalog/SearnTrainingProviderCatalog';
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
import UserRegulatoryPassport from './pages/users/UserRegulatoryPassport';
import Roles from './pages/roles/Roles';
import AccessRestrictedPage from './pages/AccessRestrictedPage';
import PlaceholderPage from './pages/PlaceholderPage';
import appMessages from './messages/appMessages';
import { ToastProvider } from './components/toast/ToastProvider';
import { UserRoleProvider, useUserRole } from './contexts/UserRoleContext';
import { ACTIVE_ROLE_DATA } from './services/userRoleDataService';

const queryClient = new QueryClient();

const DashboardRoleRoute = ({ children }) => {
  const { role: routeRole } = useParams();
  const activeRole = ACTIVE_ROLE_DATA.userInfo.userRole;

  if (routeRole !== activeRole) {
    return <Navigate to={`/admin/dashboard/${activeRole}`} replace />;
  }

  return children;
};

const getHeaderMeta = (pathname, formatMessage, userName) => {
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

  if (pathname.startsWith('/admin/searn-training-catalog')) {
    return {
      title: formatMessage(appMessages.trainingCatalogTitle),
    };
  }

  if (pathname.startsWith('/admin/dashboard')) {
    const dashboardTitle = formatMessage(appMessages.dashboardTitle);
    return {
      title: userName ? `${userName} ${dashboardTitle}` : dashboardTitle,
    };
  }

  return {
    title: formatMessage(appMessages.dashboardTitle),
  };
};

const hasNavbarAccessForPath = (pathname, navbarAccess) => {
  // Public nav-items (no navbar permission gating):
  if (pathname.startsWith('/admin/dashboard')) {
    return true;
  }
  if (pathname.startsWith('/admin/searn-training-catalog')) {
    return true;
  }
  if (pathname.startsWith('/admin/requested-trainings')) {
    return true;
  }
  if (pathname.startsWith('/admin/profile')) {
    return true;
  }

  if (pathname.startsWith('/admin/users')) {
    return Boolean(navbarAccess.accessUsers);
  }
  if (pathname.startsWith('/admin/competency-frameworks')) {
    return Boolean(navbarAccess.accessCompetencyFramework);
  }
  if (pathname.startsWith('/admin/roles')) {
    return Boolean(navbarAccess.accessRoles);
  }
  if (pathname.startsWith('/admin/reports')) {
    return Boolean(navbarAccess.accessReports);
  }
  if (pathname.startsWith('/admin/settings')) {
    return Boolean(navbarAccess.accessSettings);
  }
  if (pathname.startsWith('/admin/nras')) {
    return Boolean(navbarAccess.accessNrasManagement);
  }
  if (pathname.startsWith('/admin/training-providers')) {
    return Boolean(navbarAccess.accessTrainingProviders);
  }
  if (pathname.startsWith('/admin/countries')) {
    return Boolean(navbarAccess.accessCountries);
  }
  if (pathname.startsWith('/admin/pending-requests')) {
    return Boolean(navbarAccess.accessPendingRequests);
  }
  if (pathname.startsWith('/admin/activities-management')) {
    return Boolean(navbarAccess.accessActivities);
  }

  return false;
};

const RoutedLayout = () => {
  const { formatMessage } = useIntl();
  const location = useLocation();
  const { userName, navbarAccess, componentAccess } = useUserRole();
  const headerMeta = getHeaderMeta(location.pathname, formatMessage, userName);
  const canShowHeaderTitle = hasNavbarAccessForPath(location.pathname, navbarAccess);
  const withAccess = (hasAccess, component) => (hasAccess ? component : <AccessRestrictedPage />);

  return (
    <AdminLayout title={canShowHeaderTitle ? headerMeta.title : ''}>
      <Routes>
        <Route
          path="/admin/dashboard"
          element={<Navigate to={`/admin/dashboard/${ACTIVE_ROLE_DATA.userInfo.userRole}`} replace />}
        />
        <Route path="/admin/competency-frameworks/new" element={withAccess(navbarAccess.accessCompetencyFramework, <CompetencyFramework />)} />
        <Route path="/admin/competency-frameworks/:frameworkId/edit" element={withAccess(navbarAccess.accessCompetencyFramework, <CompetencyFramework />)} />
        <Route path="/admin/competency-frameworks" element={withAccess(navbarAccess.accessCompetencyFramework, <CompetencyFramework />)} />
        <Route path="/admin/activities-management" element={withAccess(navbarAccess.accessActivities, <Activities />)} />
        <Route path="/admin/searn-training-catalog" element={<SearnTrainingCatalog />} />
        <Route path="/admin/searn-training-catalog/:trainingId" element={<SearnTrainingDetail />} />
        <Route path="/admin/searn-training-catalog/:trainingId/feedback" element={<SearnTrainingFeedback />} />
        <Route path="/admin/searn-training-catalog/providers/:providerSlug" element={<SearnTrainingProvider />} />
        <Route path="/admin/searn-training-catalog/providers/:providerSlug/catalog" element={<SearnTrainingProviderCatalog />} />
        <Route path="/admin/nras" element={withAccess(navbarAccess.accessNrasManagement, <Nras />)} />
        <Route path="/admin/countries" element={withAccess(navbarAccess.accessCountries, <Countries />)} />
        <Route path="/admin/training-providers" element={withAccess(navbarAccess.accessTrainingProviders, <TrainingProviders />)} />
        <Route path="/admin/pending-requests" element={withAccess(navbarAccess.accessPendingRequests, <PendingRequests />)} />
        <Route path="/admin/pending-requests/:requestId" element={withAccess(navbarAccess.accessPendingRequests, <PendingRequestDetail />)} />
        <Route path="/admin/requested-trainings" element={<RequestedTrainings />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/users" element={withAccess(navbarAccess.accessUsers, <Users />)} />
        <Route path="/admin/users/:userId" element={withAccess(navbarAccess.accessUsers, <UserDetailPage />)} />
        <Route
          path="/admin/users/:userId/regulatory-passport"
          element={withAccess(Boolean(navbarAccess.accessUsers && componentAccess?.users?.canViewRegulatoryPassport), <UserRegulatoryPassport />)}
        />
        <Route path="/admin/roles" element={withAccess(navbarAccess.accessRoles, <Roles />)} />
        <Route path="/admin/reports/staff-trained" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/training-offers" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/competency-coverage" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/staff-per-training" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/trainee-satisfaction" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/reports/priority-feedback" element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path="/admin/settings" element={withAccess(navbarAccess.accessSettings, <Settings />)} />
        <Route
          path="/admin/dashboard/:role"
          element={(
            <DashboardRoleRoute>
              <Dashboard />
            </DashboardRoleRoute>
          )}
        />
        <Route path="*" element={<Navigate to={`/admin/dashboard/${ACTIVE_ROLE_DATA.userInfo.userRole}`} replace />} />
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
