import { useIntl } from '@edx/frontend-platform/i18n';
import { quickStats, recentActivities } from '../mock/dashboard';
import pageMessages from './messages';

const DashboardDemoPage = () => {
  const { formatMessage } = useIntl();

  return (
    <section>
      <div className="dashboard-panel">
        <h2>{formatMessage(pageMessages.dashboardPageHeading)}</h2>
        <p>{formatMessage(pageMessages.dashboardPageDescription)}</p>
      </div>

      <div className="dashboard-section">
        <h3>{formatMessage(pageMessages.dashboardStatsSection)}</h3>
        <div className="dashboard-grid">
          {quickStats.map(stat => (
            <article className="dashboard-card" key={stat.id}>
              <p className="dashboard-card__label">{formatMessage(pageMessages[stat.labelKey])}</p>
              <p className="dashboard-card__value">{stat.value}</p>
              <p className="dashboard-card__trend">{stat.trend}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>{formatMessage(pageMessages.dashboardActivitySection)}</h3>
        <div className="dashboard-list">
          {recentActivities.map(item => (
            <article className="dashboard-list__item" key={item.id}>
              <p className="dashboard-list__title">{formatMessage(pageMessages[item.titleKey])}</p>
              <p className="dashboard-list__meta">{formatMessage(pageMessages[item.timestampKey])}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardDemoPage;
