import React, { useEffect, useState } from "react";
import API from "../api/axios";

function PurchasedStock() {
  const [stocks, setStocks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    stock_name: "",
    purchase_date: "",
    quantity: "",
    amount: "",
  });

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    const res = await API.get("/purchased");
    setStocks(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getToday = () => new Date().toISOString().split("T")[0];

  // VALIDATION
  const validate = () => {
    let err = {};
    const today = getToday();

    if (!form.stock_name) err.stock_name = "Stock name is required";

    if (!form.purchase_date)
      err.purchase_date = "Purchase date is required";
    else if (form.purchase_date !== today)
      err.purchase_date = "Only TODAY is allowed";

    if (!form.quantity || form.quantity <= 0)
      err.quantity = "Quantity must be greater than 0";

    if (!form.amount || form.amount <= 0)
      err.amount = "Amount must be greater than 0";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editId) {
      await API.put(`/purchased/${editId}`, form);
    } else {
      await API.post("/purchased", form);
    }

    loadStocks();

    setForm({
      stock_name: "",
      purchase_date: "",
      quantity: "",
      amount: "",
    });

    setEditId(null);
    setErrors({});
  };

  const deleteStock = async (id) => {
    await API.delete(`/purchased/${id}`);
    loadStocks();
  };

  const editStock = (item) => {
    setEditId(item.p_id);
    setForm({
      stock_name: item.stock_name,
      purchase_date: item.purchase_date.split("T")[0],
      quantity: item.quantity,
      amount: item.amount,
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Purchased Stock
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow grid md:grid-cols-4 gap-4 mb-6"
      >
        <div>
          <input
            name="stock_name"
            placeholder="Stock Name"
            className="border p-3 w-full rounded-lg"
            value={form.stock_name}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm">{errors.stock_name}</p>
        </div>

        <div>
          <input
            type="date"
            name="purchase_date"
            className="border p-3 w-full rounded-lg"
            value={form.purchase_date}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm">{errors.purchase_date}</p>
        </div>

        <div>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="border p-3 w-full rounded-lg"
            value={form.quantity}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm">{errors.quantity}</p>
        </div>

        <div>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="border p-3 w-full rounded-lg"
            value={form.amount}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm">{errors.amount}</p>
        </div>

        <button className="bg-blue-600 text-white p-3 rounded-lg md:col-span-4">
          {editId ? "Update Stock" : "Add Stock (Today Only)"}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Stock</th>
              <th className="p-3">Date</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {stocks.map((s) => (
              <tr key={s.p_id} className="text-center border-b">
                <td className="p-3">{s.stock_name}</td>
                <td className="p-3">{s.purchase_date.split("T")[0]}</td>
                <td className="p-3">{s.quantity}</td>
                <td className="p-3">{s.amount}</td>

                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => editStock(s)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStock(s.p_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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

export default PurchasedStock;