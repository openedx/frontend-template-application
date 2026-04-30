/* eslint-disable react/prop-types */
const UserTrainingPanels = ({
  completedTitle,
  statusTitle,
  completedTrainings = [],
  trainingStatus = [],
}) => (
  <div className="user-detail__grid">
    <div className="user-detail__card">
      <h3 className="user-detail__card-title">{completedTitle}</h3>
      <div className="user-detail__list">
        {completedTrainings.map(item => (
          <div className="user-detail__list-item" key={item.title}>
            <div className="user-detail__list-item-main">
              <p className="user-detail__list-title">{item.title}</p>
              <p className="user-detail__list-subtitle">{item.completedOn}</p>
            </div>
            <span className="user-detail__badge user-detail__badge--success">{item.score}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="user-detail__card">
      <h3 className="user-detail__card-title">{statusTitle}</h3>
      <div className="user-detail__list">
        {trainingStatus.map(item => (
          <div key={item.title}>
            <div className="user-detail__list-item">
              <div className="user-detail__list-item-main">
                <p className="user-detail__list-title">{item.title}</p>
              </div>
              <span className="user-detail__badge user-detail__badge--primary">{item.status}</span>
            </div>
            <div className="user-detail__progress">
              <div className="user-detail__progress-fill" style={{ width: `${item.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default UserTrainingPanels;
