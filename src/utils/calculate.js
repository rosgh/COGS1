export const calculateAveragePrice = (기초, 입고) => {
  const q1 = 기초?.수량 || 0;
  const q2 = 입고?.수량 || 0;
  const p1 = 기초?.금액 || 0;
  const p2 = 입고?.금액 || 0;
  const totalQty = q1 + q2;
  if (totalQty === 0) return 0;
  return (p1 + p2) / totalQty;
};
