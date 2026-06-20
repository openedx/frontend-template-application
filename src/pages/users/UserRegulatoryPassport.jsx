/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import UserAvatar from '../../components/users/UserAvatar';
import {
  RegulatoryPassportCompletedTrainings,
  RegulatoryPassportDomainCoverage,
  RegulatoryPassportStats,
} from '../../components/users/regulatoryPassport';
import AccessRestrictedPage from '../AccessRestrictedPage';
import { useUserRole } from '../../contexts/UserRoleContext';
import {
  resolveRegulatoryPassportCompletedTrainingsMock,
  resolveRegulatoryPassportDomainCoverageMock,
  resolveUserRegulatoryPassportMock,
} from '../../api/users/userPageMockData';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { HEADER_LOGO_FALLBACK, resolveHeaderLogoSrc } from '../../utils/brandAssets';
import messages from './regulatoryPassportMessages';
import './UserRegulatoryPassport.scss';

const UserRegulatoryPassport = () => {
  const { formatMessage } = useIntl();
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
    <section className="user-passport-page">
      <div className="user-passport-page__card">
        <div className="user-passport-page__header">
          <div className="user-passport-page__brand">
            <img
              className="user-passport-page__brand-img"
              src={resolveHeaderLogoSrc()}
              alt={formatMessage(messages.brandAlt)}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = HEADER_LOGO_FALLBACK;
              }}
            />
          </div>
          <div className="user-passport-page__identity">
            <UserAvatar variant="passport" name={detail.name} imageUrl={profileImageUrl} />
            <div className="user-passport-page__who">
              <h2 className="user-passport-page__name">{detail.name}</h2>
              {hasDisplayValue(detail.jobTitle) && (
                <p className="user-passport-page__job">{detail.jobTitle}</p>
              )}
              {hasDisplayValue(detail.organisationLine) && (
                <p className="user-passport-page__org">{detail.organisationLine}</p>
              )}
            </div>
          </div>
          {hasDisplayValue(detail.passportId) && (
            <div className="user-passport-page__passport-id">
              <p className="user-passport-page__passport-id-value">{detail.passportId}</p>
              <p className="user-passport-page__passport-id-label">{formatMessage(messages.passportIdLabel)}</p>
            </div>
          )}
        </div>

        <div className="user-passport-page__about">
          <div className="user-passport-page__about-left">
            <h3 className="user-passport-page__section-title">{formatMessage(messages.aboutTitle)}</h3>
            {hasDisplayValue(detail.about) && (
              <p className="user-passport-page__about-text">{detail.about}</p>
            )}
          </div>
          {hasDisplayValue(detail.competencyRole) && (
            <div className="user-passport-page__about-right">
              <p className="user-passport-page__meta-label">{formatMessage(messages.competencyRoleLabel)}</p>
              <p className="user-passport-page__meta-value">{detail.competencyRole}</p>
            </div>
          )}
        </div>

        <RegulatoryPassportStats items={detail.stats} />

        <RegulatoryPassportDomainCoverage items={domainCoverage} />

        <RegulatoryPassportCompletedTrainings
          items={completedTrainingsPage.items}
          page={completedTrainingsPage.page}
          totalPages={completedTrainingsPage.totalPages}
          onPageChange={() => {}}
          certificateLinkState={{
            userId,
            userProfileImage: profileImageUrl,
            userListRow: location.state?.userListRow ?? null,
          }}
        />

        <div className="user-passport-page__export">
          <div className="user-passport-page__export-row">
            <div>
              <p className="user-passport-page__export-title">
                {formatMessage(messages.exportTitle, { name: detail.name })}
              </p>
            </div>
            <div className="user-passport-page__export-actions">
              <button type="button" className="user-passport-page__export-btn">
                {formatMessage(messages.exportDownloadButton)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRegulatoryPassport;
