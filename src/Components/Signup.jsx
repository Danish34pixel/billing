import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ onSuccess }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://companybackend-nu9b.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, email, password }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful! Please login.");
        if (onSuccess) onSuccess();
        // Navigate to login route using react-router
        navigate("/login");
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup request error:", err);
      setMessage(err.message || "Error connecting to server");
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-900 via-rose-950 to-stone-900 p-4">
      <div className="w-full max-w-md">
        {/* Decorative frame */}
        <div className="bg-gradient-to-br from-amber-100 to-stone-200 p-1 rounded-2xl shadow-2xl">
          <div className="bg-gradient-to-br from-rose-950 to-stone-900 rounded-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-200 to-stone-300 bg-clip-text text-transparent mb-2">
                Create Account
              </h2>
              <p className="text-stone-400 text-sm">
                Join us today and get started
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Phone Input */}
              <div>
                <label className="block text-stone-300 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyPress={handleKeyPress}
                  required
                  className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 transition-all duration-300"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-stone-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  required
                  className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 transition-all duration-300"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-stone-300 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  required
                  className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 transition-all duration-300"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-amber-200 to-stone-300 text-stone-900 font-semibold rounded-lg hover:from-amber-300 hover:to-stone-400 focus:outline-none focus:ring-4 focus:ring-amber-200/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>

              {/* Message Display */}
              {message && (
                <div
                  className={`p-3 rounded-lg text-center text-sm ${
                    message.includes("successful")
                      ? "bg-emerald-950 text-emerald-200 border border-emerald-800"
                      : "bg-rose-950 text-rose-200 border border-rose-800"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-stone-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-amber-200 hover:text-amber-300 font-medium transition-colors"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="text-center mt-4">
          <p className="text-stone-500 text-xs">
            Protected by advanced security measures
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
