/* eslint-disable react/prop-types */
import {
  faBookOpen,
  faEye,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FrameworkCard = ({
  item,
  labels,
  canViewFramework,
  canEditFramework,
  canDeleteFramework,
  onDeleteClick,
}) => (
  <article className="competency-framework-page__card">
    <div className="competency-framework-page__card-content">
      <div className="competency-framework-page__card-icon">
        <FontAwesomeIcon icon={faBookOpen} />
      </div>
      <div className="competency-framework-page__card-text">
        <h3 className="competency-framework-page__card-title">{item.title}</h3>
        <p className="competency-framework-page__card-description">{item.description}</p>
        <div className="competency-framework-page__card-meta">
          <span>{labels.domains(item.domains)}</span>
          <span>{labels.subDomains(item.subDomains)}</span>
          <span>{labels.created(item.createdAt)}</span>
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
