import topTrainingsMock from '../../mock/dashboard/topTrainings.json';

/** @returns {Array<{ id: string, training: string, learners: number, rating: number | null }>} */
export const resolveDashboardTopTrainingsMock = () => (
  Array.isArray(topTrainingsMock?.results) ? topTrainingsMock.results : []
);
