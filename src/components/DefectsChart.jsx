import React from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

const COLORS = ["#ff6666", "#66cc66"];

function DefectsChart({ data }) {
  const moduleCounts = {};
  const statusCounts = { InProgress: 0, Resolved: 0 };

  data.forEach(({ module, id }) => {
    moduleCounts[module] = (moduleCounts[module] || 0) + 1;
    if (id.includes("RESOLVED")) {
      statusCounts.Resolved++;
    } else {
      statusCounts.InProgress++;
    }
  });

  const statusData = [
    { name: "Resolved", value: statusCounts.Resolved },
    { name: "In Progress", value: statusCounts.InProgress },
  ];

  const moduleData = Object.entries(moduleCounts).map(([name, value]) => ({ name, value }));

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      <div>
        <h3>Resolved vs In Progress</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {statusData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div>
        <h3>Defects by Module</h3>
        <BarChart width={400} height={300} data={moduleData}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#ff884d" />
        </BarChart>
      </div>
    </div>
  );
}

export default DefectsChart;
