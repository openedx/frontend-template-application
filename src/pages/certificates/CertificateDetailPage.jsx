import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { resolveCertificateDetailMock } from '../../api/certificates/certificatePageMockData';
import AccessRestrictedPage from '../AccessRestrictedPage';
import { useUserRole } from '../../contexts/UserRoleContext';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import './CertificateDetailPage.scss';

const CertificateDetailPage = () => {
  const { formatMessage } = useIntl();
  const { certificateId } = useParams();
  const location = useLocation();
  const { componentAccess } = useUserRole();

  const canViewUserAbout = Boolean(componentAccess?.users?.canViewUserAbout ?? false);
  const canViewRegulatoryPassport = Boolean(componentAccess?.users?.canViewRegulatoryPassport ?? false);

  const certificate = useMemo(
    () => resolveCertificateDetailMock(certificateId),
    [certificateId],
  );

  const userId = location.state?.userId;
  const passportBackPath = hasDisplayValue(userId)
    ? ADMIN_PATHS.userRegulatoryPassport(userId)
    : ADMIN_PATHS.users;

  if (!canViewUserAbout || !canViewRegulatoryPassport) {
    return <AccessRestrictedPage />;
  }

  if (!certificate) {
    return <Navigate to={passportBackPath} replace />;
  }

  const detailRows = [
    { key: 'training', label: messages.trainingLabel, value: certificate.training },
    { key: 'provider', label: messages.providerLabel, value: certificate.provider },
    { key: 'completed', label: messages.completedLabel, value: certificate.completed },
    { key: 'certificateNumber', label: messages.certificateNumberLabel, value: certificate.certificateNumber },
  ].filter((row) => hasDisplayValue(row.value));

  return (
    <section className="user-certificate-page">
      <div className="user-certificate-page__back">
        <Link
          to={passportBackPath}
          state={{
            userProfileImage: location.state?.userProfileImage ?? '',
            userListRow: location.state?.userListRow ?? null,
          }}
          className="user-certificate-page__back-btn"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          {formatMessage(messages.backToPassport)}
        </Link>
      </div>

      <div className="user-certificate-page__card">
        <h1 className="user-certificate-page__title">{formatMessage(messages.title)}</h1>
        <div className="user-certificate-page__list">
          {detailRows.map((row) => (
            <div key={row.key} className="user-certificate-page__row">
              <p className="user-certificate-page__label">{formatMessage(row.label)}</p>
              <p className="user-certificate-page__value">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificateDetailPage;
