import React from 'react';

export default function CategoryTabs({ category, setCategory }) {
  const categories = ['세제', '화장품', '건강식품', '치약', '집계'];

  return (
    <div className="flex gap-2 mb-4">
      {categories.map(c => (
        <button
          key={c}
          onClick={() => setCategory(c)}
          className={`px-4 py-2 rounded ${category === c ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
