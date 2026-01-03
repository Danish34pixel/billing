import React, { useState } from "react";
import { Trash2, Plus, FileDown, Phone, Mail } from "lucide-react";

const Bill = ({ handleLogout }) => {
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [item, setItem] = useState("");
  const [hsn, setHsn] = useState("");
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState("PCS");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);
  const [generatedAt, setGeneratedAt] = useState(null);

  const addItem = () => {
    if (!item || !price) return;

    const qtyNum = Number(qty);
    const priceNum = Number(price);

    setItems([
      ...items,
      {
        item,
        hsn,
        qty: qtyNum,
        unit,
        price: priceNum,
        amount: qtyNum * priceNum,
      },
    ]);

    setItem("");
    setHsn("");
    setQty(1);
    setUnit("PCS");
    setPrice("");
  };

  const deleteItem = (index) => setItems(items.filter((_, i) => i !== index));

  const subTotal = items.reduce((s, i) => s + i.amount, 0);
  const cgst = subTotal * 0.09;
  const sgst = subTotal * 0.09;
  const grandTotal = subTotal + cgst + sgst;

  const generatePDF = () => {
    const now = new Date();
    setGeneratedAt(now);
    // give React a moment to update DOM before opening print dialog
    // also save bill to backend (best-effort)
    saveBill({
      customerName,
      mobile,
      items,
      subTotal,
      cgst,
      sgst,
      grandTotal,
      generatedAt: now,
    }).finally(() => setTimeout(() => window.print(), 160));
  };

  const saveBill = async (bill) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://companybackend-nu9b.onrender.com/api/bills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(bill),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Save bill failed:", res.status, data);
      } else {
        const data = await res.json();
        console.log("Bill saved:", data.bill?._id || data.bill);
      }
    } catch (err) {
      console.error("Save bill error:", err);
    }
  };

  return (
    <>
      {/* Logout Button */}
      <div className="print:hidden fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-rose-950 to-stone-900 text-amber-200 px-6 py-2 rounded-lg font-semibold hover:from-rose-900 hover:to-stone-800 transition-all duration-300 shadow-lg"
        >
          Logout
        </button>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-stone-900 via-rose-950 to-stone-900">
        {/* Form Section */}
        <div className="print:hidden max-w-7xl mx-auto p-6 pt-20">
          {/* Decorative Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-200 to-stone-300 bg-clip-text text-transparent mb-2">
              SARVODAYA INTERIOR
            </h1>
            <p className="text-stone-400 text-sm">
              Professional Estimate Generator
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-amber-100 to-stone-200 p-1 rounded-2xl shadow-2xl">
            <div className="bg-gradient-to-br from-rose-950 to-stone-900 rounded-2xl p-8">
              {/* Customer Information */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-amber-200 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-amber-200 to-stone-300 rounded-full"></div>
                  Customer Information
                </h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-stone-300 text-sm font-semibold mb-2">
                      Customer Name *
                    </label>
                    <input
                      className="w-full bg-stone-900 border border-stone-700 text-stone-200 px-4 py-3 rounded-lg focus:outline-none focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 transition-all placeholder-stone-500"
                      placeholder="Enter customer name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 text-sm font-semibold mb-2">
                      Mobile Number *
                    </label>
                    <input
                      className="w-full bg-stone-900 border border-stone-700 text-stone-200 px-4 py-3 rounded-lg focus:outline-none focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 transition-all placeholder-stone-500"
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Add Items Section */}
              <div className="border-t border-stone-700 pt-8">
                <h3 className="text-2xl font-bold text-amber-200 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-amber-200 to-stone-300 rounded-full"></div>
                  Add Items
                </h3>
                <div className="grid md:grid-cols-12 gap-3 mb-4">
                  <div className="md:col-span-4">
                    <label className="block text-stone-300 text-xs font-semibold mb-2">
                      Item Name *
                    </label>
                    <input
                      className="w-full bg-stone-900 border border-stone-700 text-stone-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 transition-all placeholder-stone-500"
                      placeholder="Item description"
                      value={item}
                      onChange={(e) => setItem(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-stone-300 text-xs font-semibold mb-2">
                      HSN Code
                    </label>
                    <input
                      className="w-full bg-stone-900 border border-stone-700 text-stone-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 transition-all placeholder-stone-500"
                      placeholder="HSN"
                      value={hsn}
                      onChange={(e) => setHsn(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-stone-300 text-xs font-semibold mb-2">
                      Quantity *
                    </label>
                    <input
                      className="w-full bg-stone-900 border border-stone-700 text-stone-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 transition-all"
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-stone-300 text-xs font-semibold mb-2">
                      Unit
                    </label>
                    <input
                      className="w-full bg-stone-900 border border-stone-700 text-stone-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 transition-all placeholder-stone-500"
                      placeholder="PCS"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-stone-300 text-xs font-semibold mb-2">
                      Price (₹) *
                    </label>
                    <input
                      className="w-full bg-stone-900 border border-stone-700 text-stone-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 transition-all placeholder-stone-500"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-1 flex items-end">
                    <button
                      onClick={addItem}
                      className="w-full bg-gradient-to-r from-amber-200 to-stone-300 text-stone-900 px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:from-amber-300 hover:to-stone-400 transform hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Items List */}
              {items.length > 0 && (
                <div className="mt-6 bg-stone-800/50 rounded-xl p-6 border border-stone-700">
                  <h3 className="text-sm font-bold text-amber-200 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-200"></div>
                    Added Items ({items.length})
                  </h3>
                  <div className="space-y-2">
                    {items.map((i, idx) => (
                      <div
                        key={idx}
                        className="bg-stone-900 rounded-lg p-4 flex items-center justify-between border border-stone-700 hover:border-amber-200 transition-all"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-stone-200">
                            {i.item}
                          </p>
                          <p className="text-xs text-stone-400 mt-1">
                            {i.qty} {i.unit} × ₹{i.price.toFixed(2)} ={" "}
                            <span className="font-semibold text-amber-200">
                              ₹{i.amount.toFixed(2)}
                            </span>
                          </p>
                        </div>
                        <button
                          onClick={() => deleteItem(idx)}
                          className="text-red-400 hover:text-white hover:bg-red-500 p-2.5 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Generate PDF Button */}
          {items.length > 0 && customerName && mobile && (
            <div className="mt-8 text-center">
              <button
                onClick={generatePDF}
                className="bg-gradient-to-r from-amber-200 to-stone-300 text-stone-900 px-12 py-5 rounded-2xl font-bold shadow-2xl transition-all flex items-center gap-3 mx-auto text-lg transform hover:scale-105 hover:from-amber-300 hover:to-stone-400"
              >
                <FileDown className="w-6 h-6" />
                Generate PDF Estimate
              </button>
            </div>
          )}
        </div>

        {/* PDF Print Section */}
        {items.length > 0 && customerName && mobile && (
          <div className="print:block hidden">
            <div
              id="invoice"
              className="bg-white max-w-4xl mx-auto p-12 shadow-2xl"
            >
              <div className="text-center pb-6 mb-6 border-b-4 border-rose-900">
                <h1 className="text-4xl font-bold tracking-tight mb-3 text-rose-950">
                  SARVODAYA INTERIOR
                </h1>
                <div className="text-sm text-slate-600 space-y-1 max-w-3xl mx-auto">
                  <p className="font-medium">
                    📍 1. Infront of Post Office High Plaza Dukan No 1, Nowgong,
                    Distt Chhatarpur (M.P)
                  </p>
                  <p className="font-medium">
                    📍 2. Infront of Police Station B.K Marriage House Dukan No
                    3, Harpalpur, Distt Chhatarpur
                  </p>
                  <div className="flex items-center justify-center gap-6 mt-3 font-medium text-rose-900">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" /> 7753077270, 7869687315
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" /> sarvodayainterior1@gmail.com
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 bg-slate-100 inline-block px-8 py-2 rounded-lg">
                  ESTIMATE
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-xs uppercase tracking-wide text-rose-900">
                    Estimate For:
                  </h3>
                  <p className="font-bold text-slate-900 text-lg">
                    {customerName}
                  </p>
                  <p className="text-slate-600 mt-1">
                    <span className="font-medium">Mobile:</span> {mobile}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-right">
                  <h3 className="font-semibold mb-2 text-xs uppercase tracking-wide text-rose-900">
                    Document Details:
                  </h3>
                  <p className="text-slate-600">
                    <span className="font-medium">Estimate No:</span>{" "}
                    <span className="font-bold text-slate-900">
                      EST-{String(Math.floor(Math.random() * 900000) + 100000)}
                    </span>
                  </p>
                  <p className="text-slate-600 mt-1">
                    <span className="font-medium">Date:</span>{" "}
                    <span className="font-bold text-slate-900">
                      {new Date().toLocaleDateString("en-GB")}
                    </span>
                  </p>
                  <p className="text-slate-600 mt-1">
                    <span className="font-medium">Generated:</span>{" "}
                    <span className="font-bold text-slate-900">
                      {(generatedAt || new Date()).toLocaleString("en-GB", {
                        hour12: false,
                      })}
                    </span>
                  </p>
                </div>
              </div>

              <table className="w-full mb-6 text-sm border-collapse">
                <thead>
                  <tr className="text-white bg-rose-950">
                    <th className="border border-rose-900 p-3 text-center w-12">
                      #
                    </th>
                    <th className="border border-rose-900 p-3 text-left">
                      Item Description
                    </th>
                    <th className="border border-rose-900 p-3 text-center w-24">
                      HSN
                    </th>
                    <th className="border border-rose-900 p-3 text-center w-20">
                      Qty
                    </th>
                    <th className="border border-rose-900 p-3 text-right w-28">
                      Rate (₹)
                    </th>
                    <th className="border border-rose-900 p-3 text-right w-32">
                      Amount (₹)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((i, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-3 text-center font-medium text-slate-600">
                        {idx + 1}
                      </td>
                      <td className="border border-slate-300 p-3 font-medium text-slate-800">
                        {i.item}
                      </td>
                      <td className="border border-slate-300 p-3 text-center text-slate-600">
                        {i.hsn || "-"}
                      </td>
                      <td className="border border-slate-300 p-3 text-center text-slate-700">
                        {i.qty} {i.unit}
                      </td>
                      <td className="border border-slate-300 p-3 text-right text-slate-700">
                        {i.price.toFixed(2)}
                      </td>
                      <td className="border border-slate-300 p-3 text-right font-semibold text-slate-900">
                        {i.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mb-12">
                <div className="w-80 bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-slate-700">
                      <span className="font-medium">Subtotal:</span>
                      <span className="font-semibold">
                        ₹ {subTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span className="font-medium">CGST (9%):</span>
                      <span className="font-semibold">₹ {cgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-700 pb-3 border-b-2 border-slate-300">
                      <span className="font-medium">SGST (9%):</span>
                      <span className="font-semibold">₹ {sgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 text-rose-950">
                      <span>Grand Total:</span>
                      <span>₹ {grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-12 pt-6 border-t border-slate-300">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 text-sm">
                    Terms & Conditions:
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• This is an estimate and not a final invoice</li>
                    <li>• Prices are subject to change without notice</li>
                    <li>• Payment terms as discussed</li>
                  </ul>
                </div>
                <div className="text-right">
                  <div className="inline-block">
                    <p className="text-xs text-slate-500 mb-8">
                      Authorized Signatory
                    </p>
                    <div className="border-t-2 border-slate-800 pt-2 w-48">
                      <p className="font-bold text-sm text-slate-800">
                        SARVODAYA INTERIOR
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style>{`@media print { body { margin: 0; padding: 0; } @page { margin: 0.5cm; } }`}</style>
      </div>
    </>
  );
};

export default Bill;
