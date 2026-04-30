import DashboardRequests from '../../components/dashboardRequests/DashboardRequests';
import Stats from '../../components/stats/Stats';
import UsersPerCountry from '../../components/usersPerCountry/UsersPerCountry';
import { useUserRole } from '../../contexts/UserRoleContext';
import pendingRequests from '../../mock/dashboard/pendingRequests.json';
import dashboardStats from '../../mock/dashboard/stats.json';
import topRequestedActivities from '../../mock/dashboard/topRequestedActivities.json';
import usersPerCountry from '../../mock/dashboard/usersPerCountry.json';
import './Dashboard.scss';

const Dashboard = () => {
  const { componentAccess } = useUserRole();
  const canShowStats = Boolean(componentAccess?.dashboard?.showStats);
  const canShowUsersPerCountry = Boolean(componentAccess?.dashboard?.showUsersPerCountry);
  const canShowRequestsSection = Boolean(componentAccess?.dashboard?.showRequestsSection);
  const canShowTopRequestedActivities = Boolean(componentAccess?.dashboard?.showTopRequestedActivities);
  const canShowPendingRequests = Boolean(componentAccess?.dashboard?.showPendingRequests);

  return (
    <section>
      {canShowStats && <Stats items={dashboardStats} />}
      {canShowUsersPerCountry && <UsersPerCountry items={usersPerCountry} />}
      {canShowRequestsSection && (
        <DashboardRequests
          topRequestedItems={topRequestedActivities}
          pendingItems={pendingRequests}
          showTopRequested={canShowTopRequestedActivities}
          showPendingRequests={canShowPendingRequests}
        />
      )}
    </section>
  );
};

export default Dashboard;
