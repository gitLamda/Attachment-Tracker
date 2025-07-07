import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

import DashboardTable from "../components/DashboardTable";
import ChartsDashboard from "../components/ChartsDashboard";
import { aggregateAttachments } from "../utils/helpers";

function Dashboard() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "scans"), (snapshot) => {
      const scans = snapshot.docs.map(doc => doc.data());
      setData(scans);

      // ✅ Group by ID and get latest scan
      const latestMap = new Map();
      scans.forEach((scan) => {
        const existing = latestMap.get(scan.id);
        const scanTime = scan.timestamp?.seconds || 0;
        const existingTime = existing?.timestamp?.seconds || 0;

        if (!existing || scanTime > existingTime) {
          latestMap.set(scan.id, scan);
        }
      });

      // ✅ Only use attachments still "In"
      const inUseAttachments = Array.from(latestMap.values()).filter(
        (scan) => scan.status === "In"
      );

      setSummary(aggregateAttachments(inUseAttachments));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>📊 Attachment Dashboard</h1>
      <DashboardTable summaryData={summary} />
      <h2>Charts</h2>
      <ChartsDashboard data={data} />
    </div>
  );
}

export default Dashboard;
