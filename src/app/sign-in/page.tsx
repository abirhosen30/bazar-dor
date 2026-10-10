"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import toast from "react-hot-toast";

const SignInPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const notice = query.get("notice");

    if (notice === "login-required") {
      toast.error("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন।");
    } else if (notice === "registered") {
      toast.success("সাইন আপ সফল হয়েছে। এখন সাইন ইন করুন।");
    }

    if (notice) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      const message = "সঠিক ইমেইল ও পাসওয়ার্ড দিয়ে ফর্মটি পূরণ করুন।";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setIsSubmitting(true);
    try {
      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        const message = error.message ?? "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";
        setErrorMessage(message);
        toast.error(message);
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে।");
      router.push("/");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";
      setErrorMessage(message);
      toast.error(message);
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
      <form onSubmit={handleSubmit} noValidate>
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
          <div className="divider my-1">অথবা</div>
          <SocialAuthButtons />
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;
