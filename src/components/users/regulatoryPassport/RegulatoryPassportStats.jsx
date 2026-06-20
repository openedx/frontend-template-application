/* eslint-disable react/prop-types */
import { hasDisplayValue } from '../../../utils/hasDisplayValue';

const RegulatoryPassportStats = ({ items }) => {
  const visibleItems = (items ?? []).filter(
    (item) => hasDisplayValue(item?.id) && hasDisplayValue(item?.number),
  );

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div className="user-passport-page__stats">
      {visibleItems.map((item) => (
        <div key={item.id} className="user-passport-page__stat">
          <p className="user-passport-page__stat-value">{item.number}</p>
          {hasDisplayValue(item.name) && (
            <p className="user-passport-page__stat-label">{item.name}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default RegulatoryPassportStats;
