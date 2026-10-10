import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

const notoSrifBenglai = Noto_Serif_Bengali({
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর | নিত্যপ্রয়োজনীয় পণ্যের বাজারদর",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ ও অন্যান্য নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর, দাম পরিবর্তন এবং বাজারভিত্তিক তুলনা দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSrifBenglai.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-center" />
        <Header />
        <Suspense
          fallback={
            <div className="mx-auto h-12 w-full max-w-6xl animate-pulse bg-gray-50" />
          }
        >
          <Navbar />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-10 animate-pulse border-b border-gray-100 bg-gray-50" />
          }
        >
          <Marquee />
        </Suspense>
        <main className="w-full flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
