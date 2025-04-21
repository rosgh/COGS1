import React from "react";
import * as XLSX from "xlsx";

const FileUpload = ({ setItems, category }) => {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target.result, { type: "binary" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const newItems = rows.slice(1).map(r => r[0]).filter(Boolean).sort();

      setItems(prev => ({
        ...prev,
        [category]: newItems.reduce((acc, item) => {
          acc[item] = acc[item] || {};
          return acc;
        }, prev[category] || {})
      }));
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <label className="block mb-2 font-semibold">품목 리스트 업로드</label>
      <input type="file" accept=".xlsx, .xls" onChange={handleUpload} />
    </div>
  );
};

export default FileUpload;
