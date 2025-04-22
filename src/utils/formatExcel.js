import * as XLSX from 'xlsx';

export async function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      const structured = {};
      json.forEach(row => {
        const { 제품군, 품목 } = row;
        structured[제품군] = structured[제품군] || {};
        structured[제품군]['4월'] = structured[제품군]['4월'] || {};
        structured[제품군]['4월'][품목] = {
          name: 품목,
          기초: {},
          입고: [],
          출고: {},
          기말: {},
        };
      });
      resolve(structured);
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
}
