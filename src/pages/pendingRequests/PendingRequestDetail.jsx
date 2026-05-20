/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState } from '../../components/emptyState';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import usePendingRequestAction from '../../hooks/pendingRequests/usePendingRequestAction';
import usePendingRequestDetail from '../../hooks/pendingRequests/usePendingRequestDetail';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import detailMessages from './detailMessages';
import messages from './messages';
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

const statusChipClass = (status) => {
  if (status === 'approved') return 'pending-request-detail__chip--approved';
  if (status === 'rejected') return 'pending-request-detail__chip--rejected';
  if (status === 'closed') return 'pending-request-detail__chip--closed';
  return 'pending-request-detail__chip--pending';
};

const PendingRequestDetail = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { requestId } = useParams();
  const { componentAccess } = useUserRole();
  const canEditPendingRequest = Boolean(componentAccess?.pendingRequests?.canEditPendingRequest);

  const {
    detail,
    isLoading,
    isError,
    errorMessage,
    refetch,
  } = usePendingRequestDetail({ id: requestId });

  const { approveMutation, rejectMutation, closeMutation } = usePendingRequestAction();

  const isPending = detail?.status === 'pending';
  const isActionPending = approveMutation.isPending
    || rejectMutation.isPending
    || closeMutation.isPending;

  const statusLabel = useMemo(() => ({
    pending: formatMessage(messages.statusPending),
    approved: formatMessage(messages.statusApproved),
    rejected: formatMessage(messages.statusRejected),
    closed: formatMessage(messages.statusClosed),
  }), [formatMessage]);

  useEffect(() => {
    if (!isError) {
      return;
    }

    showToast({
      title: formatMessage(messages.detailErrorTitle),
      description: errorMessage || formatMessage(messages.detailLoadError),
    });
  }, [errorMessage, formatMessage, isError, showToast]);

  const renderStatusLabel = (status) => {
    if (!hasDisplayValue(status)) {
      return null;
    }

    const normalized = String(status).toLowerCase();
    return statusLabel[normalized] || status;
  };

  const runAction = async (mutation, toastTitle, toastDescription) => {
    if (!detail?.id) {
      return;
    }

    try {
      await mutation.mutateAsync({ id: detail.id });
      showToast({
        title: toastTitle,
        description: toastDescription,
      });
      await refetch();
    } catch (error) {
      showToast({
        title: formatMessage(messages.actionErrorTitle),
        description: error?.message || formatMessage(messages.actionError),
      });
    }
  };

  if (isLoading) {
    return (
      <section className="pending-request-detail">
        <SkeletonScreen variant={SKELETON_VARIANTS.detail} />
      </section>
    );
  }

  if (isError || !detail) {
    return (
      <EmptyState
        message={errorMessage || formatMessage(messages.notFound)}
        fullSize
      />
    );
  }

  const submittedByName = detail.submittedBy?.name;
  const submittedByEmail = detail.submittedBy?.email;

  return (
    <section className="pending-request-detail">
      <button type="button" className="pending-request-detail__back" onClick={() => navigate('/admin/pending-requests')}>
        <ArrowLeftIcon className="h-4 w-4" />
        {formatMessage(detailMessages.back)}
      </button>

      <div className="pending-request-detail__card">
        <div className="pending-request-detail__header">
          {hasDisplayValue(detail.title) && (
            <h2 className="pending-request-detail__title">{detail.title}</h2>
          )}
          {hasDisplayValue(detail.subtitle) && (
            <p className="pending-request-detail__subtitle">{detail.subtitle}</p>
          )}
          <div className="pending-request-detail__meta">
            {hasDisplayValue(detail.type) && (
              <span className="pending-request-detail__chip">{detail.type}</span>
            )}
            {hasDisplayValue(detail.status) && (
              <span className={`pending-request-detail__chip ${statusChipClass(detail.status)}`}>
                {renderStatusLabel(detail.status)}
              </span>
            )}
            {hasDisplayValue(detail.submittedRelative) && (
              <span className="pending-request-detail__time">{detail.submittedRelative}</span>
            )}
          </div>
        </div>

        <div className="pending-request-detail__body">
          {(hasDisplayValue(submittedByName) || hasDisplayValue(submittedByEmail)) && (
            <div>
              <h3 className="pending-request-detail__section-title">{formatMessage(detailMessages.submittedBy)}</h3>
              {hasDisplayValue(submittedByName) && (
                <p className="pending-request-detail__text">{submittedByName}</p>
              )}
              {hasDisplayValue(submittedByEmail) && (
                <p className="pending-request-detail__muted">{submittedByEmail}</p>
              )}
            </div>
          )}

          {hasDisplayValue(detail.description) && (
            <div>
              <h3 className="pending-request-detail__section-title">{formatMessage(detailMessages.description)}</h3>
              <p className="pending-request-detail__desc">{detail.description}</p>
            </div>
          )}

          {isPending && canEditPendingRequest && (
            <div className="pending-request-detail__actions">
              <button
                type="button"
                className="pending-request-detail__button pending-request-detail__button--approve"
                disabled={isActionPending}
                onClick={() => runAction(
                  approveMutation,
                  formatMessage(detailMessages.toastApprovedTitle),
                  formatMessage(detailMessages.toastApprovedDescription, { title: detail.title }),
                )}
              >
                <CheckIcon className="h-4 w-4" />
                {formatMessage(detailMessages.approve)}
              </button>

              <button
                type="button"
                className="pending-request-detail__button pending-request-detail__button--reject"
                disabled={isActionPending}
                onClick={() => runAction(
                  rejectMutation,
                  formatMessage(detailMessages.toastRejectedTitle),
                  formatMessage(detailMessages.toastRejectedDescription, { title: detail.title }),
                )}
              >
                <XIcon className="h-4 w-4" />
                {formatMessage(detailMessages.reject)}
              </button>

              <button
                type="button"
                className="pending-request-detail__button pending-request-detail__button--outline"
                disabled={isActionPending}
                onClick={async () => {
                  if (!detail?.id) {
                    return;
                  }

                  try {
                    await closeMutation.mutateAsync({ id: detail.id });
                    showToast({
                      title: formatMessage(detailMessages.toastClosedTitle),
                      description: formatMessage(detailMessages.toastClosedDescription, { title: detail.title }),
                    });
                    navigate('/admin/pending-requests');
                  } catch (error) {
                    showToast({
                      title: formatMessage(messages.actionErrorTitle),
                      description: error?.message || formatMessage(messages.actionError),
                    });
                  }
                }}
              >
                <CircleXIcon className="h-4 w-4" />
                {formatMessage(detailMessages.close)}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PendingRequestDetail;
