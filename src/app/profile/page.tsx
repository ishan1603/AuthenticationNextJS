"use client";

import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("Nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-gray-800 flex flex-col items-center justify-center px-5 py-2 rounded-2xl w-100 ">
        <h1 className="text-3xl mb-8 mt-3 text-gray-100 font-bold">Profile</h1>
        <hr />
        <h2
          className={`p-3 rounded mb-3 ${
            data === "Nothing" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {data === "Nothing" ? (
            "No user found. Click to get Details"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>

        <hr />
        <button
          onClick={logout}
          className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400 cursor-pointer px-6 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200  mt-3 hover:scale-105 mb-3"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400 cursor-pointer px-6 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 mb-8 mt-3 hover:scale-105"
        >
          Get User Details
        </button>
      </div>
    </div>
  );
}
