import React from "react";
import { attachmentTypes } from "../utils/data";

function DashboardTable({ summaryData }) {
  return (
    <table className="summary-table">
      <thead>
        <tr>
          <th>Module</th>
          <th>Style</th>
          <th>Customer</th>
          {attachmentTypes.map(type => <th key={type}>{type}</th>)}
        </tr>
      </thead>
      <tbody>
        {summaryData.map(({ module, style, customer, counts }, idx) => (
          <tr key={idx}>
            <td>{module}</td>
            <td>{style}</td>
            <td>{customer}</td>
            {attachmentTypes.map(type => <td key={type}>{counts[type] || 0}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DashboardTable;
