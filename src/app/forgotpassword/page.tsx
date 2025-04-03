"use client";

import axios from "axios";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.post("/api/users/forgotpassword", { email });
      setMessage("Password reset link sent to your email.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-gray-800 flex flex-col items-center justify-center px-5 py-2 rounded-2xl w-100">
        <h1 className="text-3xl mb-3 mt-3 text-gray-100 font-bold">
          Forgot Password
        </h1>
        <form
          onSubmit={handleForgotPassword}
          className="flex flex-col gap-4 mt-4"
        >
          <input
            type="email"
            placeholder="👤 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 p-2.5 rounded-lg mb-0 focus:outline-gray-300 focus:outline-2 text-gray-200"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer mb-8 mt-3 hover:scale-105 transition-all"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="text-green-500 mt-2">{message}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
