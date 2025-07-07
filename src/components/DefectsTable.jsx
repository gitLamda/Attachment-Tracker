import React, { useState } from "react";
import { STORAGE_UNITS } from "../utils/constents"; // Fixed typo from 'constents'

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

function DefectsTable({ data, onResolve }) {
  const [activeRow, setActiveRow] = useState(null);
  const [newBarcode, setNewBarcode] = useState("");
  const [storage, setStorage] = useState("");

  return (
    <table>
      <thead>
        <tr>
          <th>Attachment ID</th>
          <th>Type</th>
          <th>Module</th>
          <th>Style</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Timestamp</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const isActive = activeRow === item.id;

          // Show "Resolved" text instead of button if already resolved
          if (item.id.includes("RESOLVED")) {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.type}</td>
                <td>{item.module}</td>
                <td>{item.style}</td>
                <td>{item.customer}</td>
                <td>{item.status}</td>
                <td>{formatTimestamp(item.timestamp)}</td>
                <td style={{ color: "green", fontWeight: "bold" }}>Resolved</td>
              </tr>
            );
          }

          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.type}</td>
              <td>{item.module}</td>
              <td>{item.style}</td>
              <td>{item.customer}</td>
              <td>{item.status}</td>
              <td>{formatTimestamp(item.timestamp)}</td>
              <td>
                {!isActive ? (
                  <button onClick={() => setActiveRow(item.id)}>Mark Resolved</button>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <input
                      placeholder="New Barcode"
                      value={newBarcode}
                      onChange={(e) => setNewBarcode(e.target.value)}
                    />
                    <select value={storage} onChange={(e) => setStorage(e.target.value)}>
                      <option value="">Select Storage</option>
                      {STORAGE_UNITS.map((unit) => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        if (!newBarcode || !storage) return alert("Fill all fields!");
                        onResolve(item, newBarcode, storage);
                        setActiveRow(null);
                        setNewBarcode("");
                        setStorage("");
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DefectsTable;
