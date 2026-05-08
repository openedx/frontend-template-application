export const getStarFill = (rating, index) => {
  const value = Number(rating || 0);
  const lower = index;
  const upper = index + 1;
  if (value >= upper) {
    return 1;
  }
  if (value <= lower) {
    return 0;
  }
  return Math.max(0, Math.min(1, value - lower));
};

