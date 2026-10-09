"use client";

import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="mx-auto my-10 max-w-lg animate-pulse rounded-2xl bg-gray-100 p-6">
        <div className="h-6 w-40 rounded bg-gray-200" />
        <div className="mt-4 h-4 w-56 rounded bg-gray-200" />
      </div>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto my-10 max-w-lg rounded-2xl border border-gray-200 p-6">
        <h1 className="text-xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-2 text-gray-600">
          প্রোফাইল দেখতে আগে আপনার অ্যাকাউন্টে সাইন ইন করুন।
        </p>
        <Link
          href="/sign-in"
          className="btn mt-4 bg-green-700 text-white"
        >
          সাইন ইন
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto my-10 max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-bold">আমার প্রোফাইল</h1>
      <div className="mt-5 flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 text-xl font-semibold text-gray-600">
          {user.image ? (
            <Image
              src={user.image}
              alt=""
              width={64}
              height={64}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </span>
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="break-all text-gray-600">{user.email}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
