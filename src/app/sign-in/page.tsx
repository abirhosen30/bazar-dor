"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setIsSubmitting(true);
    try {
      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        setErrorMessage(error.message ?? "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      router.push("/profile");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-10 flex flex-col items-center justify-center">
      <div className="my-4 mb-4 text-center">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="mt-2 mb-2 text-[12px] font-bold text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4">
          <label className="label font-bold" htmlFor="email">
            ইমেইল
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input font-bold"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          <label className="label font-bold" htmlFor="password">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="input font-bold"
            placeholder="আপনার পাসওয়ার্ড লিখুন"
            autoComplete="current-password"
            required
          />

          {errorMessage && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="btn mt-4 bg-green-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>
          <p className="mt-2 text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/sign-up" className="text-green-700 underline">
              সাইন আপ করুন
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;
