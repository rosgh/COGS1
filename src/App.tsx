```tsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function App() {
  const [selectedMonth, setSelectedMonth] = useState('4월');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [data, setData] = useState<{ [key: string]: any }>({});

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const sheetName = wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(ws);

      const categoriesSet = new Set();
      const parsedItems: any[] = [];
      jsonData.forEach((row: any) => {
        if (row["제품군"] && row["품목명"]) {
          categoriesSet.add(row["제품군"]);
          parsedItems.push(row);
        }
      });

      setCategories(Array.from(categoriesSet) as string[]);
      setItems(parsedItems);
    };
    reader.readAsBinaryString(file);
  };

  const handleChange = (item: any, field: string, value: any) => {
    const key = `${selectedMonth}_${selectedCategory}_${item?.품목명 || 'Unknown'}`;
    const prev = data[key] || {
      기초수량: 0, 기초단가: 0,
      입고: [],
      출고수량: 0,
    };
    if (field === '입고수량' || field === '입고단가') {
      const last = prev.입고?.[prev.입고.length - 1] || { 수량: 0, 단가: 0 };
      const new입고 = [...(prev.입고 || []), {
        수량: field === '입고수량' ? Number(value) : last.수량,
        단가: field === '입고단가' ? Number(value) : last.단가
      }];
      setData({ ...data, [key]: { ...prev, 입고: new입고 } });
    } else {
      setData({ ...data, [key]: { ...prev, [field]: Number(value) } });
    }
  };

  const calculate = (item: any) => {
    const key = `${selectedMonth}_${selectedCategory}_${item.품목명}`;
    const record = data[key] || {};
    const { 기초수량 = 0, 기초단가 = 0, 출고수량 = 0, 입고 = [] } = record;
    const 입고총액 = 입고.reduce((sum: number, i: any) => sum + i.수량 * i.단가, 0);
    const 입고총수량 = 입고.reduce((sum: number, i: any) => sum + i.수량, 0);
    const 평균단가 = (기초수량 * 기초단가 + 입고총액) / (기초수량 + 입고총수량 || 1);
    const 출고금액 = 출고수량 * 평균단가;
    const 기말수량 = 기초수량 + 입고총수량 - 출고수량;
    const 기말금액 = 기말수량 * 평균단가;
    return { 평균단가: 평균단가.toFixed(0), 기말수량, 기말금액: 기말금액.toFixed(0) };
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-2">
        {months.map((m) => (
          <button
            key={m}
            className={`px-3 py-1 rounded ${selectedMonth === m ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setSelectedMonth(m)}>
            {m}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-2">
        {categories.map((c) => (
          <button
            key={c}
            className={`px-3 py-1 rounded ${selectedCategory === c ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setSelectedCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="mb-2">
        <label className="block font-semibold">품목 리스트 업로드</label>
        <input type="file" onChange={handleUpload} className="mb-4" />
      </div>

      {selectedCategory && (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2">품목</th>
              <th className="border px-2">기초수량</th>
              <th className="border px-2">기초단가</th>
              <th className="border px-2">입고수량</th>
              <th className="border px-2">입고단가</th>
              <th className="border px-2">출고수량</th>
              <th className="border px-2">기말수량</th>
              <th className="border px-2">기말금액</th>
            </tr>
          </thead>
          <tbody>
            {items.filter(i => i.제품군 === selectedCategory).map(item => {
              const { 평균단가, 기말수량, 기말금액 } = calculate(item);
              return (
                <tr key={item.품목명}>
                  <td className="border px-2">{item.품목명}</td>
                  <td className="border px-2">
                    <input type="number" className="w-16" onChange={e => handleChange(item, '기초수량', e.target.value)} />
                  </td>
                  <td className="border px-2">
                    <input type="number" className="w-16" onChange={e => handleChange(item, '기초단가', e.target.value)} />
                  </td>
                  <td className="border px-2">
                    <input type="number" className="w-16" onChange={e => handleChange(item, '입고수량', e.target.value)} />
                  </td>
                  <td className="border px-2">
                    <input type="number" className="w-16" onChange={e => handleChange(item, '입고단가', e.target.value)} />
                  </td>
                  <td className="border px-2">
                    <input type="number" className="w-16" onChange={e => handleChange(item, '출고수량', e.target.value)} />
                  </td>
                  <td className="border px-2 text-right">{기말수량}</td>
                  <td className="border px-2 text-right">{기말금액}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
```
