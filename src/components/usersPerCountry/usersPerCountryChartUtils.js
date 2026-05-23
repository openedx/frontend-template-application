import { hasDisplayValue } from '../../utils/hasDisplayValue';

/**
 * Rows safe for Recharts: require displayable country and a valid user count.
 * @param {Array<{ id?: string, country?: string, users?: number }>} items
 */
export const normalizeUsersPerCountryChartData = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter((row) => {
    if (!row || !hasDisplayValue(row.country)) {
      return false;
    }

    const { users } = row;
    return typeof users === 'number' && !Number.isNaN(users) && users >= 0;
  });
};

/**
 * @param {Array<{ users: number }>} chartData
 */
export const getUsersPerCountryXAxisConfig = (chartData) => {
  const maxUsers = chartData.reduce((max, row) => Math.max(max, row.users), 0);

  if (maxUsers <= 0) {
    return { domain: [0, 4], ticks: [0, 1, 2, 3, 4] };
  }

  const tickCount = 4;
  const rawStep = maxUsers / tickCount;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const step = Math.ceil(rawStep / magnitude) * magnitude;
  const ceiling = step * tickCount;

  return {
    domain: [0, ceiling],
    ticks: Array.from({ length: tickCount + 1 }, (_, index) => index * step),
  };
};
