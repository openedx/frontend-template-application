/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { hasDisplayValue } from '../../../utils/hasDisplayValue';
import messages from '../../../pages/users/regulatoryPassportMessages';

const RegulatoryPassportDomainCoverage = ({ items }) => {
  const { formatMessage } = useIntl();
  const visibleItems = (items ?? []).filter((item) => hasDisplayValue(item?.domain));

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div className="user-passport-page__domains">
      <h3 className="user-passport-page__section-title">{formatMessage(messages.domainCoverageTitle)}</h3>
      <div className="user-passport-page__domain-list">
        {visibleItems.map((item) => (
          <div key={item.id} className="user-passport-page__domain">
            <div className="user-passport-page__domain-row">
              <p className="user-passport-page__domain-name">{item.domain}</p>
              <p className="user-passport-page__domain-percent">{item.percent}%</p>
            </div>
            <div className="user-passport-page__bar">
              <div className="user-passport-page__bar-fill" style={{ width: `${item.percent}%` }} />
            </div>
            {item.tags.length > 0 && (
              <div className="user-passport-page__tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="user-passport-page__tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegulatoryPassportDomainCoverage;
