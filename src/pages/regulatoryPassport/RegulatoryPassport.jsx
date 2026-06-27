import { useMemo } from 'react';
import RegulatoryPassportView from '../../components/users/regulatoryPassport/RegulatoryPassportView';
import AccessRestrictedPage from '../AccessRestrictedPage';
import { useUserRole } from '../../contexts/UserRoleContext';
import {
  resolveRegulatoryPassportCompletedTrainingsMock,
  resolveRegulatoryPassportDomainCoverageMock,
  resolveUserRegulatoryPassportMock,
} from '../../api/users/userPageMockData';
import '../users/UserRegulatoryPassport.scss';

/** Mock user shown on the standalone Regulatory Passport page (same data as user about passport). */
const REGULATORY_PASSPORT_MOCK_USER_ID = 'u2';

const RegulatoryPassport = () => {
  const { navbarAccess } = useUserRole();

  const canAccessRegulatoryPassport = Boolean(navbarAccess?.accessRegulatoryPassport ?? false);

  const detail = useMemo(
    () => resolveUserRegulatoryPassportMock(REGULATORY_PASSPORT_MOCK_USER_ID),
    [],
  );

  const domainCoverage = useMemo(() => resolveRegulatoryPassportDomainCoverageMock(), []);
  const completedTrainingsPage = useMemo(
    () => resolveRegulatoryPassportCompletedTrainingsMock(),
    [],
  );

  if (!canAccessRegulatoryPassport) {
    return <AccessRestrictedPage />;
  }

  if (!detail) {
    return null;
  }

  const profileImageUrl = detail.userProfileImage ?? '';

  return (
    <RegulatoryPassportView
      detail={detail}
      profileImageUrl={profileImageUrl}
      domainCoverage={domainCoverage}
      completedTrainingsPage={completedTrainingsPage}
      certificateLinkState={{
        userId: REGULATORY_PASSPORT_MOCK_USER_ID,
        userProfileImage: profileImageUrl,
        userListRow: null,
      }}
    />
  );
};

export default RegulatoryPassport;
