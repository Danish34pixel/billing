import React, { useState } from "react";

const OtpVerification = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(
        "https://companybackend-nu9b.onrender.com/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Account verified! You can now log in.");
        if (onVerified) onVerified();
      } else {
        setMessage(data.message || "OTP verification failed");
      }
    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <form
      onSubmit={handleVerify}
      style={{ maxWidth: 300, margin: "2rem auto" }}
    >
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <button type="submit" style={{ width: "100%" }}>
        Verify
      </button>
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </form>
  );
};

export default OtpVerification;
