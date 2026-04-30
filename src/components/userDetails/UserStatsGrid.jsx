/* eslint-disable react/prop-types */
const UserStatsGrid = ({ items = [] }) => (
  <div className="user-detail__stats">
    {items.map(item => (
      <div className="user-detail__stat-card" key={item.key}>
        <p className="user-detail__stat-label">{item.label}</p>
        <p className="user-detail__stat-value">{item.value}</p>
      </div>
    ))}
  </div>
);

export default UserStatsGrid;
