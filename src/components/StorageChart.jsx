// src/components/StorageChart.jsx

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function StorageChart({ data }) {
  const storageCounts = {};

  data.forEach(({ storage_unit }) => {
    if (!storage_unit) return;
    storageCounts[storage_unit] = (storageCounts[storage_unit] || 0) + 1;
  });

  const chartData = Object.entries(storageCounts).map(([unit, count]) => ({
    name: unit,
    count,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>📊 Attachments per Storage Unit</h3>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3399ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StorageChart;
