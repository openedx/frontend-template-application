/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  canSelfAssignTraining,
  resolveHaveAssigned,
} from '../../api/trainingCatalogSelfAssign/trainingCatalogSelfAssignUtils';
import catalogMessages from '../../pages/searnTrainingCatalog/messages';

const TrainingCatalogSelfAssignCell = ({
  row,
  assignedOverrides = {},
  onSelfAssignClick,
  isSubmitting = false,
  buttonClassName = 'searn-training-catalog-page__outline-button',
  badgeClassName = 'searn-training-catalog-page__requested-badge',
}) => {
  const { formatMessage } = useIntl();
  const haveAssigned = resolveHaveAssigned(row, assignedOverrides);

  if (canSelfAssignTraining(haveAssigned)) {
    return (
      <button
        type="button"
        className={buttonClassName}
        disabled={isSubmitting}
        onClick={(event) => {
          event.stopPropagation();
          onSelfAssignClick(row);
        }}
      >
        {formatMessage(catalogMessages.selfAssign)}
      </button>
    );
  }

  return (
    <span className={badgeClassName}>
      {formatMessage(catalogMessages.selfAssignAssigned)}
    </span>
  );
};

export default TrainingCatalogSelfAssignCell;
