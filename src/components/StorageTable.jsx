// src/components/StorageTable.jsx

import React from "react";

function formatTimestamp(ts) {
  try {
    return ts?.toDate?.().toLocaleString("en-GB", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    }) || "N/A";
  } catch {
    return "Invalid";
  }
}

function StorageTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Attachment ID</th>
          <th>Type</th>
          <th>From Module</th>
          <th>Style</th>
          <th>Customer</th>
          <th>Storage Unit</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.type || "-"}</td>
            <td>{item.module}</td>
            <td>{item.style}</td>
            <td>{item.customer}</td>
            <td>{item.storage_unit}</td>
            <td>{formatTimestamp(item.timestamp)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StorageTable;
