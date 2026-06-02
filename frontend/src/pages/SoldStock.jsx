import React, { useEffect, useState } from "react";
import API from "../api/axios";

function SoldStock() {
  const [stocks, setStocks] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    p_id: "",
    sale_date: "",
    quantity: "",
  });

  useEffect(() => {
    loadStocks();
    loadPurchased();
  }, []);

  const loadStocks = async () => {
    try {
      const res = await API.get("/sold");
      setStocks(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const loadPurchased = async () => {
    try {
      const res = await API.get("/purchased");
      setPurchased(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.p_id) return setError("Select stock");
    if (!form.sale_date) return setError("Select date");
    if (!form.quantity || Number(form.quantity) <= 0)
      return setError("Invalid quantity");

    try {
      await API.post("/sold", {
        p_id: Number(form.p_id),
        sale_date: form.sale_date,
        quantity: Number(form.quantity),
      });

      loadStocks();

      setForm({
        p_id: "",
        sale_date: "",
        quantity: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error selling stock");
    }
  };

  const deleteStock = async (id) => {
    await API.delete(`/sold/${id}`);
    loadStocks();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sold Stock</h1>

      {error && (
        <div className="bg-red-200 text-red-700 p-2 mb-3 rounded">
          {error}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid gap-3 mb-6 bg-white p-4 rounded shadow">

        <select
          name="p_id"
          value={form.p_id}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Select Stock</option>
          {purchased.map((p) => (
            <option key={p.p_id} value={p.p_id}>
              {p.stock_name} (Qty: {p.quantity})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="sale_date"
          value={form.sale_date}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <button className="bg-green-600 text-white p-2 rounded">
          Sell Stock
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2">Stock</th>
              <th className="p-2">Date</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {stocks.map((s) => (
              <tr key={s.s_id} className="text-center border-b">
                <td className="p-2">{s.stock_name}</td>
                <td className="p-2">{s.sale_date?.split("T")[0]}</td>
                <td className="p-2">{s.quantity}</td>
                <td className="p-2">{s.amount}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteStock(s.s_id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SoldStock;