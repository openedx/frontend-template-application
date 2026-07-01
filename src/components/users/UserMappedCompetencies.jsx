/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faAward, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import detailMessages from '../../pages/users/detailMessages';

const UserMappedCompetencies = ({ items }) => {
  const { formatMessage } = useIntl();
  const visibleItems = (items ?? []).filter((item) => hasDisplayValue(item?.title));

  if (visibleItems.length === 0) {
    return null;
  }

  const completedCount = visibleItems.filter((item) => item.completed).length;

  return (
    <div className="user-about-page__card user-about-page__competencies">
      <div className="user-about-page__card-title user-about-page__competencies-head">
        <FontAwesomeIcon icon={faAward} />
        {formatMessage(detailMessages.competenciesTitle, {
          value: `${completedCount}/${visibleItems.length} completed`,
        })}
      </div>
      <div className="user-about-page__competencies-grid">
        {visibleItems.map((item) => (
          <div
            key={item.id ?? item.title}
            className="user-about-page__competency-card"
          >
            <FontAwesomeIcon
              icon={item.completed ? faCheckCircle : faCircle}
              className={`user-about-page__competency-icon${item.completed ? ' user-about-page__competency-icon--done' : ''}`}
            />
            <div className="user-about-page__competency-body">
              <p className="user-about-page__competency-title">{item.title}</p>
              <div className="user-about-page__competency-meta">
                {hasDisplayValue(item.proficiency) && (
                  <span className="user-about-page__competency-badge">
                    {formatMessage(detailMessages.proficiency, { value: item.proficiency })}
                  </span>
                )}
                <span
                  className={`user-about-page__competency-status${item.completed ? ' user-about-page__competency-status--done' : ''}`}
                >
                  {formatMessage(item.completed ? detailMessages.competencyCompleted : detailMessages.competencyPending)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMappedCompetencies;
