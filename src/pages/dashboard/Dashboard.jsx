import { PendingRequestsCard, TopRequestedActivitiesCard } from '../../components/dashboardRequests/DashboardRequests';
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
  const canShowUsersPerCountry = Boolean(componentAccess?.dashboard?.showUsersPerCountry);
  const canShowTopRequestedActivities = Boolean(componentAccess?.dashboard?.showTopRequestedActivities);
  const canShowPendingRequests = Boolean(componentAccess?.dashboard?.showPendingRequests);

  return (
    <section>
      <Stats items={dashboardStats} />
      {canShowUsersPerCountry && <UsersPerCountry items={usersPerCountry} />}
      {(canShowTopRequestedActivities || canShowPendingRequests) && (
        <section className="dashboard-requests-grid">
          {canShowTopRequestedActivities && <TopRequestedActivitiesCard items={topRequestedActivities} />}
          {canShowPendingRequests && <PendingRequestsCard items={pendingRequests} />}
        </section>
      )}
    </section>
  );
};

export default Dashboard;
