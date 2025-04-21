import React from "react";

const CategoryTabs = ({ current, onChange }) => {
  const categories = ["치약", "칫솔", "구강청결제", "기타", "집계"];
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map(c => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-3 py-1 rounded-lg border ${
            current === c ? "bg-green-600 text-white" : "bg-gray-100"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
