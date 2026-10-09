import React from "react";
import MarqueeText from "react-marquee-text";

interface Product {
  categoryIcon: string;
  nameBn: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product prices");
  }

  const data: Product[] = await res.json();

  return (
    <div className="border-b-2 border-gray-100 py-2">
      <MarqueeText direction="right" duration={15} className="py-1">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
          {[...data, ...data].map((product, index) => (
            <div
              key={`${product.nameBn}-${index}`}
              className="flex items-center gap-2 text-sm  border-r-2 px-3 border-gray-100"
            >
              <span>{product.categoryIcon}</span>

              <span className="font-medium text-gray-700">
                {product.nameBn}
              </span>

              <span className="font-semibold text-gray-900">
                ৳{product.today}
              </span>

              <span
                className={
                  product.change.dir === "up"
                    ? "text-red-500"
                    : "text-green-600"
                }
              >
                {product.change.dir === "up" ? "▲" : "▼"} {product.change.pct}%
              </span>
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
