// src/pages/TestJson.tsx
import React from "react";
import jsonData from "@/data/sat_data.json";

const TestJson = () => {
  return (
    <div className="p-4">
      <h1>📄 JSON 테스트</h1>
      <pre>{JSON.stringify(jsonData[0], null, 2)}</pre>
    </div>
  );
};

export default TestJson;
