/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  TRAINING_ACCESS_REQUEST_STATUS,
  canRequestTrainingAccess,
  resolveTrainingAccessRequestStatus,
} from '../../api/trainingCatalogRequestAccess/trainingCatalogRequestAccessUtils';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';

const STATUS_MESSAGE_MAP = {
  [TRAINING_ACCESS_REQUEST_STATUS.PENDING]: catalogMessages.requestStatusPending,
  [TRAINING_ACCESS_REQUEST_STATUS.APPROVED]: catalogMessages.requestStatusApproved,
  [TRAINING_ACCESS_REQUEST_STATUS.REJECTED]: catalogMessages.requestStatusRejected,
  [TRAINING_ACCESS_REQUEST_STATUS.CLOSED]: catalogMessages.requestStatusClosed,
};

const TrainingCatalogRequestAccessCell = ({
  row,
  statusOverrides = {},
  onRequestClick,
}) => {
  const { formatMessage } = useIntl();
  const requestStatus = resolveTrainingAccessRequestStatus(row, statusOverrides);

  if (canRequestTrainingAccess(requestStatus)) {
    return (
      <button
        type="button"
        className="searn-training-catalog-page__outline-button"
        onClick={(event) => {
          event.stopPropagation();
          onRequestClick(row);
        }}
      >
        {formatMessage(catalogMessages.requestAccess)}
      </button>
    );
  }

  const statusMessage = STATUS_MESSAGE_MAP[requestStatus];
  if (!statusMessage) {
    return null;
  }

  return (
    <span className={`searn-training-catalog-page__requested-badge searn-training-catalog-page__requested-badge--${requestStatus}`}>
      {formatMessage(statusMessage)}
    </span>
  );
};

export default TrainingCatalogRequestAccessCell;
