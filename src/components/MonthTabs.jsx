import React from 'react';

const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

export default function MonthTabs({ month, setMonth }) {
  return (
    <div className="flex gap-2 mb-4">
      {months.map(m => (
        <button
          key={m}
          onClick={() => setMonth(m)}
          className={`px-4 py-2 rounded ${month === m ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
