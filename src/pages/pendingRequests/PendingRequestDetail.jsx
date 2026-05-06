import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../../components/emptyState/EmptyState';
import { useToast } from '../../components/toast/ToastProvider';
import pendingRequests from '../../mock/pendingRequests/pendingRequests.json';
import messages from './detailMessages';
import './PendingRequestDetail.scss';

const ArrowLeftIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const CircleXIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

const PendingRequestDetail = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { requestId } = useParams();

  const request = useMemo(
    () => pendingRequests.find(r => r.id === requestId),
    [requestId],
  );

  if (!request) {
    return <EmptyState message="Request not found." fullSize />;
  }

  const isApproved = request.status === 'approved';

  return (
    <section className="pending-request-detail">
      <button type="button" className="pending-request-detail__back" onClick={() => navigate('/admin/pending-requests')}>
        <ArrowLeftIcon className="h-4 w-4" />
        {formatMessage(messages.back)}
      </button>

      <div className="pending-request-detail__card">
        <div className="pending-request-detail__header">
          <h2 className="pending-request-detail__title">{request.title}</h2>
          <p className="pending-request-detail__subtitle">{request.subtitle}</p>
          <div className="pending-request-detail__meta">
            <span className="pending-request-detail__chip">{request.type}</span>
            <span className="pending-request-detail__chip pending-request-detail__chip--approved">{request.status}</span>
            <span className="pending-request-detail__time">{request.submittedRelative}</span>
          </div>
        </div>

        <div className="pending-request-detail__body">
          <div>
            <h3 className="pending-request-detail__section-title">{formatMessage(messages.submittedBy)}</h3>
            <p className="pending-request-detail__text">{request.submittedBy.name}</p>
            <p className="pending-request-detail__muted">{request.submittedBy.email}</p>
          </div>

          <div>
            <h3 className="pending-request-detail__section-title">{formatMessage(messages.description)}</h3>
            <p className="pending-request-detail__desc">{request.description}</p>
          </div>

          <div className="pending-request-detail__actions">
            <button
              type="button"
              className="pending-request-detail__button pending-request-detail__button--approve"
              disabled={isApproved}
              onClick={() => {
                showToast({
                  title: formatMessage(messages.toastApprovedTitle),
                  description: formatMessage(messages.toastApprovedDescription, { title: request.title }),
                });
              }}
            >
              <CheckIcon className="h-4 w-4" />
              {formatMessage(messages.approve)}
            </button>

            <button
              type="button"
              className="pending-request-detail__button pending-request-detail__button--reject"
              onClick={() => {
                showToast({
                  title: formatMessage(messages.toastRejectedTitle),
                  description: formatMessage(messages.toastRejectedDescription, { title: request.title }),
                });
              }}
            >
              <XIcon className="h-4 w-4" />
              {formatMessage(messages.reject)}
            </button>

            <button
              type="button"
              className="pending-request-detail__button pending-request-detail__button--outline"
              onClick={() => {
                showToast({
                  title: formatMessage(messages.toastClosedTitle),
                  description: formatMessage(messages.toastClosedDescription, { title: request.title }),
                });
                navigate('/admin/pending-requests');
              }}
            >
              <CircleXIcon className="h-4 w-4" />
              {formatMessage(messages.close)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PendingRequestDetail;

