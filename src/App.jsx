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
import ExploreTraining from './pages/exploreTraining/ExploreTraining';
import ExploreTrainingRole from './pages/exploreTraining/ExploreTrainingRole';
import SearnTrainingCatalog from './pages/searnTrainingCatalog/SearnTrainingCatalog';
import SearnTrainingDetail from './pages/searnTrainingCatalog/SearnTrainingDetail';
import SearnTrainingFeedback from './pages/searnTrainingCatalog/SearnTrainingFeedback';
import SearnTrainingProvider from './pages/searnTrainingCatalog/SearnTrainingProvider';
import SearnTrainingProviderCatalog from './pages/searnTrainingCatalog/SearnTrainingProviderCatalog';
import MyTrainingCatalog from './pages/myTrainingCatalog/MyTrainingCatalog';
import MyTrainingCatalogCreate from './pages/myTrainingCatalog/MyTrainingCatalogCreate';
import MyTrainingCatalogDetail from './pages/myTrainingCatalog/MyTrainingCatalogDetail';
import MyTrainingCatalogFeedback from './pages/myTrainingCatalog/MyTrainingCatalogFeedback';
import NraSpecificTrainingProvider from './pages/myTrainingCatalog/NraSpecificTrainingProvider';
import NraSpecificTrainingProviderCatalog from './pages/myTrainingCatalog/NraSpecificTrainingProviderCatalog';
import MyTraining from './pages/myTraining/MyTraining';
import MyTeam from './pages/myTeam/MyTeam';
import RegulatoryPassport from './pages/regulatoryPassport/RegulatoryPassport';
import Countries from './pages/countries/Countries';
import Nras from './pages/nras/Nras';
import TrainingProviders from './pages/trainingProviders/TrainingProviders';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';
import PendingRequests from './pages/pendingRequests/PendingRequests';
import PendingRequestDetail from './pages/pendingRequests/PendingRequestDetail';
import RequestedTrainings from './pages/requestedTrainings/RequestedTrainings';
import OrganizationProfile from './pages/organizationProfile/OrganizationProfile';
import Users from './pages/users/Users';
import UserDetailPage from './pages/users/UserDetailPage';
import UserRegulatoryPassport from './pages/users/UserRegulatoryPassport';
import Roles from './pages/roles/Roles';
import AccessRestrictedPage from './pages/AccessRestrictedPage';
import PlaceholderPage from './pages/PlaceholderPage';
import appMessages from './messages/appMessages';
import { ToastProvider } from './components/toast/ToastProvider';
import { UserRoleProvider, useUserRole } from './contexts/UserRoleContext';
import TrailingSlashRedirect from './components/routing/TrailingSlashRedirect';
import TrainingCatalogAccessRoute from './components/myTrainingCatalog/TrainingCatalogAccessRoute';
import { TRAINING_CATALOG_VARIANTS } from './utils/trainingCatalogVariantConfig';
import { ADMIN_PATHS } from './utils/adminPaths';
import { isPublicAdminRoute } from './utils/publicRoutes';

const queryClient = new QueryClient();

const DashboardRoleRoute = ({ children }) => {
  const { role: routeRole } = useParams();
  const { role: activeRole } = useUserRole();

  if (!activeRole) {
    return <Navigate to={ADMIN_PATHS.dashboard} replace />;
  }

  if (routeRole !== activeRole) {
    return <Navigate to={ADMIN_PATHS.dashboardRole(activeRole)} replace />;
  }

  return children;
};

const getHeaderMeta = (pathname, formatMessage, userName) => {
  if (pathname.startsWith('/admin/users')) {
    return {
      title: formatMessage(appMessages.usersTitle),
    };
  }

  if (pathname.startsWith('/admin/my-team')) {
    return {
      title: formatMessage(appMessages.myTeamTitle),
    };
  }

  if (pathname.startsWith('/admin/regulatory-passport')) {
    return {
      title: formatMessage(appMessages.regulatoryPassportTitle),
    };
  }

  if (pathname.startsWith('/admin/organization-profile')) {
    return {
      title: formatMessage(appMessages.organizationProfileTitle),
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

  if (pathname.startsWith('/admin/explore-training')) {
    return {
      title: formatMessage(appMessages.exploreTrainingTitle),
    };
  }

  if (pathname.startsWith('/admin/searn-training-catalog')) {
    return {
      title: formatMessage(appMessages.trainingCatalogTitle),
    };
  }

  if (pathname.startsWith('/admin/nra-specific-training-catalog')) {
    return {
      title: formatMessage(appMessages.nraSpecificTrainingCatalogTitle),
    };
  }

  if (pathname.startsWith('/admin/my-training-catalog')) {
    return {
      title: formatMessage(appMessages.myTrainingCatalogTitle),
    };
  }

  if (pathname.startsWith('/admin/my-training')) {
    return {
      title: formatMessage(appMessages.myTrainingTitle),
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
  if (isPublicAdminRoute(pathname)) {
    return true;
  }

  if (pathname.startsWith('/admin/users')) {
    return Boolean(navbarAccess.accessUsers);
  }
  if (pathname.startsWith('/admin/my-team')) {
    return Boolean(navbarAccess.accessMyTeam);
  }
  if (pathname.startsWith('/admin/regulatory-passport')) {
    return Boolean(navbarAccess.accessRegulatoryPassport);
  }
  if (pathname.startsWith('/admin/organization-profile')) {
    return Boolean(navbarAccess.accessOrganizationProfile);
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
  if (pathname.startsWith('/admin/explore-training')) {
    return true;
  }
  if (pathname.startsWith('/admin/nra-specific-training-catalog')) {
    return Boolean(navbarAccess.accessNraSpecificTrainingCatalog);
  }
  if (pathname.startsWith('/admin/my-training-catalog')) {
    return Boolean(navbarAccess.accessMyTrainingCatalog);
  }
  if (pathname.startsWith('/admin/my-training')) {
    return Boolean(navbarAccess.accessMyTraining);
  }

  return false;
};

const RoutedLayout = () => {
  const { formatMessage } = useIntl();
  const location = useLocation();
  const { userName, role, navbarAccess, componentAccess } = useUserRole();
  const dashboardPath = role ? ADMIN_PATHS.dashboardRole(role) : ADMIN_PATHS.dashboard;
  const headerMeta = getHeaderMeta(location.pathname, formatMessage, userName);
  const canShowHeaderTitle = hasNavbarAccessForPath(location.pathname, navbarAccess);
  const withAccess = (hasAccess, component) => (hasAccess ? component : <AccessRestrictedPage />);

  return (
    <AdminLayout title={canShowHeaderTitle ? headerMeta.title : ''}>
      <Routes>
        <Route
          path={ADMIN_PATHS.dashboard}
          element={role ? <Navigate to={dashboardPath} replace /> : <Dashboard />}
        />
        <Route path={ADMIN_PATHS.competencyFrameworkNew} element={withAccess(navbarAccess.accessCompetencyFramework, <CompetencyFramework />)} />
        <Route path="/admin/competency-frameworks/:frameworkId/edit/" element={withAccess(navbarAccess.accessCompetencyFramework, <CompetencyFramework />)} />
        <Route path={ADMIN_PATHS.competencyFrameworks} element={withAccess(navbarAccess.accessCompetencyFramework, <CompetencyFramework />)} />
        <Route path={ADMIN_PATHS.activities} element={withAccess(navbarAccess.accessActivities, <Activities />)} />
        <Route path="/admin/explore-training/:roleId/" element={<ExploreTrainingRole />} />
        <Route path={ADMIN_PATHS.exploreTraining} element={<ExploreTraining />} />
        <Route path="/admin/searn-training-catalog/providers/:providerSlug/catalog/" element={<SearnTrainingProviderCatalog />} />
        <Route path="/admin/searn-training-catalog/providers/:providerSlug/" element={<SearnTrainingProvider />} />
        <Route path="/admin/searn-training-catalog/:trainingId/feedback/" element={<SearnTrainingFeedback />} />
        <Route path="/admin/searn-training-catalog/:trainingId/" element={<SearnTrainingDetail />} />
        <Route path={ADMIN_PATHS.trainingCatalog} element={<SearnTrainingCatalog />} />
        <Route
          path="/admin/my-training-catalog/:trainingId/edit/"
          element={(
            <TrainingCatalogAccessRoute
              variant={TRAINING_CATALOG_VARIANTS.myTrainingCatalog}
              requireEditPermission
            >
              <MyTrainingCatalogCreate />
            </TrainingCatalogAccessRoute>
          )}
        />
        <Route
          path={ADMIN_PATHS.myTrainingCatalogNew}
          element={(
            <TrainingCatalogAccessRoute
              variant={TRAINING_CATALOG_VARIANTS.myTrainingCatalog}
              requireCreatePermission
            >
              <MyTrainingCatalogCreate />
            </TrainingCatalogAccessRoute>
          )}
        />
        <Route
          path="/admin/my-training-catalog/:trainingId/feedback/"
          element={(
            <TrainingCatalogAccessRoute variant={TRAINING_CATALOG_VARIANTS.myTrainingCatalog}>
              <MyTrainingCatalogFeedback />
            </TrainingCatalogAccessRoute>
          )}
        />
        <Route
          path="/admin/my-training-catalog/:trainingId/"
          element={(
            <TrainingCatalogAccessRoute variant={TRAINING_CATALOG_VARIANTS.myTrainingCatalog}>
              <MyTrainingCatalogDetail />
            </TrainingCatalogAccessRoute>
          )}
        />
        <Route
          path={ADMIN_PATHS.myTrainingCatalog}
          element={(
            <TrainingCatalogAccessRoute variant={TRAINING_CATALOG_VARIANTS.myTrainingCatalog}>
              <MyTrainingCatalog />
            </TrainingCatalogAccessRoute>
          )}
        />
        <Route
          path="/admin/nra-specific-training-catalog/providers/:providerSlug/catalog/"
          element={(
            <TrainingCatalogAccessRoute variant={TRAINING_CATALOG_VARIANTS.nraSpecificTrainingCatalog}>
              <NraSpecificTrainingProviderCatalog />
            </TrainingCatalogAccessRoute>
          )}
        />
        <Route
          path="/admin/nra-specific-training-catalog/providers/:providerSlug/"
          element={(
            <TrainingCatalogAccessRoute variant={TRAINING_CATALOG_VARIANTS.nraSpecificTrainingCatalog}>
              <NraSpecificTrainingProvider />
            </TrainingCatalogAccessRoute>
          )}
        />
        <Route
          path="/admin/nra-specific-training-catalog/:trainingId/edit/"
          element={(
            <TrainingCatalogAccessRoute
              variant={TRAINING_CATALOG_VARIANTS.nraSpecificTrainingCatalog}
              requireEditPermission
            >
              <MyTrainingCatalogCreate />
            </TrainingCatalogAccessRoute>
          )}
        />
        <Route
          path={ADMIN_PATHS.nraSpecificTrainingCatalogNew}
          element={(
            <TrainingCatalogAccessRoute
              variant={TRAINING_CATALOG_VARIANTS.nraSpecificTrainingCatalog}
              requireCreatePermission
            >
              <MyTrainingCatalogCreate />
            </TrainingCatalogAccessRoute>
          )}
        />
        <Route
          path="/admin/nra-specific-training-catalog/:trainingId/feedback/"
          element={(
            <TrainingCatalogAccessRoute variant={TRAINING_CATALOG_VARIANTS.nraSpecificTrainingCatalog}>
              <MyTrainingCatalogFeedback />
            </TrainingCatalogAccessRoute>
          )}
        />
        <Route
          path="/admin/nra-specific-training-catalog/:trainingId/"
          element={(
            <TrainingCatalogAccessRoute variant={TRAINING_CATALOG_VARIANTS.nraSpecificTrainingCatalog}>
              <MyTrainingCatalogDetail />
            </TrainingCatalogAccessRoute>
          )}
        />
        <Route
          path={ADMIN_PATHS.nraSpecificTrainingCatalog}
          element={(
            <TrainingCatalogAccessRoute variant={TRAINING_CATALOG_VARIANTS.nraSpecificTrainingCatalog}>
              <MyTrainingCatalog />
            </TrainingCatalogAccessRoute>
          )}
        />
        <Route path={ADMIN_PATHS.myTraining} element={withAccess(navbarAccess.accessMyTraining, <MyTraining />)} />
        <Route path={ADMIN_PATHS.nras} element={withAccess(navbarAccess.accessNrasManagement, <Nras />)} />
        <Route path={ADMIN_PATHS.countries} element={withAccess(navbarAccess.accessCountries, <Countries />)} />
        <Route path={ADMIN_PATHS.trainingProviders} element={withAccess(navbarAccess.accessTrainingProviders, <TrainingProviders />)} />
        <Route path="/admin/pending-requests/:requestId/" element={withAccess(navbarAccess.accessPendingRequests, <PendingRequestDetail />)} />
        <Route path={ADMIN_PATHS.pendingRequests} element={withAccess(navbarAccess.accessPendingRequests, <PendingRequests />)} />
        <Route path={ADMIN_PATHS.requestedTrainings} element={<RequestedTrainings />} />
        <Route path={ADMIN_PATHS.profile} element={<Profile />} />
        <Route path="/admin/users/:userId/regulatory-passport/" element={withAccess(Boolean(navbarAccess.accessUsers && componentAccess?.users?.canViewRegulatoryPassport), <UserRegulatoryPassport />)} />
        <Route path="/admin/users/:userId/" element={withAccess(Boolean(navbarAccess.accessUsers && componentAccess?.users?.canViewUserAbout), <UserDetailPage />)} />
        <Route path={ADMIN_PATHS.users} element={withAccess(navbarAccess.accessUsers, <Users />)} />
        <Route path={ADMIN_PATHS.myTeam} element={withAccess(navbarAccess.accessMyTeam, <MyTeam />)} />
        <Route path={ADMIN_PATHS.regulatoryPassport} element={withAccess(navbarAccess.accessRegulatoryPassport, <RegulatoryPassport />)} />
        <Route path={ADMIN_PATHS.organizationProfile} element={withAccess(navbarAccess.accessOrganizationProfile, <OrganizationProfile />)} />
        <Route path={ADMIN_PATHS.roles} element={withAccess(navbarAccess.accessRoles, <Roles />)} />
        <Route path={ADMIN_PATHS.reportsStaffTrained} element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path={ADMIN_PATHS.reportsTrainingOffers} element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path={ADMIN_PATHS.reportsCompetencyCoverage} element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path={ADMIN_PATHS.reportsStaffPerTraining} element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path={ADMIN_PATHS.reportsTraineeSatisfaction} element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path={ADMIN_PATHS.reportsPriorityFeedback} element={withAccess(navbarAccess.accessReports, <PlaceholderPage />)} />
        <Route path={ADMIN_PATHS.settings} element={withAccess(navbarAccess.accessSettings, <Settings />)} />
        <Route
          path="/admin/dashboard/:role/"
          element={(
            <DashboardRoleRoute>
              <Dashboard />
            </DashboardRoleRoute>
          )}
        />
        <Route path="*" element={<Navigate to={dashboardPath} replace />} />
      </Routes>
    </AdminLayout>
  );
};

const App = () => (
  <BrowserRouter>
    <AppProvider wrapWithRouter={false}>
      <UserRoleProvider>
        <TrailingSlashRedirect />
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
