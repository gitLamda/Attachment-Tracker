import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

import AttachmentTable from "../components/AttachmentTable";
import FilterBar from "../components/FilterBar";
import ScanForm from "../components/ScanForm";

function ScannerPage() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ module: "", style: "", status: "", allData: [] });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "scans"), (snapshot) => {
      const scans = snapshot.docs.map(doc => doc.data());
      setData(scans);
      setFilters((prev) => ({ ...prev, allData: scans }));
    });
    return () => unsubscribe();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = data.filter((item) =>
    (!filters.module || item.module === filters.module) &&
    (!filters.style || item.style === filters.style) &&
    (!filters.status || item.status === filters.status)
  );

  return (
    <div>
      <h1>📦 Attachment Scanner</h1>
      <ScanForm />
      <FilterBar filters={{ ...filters, allData: data }} onChange={handleFilterChange} />
      <AttachmentTable data={filteredData} />
    </div>
  );
}

export default ScannerPage;
