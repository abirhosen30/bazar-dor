import Link from "next/link";
import MarqueeText from "react-marquee-text";
import { BAZARDOR_API_BASE_URL } from "@/lib/bazardor-api";

interface Product {
  id: number;
  categoryIcon: string;
  nameBn: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(`${BAZARDOR_API_BASE_URL}/products`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product prices (${res.status})`);
  }

  const data: Product[] = await res.json();

  return (
    <div className="border-b-2 border-gray-100 py-2">
      <MarqueeText direction="right" duration={15} className="py-1">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
          {[...data, ...data].map((product, index) => (
            <Link
              key={`${product.nameBn}-${index}`}
              href={`/product/${product.id}`}
              className="flex items-center gap-2 border-r-2 border-gray-100 px-3 text-sm"
            >
              <span>{product.categoryIcon}</span>

              <span className="font-medium text-gray-700">
                {product.nameBn}
              </span>

              <span className="font-semibold text-gray-900">
                {product.today.toLocaleString("bn-BD")} টাকা/একক
              </span>

              <span
                className={`${
                  product.change.dir === "up"
                    ? "text-red-500"
                    : product.change.dir === "down"
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {product.change.pct.toLocaleString("bn-BD")}%
              </span>
            </Link>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
