import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF3366"];

function ChartsDashboard({ data }) {
  // Prepare data
  const custDataRaw = {};
  const moduleDataRaw = {};
  let defectiveCount = 0;
  let inStorageCount = 0;

  data.forEach(({ customer, module, status }) => {
    if (status === "In") {
      custDataRaw[customer] = (custDataRaw[customer] || 0) + 1;
      moduleDataRaw[module] = (moduleDataRaw[module] || 0) + 1;
    } else if (status === "Defective") {
      defectiveCount++;
    } else if (status === "Out") {
      inStorageCount++;
    }
  });

  const custData = Object.entries(custDataRaw).map(([name, val]) => ({ name, val }));
  const moduleData = Object.entries(moduleDataRaw).map(([name, val]) => ({ name, val }));
  const statusData = [
    { name: "Defective", value: defectiveCount },
    { name: "In Storage", value: inStorageCount },
  ];

  return (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      {/* Customer-wise Bar Chart */}
      <div style={{ flex: 1, minWidth: 300 }}>
        <h3>Attachments by Customer (In Use)</h3>
        <BarChart width={400} height={300} data={custData}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="val" fill="#0077cc" />
        </BarChart>
      </div>

      {/* Module-wise Bar Chart */}
      <div style={{ flex: 1, minWidth: 300 }}>
        <h3>Attachments by Module (In Use)</h3>
        <BarChart width={400} height={300} data={moduleData}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="val" fill="#00cc77" />
        </BarChart>
      </div>

      {/* Defective vs In Storage Pie Chart */}
      <div style={{ flex: 1, minWidth: 300 }}>
        <h3>Defective vs In Storage</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

export default ChartsDashboard;
