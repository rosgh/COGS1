export async function parseProductExcel(file) {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json(sheet);
  return json.map(row => ({
    name: row['품목명'],
    category: row['제품군']
  }));
}

export async function parsePurchaseExcel(file) {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json(sheet);
  return json.map(row => ({
    month: row['월'],
    name: row['품목명'],
    start: row['기초'],
    in: row['입고'],
    out: row['출고'],
    end: row['기말']
  }));
}

export function mergeData(products, purchases) {
  return purchases.map(p => {
    const product = products.find(pr => pr.name === p.name) || {};
    return {
      ...p,
      category: product.category || '미분류'
    };
  });
}
