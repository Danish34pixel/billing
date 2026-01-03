import React, { useState } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

const AuthDemo = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = (tok) => {
    setToken(tok);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setShowLogin(true);
  };

  if (token) {
    return (
      <div style={{ maxWidth: 300, margin: "2rem auto", textAlign: "center" }}>
        <h2>Welcome!</h2>
        <button onClick={handleLogout} style={{ width: "100%" }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 20,
        }}
      >
        <button onClick={() => setShowLogin(true)} disabled={showLogin}>
          Login
        </button>
        <button onClick={() => setShowLogin(false)} disabled={!showLogin}>
          Signup
        </button>
      </div>
      {showLogin ? <Login onLogin={handleLogin} /> : <Signup />}
    </div>
  );
};

export default AuthDemo;
