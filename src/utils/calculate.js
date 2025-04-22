export function calculateTableData(entry, month, categoryData) {
  const monthIndex = parseInt(month.replace('월', ''));
  const prevMonth = `${monthIndex - 1}월`;

  if (monthIndex > 4 && categoryData?.[prevMonth]?.[entry.name]) {
    const prev = categoryData[prevMonth][entry.name];
    entry.기초 = {
      수량: prev.기말.수량,
      금액: prev.기말.금액,
      단가: prev.기말.수량 ? prev.기말.금액 / prev.기말.수량 : 0,
    };
  }

  const 입고총 = entry.입고?.reduce(
    (acc, cur) => ({
      수량: acc.수량 + cur.수량,
      금액: acc.금액 + cur.금액,
    }),
    { 수량: 0, 금액: 0 }
  );

  const 출고수량 = entry.출고?.수량 || 0;
  const 총수량 = (entry.기초?.수량 || 0) + 입고총.수량;
  const 총금액 = (entry.기초?.금액 || 0) + 입고총.금액;
  const 평균단가 = 총수량 ? 총금액 / 총수량 : 0;

  entry.출고.단가 = 평균단가;
  entry.출고.금액 = 출고수량 * 평균단가;

  entry.기말 = {
    수량: 총수량 - 출고수량,
    단가: 평균단가,
    금액: (총수량 - 출고수량) * 평균단가,
  };

  return entry;
}
