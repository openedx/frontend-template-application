import { useMemo } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import RegulatoryPassportView from '../../components/users/regulatoryPassport/RegulatoryPassportView';
import AccessRestrictedPage from '../AccessRestrictedPage';
import { useUserRole } from '../../contexts/UserRoleContext';
import {
  resolveRegulatoryPassportCompletedTrainingsMock,
  resolveRegulatoryPassportDomainCoverageMock,
  resolveUserRegulatoryPassportMock,
} from '../../api/users/userPageMockData';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import './UserRegulatoryPassport.scss';

const UserRegulatoryPassport = () => {
  const { userId } = useParams();
  const location = useLocation();
  const { componentAccess } = useUserRole();

  const canViewUserAbout = Boolean(componentAccess?.users?.canViewUserAbout ?? false);
  const canViewRegulatoryPassport = Boolean(componentAccess?.users?.canViewRegulatoryPassport ?? false);

  const listRowFromState = location.state?.userListRow ?? null;

  const detail = useMemo(
    () => resolveUserRegulatoryPassportMock(userId, listRowFromState),
    [listRowFromState, userId],
  );

  const domainCoverage = useMemo(() => resolveRegulatoryPassportDomainCoverageMock(), []);
  const completedTrainingsPage = useMemo(
    () => resolveRegulatoryPassportCompletedTrainingsMock(),
    [],
  );

  if (!canViewUserAbout || !canViewRegulatoryPassport) {
    return <AccessRestrictedPage />;
  }

  if (!detail) {
    return <Navigate to={ADMIN_PATHS.users} replace />;
  }

  const profileImageUrl = location.state?.userProfileImage ?? detail.userProfileImage ?? '';

  return (
    <RegulatoryPassportView
      detail={detail}
      profileImageUrl={profileImageUrl}
      domainCoverage={domainCoverage}
      completedTrainingsPage={completedTrainingsPage}
      certificateLinkState={{
        userId,
        userProfileImage: profileImageUrl,
        userListRow: location.state?.userListRow ?? null,
      }}
    />
  );
};

export default UserRegulatoryPassport;
