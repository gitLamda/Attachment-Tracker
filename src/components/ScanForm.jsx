import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { MODULES, CUSTOMERS, STORAGE_UNITS } from "../utils/constents";

function ScanForm() {
  const [form, setForm] = useState({
    module: "", style: "", customer: "", storage_unit: "", status: "In", id: ""
  });
  const [bulkMode, setBulkMode] = useState(true);
  const [bulkId, setBulkId] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id) return;
    const newScan = {
      ...form,
      id: form.id,
      timestamp: Timestamp.now()
    };
    await addDoc(collection(db, "scans"), newScan);
    setForm({ ...form, id: "" }); // clear only barcode for defect/storage
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    if (!bulkId) return;
    const newScan = {
      ...form,
      id: bulkId,
      timestamp: Timestamp.now()
    };
    await addDoc(collection(db, "scans"), newScan);
    setBulkId("");
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
        <select name="module" value={form.module} onChange={handleChange}>
          <option value="">Select Module</option>
          {MODULES.map((mod) => <option key={mod} value={mod}>{mod}</option>)}
        </select>

        <input
          name="style"
          placeholder="Style"
          value={form.style}
          onChange={handleChange}
        />

        <select name="customer" value={form.customer} onChange={handleChange}>
          <option value="">Select Customer</option>
          {CUSTOMERS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select name="storage_unit" value={form.storage_unit} onChange={handleChange}>
          <option value="">Select Storage</option>
          {STORAGE_UNITS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="In">In</option>
          <option value="Out">Out (Storage)</option>
          <option value="Defective">Defective</option>
        </select>

        <input
          name="id"
          placeholder="Scan Barcode"
          value={bulkMode ? bulkId : form.id}
          onChange={(e) => bulkMode ? setBulkId(e.target.value) : handleChange(e)}
        />

        <button type="submit">{bulkMode ? "➕ Add Scan" : "📤 Submit"}</button>
      </form>
    </div>
  );
}

export default ScanForm;
