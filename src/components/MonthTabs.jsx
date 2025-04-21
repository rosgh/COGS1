import React from "react";

const MonthTabs = ({ current, onChange }) => {
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  return (
    <div className="flex gap-2 flex-wrap">
      {months.map(m => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`px-3 py-1 rounded-lg border ${
            current === m ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
};

export default MonthTabs;
