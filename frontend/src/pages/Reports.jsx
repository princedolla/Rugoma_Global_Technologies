import React, { useEffect, useState } from "react";
import API from "../api/axios";

function Reports() {

  const [summary, setSummary] = useState({
    totalPurchased: 0,
    totalSold: 0,
    purchaseAmount: 0,
    salesAmount: 0,
  });
  useEffect(() => {
    loadSummary();
  }, []);
  const loadSummary = async () => {
    const response = await API.get("/reports/summary");
    setSummary(response.data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      <div className="grid md:grid-cols-4 gap-5">
        {/* PURCHASED STOCK */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-lg">Purchased Stock</h2>
          <h1 className="text-3xl font-bold text-blue-600 mt-3"> {summary.totalPurchased} </h1>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-lg">Sold Stock</h2>
          <h1 className="text-3xl font-bold text-green-600 mt-3">{summary.totalSold}</h1>
        </div>

        {/* PURCHASE AMOUNT */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-lg">Purchase Amount</h2>
          <h1 className="text-3xl font-bold text-orange-600 mt-3"> {summary.purchaseAmount}</h1>
        </div>

        {/* SALES AMOUNT */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-lg">Sales Amount</h2>
          <h1 className="text-3xl font-bold text-purple-600 mt-3">{summary.salesAmount}</h1>
        </div>
      </div>
    </div>
  );
}

export default Reports;