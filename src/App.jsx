import React, { useState } from "react";
import MonthTabs from "./components/MonthTabs";
import CategoryTabs from "./components/CategoryTabs";
import FileUpload from "./components/FileUpload";
import DataTable from "./components/DataTable";
import SummaryTable from "./components/SummaryTable";
import SaveButton from "./components/SaveButton";

function App() {
  const [month, setMonth] = useState("4월");
  const [category, setCategory] = useState("집계");
  const [items, setItems] = useState({});

  return (
    <div className="p-4 space-y-4 max-w-screen-xl mx-auto">
      <MonthTabs current={month} onChange={setMonth} />
      <CategoryTabs current={category} onChange={setCategory} />
      <FileUpload setItems={setItems} category={category} />
      <DataTable month={month} category={category} items={items} setItems={setItems} />
      <SummaryTable category={category} items={items} />
      <SaveButton data={items} />
    </div>
  );
}

export default App;
