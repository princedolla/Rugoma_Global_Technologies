import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Cards from "../components/Cards";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalPurchased: 0, totalSold: 0,  purchaseAmount: 0, salesAmount: 0,});

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => { const res = await API.get("/reports/summary");
    setSummary(res.data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-5">
        <Cards title="Purchased Stock" value={summary.totalPurchased} />
        <Cards title="Sold Stock" value={summary.totalSold} />
        <Cards title="Purchase Amount" value={summary.purchaseAmount} />
        <Cards title="Sales Amount" value={summary.salesAmount} />
      </div>
    </div>
  );
}

export default Dashboard;