"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSaveName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("নাম লিখুন।");
      return;
    }

    if (updatedName === user?.name) {
      setIsEditingProfile(false);
      return;
    }

    setIsSavingName(true);
    try {
      const { error } = await authClient.updateUser({ name: updatedName });

      if (error) {
        toast.error(error.message ?? "নাম আপডেট করা যায়নি।");
        return;
      }

      await refetch();
      setIsEditingProfile(false);
      toast.success("নাম আপডেট হয়েছে।");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "নাম আপডেট করা যায়নি।",
      );
    } finally {
      setIsSavingName(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message ?? "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সাইন আউট সফল হয়েছে।");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "সাইন আউট করা যায়নি।",
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="mx-auto my-10 max-w-3xl animate-pulse rounded-2xl bg-gray-100 p-6">
        <div className="mx-auto h-6 w-40 rounded bg-gray-200" />
        <div className="mt-8 h-12 rounded bg-gray-200" />
      </div>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto my-10 max-w-3xl rounded-2xl border border-gray-200 p-6">
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
    <div className="min-h-full bg-[#f0f6f1] px-4 py-10">
      <section className="mx-auto max-w-3xl">
        <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-600">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
        </header>

        <div className="flex flex-col gap-4 rounded-2xl border border-[#dce7df] bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 text-xl font-semibold text-gray-600">
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
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-gray-900">
              {user.name}
            </p>
            <p className="break-all text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="btn border border-red-400 bg-transparent text-red-600 hover:bg-red-50"
        >
          {isSigningOut ? "সাইন আউট হচ্ছে..." : "↩ সাইন আউট"}
        </button>
        </div>

        <div
        id="profile-details"
        className="mt-5 rounded-2xl border border-[#dce7df] bg-white/80 p-5 sm:p-6"
        >
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-bold text-gray-900">তথ্য</h2>
          <button
            type="button"
            aria-expanded={isEditingProfile}
            aria-controls="profile-name-form"
            onClick={() => {
              if (!isEditingProfile) {
                setName(user.name);
              }
              setIsEditingProfile((isEditing) => !isEditing);
            }}
            disabled={isSavingName}
            className="text-sm font-medium text-green-700 underline underline-offset-2"
          >
            {isEditingProfile ? "বন্ধ করুন" : "Edit Profile"}
          </button>
        </div>

        {isEditingProfile ? (
          <form
            id="profile-name-form"
            onSubmit={handleSaveName}
            className="mt-6"
          >
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              নাম
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              maxLength={100}
              required
              className="input input-bordered w-full border-[#dce7df] bg-transparent"
              disabled={isSavingName}
            />
            <button
              type="submit"
              className="btn mt-3 w-full bg-green-700 text-white shadow-sm hover:bg-green-800"
              disabled={isSavingName}
            >
              {isSavingName ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        ) : (
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-gray-800">নাম</p>
            <p className="rounded-lg border border-[#dce7df] px-4 py-3 text-gray-700">
              {user.name}
            </p>
          </div>
        )}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
