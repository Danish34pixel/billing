import React, { useState } from "react";
import { Trash2, Plus, FileDown, Building2, Phone, Mail } from "lucide-react";

const App = () => {
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [item, setItem] = useState("");
  const [hsn, setHsn] = useState("");
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState("PCS");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);

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

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subTotal = items.reduce((s, i) => s + i.amount, 0);
  const cgst = subTotal * 0.09;
  const sgst = subTotal * 0.09;
  const grandTotal = subTotal + cgst + sgst;

  const generatePDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* FORM SECTION */}
      <div className="print:hidden max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden backdrop-blur-sm">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                <Building2 className="w-8 h-8" />
                Create New Estimate
              </h2>
              <p className="text-blue-100 text-sm">
                Fill in the details to generate a professional estimate
              </p>
            </div>
          </div>

          <div className="p-8">
            {/* Customer Details */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                Customer Information
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Customer Name *
                  </label>
                  <input
                    className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-slate-300 bg-slate-50 focus:bg-white"
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-slate-300 bg-slate-50 focus:bg-white"
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Item Entry */}
            <div className="border-t-2 border-slate-100 pt-8">
              <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                Add Items
              </h3>
              <div className="grid md:grid-cols-12 gap-3 mb-4">
                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Item Name *
                  </label>
                  <input
                    className="w-full border-2 border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-slate-300 bg-slate-50 focus:bg-white"
                    placeholder="Item description"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    HSN Code
                  </label>
                  <input
                    className="w-full border-2 border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-slate-300 bg-slate-50 focus:bg-white"
                    placeholder="HSN"
                    value={hsn}
                    onChange={(e) => setHsn(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Quantity *
                  </label>
                  <input
                    className="w-full border-2 border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-slate-300 bg-slate-50 focus:bg-white"
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Unit
                  </label>
                  <input
                    className="w-full border-2 border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-slate-300 bg-slate-50 focus:bg-white"
                    placeholder="PCS"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    className="w-full border-2 border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-slate-300 bg-slate-50 focus:bg-white"
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
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Items Preview */}
            {items.length > 0 && (
              <div className="mt-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border-2 border-slate-200">
                <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  Added Items ({items.length})
                </h3>
                <div className="space-y-2">
                  {items.map((i, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 flex items-center justify-between border-2 border-slate-100 hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">{i.item}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {i.qty} {i.unit} × ₹{i.price.toFixed(2)} ={" "}
                          <span className="font-semibold text-indigo-600">
                            ₹{i.amount.toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => deleteItem(idx)}
                        className="text-red-500 hover:text-white hover:bg-red-500 p-2.5 rounded-xl transition-all"
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
              className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white px-12 py-5 rounded-2xl font-bold shadow-2xl hover:shadow-green-500/50 transition-all flex items-center gap-3 mx-auto text-lg transform hover:scale-105"
            >
              <FileDown className="w-6 h-6" />
              Generate PDF Estimate
            </button>
          </div>
        )}
      </div>

      {/* INVOICE PREVIEW/PRINT */}
      {items.length > 0 && customerName && mobile && (
        <div className="print:block hidden">
          <div
            id="invoice"
            className="bg-white max-w-4xl mx-auto p-12 shadow-2xl"
          >
            {/* Header */}
            <div className="text-center border-b-4 border-indigo-600 pb-6 mb-6">
              <h1 className="text-4xl font-bold text-indigo-900 tracking-tight mb-3">
                SARVODAYA INTERIOR
              </h1>
              <div className="text-sm text-slate-600 space-y-1 max-w-3xl mx-auto">
                <p className="font-medium">
                  📍 1. Infront of Post Office High Plaza Dukan No 1, Nowgong,
                  Distt Chhatarpur (M.P)
                </p>
                <p className="font-medium">
                  📍 2. Infront of Police Station B.K Marriage House Dukan No 3,
                  Harpalpur, Distt Chhatarpur
                </p>
                <div className="flex items-center justify-center gap-6 mt-3 text-indigo-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    7753077270, 7869687315
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    sarvodayainterior1@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* Document Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 bg-slate-100 inline-block px-8 py-2 rounded-lg">
                ESTIMATE
              </h2>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-700 mb-2 text-xs uppercase tracking-wide">
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
                <h3 className="font-semibold text-indigo-700 mb-2 text-xs uppercase tracking-wide">
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
              </div>
            </div>

            {/* Table */}
            <table className="w-full mb-6 text-sm border-collapse">
              <thead>
                <tr className="bg-indigo-700 text-white">
                  <th className="border border-indigo-600 p-3 text-center w-12">
                    #
                  </th>
                  <th className="border border-indigo-600 p-3 text-left">
                    Item Description
                  </th>
                  <th className="border border-indigo-600 p-3 text-center w-24">
                    HSN
                  </th>
                  <th className="border border-indigo-600 p-3 text-center w-20">
                    Qty
                  </th>
                  <th className="border border-indigo-600 p-3 text-right w-28">
                    Rate (₹)
                  </th>
                  <th className="border border-indigo-600 p-3 text-right w-32">
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

            {/* Totals */}
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
                  <div className="flex justify-between text-lg font-bold text-indigo-900 pt-2">
                    <span>Grand Total:</span>
                    <span>₹ {grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Signature */}
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

      {/* Print Styles */}
      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          @page { margin: 0.5cm; }
        }
      `}</style>
    </div>
  );
};

export default App;
