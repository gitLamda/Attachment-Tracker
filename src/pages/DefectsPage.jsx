// src/pages/DefectsPage.jsx

import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot, addDoc, Timestamp } from "firebase/firestore";
import DefectsTable from "../components/DefectsTable";
import DefectsChart from "../components/DefectsChart";

function DefectsPage() {
  const [defects, setDefects] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "scans"), (snap) => {
      const all = snap.docs.map((doc) => doc.data());

      const latestMap = new Map();
      all.forEach((scan) => {
        const prev = latestMap.get(scan.id);
        const t = scan.timestamp?.seconds || 0;
        const pt = prev?.timestamp?.seconds || 0;
        if (!prev || t > pt) {
          latestMap.set(scan.id, scan);
        }
      });

      const defective = Array.from(latestMap.values()).filter(
        (item) => item.status === "Defective"
      );

      setDefects(defective);
    });

    return () => unsub();
  }, []);

  const resolveDefect = async (item, newId, storage_unit) => {
    await addDoc(collection(db, "scans"), {
      ...item,
      id: newId,
      storage_unit,
      status: "Out", // ✅ Moved to storage
      timestamp: Timestamp.now(),
    });
    alert(
      `Defect ${item.id} resolved! New barcode: ${newId} moved to ${storage_unit}`
    );
  };

  return (
    <div>
      <h1>🛠️ Defective Attachments</h1>
      <DefectsChart data={defects} />
      <DefectsTable data={defects} onResolve={resolveDefect} />
    </div>
  );
}

export default DefectsPage;
