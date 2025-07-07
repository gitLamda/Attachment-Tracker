// src/pages/StoragePage.jsx

import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import StorageTable from "../components/StorageTable";
import StorageChart from "../components/StorageChart";

function StoragePage() {
  const [storageData, setStorageData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "scans"), (snapshot) => {
      const scans = snapshot.docs.map((doc) => doc.data());

      // Get only latest "Out" entries per barcode
      const latestMap = new Map();
      scans.forEach((scan) => {
        const existing = latestMap.get(scan.id);
        const t = scan.timestamp?.seconds || 0;
        const et = existing?.timestamp?.seconds || 0;
        if (!existing || t > et) {
          latestMap.set(scan.id, scan);
        }
      });

      const onlyStorage = Array.from(latestMap.values()).filter(
        (s) => s.status === "Out"
      );
      setStorageData(onlyStorage);
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <h1>📦 Storage Summary</h1>
      <StorageChart data={storageData} />
      <StorageTable data={storageData} />
    </div>
  );
}

export default StoragePage;
