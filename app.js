import { parseProductExcel, parsePurchaseExcel, mergeData } from './excelutils.js';
import { saveToLocal, loadFromLocal } from './localstorage.js';

let products = [];
let purchases = [];

document.getElementById('productFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    products = await parseProductExcel(file);
    renderTable();
  }
});

document.getElementById('purchaseFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    purchases = await parsePurchaseExcel(file);
    renderTable();
  }
});

document.getElementById('saveBtn').addEventListener('click', () => {
  saveToLocal({ products, purchases });
  alert('✅ 데이터가 저장되었습니다.');
});

function renderTable() {
  const tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';

  const data = mergeData(products, purchases);

  data.forEach(row => {
    const tr = document.createElement('tr');
    ['month', 'category', 'name', 'start', 'in', 'out', 'end'].forEach(key => {
      const td = document.createElement('td');
      td.textContent = row[key] || '';
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}

// 초기 데이터 불러오기
window.addEventListener('DOMContentLoaded', () => {
  const saved = loadFromLocal();
  if (saved) {
    products = saved.products || [];
    purchases = saved.purchases || [];
    renderTable();
  }
});
