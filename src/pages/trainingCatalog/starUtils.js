export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const getStarFill = (rating, index) => {
  const safe = clamp(Number(rating) || 0, 0, 5);
  const position = index + 1;
  if (safe >= position) {
    return 1;
  }
  const prev = position - 1;
  if (safe > prev && safe < position) {
    return safe - prev; // 0..1
  }
  return 0;
};

