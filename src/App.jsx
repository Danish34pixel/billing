import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Bill from "./Components/Bill";

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

  // Auth state
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleSignupSuccess = () => {
    window.location.href = "/login";
  };
  const handleLoginSuccess = (tok) => {
    setToken(tok);
    localStorage.setItem("token", tok);
    window.location.href = "/bills";
  };
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Routing
  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={<Signup onSuccess={handleSignupSuccess} />}
        />
        <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
        <Route
          path="/bills"
          element={
            token ? (
              <Bill handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/bills" : "/signup"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
