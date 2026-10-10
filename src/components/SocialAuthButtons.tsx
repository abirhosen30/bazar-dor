"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SocialAuthButtons = () => {
  const [pendingProvider, setPendingProvider] = useState<
    "google" | "github" | null
  >(null);

  const signInWithProvider = async (provider: "google" | "github") => {
    setPendingProvider(provider);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message ?? "সামাজিক মাধ্যমে সাইন ইন করা যায়নি।");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "সামাজিক মাধ্যমে সাইন ইন করা যায়নি।",
      );
    } finally {
      setPendingProvider(null);
    }
  };

  return (
    <div className="mt-4 grid gap-2">
      <button
        type="button"
        onClick={() => signInWithProvider("google")}
        disabled={pendingProvider !== null}
        className="btn border-gray-300 bg-white text-gray-800"
      >
        {pendingProvider === "google"
          ? "Google-এ সংযোগ হচ্ছে..."
          : "Google দিয়ে চালিয়ে যান"}
      </button>
      <button
        type="button"
        onClick={() => signInWithProvider("github")}
        disabled={pendingProvider !== null}
        className="btn border-gray-300 bg-white text-gray-800"
      >
        {pendingProvider === "github"
          ? "GitHub-এ সংযোগ হচ্ছে..."
          : "GitHub দিয়ে চালিয়ে যান"}
      </button>
    </div>
  );
};

export default SocialAuthButtons;
