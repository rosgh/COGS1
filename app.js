document.querySelector("#itemFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  readExcel(file, (data) => {
    itemList = data;
    alert("✅ 품목 리스트 업로드 완료");
  });
});

document.querySelector("#purchaseFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  readExcel(file, (data) => {
    purchaseList = data;
    processData();
  });
});

document.querySelector("#saveButton").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(resultData, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "원가데이터.json";
  a.click();
});
