/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { Pagination } from '@openedx/paragon';
import { Navigate, useParams } from 'react-router-dom';
import AccessRestrictedPage from '../AccessRestrictedPage';
import { useUserRole } from '../../contexts/UserRoleContext';
import usersData from '../../mock/users/users.json';
import passportData from '../../mock/users/regulatoryPassport.json';
import brandPlaceholder from '../../assets/images/brand-placeholder.svg';
import messages from './regulatoryPassportMessages';
import './UserRegulatoryPassport.scss';

const getInitials = name => name.split(' ')
  .slice(0, 2)
  .map(part => part.charAt(0))
  .join('')
  .toUpperCase();

const UserRegulatoryPassport = () => {
  const { formatMessage } = useIntl();
  const { userId } = useParams();
  const { componentAccess } = useUserRole();

  const canViewUserAbout = Boolean(componentAccess?.users?.canViewUserAbout ?? false);
  const canViewRegulatoryPassport = Boolean(componentAccess?.users?.canViewRegulatoryPassport ?? false);

  if (!canViewUserAbout || !canViewRegulatoryPassport) {
    return <AccessRestrictedPage />;
  }

  const user = usersData.find(item => item.id === userId);
  if (!user) {
    return <Navigate to="/admin/users" replace />;
  }

  const detail = passportData[userId] || passportData.default;

  return (
    <section className="user-passport-page">
      <div className="user-passport-page__card">
        <div className="user-passport-page__header">
          <div className="user-passport-page__brand">
            <img
              className="user-passport-page__brand-img"
              src={brandPlaceholder}
              alt="SEARN"
            />
          </div>
          <div className="user-passport-page__identity">
            <div className="user-passport-page__avatar">{getInitials(user.name)}</div>
            <div className="user-passport-page__who">
              <h2 className="user-passport-page__name">{user.name}</h2>
              <p className="user-passport-page__job">{detail.jobTitle}</p>
              <p className="user-passport-page__org">{detail.organisationLine}</p>
            </div>
          </div>
          <div className="user-passport-page__passport-id">
            <p className="user-passport-page__passport-id-value">{detail.passportId}</p>
            <p className="user-passport-page__passport-id-label">{formatMessage(messages.passportIdLabel)}</p>
          </div>
        </div>

        <div className="user-passport-page__about">
          <div className="user-passport-page__about-left">
            <h3 className="user-passport-page__section-title">{formatMessage(messages.aboutTitle)}</h3>
            <p className="user-passport-page__about-text">{detail.about}</p>
          </div>
          <div className="user-passport-page__about-right">
            <p className="user-passport-page__meta-label">{formatMessage(messages.competencyRoleLabel)}</p>
            <p className="user-passport-page__meta-value">{detail.competencyRole}</p>
          </div>
        </div>

        <div className="user-passport-page__stats">
          <div className="user-passport-page__stat">
            <p className="user-passport-page__stat-value">{detail.stats.trainingsCompleted}</p>
            <p className="user-passport-page__stat-label">{formatMessage(messages.statTrainingsCompleted)}</p>
          </div>
          <div className="user-passport-page__stat">
            <p className="user-passport-page__stat-value">{detail.stats.assignedTrainings}</p>
            <p className="user-passport-page__stat-label">{formatMessage(messages.statAssignedTrainings)}</p>
          </div>
          <div className="user-passport-page__stat">
            <p className="user-passport-page__stat-value">{detail.stats.completionRate}</p>
            <p className="user-passport-page__stat-label">{formatMessage(messages.statCompletionRate)}</p>
          </div>
          <div className="user-passport-page__stat">
            <p className="user-passport-page__stat-value">{detail.stats.activitiesCovered}</p>
            <p className="user-passport-page__stat-label">{formatMessage(messages.statActivitiesCovered)}</p>
          </div>
        </div>

        <div className="user-passport-page__domains">
          <h3 className="user-passport-page__section-title">{formatMessage(messages.domainCoverageTitle)}</h3>
          <div className="user-passport-page__domain-list">
            {detail.domainCoverage.map(item => (
              <div key={item.domain} className="user-passport-page__domain">
                <div className="user-passport-page__domain-row">
                  <p className="user-passport-page__domain-name">{item.domain}</p>
                  <p className="user-passport-page__domain-percent">{item.percent}%</p>
                </div>
                <div className="user-passport-page__bar">
                  <div className="user-passport-page__bar-fill" style={{ width: `${item.percent}%` }} />
                </div>
                <div className="user-passport-page__tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="user-passport-page__tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="user-passport-page__table">
          <h3 className="user-passport-page__section-title">{formatMessage(messages.completedTrainingTitle)}</h3>
          <div className="user-passport-page__table-wrap">
            <table className="user-passport-page__table-el">
              <thead>
                <tr>
                  <th>{formatMessage(messages.tableTraining)}</th>
                  <th>{formatMessage(messages.tableProvider)}</th>
                  <th>{formatMessage(messages.tableCompleted)}</th>
                  <th>{formatMessage(messages.tableActivities)}</th>
                  <th>{formatMessage(messages.tableRemoteType)}</th>
                  <th>{formatMessage(messages.tableCertificate)}</th>
                </tr>
              </thead>
              <tbody>
                {detail.completedTrainings.map(row => (
                  <tr key={`${row.training}-${row.completed}`}>
                    <td className="user-passport-page__cell--strong">{row.training}</td>
                    <td className="user-passport-page__cell--muted">{row.provider}</td>
                    <td className="user-passport-page__cell--muted">{row.completed}</td>
                    <td>
                      <span className="user-passport-page__link">{row.activity}</span>
                    </td>
                    <td>
                      <span className="user-passport-page__pill">{row.remoteType}</span>
                    </td>
                    <td>
                      <a className="user-passport-page__link" href={row.certificateUrl}>
                        {formatMessage(messages.certificateView)}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="user-passport-page__pagination">
            <Pagination
              className="data-table__pagination"
              paginationLabel="Regulatory passport pagination"
              pageCount={3}
              currentPage={1}
              onPageSelect={() => {}}
            />
          </div>
        </div>

        <div className="user-passport-page__export">
          <div className="user-passport-page__export-row">
            <div>
              <p className="user-passport-page__export-title">
                Export Regulatory Passport — {user.name}
              </p>
            </div>
            <div className="user-passport-page__export-actions">
              <button type="button" className="user-passport-page__export-btn">
                Download Regulatory Passport
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRegulatoryPassport;

