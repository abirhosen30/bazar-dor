"use client";

import { authClient } from "@/lib/auth-client";
import React from "react";

const SignUpPage = () => {

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    alert("পাসওয়ার্ড দুটি একই নয়!");
    return;
  }

  try {
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      console.error("Signup error:", error);
      alert(error.message);
      return;
    }

    console.log("Signup successful:", data);
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};
  return (
    <div className="flex flex-col mx-auto items-center justify-center mt-10 mb-20">
      <div className="mb-4 text-center my-4">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-[12px] font-bold text-gray-500 mt-2 mb-2">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4">
          <label className="label font-bold">নাম</label>
          <input
            type="text"
            name="name"
            className="input font-bold"
            placeholder="যেমন: রহিম উদ্দিন"
          />

          <label className="label font-bold">ইমেইল</label>
          <input
            type="email"
            name="email"
            className="input font-bold"
            placeholder="you@example.com"
          />

          <label className="label font-bold">পাসওয়ার্ড</label>
          <input
            type="password"
            name="password"
            className="input font-bold"
            placeholder="কমপক্ষে ৮ অক্ষর"
            required
          />

          <label className="label font-bold">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input
            type="password"
            name="confirmPassword"
            className="input font-bold"
            placeholder="আবার লিখুন"
            required
          />

          <button type="submit" className="btn bg-green-700 text-white mt-4">
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;

