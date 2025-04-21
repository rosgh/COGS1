import React from "react";

const SaveButton = ({ data }) => {
  const handleSave = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cost-data.json";
    a.click();
  };

  return (
    <div className="mt-4">
      <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow">
        저장하기
      </button>
    </div>
  );
};

export default SaveButton;
