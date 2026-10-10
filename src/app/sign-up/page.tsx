"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      toast.error("সব ঘর সঠিকভাবে পূরণ করুন।");
      return;
    }

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি একই নয়!");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message ?? "সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      router.push("/sign-in?notice=registered");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "সাইন আপ করা যায়নি। আবার চেষ্টা করুন।",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-10 mb-20 flex flex-col items-center justify-center">
      <div className="my-4 mb-4 text-center">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-2 mb-2 text-[12px] font-bold text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col items-center"
      >
        <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4">
          <label className="label font-bold" htmlFor="name">
            নাম
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="input font-bold"
            placeholder="যেমন: রহিম উদ্দিন"
            autoComplete="name"
            required
          />

          <label className="label font-bold" htmlFor="email">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            name="email"
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
            type="password"
            name="password"
            className="input font-bold"
            placeholder="কমপক্ষে ৮ অক্ষর"
            autoComplete="new-password"
            minLength={8}
            required
          />

          <label className="label font-bold" htmlFor="confirmPassword">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            className="input font-bold"
            placeholder="আবার লিখুন"
            autoComplete="new-password"
            minLength={8}
            required
          />

          <button
            type="submit"
            className="btn mt-4 bg-green-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
          <p className="mt-2 text-sm text-gray-600">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link href="/sign-in" className="text-green-700 underline">
              সাইন ইন করুন
            </Link>
          </p>
          <div className="divider my-1">অথবা</div>
          <SocialAuthButtons />
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;
