import Link from "next/link";
import MarqueeText from "react-marquee-text";
import { BAZARDOR_API_BASE_URL } from "@/lib/bazardor-api";
import { formatChangePercent, getUnitLabel } from "@/lib/product-format";

interface Product {
  id: number;
  categoryIcon: string;
  nameBn: string;
  today: number;
  unit?: string;
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
                {product.today.toLocaleString("bn-BD")} টাকা/{getUnitLabel(product.unit)}
              </span>

              <span
                className={`${
                  product.change.dir === "up"
                    ? "text-green-600"
                    : product.change.dir === "down"
                      ? "text-red-500"
                      : "text-gray-500"
                }`}
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {formatChangePercent(product.change.pct)}%
              </span>
            </Link>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
