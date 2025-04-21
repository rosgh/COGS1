let itemList = [];
let purchaseList = [];
let resultData = [];

function processData() {
  const result = {};
  purchaseList.forEach(entry => {
    const key = `${entry.월}-${entry.제품군}-${entry.품목명}`;
    if (!result[key]) {
      result[key] = { 월: entry.월, 제품군: entry.제품군, 품목명: entry.품목명, 기초: 0, 입고: 0, 출고: 0 };
    }
    result[key].입고 += Number(entry.입고 || 0);
    result[key].출고 += Number(entry.출고 || 0);
  });

  Object.values(result).forEach(r => {
    r.기말 = r.기초 + r.입고 - r.출고;
  });

  resultData = Object.values(result);
  renderTable();
}

function renderTable() {
  const tbody = document.querySelector("#resultTable tbody");
  tbody.innerHTML = "";
  resultData.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.월}</td>
      <td>${row.제품군}</td>
      <td>${row.품목명}</td>
      <td>${row.기초}</td>
      <td>${row.입고}</td>
      <td>${row.출고}</td>
      <td>${row.기말}</td>
    `;
    tbody.appendChild(tr);
  });
}
