/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmptyState from '../emptyState/EmptyState';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import {
  hasValidLearnersCount,
  hasValidRating,
  normalizeTopTrainings,
} from './topTrainingsUtils';
import './DashboardTopTrainings.scss';

const DashboardTopTrainings = ({ items = [], emptyMessage }) => {
  const { formatMessage } = useIntl();
  const displayItems = normalizeTopTrainings(items);

  return (
    <article className="dashboard-top-trainings">
      <div className="dashboard-top-trainings__header">
        <h2 className="dashboard-top-trainings__title">{formatMessage(messages.title)}</h2>
      </div>

      {displayItems.length === 0 ? (
        <EmptyState
          message={emptyMessage || formatMessage(messages.empty)}
          className="dashboard-top-trainings__empty"
        />
      ) : (
        <div className="dashboard-top-trainings__table-wrap">
          <table className="dashboard-top-trainings__table">
            <thead>
              <tr className="dashboard-top-trainings__head-row">
                <th className="dashboard-top-trainings__th">{formatMessage(messages.columnTraining)}</th>
                <th className="dashboard-top-trainings__th">{formatMessage(messages.columnLearners)}</th>
                <th className="dashboard-top-trainings__th">{formatMessage(messages.columnRating)}</th>
              </tr>
            </thead>
            <tbody>
              {displayItems.map((row) => (
                <tr key={row.id} className="dashboard-top-trainings__row">
                  <td className="dashboard-top-trainings__td dashboard-top-trainings__td--primary">
                    {hasDisplayValue(row.training) ? row.training : null}
                  </td>
                  <td className="dashboard-top-trainings__td dashboard-top-trainings__td--muted">
                    {hasValidLearnersCount(row.learners) ? row.learners : null}
                  </td>
                  <td className="dashboard-top-trainings__td dashboard-top-trainings__td--muted">
                    {hasValidRating(row.rating) ? (
                      <span className="dashboard-top-trainings__rating">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="dashboard-top-trainings__rating-icon"
                          aria-hidden
                        />
                        {row.rating}
                      </span>
                    ) : (
                      formatMessage(messages.ratingUnavailable)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
};

export default DashboardTopTrainings;
