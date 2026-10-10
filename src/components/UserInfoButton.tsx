"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const UserInfoButton = () => {
  const [signOutError, setSignOutError] = useState("");
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return <div className="h-12 w-32 animate-pulse rounded-full bg-gray-100" />;
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link href="/sign-in" className="btn">
          সাইন ইন
        </Link>
        <Link href="/sign-up" className="btn bg-green-700 text-white">
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <details className="dropdown dropdown-end">
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-full px-2 py-1 hover:bg-gray-100">
        <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 text-lg font-semibold text-gray-600">
          {user.image ? (
            <Image
              src={user.image}
              alt=""
              width={48}
              height={48}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </span>
        <span className="font-semibold text-gray-800">{user.name}</span>
        <span aria-hidden="true" className="text-xs text-gray-500">
          ▼
        </span>
      </summary>

      <div className="dropdown-content z-50 mt-3 w-80 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
        <p className="text-lg font-semibold text-gray-900">{user.name}</p>
        <p className="break-all text-sm text-gray-500">{user.email}</p>

        {signOutError && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {signOutError}
          </p>
        )}

        <Link
          href="/profile"
          className="mt-5 block rounded-lg py-2 font-medium text-gray-800 hover:bg-gray-50"
        >
          👤 আমার প্রোফাইল
        </Link>
        <button
          type="button"
          onClick={async () => {
            setSignOutError("");
            try {
              const { error } = await authClient.signOut();
              if (error) {
                setSignOutError(
                  error.message ?? "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।",
                );
                toast.error(error.message ?? "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
                return;
              }
              toast.success("সাইন আউট সফল হয়েছে।");
            } catch (error) {
              const message =
                error instanceof Error
                  ? error.message
                  : "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।";
              setSignOutError(message);
              toast.error(message);
            }
          }}
          className="mt-2 w-full rounded-lg py-2 text-left font-medium text-red-600 hover:bg-red-50"
        >
          ↩ সাইন আউট
        </button>
      </div>
    </details>
  );
};

export default UserInfoButton;
