/* eslint-disable react/prop-types */
import {
  faBookOpen,
  faEye,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

const FrameworkCard = ({
  item,
  labels,
  canViewFramework,
  canEditFramework,
  canDeleteFramework,
  onDeleteClick,
  onViewClick,
  onEditClick,
}) => (
  <article className="competency-framework-page__card">
    <div className="competency-framework-page__card-content">
      <div className="competency-framework-page__card-icon">
        <FontAwesomeIcon icon={faBookOpen} />
      </div>
      <div className="competency-framework-page__card-text">
        {hasDisplayValue(item.title) && (
          <h3 className="competency-framework-page__card-title">{item.title}</h3>
        )}
        {hasDisplayValue(item.description) && (
          <p className="competency-framework-page__card-description">{item.description}</p>
        )}
        <div className="competency-framework-page__card-meta">
          {hasDisplayValue(item.domains) && (
            <span>{labels.domains(item.domains)}</span>
          )}
          {hasDisplayValue(item.subDomains) && (
            <span>{labels.subDomains(item.subDomains)}</span>
          )}
          {hasDisplayValue(item.createdAt) && (
            <span>{labels.created(item.createdAt)}</span>
          )}
        </div>
      </div>
    </div>
    <div className="competency-framework-page__card-actions">
      {canViewFramework && (
        <button
          type="button"
          className="competency-framework-page__icon-button"
          aria-label={labels.viewAction}
          title={labels.viewAction}
          onClick={() => onViewClick(item)}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
      )}
      {canEditFramework && (
        <button
          type="button"
          className="competency-framework-page__icon-button"
          aria-label={labels.editAction}
          title={labels.editAction}
          onClick={() => onEditClick(item)}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      )}
      {canDeleteFramework && (
        <button
          type="button"
          className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
          aria-label={labels.deleteAction}
          title={labels.deleteAction}
          onClick={() => onDeleteClick(item)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  </article>
);

export default FrameworkCard;
