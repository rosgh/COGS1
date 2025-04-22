import React, { useState } from 'react';
import MonthTabs from './components/MonthTabs';
import CategoryTabs from './components/CategoryTabs';
import ItemTable from './components/ItemTable';
import UploadSection from './components/UploadSection';
import SummaryTab from './components/SummaryTab';
import './index.css';

export default function App() {
  const [month, setMonth] = useState('4월');
  const [category, setCategory] = useState('집계');
  const [data, setData] = useState({});

  return (
    <div className="p-4">
      <MonthTabs month={month} setMonth={setMonth} />
      <CategoryTabs category={category} setCategory={setCategory} />
      <UploadSection setData={setData} />
      {category === '집계' ? (
        <SummaryTab data={data} />
      ) : (
        <ItemTable
          month={month}
          category={category}
          data={data}
          setData={setData}
        />
      )}
    </div>
  );
}
