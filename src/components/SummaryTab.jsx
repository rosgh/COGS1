import React from 'react';

export default function SummaryTab({ data }) {
  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4">집계</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
