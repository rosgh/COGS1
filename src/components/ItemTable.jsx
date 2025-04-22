import React from 'react';
import { calculateTableData } from '../utils/calculate';

export default function ItemTable({ month, category, data, setData }) {
  const items = Object.keys(data?.[category]?.[month] || {}).sort();
  const handleInput = (item, field, value, type) => {
    const updated = { ...data };
    const entry = updated[category][month][item];
    if (type === '입고') {
      entry.입고.push({ 수량: Number(value), 금액: Number(value * 100) }); // 임시
    } else if (type === '출고') {
      entry.출고.수량 = Number(value);
    }
    updated[category][month][item] = calculateTableData(
      updated[category][month][item],
      month,
      data?.[category]
    );
    setData(updated);
  };

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th className="border p-2">품목</th>
          <th className="border p-2">기초 수량</th>
          <th className="border p-2">입고 수량</th>
          <th className="border p-2">출고 수량</th>
          <th className="border p-2">기말 수량</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => {
          const entry = data[category][month][item];
          return (
            <tr key={item}>
              <td className="border p-2">{item}</td>
              <td className="border p-2">{entry.기초?.수량 ?? 0}</td>
              <td className="border p-2">
                <input
                  type="number"
                  className="w-full"
                  onBlur={e => handleInput(item, '수량', e.target.value, '입고')}
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  className="w-full"
                  onBlur={e => handleInput(item, '수량', e.target.value, '출고')}
                />
              </td>
              <td className="border p-2">{entry.기말?.수량 ?? 0}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
