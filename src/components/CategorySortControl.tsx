"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SortOption = "default" | "price-low" | "price-high";

const CategorySortControl = ({ sort }: { sort: SortOption }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    if (
      value !== "default" &&
      value !== "price-low" &&
      value !== "price-high"
    ) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <label className="flex items-center gap-2 text-xs text-gray-500">
      সাজান
      <select
        aria-label="পণ্য সাজান"
        value={sort}
        onChange={(event) => handleSortChange(event.target.value)}
        className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 outline-none focus:border-green-700"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-low">দাম: কম থেকে বেশি</option>
        <option value="price-high">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
};

export default CategorySortControl;
