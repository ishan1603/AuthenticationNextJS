"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-gray-800 flex flex-col items-center justify-center px-5 py-2 rounded-2xl w-100">
        <h1 className="text-3xl mb-8 mt-3 text-gray-100 font-bold">
          {loading ? "Processing" : "Signup"}
        </h1>
        <hr />
        <label htmlFor="username"></label>
        <input
          className="bg-gray-700 p-2.5 rounded-lg mb-4 focus:outline-gray-300 focus:outline-2 text-gray-200"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="🌐 Username"
        />
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
          className="bg-gray-700 p-2.5 rounded-lg mb-4 focus:outline-gray-300 focus:outline-2 text-gray-200"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="🔒 Password"
        />
        <button
          onClick={onSignup}
          className={`px-6 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 mb-8 mt-3 hover:scale-105 ${
            buttonDisabled
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400 cursor-pointer"
          }`}
        >
          Signup
        </button>
        <p className="text-gray-500 mb-2">
          Already have an account?
          <Link
            href="/login"
            className="text-white hover:underline hover:text-blue-800 mb-3 ml-1.5"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
