import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://companybackend-nu9b.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();

      if (res.ok && data.token) {
        setMessage("Login successful!");
        if (onLogin) onLogin(data.token);
        // Note: localStorage is not available in Claude artifacts
        // In production, use: localStorage.setItem("token", data.token);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login request error:", err);
      setMessage(err.message || "Error connecting to server");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
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
                Welcome Back
              </h2>
              <p className="text-stone-400 text-sm">Sign in to your account</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  required
                  className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 transition-all duration-300"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-amber-200 hover:text-amber-300 text-sm font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-amber-200 to-stone-300 text-stone-900 font-semibold rounded-lg hover:from-amber-300 hover:to-stone-400 focus:outline-none focus:ring-4 focus:ring-amber-200/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Logging In..." : "Log In"}
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
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-amber-200 hover:text-amber-300 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="mt-6 flex items-center">
              <div className="flex-1 border-t border-stone-700"></div>
              <span className="px-4 text-stone-500 text-xs">OR</span>
              <div className="flex-1 border-t border-stone-700"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setMessage("Social login not implemented")}
                className="w-full py-3 bg-stone-800 border border-stone-700 text-stone-200 rounded-lg hover:bg-stone-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="text-center mt-4">
          <p className="text-stone-500 text-xs">
            Secure login protected by encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
