import React from "react";
import { calculateAveragePrice } from "../utils/calculate";

const DataTable = ({ month, category, items, setItems }) => {
  if (category === "집계") return null;
  const itemEntries = Object.entries(items[category] || {});

  const handleChange = (item, type, field, value) => {
    setItems(prev => {
      const updated = { ...prev };
      const monthData = updated[category][item][month] || {
        기초: {}, 입고: {}, 출고: {}, 기말: {}
      };
      monthData[type][field] = Number(value);
      updated[category][item][month] = monthData;
      return updated;
    });
  };

  return (
    <div className="overflow-auto border rounded-lg mt-4">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">품목명</th>
            {["기초", "입고", "출고", "기말"].flatMap(section =>
              ["수량", "단가", "금액"].map(field => (
                <th key={section + field} className="p-2">{section} {field}</th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {itemEntries.map(([item, data]) => {
            const m = data[month] || {};
            const row = { 기초: {}, 입고: {}, 출고: {}, 기말: {}, ...m };

            const 출고단가 = calculateAveragePrice(row.기초, row.입고);
            const 기말수량 = (row.기초.수량 || 0) + (row.입고.수량 || 0) - (row.출고.수량 || 0);
            const 기말단가 = 출고단가;
            const 기말금액 = 기말수량 * 기말단가;

            return (
              <tr key={item} className="border-t">
                <td className="p-2">{item}</td>
                {["기초", "입고", "출고"].map(section =>
                  <>
                    <td className="p-2">
                      <input type="number" className="w-20 border rounded p-1"
                        value={row[section]?.수량 || ""}
                        onChange={e => handleChange(item, section, "수량", e.target.value)} />
                    </td>
                    <td className="p-2 text-center">
                      {section === "출고"
                        ? 출고단가.toFixed(2)
                        : ((row[section]?.금액 || 0) / Math.max((row[section]?.수량 || 1), 1)).toFixed(2)}
                    </td>
                    <td className="p-2">
                      <input type="number" className="w-24 border rounded p-1"
                        value={row[section]?.금액 || ""}
                        onChange={e => handleChange(item, section, "금액", e.target.value)} />
                    </td>
                  </>
                )}
                <td className="p-2 text-center">{기말수량}</td>
                <td className="p-2 text-center">{기말단가.toFixed(2)}</td>
                <td className="p-2 text-center">{기말금액.toFixed(0)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
