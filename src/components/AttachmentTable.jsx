import React, { useState } from "react";

function formatTimestamp(ts) {
  try {
    return ts?.toDate?.().toLocaleString("en-GB", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  } catch {
    return "Invalid";
  }
}

function AttachmentTable({ data }) {
  const [barcodeFilter, setBarcodeFilter] = useState("");
  const [startDate, setStartDate] = useState("");

  const filtered = data.filter((item) => {
    const matchBarcode = item.id.toLowerCase().includes(barcodeFilter.toLowerCase());
    const matchDate = startDate
      ? new Date(item.timestamp?.toDate?.()) >= new Date(startDate)
      : true;
    return matchBarcode && matchDate;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search Barcode"
          value={barcodeFilter}
          onChange={(e) => setBarcodeFilter(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Attachment ID</th>
            <th>Module</th>
            <th>Style</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Storage Unit</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id + item.timestamp?.seconds}>
              <td>{item.id}</td>
              <td>{item.module}</td>
              <td>{item.style}</td>
              <td>{item.customer}</td>
              <td>{item.status}</td>
              <td>{item.storage_unit || "-"}</td>
              <td>{formatTimestamp(item.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttachmentTable;
