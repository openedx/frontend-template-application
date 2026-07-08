import { fetchRegulatoryPassportCompletedTrainings } from '../../api/users/usersApi';
import { mapRegulatoryPassportCompletedTrainingsPage } from '../../api/users/usersUtils';

/**
 * @param {{
 *   formatMessage: Function,
 *   userId?: string|number|null,
 * }} params
 */
const fetchAllRegulatoryPassportCompletedTrainings = async ({
  formatMessage,
  userId = null,
}) => {
  const allItems = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    // Sequential pagination is required to discover totalPages from the API.
    // eslint-disable-next-line no-await-in-loop
    const result = await fetchRegulatoryPassportCompletedTrainings({
      formatMessage,
      userId,
      page,
    });

    if (!result.ok) {
      throw new Error(result.message);
    }

    const mapped = mapRegulatoryPassportCompletedTrainingsPage(result.data);
    allItems.push(...mapped.items);
    totalPages = Math.max(mapped.totalPages, 1);
    page += 1;
  }

  return allItems;
};

export default fetchAllRegulatoryPassportCompletedTrainings;
