/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import UserAvatar from '../UserAvatar';
import RegulatoryPassportCompletedTrainings from './RegulatoryPassportCompletedTrainings';
import RegulatoryPassportDomainCoverage from './RegulatoryPassportDomainCoverage';
import RegulatoryPassportStats from './RegulatoryPassportStats';
import { hasDisplayValue } from '../../../utils/hasDisplayValue';
import { HEADER_LOGO_FALLBACK, resolveHeaderLogoSrc } from '../../../utils/brandAssets';
import messages from '../../../pages/users/regulatoryPassportMessages';

const RegulatoryPassportView = ({
  detail,
  profileImageUrl = '',
  domainCoverage = [],
  domainCoverageProps = {},
  completedTrainingsPage,
  onCompletedTrainingsPageChange = () => {},
  onDownloadClick = () => {},
  certificateLinkState = null,
}) => {
  const { formatMessage } = useIntl();

  if (!detail) {
    return null;
  }

  return (
    <section className="user-passport-page">
      <div className="user-passport-page__card">
        <div className="user-passport-page__header">
          <div className="user-passport-page__brand">
            <img
              className="user-passport-page__brand-img"
              src={resolveHeaderLogoSrc()}
              alt={formatMessage(messages.brandAlt)}
              onError={({ currentTarget }) => {
                const image = currentTarget;
                image.onerror = null;
                image.src = HEADER_LOGO_FALLBACK;
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

        <RegulatoryPassportDomainCoverage
          items={domainCoverage}
          {...domainCoverageProps}
        />

        <RegulatoryPassportCompletedTrainings
          items={completedTrainingsPage?.items}
          count={completedTrainingsPage?.count}
          page={completedTrainingsPage?.page}
          totalPages={completedTrainingsPage?.totalPages}
          onPageChange={onCompletedTrainingsPageChange}
          certificateLinkState={certificateLinkState}
        />

        <div className="user-passport-page__export">
          <div className="user-passport-page__export-row">
            <div>
              <p className="user-passport-page__export-title">
                {formatMessage(messages.exportTitle, { name: detail.name })}
              </p>
            </div>
            <div className="user-passport-page__export-actions">
              <button
                type="button"
                className="user-passport-page__export-btn"
                onClick={onDownloadClick}
              >
                {formatMessage(messages.exportDownloadButton)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegulatoryPassportView;
