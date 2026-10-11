"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const UpdateProfileForm = ({
  initialName,
}: {
  initialName: string;
}) => {
  const router = useRouter();
  const { refetch } = authClient.useSession();
  const [name, setName] = useState(initialName);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("নাম লিখুন।");
      return;
    }

    if (updatedName === initialName) {
      router.push("/profile");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await authClient.updateUser({ name: updatedName });

      if (error) {
        toast.error(error.message ?? "তথ্য আপডেট করা যায়নি।");
        return;
      }

      await refetch();
      toast.success("তথ্য আপডেট হয়েছে।");
      router.push("/profile");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "তথ্য আপডেট করা যায়নি।",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto my-10 max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
      <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট</h1>
      <p className="mt-2 text-sm text-gray-600">
        আপনার প্রোফাইলের নাম পরিবর্তন করুন।
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
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
            className="input input-bordered w-full"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="btn bg-green-700 text-white hover:bg-green-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "আপডেট হচ্ছে..." : "Update Information"}
          </button>
          <Link href="/profile" className="btn btn-ghost">
            বাতিল
          </Link>
        </div>
      </form>
    </section>
  );
};

const UpdateProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div
        role="status"
        aria-label="প্রোফাইল লোড হচ্ছে"
        className="mx-auto my-10 max-w-3xl animate-pulse space-y-5 rounded-2xl bg-gray-100 p-6"
      >
        <div className="h-7 w-48 rounded bg-gray-200" />
        <div className="h-12 rounded bg-gray-200" />
        <div className="h-12 rounded bg-gray-200" />
      </div>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto my-10 max-w-3xl rounded-2xl border border-gray-200 p-6">
        <h1 className="text-xl font-bold">তথ্য আপডেট</h1>
        <p className="mt-2 text-gray-600">
          তথ্য আপডেট করতে আগে আপনার অ্যাকাউন্টে সাইন ইন করুন।
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

  return <UpdateProfileForm key={user.id} initialName={user.name} />;
};

export default UpdateProfilePage;
