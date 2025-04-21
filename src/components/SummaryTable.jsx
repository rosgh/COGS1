import React from "react";

const SummaryTable = ({ category, items }) => {
  if (category === "집계") return null;
  const data = items[category] || {};
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

  const totalByMonth = {};
  months.forEach(month => {
    let total = 0;
    Object.values(data).forEach(itemData => {
      const m = itemData[month];
      if (m?.기말?.금액) total += m.기말.금액;
    });
    totalByMonth[month] = total;
  });

  return (
    <div className="mt-4">
      <h2 className="font-bold mb-2">제품군별 기말 금액 합계</h2>
      <div className="grid grid-cols-6 gap-4">
        {months.map(m => (
          <div key={m} className="p-2 border rounded bg-gray-50">
            {m}: {totalByMonth[m].toLocaleString()} 원
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryTable;
