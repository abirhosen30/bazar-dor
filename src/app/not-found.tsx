import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[55vh] max-w-6xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold text-green-700">404</p>
      <h1 className="mt-2 text-2xl font-bold text-gray-900">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        ঠিকানাটি ভুল হতে পারে, অথবা পৃষ্ঠাটি সরিয়ে ফেলা হয়েছে।
      </p>
      <Link href="/" className="btn mt-6 bg-green-700 text-white">
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
