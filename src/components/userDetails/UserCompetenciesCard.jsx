/* eslint-disable react/prop-types */
const UserCompetenciesCard = ({
  title,
  competencies = [],
  proficiencyLabel,
  completedLabel,
  pendingLabel,
}) => (
  <div className="user-detail__card">
    <h3 className="user-detail__card-title">{title}</h3>
    <div className="user-detail__competency-grid">
      {competencies.map(item => (
        <div className="user-detail__list-item" key={item.title}>
          <div className="user-detail__list-item-main">
            <p className="user-detail__list-title">{item.title}</p>
            <p className="user-detail__list-subtitle">{proficiencyLabel(item.proficiency)}</p>
          </div>
          <span className={`user-detail__badge ${item.completed ? 'user-detail__badge--success' : 'user-detail__badge--primary'}`}>
            {item.completed ? completedLabel : pendingLabel}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default UserCompetenciesCard;
