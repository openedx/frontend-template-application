/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import EmptyState from '../emptyState/EmptyState';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import {
  getUsersPerCountryXAxisConfig,
  normalizeUsersPerCountryChartData,
} from './usersPerCountryChartUtils';
import './UsersPerCountry.scss';

const CustomTooltip = ({
  active,
  payload,
  label,
  usersUnit,
}) => {
  if (!active || !payload?.length) {
    return null;
  }

  const value = payload[0]?.value;

  return (
    <div className="users-country__tooltip">
      {hasDisplayValue(label) && (
        <p className="users-country__tooltip-label">{label}</p>
      )}
      {hasDisplayValue(value) && (
        <p className="users-country__tooltip-value">
          Users :
          {' '}
          {value}
          {' '}
          {usersUnit}
        </p>
      )}
    </div>
  );
};

const UsersPerCountry = ({ items = [], emptyMessage }) => {
  const { formatMessage } = useIntl();
  const usersUnit = formatMessage(messages.usersUnit);

  const chartData = useMemo(
    () => normalizeUsersPerCountryChartData(items),
    [items],
  );

  const xAxisConfig = useMemo(
    () => getUsersPerCountryXAxisConfig(chartData),
    [chartData],
  );

  if (chartData.length === 0) {
    return (
      <section className="users-country">
        <div className="users-country__header">
          <h2 className="users-country__title">{formatMessage(messages.title)}</h2>
          {hasDisplayValue(formatMessage(messages.description)) && (
            <p className="users-country__description">{formatMessage(messages.description)}</p>
          )}
        </div>
        <div className="users-country__body">
          <EmptyState
            message={emptyMessage || formatMessage(messages.empty)}
            className="users-country__empty"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="users-country">
      <div className="users-country__header">
        <h2 className="users-country__title">{formatMessage(messages.title)}</h2>
        {hasDisplayValue(formatMessage(messages.description)) && (
          <p className="users-country__description">{formatMessage(messages.description)}</p>
        )}
      </div>

      <div className="users-country__body">
        <div className="users-country__chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{
                top: 8, right: 32, left: 8, bottom: 8,
              }}
            >
              <CartesianGrid stroke="#E5E7EB" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: '#2A398D', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={{ stroke: '#E5E7EB' }}
                domain={xAxisConfig.domain}
                ticks={xAxisConfig.ticks}
              />
              <YAxis
                type="category"
                dataKey="country"
                tick={{ fill: '#2A398D', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={90}
              />
              <Tooltip
                cursor={{ fill: 'rgb(42 59 143 / .05)' }}
                content={<CustomTooltip usersUnit={usersUnit} />}
              />
              <Bar
                dataKey="users"
                fill="#2A3B8F"
                barSize={20}
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default UsersPerCountry;
