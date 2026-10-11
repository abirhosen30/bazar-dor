import Image from "next/image";
import Link from "next/link";
import bannerLogo from "@/assests/bazar-hero.png";

const Banner = () => {
   const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <section className="mt-6 w-full rounded-2xl border border-gray-200 px-4 py-6 sm:px-6 md:px-8">
      <div className="flex min-h-[150px] flex-col-reverse items-center justify-between gap-5 text-left md:flex-row">
        {/* Left Content */}
        <div className="flex w-full flex-1 flex-col items-start">
          <span className="inline-block rounded-full bg-[#e1f5e8] px-3 py-1 text-[11px] font-medium text-green-700">
            {date}
          </span>

          <h1 className="mt-2 text-xl font-bold leading-tight text-[#26352b] sm:text-2xl md:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-2 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও অন্যান্য পণ্যের
            — বাজারদরভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
            বাজার পরিস্থিতির এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 md:w-auto md:py-2 md:text-xs"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Right Illustration */}
        <div className="w-36 shrink-0 sm:w-[180px] md:w-[220px]">
          <Image
            src={bannerLogo}
            alt="বাজারের পণ্যের ছবি"
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
