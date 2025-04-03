"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-gray-800 flex flex-col items-center justify-center px-5 py-2 rounded-2xl w-100">
        <h1 className="text-3xl mb-8 mt-3 text-gray-100 font-bold">
          {loading ? "Processing" : "Login"}
        </h1>
        <hr />

        <label htmlFor="email"></label>
        <input
          className="bg-gray-700 p-2.5 rounded-lg mb-4 focus:outline-gray-300 focus:outline-2 text-gray-200"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="👤 Email"
        />

        <label htmlFor="password"></label>
        <input
          className="bg-gray-700 p-2.5 rounded-lg mb-0 focus:outline-gray-300 focus:outline-2 text-gray-200"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="🔒 Password"
        />

        {/* Forgot Password Link - Moved to bottom right of the password input */}
        <div className="w-full flex justify-end pr-1 mt-1">
          <Link
            href="/forgotpassword"
            className="text-blue-500 hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={onLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer mb-8 mt-3 hover:scale-105 transition-all"
        >
          Login
        </button>

        <p className="text-gray-500 mb-2">
          Don't have an account?
          <Link
            href="/signup"
            className="text-white hover:underline hover:text-blue-800 mb-3 ml-1.5"
          >
            Visit Signup page
          </Link>
        </p>
      </div>
    </div>
  );
}
