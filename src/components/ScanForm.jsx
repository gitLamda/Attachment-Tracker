import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { MODULES, CUSTOMERS, STORAGE_UNITS } from "../utils/constents";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function ScanForm() {
  const [form, setForm] = useState({
    module: "",
    style: "",
    customer: "",
    storage_unit: "",
    status: "In",
    id: "",
  });
  const [bulkMode, setBulkMode] = useState(true);
  const [bulkId, setBulkId] = useState("");

  // Scanner toggle state
  const [scanning, setScanning] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    const barcode = form.id.trim();
    if (!barcode) return alert("Please enter or scan a barcode.");
    const newScan = {
      ...form,
      id: barcode,
      timestamp: Timestamp.now(),
    };
    await addDoc(collection(db, "scans"), newScan);
    setForm({ ...form, id: "" }); // clear barcode input after submit
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    const barcode = bulkId.trim();
    if (!barcode) return alert("Please enter or scan a barcode.");
    const newScan = {
      ...form,
      id: barcode,
      timestamp: Timestamp.now(),
    };
    await addDoc(collection(db, "scans"), newScan);
    setBulkId(""); // clear barcode input after submit
  };

  // Handle barcode detected from scanner
  const handleDetected = (scannedCode) => {
    if (!scannedCode) return;
    if (bulkMode) {
      setBulkId(scannedCode);
    } else {
      setForm((prev) => ({ ...prev, id: scannedCode }));
    }
    setScanning(false); // Stop scanning after successful scan
  };

  return (
    <div className="scan-form">
      <h3>📷 Attachment Scanner</h3>

      <label>
        <input
          type="checkbox"
          checked={bulkMode}
          onChange={() => setBulkMode(!bulkMode)}
        />
        Enable Bulk Scan (Module Intake)
      </label>

      <form onSubmit={bulkMode ? handleBulkSubmit : handleSingleSubmit}>
        <select
          name="module"
          value={form.module}
          onChange={handleChange}
          required
        >
          <option value="">Select Module</option>
          {MODULES.map((mod) => (
            <option key={mod} value={mod}>
              {mod}
            </option>
          ))}
        </select>

        <input
          name="style"
          placeholder="Style"
          value={form.style}
          onChange={handleChange}
          required
        />

        <select
          name="customer"
          value={form.customer}
          onChange={handleChange}
          required
        >
          <option value="">Select Customer</option>
          {CUSTOMERS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          name="storage_unit"
          value={form.storage_unit}
          onChange={handleChange}
          disabled={bulkMode} // Disable storage unit select in bulk mode
          required={!bulkMode}
        >
          <option value="">Select Storage</option>
          {STORAGE_UNITS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          disabled={bulkMode} // Bulk scan always status In
        >
          <option value="In">In</option>
          <option value="Out">Out (Storage)</option>
          <option value="Defective">Defective</option>
        </select>

        {/* Barcode Input */}
        <input
          name="id"
          placeholder="Scan Barcode"
          value={bulkMode ? bulkId : form.id}
          onChange={(e) =>
            bulkMode ? setBulkId(e.target.value) : handleChange(e)
          }
          required
        />

        <button type="submit">{bulkMode ? "➕ Add Scan" : "📤 Submit"}</button>
      </form>

      {/* Scanner Toggle */}
      <button
        style={{ marginTop: "1rem" }}
        onClick={() => setScanning((prev) => !prev)}
      >
        {scanning ? "Stop Scanning" : "Start Camera Scan"}
      </button>

      {/* Scanner Component */}
      {scanning && (
        <div style={{ marginTop: "1rem", maxWidth: 400 }}>
          <BarcodeScannerComponent
            onUpdate={(err, result) => {
              if (result) {
                handleDetected(result.text);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ScanForm;
