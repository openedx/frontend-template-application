import { useIntl } from '@edx/frontend-platform/i18n';
import { PendingRequestsCard, TopRequestedActivitiesCard } from '../../components/dashboardRequests/DashboardRequests';
import DashboardTopTrainings from '../../components/dashboardTopTrainings/DashboardTopTrainings';
import DashboardRecentActivities from '../../components/dashboardRecentActivities/DashboardRecentActivities';
import DashboardPopularTrainings from '../../components/dashboardPopularTrainings/DashboardPopularTrainings';
import DashboardQuickActions from '../../components/dashboardQuickActions/DashboardQuickActions';
import DashboardRecentTrainingCompletions from '../../components/dashboardRecentTrainingCompletions/DashboardRecentTrainingCompletions';
import EmptyState from '../../components/emptyState/EmptyState';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import Stats from '../../components/stats/Stats';
import UsersPerCountry from '../../components/usersPerCountry/UsersPerCountry';
import { useUserRole } from '../../contexts/UserRoleContext';
import useDashboardStats from '../../hooks/dashboard/useDashboardStats';
import useDashboardUsersPerCountry from '../../hooks/dashboard/useDashboardUsersPerCountry';
import useDashboardTopRequestedActivities from '../../hooks/dashboard/useDashboardTopRequestedActivities';
import useDashboardTopTrainings from '../../hooks/dashboard/useDashboardTopTrainings';
import useDashboardRecentActivities from '../../hooks/dashboard/useDashboardRecentActivities';
import useDashboardPopularTrainings from '../../hooks/dashboard/useDashboardPopularTrainings';
import useDashboardQuickActions from '../../hooks/dashboard/useDashboardQuickActions';
import useDashboardRecentTrainingCompletions from '../../hooks/dashboard/useDashboardRecentTrainingCompletions';
import useDashboardPendingRequests from '../../hooks/dashboard/useDashboardPendingRequests';
import messages from './messages';
import './Dashboard.scss';

const Dashboard = () => {
  const { formatMessage } = useIntl();
  const { componentAccess } = useUserRole();
  const {
    stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    errorMessage: statsErrorMessage,
  } = useDashboardStats();

  const canShowUsersPerCountry = Boolean(componentAccess?.dashboard?.showUsersPerCountry);

  const {
    items: usersPerCountryItems,
    isLoading: isUsersPerCountryLoading,
    isError: isUsersPerCountryError,
    errorMessage: usersPerCountryErrorMessage,
  } = useDashboardUsersPerCountry({ enabled: canShowUsersPerCountry });
  const canShowTopRequestedActivities = Boolean(componentAccess?.dashboard?.showTopRequestedActivities);
  const canShowPendingRequests = Boolean(componentAccess?.dashboard?.showPendingRequests);
  const canShowTopTrainings = Boolean(componentAccess?.dashboard?.showTopTrainings);
  const canShowRecentActivities = Boolean(componentAccess?.dashboard?.showRecentActivities);
  const canShowPopularTrainings = Boolean(componentAccess?.dashboard?.showPopularTrainings);
  const canShowQuickActions = Boolean(componentAccess?.dashboard?.showQuickActions);
  const canShowRecentTrainingCompletions = Boolean(
    componentAccess?.dashboard?.showRecentTrainingCompletions,
  );
  const showCompletionsGridSidebar = canShowRecentTrainingCompletions && canShowQuickActions;
  const showQuickActionsInActivityGrid = canShowQuickActions && !showCompletionsGridSidebar;

  const {
    items: topRequestedActivitiesItems,
    isLoading: isTopRequestedActivitiesLoading,
    isError: isTopRequestedActivitiesError,
    errorMessage: topRequestedActivitiesErrorMessage,
  } = useDashboardTopRequestedActivities({ enabled: canShowTopRequestedActivities });

  const {
    items: topTrainingsItems,
    isLoading: isTopTrainingsLoading,
    isError: isTopTrainingsError,
    errorMessage: topTrainingsErrorMessage,
  } = useDashboardTopTrainings({ enabled: canShowTopTrainings });

  const {
    items: recentActivitiesItems,
    isLoading: isRecentActivitiesLoading,
    isError: isRecentActivitiesError,
    errorMessage: recentActivitiesErrorMessage,
  } = useDashboardRecentActivities({ enabled: canShowRecentActivities });

  const {
    items: popularTrainingsItems,
    isLoading: isPopularTrainingsLoading,
    isError: isPopularTrainingsError,
    errorMessage: popularTrainingsErrorMessage,
  } = useDashboardPopularTrainings({ enabled: canShowPopularTrainings });

  const {
    items: quickActionsItems,
    isLoading: isQuickActionsLoading,
    isError: isQuickActionsError,
    errorMessage: quickActionsErrorMessage,
  } = useDashboardQuickActions({ enabled: canShowQuickActions });

  const {
    items: recentTrainingCompletionsItems,
    viewAllHref: recentTrainingCompletionsViewAllHref,
    isLoading: isRecentTrainingCompletionsLoading,
    isError: isRecentTrainingCompletionsError,
    errorMessage: recentTrainingCompletionsErrorMessage,
  } = useDashboardRecentTrainingCompletions({ enabled: canShowRecentTrainingCompletions });

  const {
    items: pendingRequestsItems,
    isLoading: isPendingRequestsLoading,
    isError: isPendingRequestsError,
    errorMessage: pendingRequestsErrorMessage,
  } = useDashboardPendingRequests({ enabled: canShowPendingRequests });

  const renderStats = () => {
    if (isStatsLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.STATS}
          count={4}
          ariaLabel={formatMessage(messages.statsLoading)}
        />
      );
    }

    if (isStatsError) {
      return (
        <EmptyState
          message={statsErrorMessage || formatMessage(messages.statsLoadError)}
          className="dashboard-page__stats-error"
        />
      );
    }

    return <Stats items={stats} />;
  };

  const renderUsersPerCountry = () => {
    if (!canShowUsersPerCountry) {
      return null;
    }

    if (isUsersPerCountryLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.CHART_CARD}
          ariaLabel={formatMessage(messages.usersPerCountryLoading)}
        />
      );
    }

    if (isUsersPerCountryError) {
      return (
        <EmptyState
          message={usersPerCountryErrorMessage || formatMessage(messages.usersPerCountryLoadError)}
          className="dashboard-page__users-per-country-error"
        />
      );
    }

    return <UsersPerCountry items={usersPerCountryItems} />;
  };

  const renderTopRequestedActivities = () => {
    if (!canShowTopRequestedActivities) {
      return null;
    }

    if (isTopRequestedActivitiesLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.CARD_LIST}
          rows={5}
          ariaLabel={formatMessage(messages.topRequestedActivitiesLoading)}
        />
      );
    }

    if (isTopRequestedActivitiesError) {
      return (
        <EmptyState
          message={
            topRequestedActivitiesErrorMessage
            || formatMessage(messages.topRequestedActivitiesLoadError)
          }
          className="dashboard-page__top-requested-error"
        />
      );
    }

    return <TopRequestedActivitiesCard items={topRequestedActivitiesItems} />;
  };

  const renderTopTrainings = () => {
    if (!canShowTopTrainings) {
      return null;
    }

    if (isTopTrainingsLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.TABLE}
          rows={5}
          columns={[
            { type: 'text' },
            { type: 'text', align: 'center' },
            { type: 'text', align: 'center' },
          ]}
          ariaLabel={formatMessage(messages.topTrainingsLoading)}
        />
      );
    }

    if (isTopTrainingsError) {
      return (
        <EmptyState
          message={
            topTrainingsErrorMessage
            || formatMessage(messages.topTrainingsLoadError)
          }
          className="dashboard-page__top-trainings-error"
        />
      );
    }

    return <DashboardTopTrainings items={topTrainingsItems} />;
  };

  const renderRecentActivities = () => {
    if (!canShowRecentActivities) {
      return null;
    }

    if (isRecentActivitiesLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.CARD_LIST}
          rows={5}
          ariaLabel={formatMessage(messages.recentActivitiesLoading)}
        />
      );
    }

    if (isRecentActivitiesError) {
      return (
        <EmptyState
          message={
            recentActivitiesErrorMessage
            || formatMessage(messages.recentActivitiesLoadError)
          }
          className="dashboard-page__recent-activities-error"
        />
      );
    }

    return <DashboardRecentActivities items={recentActivitiesItems} />;
  };

  const renderPopularTrainings = () => {
    if (!canShowPopularTrainings) {
      return null;
    }

    if (isPopularTrainingsLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.CARD_LIST}
          rows={5}
          ariaLabel={formatMessage(messages.popularTrainingsLoading)}
        />
      );
    }

    if (isPopularTrainingsError) {
      return (
        <EmptyState
          message={
            popularTrainingsErrorMessage
            || formatMessage(messages.popularTrainingsLoadError)
          }
          className="dashboard-page__popular-trainings-error"
        />
      );
    }

    return <DashboardPopularTrainings items={popularTrainingsItems} />;
  };

  const renderQuickActions = () => {
    if (!canShowQuickActions) {
      return null;
    }

    if (isQuickActionsLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.CARD_LIST}
          rows={3}
          ariaLabel={formatMessage(messages.quickActionsLoading)}
        />
      );
    }

    if (isQuickActionsError) {
      return (
        <EmptyState
          message={
            quickActionsErrorMessage
            || formatMessage(messages.quickActionsLoadError)
          }
          className="dashboard-page__quick-actions-error"
        />
      );
    }

    return <DashboardQuickActions items={quickActionsItems} />;
  };

  const renderRecentTrainingCompletions = () => {
    if (!canShowRecentTrainingCompletions) {
      return null;
    }

    if (isRecentTrainingCompletionsLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.CARD_LIST}
          rows={3}
          ariaLabel={formatMessage(messages.recentTrainingCompletionsLoading)}
        />
      );
    }

    if (isRecentTrainingCompletionsError) {
      return (
        <EmptyState
          message={
            recentTrainingCompletionsErrorMessage
            || formatMessage(messages.recentTrainingCompletionsLoadError)
          }
          className="dashboard-page__recent-training-completions-error"
        />
      );
    }

    return (
      <DashboardRecentTrainingCompletions
        items={recentTrainingCompletionsItems}
        viewAllHref={recentTrainingCompletionsViewAllHref}
      />
    );
  };

  const renderPendingRequests = () => {
    if (!canShowPendingRequests) {
      return null;
    }

    if (isPendingRequestsLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.CARD_LIST}
          rows={4}
          ariaLabel={formatMessage(messages.pendingRequestsLoading)}
        />
      );
    }

    if (isPendingRequestsError) {
      return (
        <EmptyState
          message={
            pendingRequestsErrorMessage
            || formatMessage(messages.pendingRequestsLoadError)
          }
          className="dashboard-page__pending-requests-error"
        />
      );
    }

    return <PendingRequestsCard items={pendingRequestsItems} />;
  };

  return (
    <section>
      {renderStats()}
      {(canShowRecentActivities || canShowPopularTrainings || canShowQuickActions) && (
        <section className="dashboard-page__activity-grid">
          {canShowRecentActivities && (
            <div className="dashboard-page__activity-grid-recent">
              {renderRecentActivities()}
            </div>
          )}
          {(canShowPopularTrainings || showQuickActionsInActivityGrid) && (
            <div className="dashboard-page__activity-grid-sidebar">
              {canShowPopularTrainings && renderPopularTrainings()}
              {showQuickActionsInActivityGrid && renderQuickActions()}
            </div>
          )}
        </section>
      )}
      {(canShowRecentTrainingCompletions || showCompletionsGridSidebar) && (
        <section className="dashboard-page__completions-grid">
          {canShowRecentTrainingCompletions && (
            <div className="dashboard-page__completions-grid-main">
              {renderRecentTrainingCompletions()}
            </div>
          )}
          {showCompletionsGridSidebar && (
            <div className="dashboard-page__completions-grid-sidebar">
              {renderQuickActions()}
            </div>
          )}
        </section>
      )}
      {renderUsersPerCountry()}
      {renderTopTrainings()}
      {(canShowTopRequestedActivities || canShowPendingRequests) && (
        <section className="dashboard-requests-grid">
          {renderTopRequestedActivities()}
          {renderPendingRequests()}
        </section>
      )}
    </section>
  );
};

export default Dashboard;
