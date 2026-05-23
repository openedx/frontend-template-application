/* eslint-disable react/prop-types */
import './Tabs.scss';

const Tabs = ({
  items = [],
  activeId,
  onChange,
  className = '',
}) => (
  <div className={`app-tabs ${className}`.trim()} role="tablist" aria-orientation="horizontal">
    {items.map(item => (
      <button
        key={item.id}
        type="button"
        role="tab"
        aria-selected={activeId === item.id}
        className={`app-tabs__button ${activeId === item.id ? 'is-active' : ''}`}
        onClick={() => onChange(item.id)}
      >
        {item.label}
      </button>
    ))}
  </div>
);

export default Tabs;
