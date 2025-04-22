import React from 'react';
import { parseExcelFile } from '../utils/formatExcel';

export default function UploadSection({ setData }) {
  const handleUpload = async e => {
    const file = e.target.files[0];
    const result = await parseExcelFile(file);
    setData(result);
  };

  return (
    <div className="mb-4">
      <input type="file" onChange={handleUpload} />
    </div>
  );
}
