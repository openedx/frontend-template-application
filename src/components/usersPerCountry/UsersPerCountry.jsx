/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import messages from './messages';
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

  return (
    <div className="users-country__tooltip">
      <p className="users-country__tooltip-label">{label}</p>
      <p className="users-country__tooltip-value">
        Users :
        {' '}
        {payload[0].value}
        {' '}
        {usersUnit}
      </p>
    </div>
  );
};

const UsersPerCountry = ({ items = [] }) => {
  const { formatMessage } = useIntl();
  const usersUnit = formatMessage(messages.usersUnit);

  return (
    <section className="users-country">
      <div className="users-country__header">
        <h2 className="users-country__title">{formatMessage(messages.title)}</h2>
        <p className="users-country__description">{formatMessage(messages.description)}</p>
      </div>

      <div className="users-country__body">
        <div className="users-country__chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={items}
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
                domain={[0, 320]}
                ticks={[0, 80, 160, 240, 320]}
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
