/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { TablePaginationFooter } from '../../dataTable';
import { hasDisplayValue } from '../../../utils/hasDisplayValue';
import { buildPaginationShowingParams } from '../../../utils/paginationUtils';
import messages from '../../../pages/users/regulatoryPassportMessages';

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(String(value));
const isInternalAdminPath = (value) => String(value || '').startsWith('/admin/');

const RegulatoryPassportCompletedTrainings = ({
  items,
  count = 0,
  page,
  totalPages,
  onPageChange,
}) => {
  const { formatMessage } = useIntl();
  const visibleItems = (items ?? []).filter((row) => hasDisplayValue(row?.id));

  if (visibleItems.length === 0) {
    return null;
  }

  return (
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
            {visibleItems.map((row) => (
              <tr key={row.id}>
                <td className="user-passport-page__cell--strong">{row.training}</td>
                <td className="user-passport-page__cell--muted">
                  {hasDisplayValue(row.provider) ? row.provider : null}
                </td>
                <td className="user-passport-page__cell--muted">
                  {hasDisplayValue(row.completed) ? row.completed : null}
                </td>
                <td>
                  {hasDisplayValue(row.activity) && (
                    <span className="user-passport-page__link">{row.activity}</span>
                  )}
                </td>
                <td>
                  {hasDisplayValue(row.remoteType) && (
                    <span className="user-passport-page__pill">{row.remoteType}</span>
                  )}
                </td>
                <td>
                  {hasDisplayValue(row.certificateViewUrl) && (
                    isAbsoluteUrl(row.certificateViewUrl) || isInternalAdminPath(row.certificateViewUrl) ? (
                      <a
                        className="user-passport-page__link"
                        href={row.certificateViewUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {formatMessage(messages.certificateView)}
                      </a>
                    ) : null
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePaginationFooter
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        paginationLabel={formatMessage(messages.paginationLabel)}
        footerContent={formatMessage(
          messages.showingCount,
          buildPaginationShowingParams(visibleItems, count),
        )}
      />
    </div>
  );
};

export default RegulatoryPassportCompletedTrainings;
